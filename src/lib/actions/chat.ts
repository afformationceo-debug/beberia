"use server";

import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { ChatRoomType, ChatMessageRole } from "@prisma/client";

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

export async function createChatRoom(data: {
  type: ChatRoomType;
  bookingId?: string;
  hospitalId?: string;
  title?: string;
}) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Unauthorized" };

  // For booking rooms, check if one already exists
  if (data.bookingId) {
    const existing = await prisma.chatRoom.findUnique({
      where: { bookingId: data.bookingId },
    });
    if (existing) return { data: existing };
  }

  const room = await prisma.chatRoom.create({
    data: {
      type: data.type,
      bookingId: data.bookingId || null,
      hospitalId: data.hospitalId || null,
      title: data.title || null,
      participants: {
        create: { userId },
      },
    },
  });

  revalidatePath("/chat");
  return { data: room };
}

export async function getUserChatRooms() {
  try {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const rooms = await prisma.chatRoom.findMany({
    where: {
      participants: {
        some: { userId },
      },
    },
    include: {
      hospital: {
        select: { id: true, nameVi: true, nameKo: true, nameEn: true, slug: true },
      },
      booking: {
        select: { id: true, bookingNumber: true },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          content: true,
          role: true,
          createdAt: true,
        },
      },
      _count: {
        select: { messages: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return rooms;
  } catch {
    return [];
  }
}

export async function getChatMessages(
  roomId: string,
  options?: { limit?: number; before?: string }
) {
  const userId = await getCurrentUserId();
  if (!userId) return { messages: [], hasMore: false };

  // Verify user is a participant
  const participant = await prisma.chatRoomParticipant.findUnique({
    where: { roomId_userId: { roomId, userId } },
  });
  if (!participant) return { messages: [], hasMore: false };

  const limit = options?.limit || 50;

  const where: Record<string, unknown> = { roomId };
  if (options?.before) {
    where.createdAt = { lt: new Date(options.before) };
  }

  const messages = await prisma.chatMessage.findMany({
    where,
    include: {
      sender: {
        select: { id: true, name: true, avatar: true, role: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
  });

  const hasMore = messages.length > limit;
  if (hasMore) messages.pop();

  // Update last read
  await prisma.chatRoomParticipant.update({
    where: { roomId_userId: { roomId, userId } },
    data: { lastReadAt: new Date() },
  });

  return { messages: messages.reverse(), hasMore };
}

export async function sendMessage(data: {
  roomId: string;
  content: string;
  role?: ChatMessageRole;
}) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Unauthorized" };

  if (!data.content.trim()) return { error: "Empty message" };

  const message = await prisma.chatMessage.create({
    data: {
      roomId: data.roomId,
      senderId: userId,
      role: data.role || "USER",
      content: data.content,
    },
    include: {
      sender: {
        select: { id: true, name: true, avatar: true, role: true },
      },
    },
  });

  // Update room's updatedAt
  await prisma.chatRoom.update({
    where: { id: data.roomId },
    data: { updatedAt: new Date() },
  });

  revalidatePath(`/chat/${data.roomId}`);
  revalidatePath("/chat");
  return { data: message };
}

export async function getOrCreateAIRoom() {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  // Find existing AI consultation room
  const existing = await prisma.chatRoom.findFirst({
    where: {
      type: "AI_CONSULTATION",
      participants: {
        some: { userId },
      },
    },
  });

  if (existing) return existing;

  // Create new
  const room = await prisma.chatRoom.create({
    data: {
      type: "AI_CONSULTATION",
      title: "AI Consultation",
      participants: {
        create: { userId },
      },
    },
  });

  return room;
}

export async function saveAIMessage(
  roomId: string,
  role: "USER" | "ASSISTANT",
  content: string,
  senderId?: string
) {
  await prisma.chatMessage.create({
    data: {
      roomId,
      senderId: role === "USER" ? senderId : null,
      role,
      content,
    },
  });

  await prisma.chatRoom.update({
    where: { id: roomId },
    data: { updatedAt: new Date() },
  });
}
