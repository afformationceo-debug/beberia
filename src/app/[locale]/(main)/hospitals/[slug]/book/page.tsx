import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { MobileContainer } from "@/components/layout/mobile-container";
import { getHospitalBySlug } from "@/lib/actions/hospitals";
import { getAdditionalServices } from "@/lib/actions/bookings";
import type { Locale } from "@/i18n/routing";
import { BookingFlow } from "./booking-flow";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BookingPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;

  const [hospital, additionalServices] = await Promise.all([
    getHospitalBySlug(slug),
    getAdditionalServices(),
  ]);

  if (!hospital) {
    notFound();
  }

  return (
    <MobileContainer className="py-4">
      <BookingFlow
        hospital={hospital}
        additionalServices={additionalServices}
        locale={locale}
      />
    </MobileContainer>
  );
}
