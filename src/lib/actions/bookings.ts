"use server";

import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { BookingStatus } from "@prisma/client";

// Generate booking number: BB-YYYYMMDD-XXXX
function generateBookingNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BB-${dateStr}-${random}`;
}

async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// ======= Create Booking =======
export interface CreateBookingInput {
  hospitalId: string;
  doctorId?: string;
  procedures: { procedureId: string; quantity?: number }[];
  serviceIds?: string[];
  preferredDate?: string;
  preferredTime?: string;
  passportName?: string;
  phone?: string;
  arrivalDate?: string;
  departureDate?: string;
  flightNumber?: string;
  promotionCode?: string;
  notes?: string;
}

export async function createBooking(input: CreateBookingInput) {
  const user = await getAuthUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const {
    hospitalId,
    doctorId,
    procedures,
    serviceIds,
    preferredDate,
    preferredTime,
    passportName,
    phone,
    arrivalDate,
    departureDate,
    flightNumber,
    promotionCode,
    notes,
  } = input;

  // Fetch procedure prices
  const procedureData = await prisma.procedure.findMany({
    where: {
      id: { in: procedures.map((p) => p.procedureId) },
      isActive: true,
    },
  });

  // Check user membership for pricing
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isBeberiaMember: true, membershipTier: true },
  });

  let subtotal = 0;
  const bookingItems = procedures.map((p) => {
    const proc = procedureData.find((pd) => pd.id === p.procedureId);
    if (!proc) throw new Error(`Procedure ${p.procedureId} not found`);

    // Price based on membership
    let unitPrice = proc.discountedPrice || proc.originalPrice;
    if (dbUser?.isBeberiaMember && proc.beberiaPrice) {
      unitPrice = proc.beberiaPrice;
    }

    const quantity = p.quantity || 1;
    const totalPrice = unitPrice * quantity;
    subtotal += totalPrice;

    return {
      procedureId: p.procedureId,
      quantity,
      unitPrice,
      totalPrice,
    };
  });

  // Fetch service prices
  let serviceTotalPrice = 0;
  let bookingServices: { serviceId: string; price: number }[] = [];
  if (serviceIds && serviceIds.length > 0) {
    const services = await prisma.additionalService.findMany({
      where: { id: { in: serviceIds }, isActive: true },
    });
    bookingServices = services.map((s) => ({
      serviceId: s.id,
      price: s.price,
    }));
    serviceTotalPrice = services.reduce((sum, s) => sum + s.price, 0);
  }

  subtotal += serviceTotalPrice;

  // Apply promotion
  let discountAmount = 0;
  let promotionId: string | undefined;
  if (promotionCode) {
    const promo = await prisma.promotion.findFirst({
      where: {
        code: promotionCode,
        isActive: true,
        validFrom: { lte: new Date() },
        validTo: { gte: new Date() },
      },
    });
    if (promo) {
      // Check if Beberia-only promo
      if (promo.beberiaOnly && !dbUser?.isBeberiaMember) {
        return { error: "This promotion is for Beberia members only" };
      }
      promotionId = promo.id;
      if (promo.discountType === "PERCENTAGE") {
        discountAmount = Math.floor(subtotal * (promo.discountValue / 100));
        if (promo.maxDiscount) {
          discountAmount = Math.min(discountAmount, promo.maxDiscount);
        }
      } else {
        discountAmount = promo.discountValue;
      }
    }
  }

  const totalAmount = Math.max(subtotal - discountAmount, 0);

  // Update passport name on user if provided
  if (passportName || phone) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(passportName && { passportName }),
        ...(phone && { phone }),
      },
    });
  }

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      bookingNumber: generateBookingNumber(),
      userId: user.id,
      hospitalId,
      doctorId: doctorId || null,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
      preferredTime: preferredTime || null,
      notes: notes || null,
      subtotal,
      discountAmount,
      totalAmount,
      arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
      departureDate: departureDate ? new Date(departureDate) : null,
      flightNumber: flightNumber || null,
      promotionId: promotionId || null,
      items: { create: bookingItems },
      services: {
        create: bookingServices,
      },
      statusHistory: {
        create: {
          status: "PENDING",
          changedBy: user.id,
        },
      },
    },
    include: {
      items: { include: { procedure: true } },
      services: { include: { service: true } },
      hospital: true,
      doctor: true,
    },
  });

  revalidatePath("/my/bookings");
  return { data: booking };
}

// ======= Get User Bookings =======
export async function getUserBookings() {
  try {
    const user = await getAuthUser();
    if (!user) return [];

    return await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        hospital: true,
        items: { include: { procedure: true } },
        services: { include: { service: true } },
        doctor: true,
        statusHistory: { orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

// ======= Get Booking By Number =======
export async function getBookingByNumber(bookingNumber: string) {
  try {
    const user = await getAuthUser();
    if (!user) return null;

    return await prisma.booking.findFirst({
      where: {
        bookingNumber,
        userId: user.id,
      },
      include: {
        hospital: true,
        doctor: true,
        items: { include: { procedure: true } },
        services: { include: { service: true } },
        statusHistory: { orderBy: { createdAt: "desc" } },
      },
    });
  } catch {
    return null;
  }
}

// ======= Cancel Booking (User) =======
export async function cancelBooking(bookingId: string) {
  const user = await getAuthUser();
  if (!user) return { error: "Unauthorized" };

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId: user.id,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  if (!booking) {
    return { error: "Booking not found or cannot be cancelled" };
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "CANCELLED",
      statusHistory: {
        create: {
          status: "CANCELLED",
          changedBy: user.id,
          note: "Cancelled by user",
        },
      },
    },
  });

  revalidatePath("/my/bookings");
  return { success: true };
}

// ======= Update Booking Status (Admin) =======
export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  note?: string
) {
  const user = await getAuthUser();
  if (!user) return { error: "Unauthorized" };

  // Verify admin role
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });
  if (dbUser?.role !== "ADMIN" && dbUser?.role !== "HOSPITAL_ADMIN") {
    return { error: "Forbidden" };
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status,
      statusHistory: {
        create: {
          status,
          changedBy: user.id,
          note,
        },
      },
    },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/my/bookings");
  return { success: true };
}

// ======= Validate Promo Code =======
export async function validatePromoCode(code: string) {
  try {
    const promo = await prisma.promotion.findFirst({
      where: {
        code,
        isActive: true,
        validFrom: { lte: new Date() },
        validTo: { gte: new Date() },
      },
    });

    if (!promo) return { valid: false };

    return {
      valid: true,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      maxDiscount: promo.maxDiscount,
      beberiaOnly: promo.beberiaOnly,
    };
  } catch {
    return { valid: false };
  }
}

// ======= Get Additional Services =======
export async function getAdditionalServices() {
  try {
    return await prisma.additionalService.findMany({
      where: { isActive: true },
      orderBy: { type: "asc" },
    });
  } catch {
    return [];
  }
}

// ======= Get All Bookings (Admin) =======
export async function getAllBookings(filters?: {
  status?: BookingStatus;
  hospitalId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    const {
      status,
      hospitalId,
      search,
      page = 1,
      pageSize = 20,
    } = filters || {};

    const where: Record<string, unknown> = {};

    if (status) where.status = status;
    if (hospitalId) where.hospitalId = hospitalId;
    if (search) {
      where.OR = [
        { bookingNumber: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { phone: { contains: search } } },
      ];
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, phone: true, email: true } },
          hospital: { select: { id: true, nameKo: true, nameVi: true, nameEn: true, slug: true } },
          items: { include: { procedure: true } },
          doctor: { select: { id: true, nameKo: true, nameVi: true, nameEn: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.booking.count({ where }),
    ]);

    return { bookings, total, page, pageSize, hasMore: page * pageSize < total };
  } catch {
    return { bookings: [], total: 0, page: 1, pageSize: 20, hasMore: false };
  }
}
