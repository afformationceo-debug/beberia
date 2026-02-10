import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { BookingStatusBadge } from "@/components/booking/booking-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { getLocalizedField, formatPrice } from "@/lib/i18n-helpers";
import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { BookingCancelButton } from "./cancel-button";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getBooking(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  return prisma.booking.findFirst({
    where: { id, userId: user.id },
    include: {
      hospital: true,
      doctor: true,
      items: { include: { procedure: true } },
      services: { include: { service: true } },
      statusHistory: { orderBy: { createdAt: "desc" } },
    },
  });
}

export default async function BookingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const locale = (await getLocale()) as Locale;

  let booking: Awaited<ReturnType<typeof getBooking>> = null;
  try {
    booking = await getBooking(id);
  } catch {
    // DB not connected
  }

  if (!booking) {
    notFound();
  }

  return <BookingDetailContent booking={booking} locale={locale} />;
}

function BookingDetailContent({
  booking,
  locale,
}: {
  booking: NonNullable<Awaited<ReturnType<typeof getBooking>>>;
  locale: Locale;
}) {
  const t = useTranslations("booking");
  const hospitalName = getLocalizedField(booking.hospital, "name", locale);
  const canCancel = booking.status === "PENDING" || booking.status === "CONFIRMED";

  return (
    <MobileContainer className="py-4">
      <div className="mb-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/my/bookings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-lg font-bold">{t("title")}</h1>
          <p className="text-xs text-muted-foreground">{booking.bookingNumber}</p>
        </div>
      </div>

      {/* Status */}
      <div className="mb-4 flex items-center justify-between">
        <BookingStatusBadge
          status={booking.status}
          label={t(`status.${booking.status}`)}
        />
        <span className="text-xs text-muted-foreground">
          {new Date(booking.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Hospital */}
      <Card className="mb-3">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">{hospitalName}</p>
              <p className="text-xs text-muted-foreground">
                {booking.hospital.address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date & Doctor */}
      <Card className="mb-3">
        <CardContent className="space-y-2 p-4">
          {booking.preferredDate && (
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span>
                {new Date(booking.preferredDate).toLocaleDateString()}
                {booking.preferredTime && ` ${booking.preferredTime}`}
              </span>
            </div>
          )}
          {booking.doctor && (
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{getLocalizedField(booking.doctor, "name", locale)}</span>
            </div>
          )}
          {booking.flightNumber && (
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span>Flight: {booking.flightNumber}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Procedures */}
      <Card className="mb-3">
        <CardContent className="p-4">
          <h3 className="mb-2 text-sm font-semibold">{t("steps.procedures")}</h3>
          <div className="space-y-2">
            {booking.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="line-clamp-1 mr-2 flex-1">
                  {getLocalizedField(item.procedure, "name", locale)}
                  {item.quantity > 1 && ` x${item.quantity}`}
                </span>
                <span className="shrink-0 font-medium">
                  {formatPrice(item.totalPrice, locale)}
                </span>
              </div>
            ))}
          </div>

          {/* Services */}
          {booking.services.length > 0 && (
            <>
              <Separator className="my-3" />
              <h3 className="mb-2 text-sm font-semibold">{t("additionalServices")}</h3>
              <div className="space-y-2">
                {booking.services.map((svc) => (
                  <div key={svc.id} className="flex justify-between text-sm">
                    <span>{getLocalizedField(svc.service, "name", locale)}</span>
                    <span className="font-medium">
                      {formatPrice(svc.price, locale)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <Separator className="my-3" />

          <div className="flex justify-between text-sm">
            <span>{t("subtotal")}</span>
            <span>{formatPrice(booking.subtotal, locale)}</span>
          </div>
          {booking.discountAmount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>{t("discount")}</span>
              <span>-{formatPrice(booking.discountAmount, locale)}</span>
            </div>
          )}
          <div className="mt-1 flex justify-between font-bold">
            <span>{t("total")}</span>
            <span className="text-primary">
              {formatPrice(booking.totalAmount, locale)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Status History */}
      <Card className="mb-3">
        <CardContent className="p-4">
          <h3 className="mb-3 text-sm font-semibold">Status History</h3>
          <div className="space-y-2">
            {booking.statusHistory.map((history, i) => (
              <div key={history.id} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                    i === 0 ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">
                      {t(`status.${history.status}`)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(history.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {history.note && (
                    <p className="text-[11px] text-muted-foreground">{history.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-4 space-y-2">
        {canCancel && (
          <BookingCancelButton bookingId={booking.id} />
        )}
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/hospitals/${booking.hospital.slug}`}>
            {hospitalName}
          </Link>
        </Button>
      </div>
    </MobileContainer>
  );
}
