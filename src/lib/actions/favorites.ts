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

export async function toggleFavorite(hospitalId: string) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const existing = await prisma.favorite.findUnique({
    where: { userId_hospitalId: { userId, hospitalId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    revalidatePath("/hospitals");
    return { isFavorited: false };
  } else {
    await prisma.favorite.create({ data: { userId, hospitalId } });
    revalidatePath("/hospitals");
    return { isFavorited: true };
  }
}

export async function getUserFavorites() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        hospital: {
          include: {
            _count: { select: { reviews: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return favorites;
  } catch {
    return [];
  }
}

export async function isFavorited(hospitalId: string): Promise<boolean> {
  const userId = await getCurrentUserId();
  if (!userId) return false;

  const fav = await prisma.favorite.findUnique({
    where: { userId_hospitalId: { userId, hospitalId } },
  });

  return !!fav;
}
