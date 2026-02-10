"use server";

import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getMockCommunityPosts } from "@/lib/mock-data";
import type { CommunityPostType } from "@prisma/client";

async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

export async function createPost(data: {
  type: CommunityPostType;
  title: string;
  content: string;
  images?: string[];
}) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Unauthorized" };

  if (!data.title.trim()) return { error: "Title required" };
  if (!data.content.trim()) return { error: "Content required" };

  const post = await prisma.communityPost.create({
    data: {
      userId,
      type: data.type,
      title: data.title,
      content: data.content,
      images: data.images || [],
    },
  });

  revalidatePath("/community");
  return { data: post };
}

export async function getPosts(options?: {
  type?: CommunityPostType;
  limit?: number;
  offset?: number;
  search?: string;
}) {
  try {
    const limit = options?.limit || 20;
    const offset = options?.offset || 0;

    const where: Record<string, unknown> = {
      isPublished: true,
    };
    if (options?.type) where.type = options.type;
    if (options?.search) {
      where.OR = [
        { title: { contains: options.search, mode: "insensitive" } },
        { content: { contains: options.search, mode: "insensitive" } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatar: true, isBeberiaMember: true } },
          _count: { select: { comments: true } },
        },
        orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
        take: limit,
        skip: offset,
      }),
      prisma.communityPost.count({ where }),
    ]);

    return { posts, total };
  } catch {
    return getMockCommunityPosts(options?.type) as any;
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.communityPost.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true, isBeberiaMember: true } },
        comments: {
          where: { parentId: null },
          include: {
            user: { select: { id: true, name: true, avatar: true } },
            children: {
              include: {
                user: { select: { id: true, name: true, avatar: true } },
              },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        },
        _count: { select: { comments: true } },
      },
    });

    return post;
  } catch {
    const { posts } = getMockCommunityPosts();
    const mockPost = posts.find((p) => p.id === id);
    if (!mockPost) return null;
    return { ...mockPost, comments: [] } as any;
  }
}

export async function createComment(data: {
  postId: string;
  content: string;
  parentId?: string;
}) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Unauthorized" };

  if (!data.content.trim()) return { error: "Content required" };

  const comment = await prisma.comment.create({
    data: {
      postId: data.postId,
      userId,
      content: data.content,
      parentId: data.parentId || null,
    },
  });

  // Update comment count
  await prisma.communityPost.update({
    where: { id: data.postId },
    data: { commentCount: { increment: 1 } },
  });

  revalidatePath(`/community/posts/${data.postId}`);
  revalidatePath("/community");
  return { data: comment };
}

export async function likePost(postId: string) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Unauthorized" };

  await prisma.communityPost.update({
    where: { id: postId },
    data: { likeCount: { increment: 1 } },
  });

  revalidatePath("/community");
  return { success: true };
}

export async function deletePost(postId: string) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Unauthorized" };

  const post = await prisma.communityPost.findUnique({
    where: { id: postId },
  });

  if (!post) return { error: "Post not found" };

  // Check ownership or admin
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (post.userId !== userId && user?.role !== "ADMIN") {
    return { error: "Forbidden" };
  }

  await prisma.communityPost.delete({ where: { id: postId } });

  revalidatePath("/community");
  return { success: true };
}

export async function getBeforeAfterPosts(limit?: number) {
  try {
    const posts = await prisma.communityPost.findMany({
      where: {
        type: "BEFORE_AFTER",
        isPublished: true,
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit || 20,
    });

    return posts;
  } catch {
    const { posts } = getMockCommunityPosts("BEFORE_AFTER");
    return posts as any;
  }
}

export async function getQAPosts(limit?: number) {
  try {
    const posts = await prisma.communityPost.findMany({
      where: {
        type: "QA",
        isPublished: true,
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        _count: { select: { comments: true } },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      take: limit || 20,
    });

    return posts;
  } catch {
    const { posts } = getMockCommunityPosts("QA");
    return posts as any;
  }
}
