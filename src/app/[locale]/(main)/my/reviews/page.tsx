import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/community/review-card";
import { Link } from "@/i18n/navigation";
import { getUserReviews } from "@/lib/actions/reviews";
import { ArrowLeft, Star } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export default async function MyReviewsPage() {
  const locale = (await getLocale()) as Locale;

  const reviews = await getUserReviews();

  return <MyReviewsContent locale={locale} reviews={reviews} />;
}

function MyReviewsContent({
  locale,
  reviews,
}: {
  locale: Locale;
  reviews: Awaited<ReturnType<typeof getUserReviews>>;
}) {
  const t = useTranslations("my");
  const tc = useTranslations("common");

  return (
    <MobileContainer className="py-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/my">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-lg font-bold">{t("reviews")}</h1>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map((review) => (
            <Link key={review.id} href={`/hospitals/${review.hospital.slug}`}>
              <ReviewCard
                review={review}
                locale={locale}
                showHospital={review.hospital}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Star className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-2 text-sm text-muted-foreground">
            {t("noReviews")}
          </p>
          <Button size="sm" className="mt-3" asChild>
            <Link href="/hospitals">{t("browseHospitals")}</Link>
          </Button>
        </div>
      )}

      <div className="h-4" />
    </MobileContainer>
  );
}
