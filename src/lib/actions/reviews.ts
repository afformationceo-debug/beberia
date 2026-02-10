"use server";

import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

export async function createReview(data: {
  hospitalId: string;
  doctorId?: string;
  bookingId?: string;
  rating: number;
  ratingService?: number;
  ratingResult?: number;
  ratingCommunication?: number;
  ratingFacilities?: number;
  title?: string;
  content: string;
  beforeImages?: string[];
  afterImages?: string[];
}) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Unauthorized" };

  if (data.rating < 1 || data.rating > 5) return { error: "Invalid rating" };
  if (!data.content.trim()) return { error: "Content required" };

  // Check if user already reviewed this hospital (with same booking or without booking)
  if (data.bookingId) {
    const existing = await prisma.review.findUnique({
      where: { bookingId: data.bookingId },
    });
    if (existing) return { error: "Already reviewed this booking" };
  }

  const review = await prisma.review.create({
    data: {
      userId,
      hospitalId: data.hospitalId,
      doctorId: data.doctorId || null,
      bookingId: data.bookingId || null,
      rating: data.rating,
      ratingService: data.ratingService,
      ratingResult: data.ratingResult,
      ratingCommunication: data.ratingCommunication,
      ratingFacilities: data.ratingFacilities,
      title: data.title || null,
      content: data.content,
      beforeImages: data.beforeImages || [],
      afterImages: data.afterImages || [],
      isVerified: !!data.bookingId,
    },
  });

  // Update hospital rating
  const stats = await prisma.review.aggregate({
    where: { hospitalId: data.hospitalId },
    _avg: { rating: true },
    _count: true,
  });

  await prisma.hospital.update({
    where: { id: data.hospitalId },
    data: {
      ratingAvg: stats._avg.rating || 0,
      reviewCount: stats._count,
    },
  });

  // Update doctor rating if applicable
  if (data.doctorId) {
    const docStats = await prisma.review.aggregate({
      where: { doctorId: data.doctorId },
      _avg: { rating: true },
      _count: true,
    });
    await prisma.doctor.update({
      where: { id: data.doctorId },
      data: {
        ratingAvg: docStats._avg.rating || 0,
        reviewCount: docStats._count,
      },
    });
  }

  revalidatePath("/hospitals");
  revalidatePath("/community");
  return { data: review };
}

export async function getHospitalReviews(
  hospitalId: string,
  options?: { limit?: number; offset?: number }
) {
  try {
    const limit = options?.limit || 20;
    const offset = options?.offset || 0;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { hospitalId },
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          doctor: { select: { id: true, nameVi: true, nameKo: true, nameEn: true } },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.review.count({ where: { hospitalId } }),
    ]);

    return { reviews, total };
  } catch {
    return { reviews: [], total: 0 };
  }
}

export async function getUserReviews() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    return await prisma.review.findMany({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        hospital: {
          select: {
            id: true,
            slug: true,
            nameVi: true,
            nameKo: true,
            nameEn: true,
            thumbnailUrl: true,
          },
        },
        doctor: {
          select: { id: true, nameVi: true, nameKo: true, nameEn: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function likeReview(reviewId: string) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Unauthorized" };

  await prisma.review.update({
    where: { id: reviewId },
    data: { likeCount: { increment: 1 } },
  });

  revalidatePath("/hospitals");
  return { success: true };
}

export async function replyToReview(reviewId: string, reply: string) {
  // Admin only
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Unauthorized" };

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || (user.role !== "ADMIN" && user.role !== "HOSPITAL_ADMIN")) {
    return { error: "Forbidden" };
  }

  await prisma.review.update({
    where: { id: reviewId },
    data: {
      hospitalReply: reply,
      hospitalReplyAt: new Date(),
    },
  });

  revalidatePath("/hospitals");
  revalidatePath("/admin/reviews");
  return { success: true };
}

export async function getAllReviews(options?: {
  search?: string;
  rating?: number;
  isVerified?: boolean;
  page?: number;
  limit?: number;
}) {
  try {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (options?.rating) where.rating = options.rating;
    if (options?.isVerified !== undefined) where.isVerified = options.isVerified;
    if (options?.search) {
      where.OR = [
        { title: { contains: options.search, mode: "insensitive" } },
        { content: { contains: options.search, mode: "insensitive" } },
      ];
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          hospital: {
            select: { id: true, slug: true, nameVi: true, nameKo: true, nameEn: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,
      }),
      prisma.review.count({ where }),
    ]);

    return { reviews, total, pages: Math.ceil(total / limit) };
  } catch {
    return { reviews: [], total: 0, pages: 0 };
  }
}
