"use server";

import { prisma } from "@/lib/prisma/client";
import { getMockAdditionalServices, getMockServicePackages } from "@/lib/mock-data";
import type { ServiceType } from "@prisma/client";

// ======= Get All Services =======
export async function getAllServices() {
  try {
    return await prisma.additionalService.findMany({
      where: { isActive: true },
      orderBy: { type: "asc" },
    });
  } catch {
    return getMockAdditionalServices() as any;
  }
}

// ======= Get Services by Type =======
export async function getServicesByType(type: ServiceType) {
  try {
    return await prisma.additionalService.findMany({
      where: { type, isActive: true },
    });
  } catch {
    const all = getMockAdditionalServices();
    return all.filter((s) => s.type === type) as any;
  }
}

// ======= Get Service Packages =======
export async function getServicePackages(filters?: {
  hospitalId?: string;
  featured?: boolean;
}) {
  try {
    const where: Record<string, unknown> = { isActive: true };

    if (filters?.hospitalId) where.hospitalId = filters.hospitalId;
    if (filters?.featured) where.isFeatured = true;

    return await prisma.servicePackage.findMany({
      where,
      include: {
        hospital: {
          select: {
            id: true,
            slug: true,
            nameVi: true,
            nameKo: true,
            nameEn: true,
            thumbnailUrl: true,
            ratingAvg: true,
            reviewCount: true,
          },
        },
        items: {
          include: {
            service: true,
          },
        },
      },
      orderBy: [{ isFeatured: "desc" }, { packagePrice: "asc" }],
    });
  } catch {
    return getMockServicePackages() as any;
  }
}

// ======= Get Package by ID =======
export async function getPackageById(id: string) {
  try {
    return await prisma.servicePackage.findUnique({
      where: { id },
      include: {
        hospital: {
          include: {
            procedures: {
              where: { isActive: true, isPopular: true },
              take: 5,
            },
            doctors: {
              where: { isActive: true },
              take: 3,
            },
            _count: { select: { reviews: true } },
          },
        },
        items: {
          include: {
            service: true,
          },
        },
      },
    });
  } catch {
    const pkgs = getMockServicePackages();
    return pkgs.find((p) => p.id === id) as any || null;
  }
}

// ======= Get Featured Packages =======
export async function getFeaturedPackages() {
  try {
    return await prisma.servicePackage.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        hospital: {
          select: {
            id: true,
            slug: true,
            nameVi: true,
            nameKo: true,
            nameEn: true,
            thumbnailUrl: true,
            ratingAvg: true,
          },
        },
        items: {
          include: {
            service: true,
          },
        },
      },
      take: 6,
      orderBy: { packagePrice: "asc" },
    });
  } catch {
    return getMockServicePackages() as any;
  }
}
