"use server";

import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { UserRole, MembershipTier, DiscountType } from "@prisma/client";

async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, role: true },
  });

  if (dbUser?.role !== "ADMIN") return null;
  return dbUser;
}

// ========================
// Dashboard Stats
// ========================

export async function getDashboardStats() {
  try {
    const [
      totalBookings,
      activeHospitals,
      totalUsers,
      totalRevenue,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      recentBookings,
      recentReviews,
      beberiaMembers,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.hospital.count({ where: { isActive: true } }),
      prisma.user.count(),
      prisma.booking.aggregate({
        _sum: { totalAmount: true },
        where: { status: { in: ["CONFIRMED", "SCHEDULED", "IN_PROGRESS", "COMPLETED"] } },
      }),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.booking.count({ where: { status: "COMPLETED" } }),
      prisma.booking.count({ where: { status: "CANCELLED" } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, email: true } },
          hospital: { select: { nameKo: true } },
        },
      }),
      prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true } },
          hospital: { select: { nameKo: true } },
        },
      }),
      prisma.user.count({ where: { isBeberiaMember: true } }),
    ]);

    return {
      totalBookings,
      activeHospitals,
      totalUsers,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      recentBookings,
      recentReviews,
      beberiaMembers,
    };
  } catch {
    return {
      totalBookings: 0,
      activeHospitals: 0,
      totalUsers: 0,
      totalRevenue: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      recentBookings: [],
      recentReviews: [],
      beberiaMembers: 0,
    };
  }
}

// ========================
// Hospital Management
// ========================

