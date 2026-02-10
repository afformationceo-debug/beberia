"use server";

import { prisma } from "@/lib/prisma/client";
import { getMockProcedureCategories, getMockPopularProcedures } from "@/lib/mock-data";

export async function getProcedureCategories() {
  try {
    return await prisma.procedureCategory.findMany({
      where: { parentId: null },
      include: {
        children: true,
        _count: { select: { procedures: true } },
      },
      orderBy: { order: "asc" },
    });
  } catch {
    return getMockProcedureCategories() as any;
  }
}

export async function getPopularProcedures() {
  try {
    return await prisma.procedure.findMany({
      where: { isPopular: true, isActive: true },
      include: {
        hospital: {
          select: {
            id: true,
            slug: true,
            nameVi: true,
            nameKo: true,
            nameEn: true,
            beberiaPartner: true,
          },
        },
        category: true,
      },
      orderBy: { originalPrice: "asc" },
      take: 10,
    });
  } catch {
    return getMockPopularProcedures() as any;
  }
}

export async function getPromotions() {
  try {
    const now = new Date();
    return await prisma.promotion.findMany({
      where: {
        isActive: true,
        validFrom: { lte: now },
        validTo: { gte: now },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch {
    return [];
  }
}
