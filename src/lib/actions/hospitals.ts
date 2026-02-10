"use server";

import { prisma } from "@/lib/prisma/client";
import {
  getMockFeaturedHospitals,
  getMockAllHospitals,
  getMockHospitalBySlug,
  getMockDistricts,
} from "@/lib/mock-data";
import type { HospitalCategory } from "@prisma/client";

export interface HospitalFilters {
  category?: HospitalCategory;
  district?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  beberiaDiscount?: boolean;
  search?: string;
  sort?: "recommended" | "rating" | "reviews" | "price_asc" | "price_desc";
  page?: number;
  pageSize?: number;
}

export async function getFeaturedHospitals() {
  try {
    return await prisma.hospital.findMany({
      where: { isFeatured: true, isActive: true },
      include: {
        procedures: {
          where: { isPopular: true, isActive: true },
          take: 3,
        },
        _count: { select: { reviews: true } },
      },
      orderBy: { ratingAvg: "desc" },
      take: 10,
    });
  } catch {
    return getMockFeaturedHospitals() as any;
  }
}

export async function getHospitals(filters: HospitalFilters = {}) {
  try {
    const {
      category,
      district,
      language,
      minRating,
      beberiaDiscount,
      search,
      sort = "recommended",
      page = 1,
      pageSize = 10,
    } = filters;

    const where: Record<string, unknown> = { isActive: true };

    if (category) {
      where.categories = { has: category };
    }
    if (district) {
      where.district = district;
    }
    if (language) {
      where.languagesSupported = { has: language };
    }
    if (minRating) {
      where.ratingAvg = { gte: minRating };
    }
    if (beberiaDiscount) {
      where.beberiaPartner = true;
    }
    if (search) {
      where.OR = [
        { nameVi: { contains: search, mode: "insensitive" } },
        { nameKo: { contains: search, mode: "insensitive" } },
        { nameEn: { contains: search, mode: "insensitive" } },
        { descriptionVi: { contains: search, mode: "insensitive" } },
        { descriptionEn: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: Record<string, string> = {};
    switch (sort) {
      case "rating":
        orderBy = { ratingAvg: "desc" };
        break;
      case "reviews":
        orderBy = { reviewCount: "desc" };
        break;
      default:
        orderBy = { isFeatured: "desc" };
    }

    const [hospitals, total] = await Promise.all([
      prisma.hospital.findMany({
        where,
        include: {
          procedures: {
            where: { isActive: true },
            orderBy: { isPopular: "desc" },
            take: 3,
          },
          _count: { select: { reviews: true, favorites: true } },
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.hospital.count({ where }),
    ]);

    return {
      hospitals,
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total,
    };
  } catch {
    return getMockAllHospitals() as any;
  }
}

export async function getHospitalBySlug(slug: string) {
  try {
    return await prisma.hospital.findUnique({
      where: { slug },
      include: {
        doctors: {
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
        },
        procedures: {
          where: { isActive: true },
          include: { category: true },
          orderBy: [{ isPopular: "desc" }, { originalPrice: "asc" }],
        },
        reviews: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        _count: { select: { reviews: true, favorites: true } },
      },
    });
  } catch {
    return getMockHospitalBySlug(slug) as any;
  }
}

export async function getHospitalDistricts() {
  try {
    const districts = await prisma.hospital.findMany({
      where: { isActive: true, district: { not: null } },
      select: { district: true },
      distinct: ["district"],
    });
    return districts
      .map((d) => d.district)
      .filter((d): d is string => d !== null);
  } catch {
    return getMockDistricts();
  }
}