export async function getAllHospitals(filters?: {
  search?: string;
  isActive?: boolean;
  beberiaPartner?: boolean;
  category?: string;
}) {
  try {
    const where: Record<string, unknown> = {};

    if (filters?.isActive !== undefined) where.isActive = filters.isActive;
    if (filters?.beberiaPartner !== undefined) where.beberiaPartner = filters.beberiaPartner;
    if (filters?.category) where.categories = { has: filters.category };
    if (filters?.search) {
      where.OR = [
        { nameKo: { contains: filters.search, mode: "insensitive" } },
        { nameVi: { contains: filters.search, mode: "insensitive" } },
        { nameEn: { contains: filters.search, mode: "insensitive" } },
        { slug: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const hospitals = await prisma.hospital.findMany({
      where,
      include: {
        _count: {
          select: { bookings: true, procedures: true, doctors: true, reviews: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return hospitals;
  } catch {
    return [];
  }
}

export async function toggleHospitalActive(hospitalId: string) {
  const admin = await verifyAdmin();
  if (!admin) return { error: "Unauthorized" };

  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
    select: { isActive: true },
  });
  if (!hospital) return { error: "Hospital not found" };

  await prisma.hospital.update({
    where: { id: hospitalId },
    data: { isActive: !hospital.isActive },
  });

  revalidatePath("/admin/hospitals");
  return { success: true };
}

export async function toggleHospitalFeatured(hospitalId: string) {
  const admin = await verifyAdmin();
  if (!admin) return { error: "Unauthorized" };

  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
    select: { isFeatured: true },
  });
  if (!hospital) return { error: "Hospital not found" };

  await prisma.hospital.update({
    where: { id: hospitalId },
    data: { isFeatured: !hospital.isFeatured },
  });

  revalidatePath("/admin/hospitals");
  return { success: true };
}

// ========================
// User Management
// ========================

export async function getAllUsers(filters?: {
  search?: string;
  role?: UserRole;
  membershipTier?: MembershipTier;
  page?: number;
  pageSize?: number;
}) {
  try {
    const { search, role, membershipTier, page = 1, pageSize = 20 } = filters || {};
    const where: Record<string, unknown> = {};

    if (role) where.role = role;
    if (membershipTier) where.membershipTier = membershipTier;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { beberiaId: { contains: search, mode: "insensitive" } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          _count: { select: { bookings: true, reviews: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total, page, pageSize, hasMore: page * pageSize < total };
  } catch {
    return { users: [], total: 0, page: 1, pageSize: 20, hasMore: false };
  }
}

export async function updateUserRole(userId: string, role: UserRole) {
  const admin = await verifyAdmin();
  if (!admin) return { error: "Unauthorized" };

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function updateMembershipTier(
  userId: string,
  tier: MembershipTier,
  beberiaId?: string
) {
  const admin = await verifyAdmin();
  if (!admin) return { error: "Unauthorized" };

  await prisma.user.update({
    where: { id: userId },
    data: {
      membershipTier: tier,
      isBeberiaMember: tier !== "FREE",
      ...(beberiaId !== undefined && { beberiaId }),
    },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

// ========================
// Promotion Management
// ========================

export async function getAllPromotions() {
  try {
    const promotions = await prisma.promotion.findMany({
      include: {
        hospital: { select: { nameKo: true } },
        _count: { select: { bookings: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return promotions;
  } catch {
    return [];
  }
}

export interface CreatePromotionInput {
  code: string;
  nameVi: string;
  nameKo: string;
  nameEn: string;
  descriptionVi?: string;
  descriptionKo?: string;
  descriptionEn?: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  beberiaOnly: boolean;
  requiredTier?: MembershipTier;
  hospitalId?: string;
  validFrom: string;
  validTo: string;
  maxUsage?: number;
}

export async function createPromotion(input: CreatePromotionInput) {
  const admin = await verifyAdmin();
  if (!admin) return { error: "Unauthorized" };

  try {
    const promo = await prisma.promotion.create({
      data: {
        code: input.code.toUpperCase(),
        nameVi: input.nameVi,
        nameKo: input.nameKo,
        nameEn: input.nameEn,
        descriptionVi: input.descriptionVi,
        descriptionKo: input.descriptionKo,
        descriptionEn: input.descriptionEn,
        discountType: input.discountType,
        discountValue: input.discountValue,
        minOrderAmount: input.minOrderAmount,
        maxDiscount: input.maxDiscount,
        beberiaOnly: input.beberiaOnly,
        requiredTier: input.requiredTier,
        hospitalId: input.hospitalId || null,
        validFrom: new Date(input.validFrom),
        validTo: new Date(input.validTo),
        maxUsage: input.maxUsage,
      },
    });

    revalidatePath("/admin/promotions");
    return { data: promo };
  } catch {
    return { error: "Failed to create promotion. Code may already exist." };
  }
}

export async function togglePromotionActive(promotionId: string) {
  const admin = await verifyAdmin();
  if (!admin) return { error: "Unauthorized" };

  const promo = await prisma.promotion.findUnique({
    where: { id: promotionId },
    select: { isActive: true },
  });
  if (!promo) return { error: "Promotion not found" };

  await prisma.promotion.update({
    where: { id: promotionId },
    data: { isActive: !promo.isActive },
  });

  revalidatePath("/admin/promotions");
  return { success: true };
}

// ========================
// Analytics
// ========================

export async function getAnalyticsData() {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      bookingsLast30d,
      bookingsLast7d,
      usersLast30d,
      topHospitals,
      categoryDistribution,
      membershipStats,
      monthlyBookings,
    ] = await Promise.all([
      prisma.booking.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.booking.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.hospital.findMany({
        where: { isActive: true },
        select: {
          nameKo: true,
          ratingAvg: true,
          reviewCount: true,
          _count: { select: { bookings: true } },
        },
        orderBy: { bookings: { _count: "desc" } },
        take: 5,
      }),
      prisma.booking.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      prisma.user.groupBy({
        by: ["membershipTier"],
        _count: { id: true },
      }),
      // Monthly bookings for last 6 months
      prisma.$queryRaw<{ month: string; count: bigint }[]>`
        SELECT to_char("createdAt", 'YYYY-MM') as month, count(*)::bigint as count
        FROM "Booking"
        WHERE "createdAt" >= ${new Date(now.getFullYear(), now.getMonth() - 5, 1)}
        GROUP BY to_char("createdAt", 'YYYY-MM')
        ORDER BY month ASC
      `,
    ]);

    return {
      bookingsLast30d,
      bookingsLast7d,
      usersLast30d,
      topHospitals,
      categoryDistribution,
      membershipStats,
      monthlyBookings: monthlyBookings.map((m) => ({
        month: m.month,
        count: Number(m.count),
      })),
    };
  } catch {
    return {
      bookingsLast30d: 0,
      bookingsLast7d: 0,
      usersLast30d: 0,
      topHospitals: [],
      categoryDistribution: [],
      membershipStats: [],
      monthlyBookings: [],
    };
  }
}
