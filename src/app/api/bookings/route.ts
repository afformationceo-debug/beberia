import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

// Generate booking number: BB-YYYYMMDD-XXXX
function generateBookingNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BB-${dateStr}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      hospitalId,
      doctorId,
      procedures,
      services,
      preferredDate,
      preferredTime,
      passportName,
      phone,
      arrivalDate,
      departureDate,
      flightNumber,
      promotionCode,
      notes,
    } = body;

    // Calculate totals
    const procedureData = await prisma.procedure.findMany({
      where: { id: { in: procedures.map((p: { procedureId: string }) => p.procedureId) } },
    });

    let subtotal = 0;
    const bookingItems = procedures.map((p: { procedureId: string; quantity: number }) => {
      const proc = procedureData.find((pd) => pd.id === p.procedureId);
      const unitPrice = proc?.beberiaPrice || proc?.discountedPrice || proc?.originalPrice || 0;
      const total = unitPrice * (p.quantity || 1);
      subtotal += total;
      return {
        procedureId: p.procedureId,
        quantity: p.quantity || 1,
        unitPrice,
        totalPrice: total,
      };
    });

    // Apply promotion
    let discountAmount = 0;
    let promotionId: string | undefined;
    if (promotionCode) {
      const promo = await prisma.promotion.findUnique({
        where: { code: promotionCode, isActive: true },
      });
      if (promo) {
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

    const totalAmount = subtotal - discountAmount;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        userId: user.id,
        hospitalId,
        doctorId: doctorId || null,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime,
        notes,
        subtotal,
        discountAmount,
        totalAmount,
        arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
        departureDate: departureDate ? new Date(departureDate) : null,
        flightNumber,
        promotionId,
        items: { create: bookingItems },
        statusHistory: {
          create: {
            status: "PENDING",
            changedBy: user.id,
          },
        },
      },
      include: {
        items: { include: { procedure: true } },
        hospital: true,
      },
    });

    // Add services if provided
    if (services?.length) {
      await prisma.bookingService.createMany({
        data: services.map((s: { serviceId: string; details?: Record<string, unknown> }) => ({
          bookingId: booking.id,
          serviceId: s.serviceId,
          price: 0, // Will be calculated based on service
          details: s.details || null,
        })),
      });
    }

    return NextResponse.json({ data: booking }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        hospital: true,
        items: { include: { procedure: true } },
        services: { include: { service: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: bookings });
  } catch (error) {
    console.error("Bookings fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
