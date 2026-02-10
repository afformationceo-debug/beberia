import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { getUserBookings } from "@/lib/actions/bookings";
import { getLocalizedField, formatPrice } from "@/lib/i18n-helpers";
import { BookingStatusBadge } from "@/components/booking/booking-status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, MapPin, ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export default async function MyBookingsPage() {
  const locale = (await getLocale()) as Locale;

  let bookings: Awaited<ReturnType<typeof getUserBookings>> = [];
  try {
    bookings = await getUserBookings();
  } catch {
    // DB not connected
  }

  return <MyBookingsContent bookings={bookings} locale={locale} />;
}

function MyBookingsContent({
  bookings,
  locale,
}: {
  bookings: Awaited<ReturnType<typeof getUserBookings>>;
  locale: Locale;
}) {
  const t = useTranslations("booking");
  const tm = useTranslations("my");

  return (
    <MobileContainer className="py-4">
      <div className="mb-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/my">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-lg font-bold">{tm("bookings")}</h1>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-3">
          {bookings.map((booking) => {
            const hospitalName = getLocalizedField(booking.hospital, "name", locale);
            const procedureNames = booking.items
              .map((item) => getLocalizedField(item.procedure, "name", locale))
              .join(", ");

            return (
              <Link key={booking.id} href={`/my/bookings/${booking.id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <BookingStatusBadge
                            status={booking.status}
                            label={t(`status.${booking.status}`)}
                          />
                          <span className="text-[11px] text-muted-foreground">
                            {booking.bookingNumber}
                          </span>
                        </div>
                        <h3 className="mt-2 font-semibold">{hospitalName}</h3>
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {procedureNames}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          {booking.preferredDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(booking.preferredDate).toLocaleDateString()}
                              {booking.preferredTime && ` ${booking.preferredTime}`}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold">
                          {formatPrice(booking.totalAmount, locale)}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-3 text-sm text-muted-foreground">
            No bookings yet
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/hospitals">Browse Hospitals</Link>
          </Button>
        </div>
      )}
    </MobileContainer>
  );
}
