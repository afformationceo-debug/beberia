import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { RatingStars } from "@/components/shared/rating-stars";
import { DoctorCard } from "@/components/hospital/doctor-card";
import { ProcedureCard } from "@/components/hospital/procedure-card";
import { ImageCarousel } from "@/components/shared/image-carousel";
import { getHospitalBySlug } from "@/lib/actions/hospitals";
import { isFavorited } from "@/lib/actions/favorites";
import {
  getLocalizedField,
  getCategoryLabel,
  getHighlightLabel,
} from "@/lib/i18n-helpers";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ReviewCard } from "@/components/community/review-card";
import { ReviewForm } from "@/components/community/review-form";
import {
  ChevronLeft,
  Share2,
  MapPin,
  Clock,
  Phone,
  Globe,
  Star,
  PenLine,
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const hospital = await getHospitalBySlug(slug);
    if (!hospital) return { title: "Hospital Not Found" };
    const name = getLocalizedField(hospital, "name", locale as Locale);
    const description = getLocalizedField(hospital, "description", locale as Locale);
    return {
      title: name,
      description: description || `${name} - Korean Medical Tourism`,
      openGraph: {
        title: name,
        description: description || `${name} - Korean Medical Tourism`,
        images: hospital.thumbnailUrl ? [hospital.thumbnailUrl] : [],
      },
    };
  } catch {
    return { title: "Hospital" };
  }
}

export default async function HospitalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;

  const hospital = await getHospitalBySlug(slug);
  let favorited = false;
  if (hospital) {
    try {
      favorited = await isFavorited(hospital.id);
    } catch {}
  }

  if (!hospital) {
    notFound();
  }

  const name = getLocalizedField(hospital, "name", locale);
  const description = getLocalizedField(hospital, "description", locale);
  const highlights = (hospital.highlights as string[]) || [];
  const hours = hospital.operatingHours as Record<string, string> | null;

  return <HospitalDetailContent
    hospital={hospital}
    locale={locale}
    name={name}
    description={description}
    highlights={highlights}
    hours={hours}
    favorited={favorited}
  />;
}

function HospitalDetailContent({
  hospital,
  locale,
  name,
  description,
  highlights,
  hours,
  favorited,
}: {
  hospital: any;
  locale: Locale;
  name: string;
  description: string;
  highlights: string[];
  hours: Record<string, string> | null;
  favorited: boolean;
}) {
  const t = useTranslations("hospitals.detail");

  return (
    <MobileContainer noPadding>
      {/* Gallery with gradient overlay */}
      <div className="relative">
        {hospital.galleryUrls.length > 0 ? (
          <ImageCarousel
            images={hospital.galleryUrls}
            alt={name}
            aspectRatio="video"
          />
        ) : (
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5" />
        )}
        {/* Subtle gradient overlay for better contrast on nav buttons */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
        <div className="absolute left-4 top-4 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-0 hover:bg-white"
            asChild
          >
            <Link href="/hospitals">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-0 hover:bg-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <FavoriteButton
            hospitalId={hospital.id}
            initialFavorited={favorited}
            size="md"
            variant="overlay"
          />
        </div>
      </div>

      {/* Info Card - overlaps gallery */}
      <div className="relative -mt-6 rounded-t-3xl bg-background pt-6 px-4 pb-2">
        {/* Highlight Badges */}
        <div className="flex flex-wrap gap-1.5">
          {hospital.beberiaPartner && (
            <Badge className="bg-gradient-to-r from-amber-500 to-amber-400 text-white text-[10px] border-0 shadow-sm">
              {getHighlightLabel("beberia_partner", locale)}
            </Badge>
          )}
          {highlights.map((h) => (
            <Badge key={h} variant="secondary" className="text-[10px] bg-primary/5 text-primary border-primary/10">
              {getHighlightLabel(h, locale)}
            </Badge>
          ))}
        </div>

        <h1 className="mt-3 text-xl font-bold tracking-tight">{name}</h1>

        <div className="mt-1.5">
          <RatingStars
            rating={hospital.ratingAvg}
            reviewCount={hospital._count.reviews}
            size="md"
          />
        </div>

        {/* Colored Category Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(hospital.categories as string[]).map((c: string, i: number) => {
            const colorSets = [
              "bg-pink-50 text-pink-700 border-pink-200",
              "bg-blue-50 text-blue-700 border-blue-200",
              "bg-emerald-50 text-emerald-700 border-emerald-200",
              "bg-violet-50 text-violet-700 border-violet-200",
              "bg-orange-50 text-orange-700 border-orange-200",
            ];
            return (
              <span
                key={c}
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${colorSets[i % colorSets.length]}`}
              >
                {getCategoryLabel(c, locale)}
              </span>
            );
          })}
        </div>

        {/* Visual separator */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Contact Info Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Address - spans full width */}
          <div className="col-span-2 flex items-start gap-3 rounded-xl bg-muted/50 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm text-muted-foreground leading-snug pt-1">
              {(hospital as any).addressVi || hospital.address}
            </span>
          </div>

          {hours && (
            <div className="col-span-2 flex items-start gap-3 rounded-xl bg-muted/50 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                {Object.entries(hours).map(([day, time]) => (
                  <div key={day} className="flex gap-2">
                    <span className="w-8 font-medium capitalize">{day}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hospital.phone && (
            <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
                <Phone className="h-4 w-4 text-green-600" />
              </div>
              <a href={`tel:${hospital.phone}`} className="text-sm font-medium text-foreground underline decoration-primary/30 underline-offset-2">
                {hospital.phone}
              </a>
            </div>
          )}

          {hospital.languagesSupported.length > 0 && (
            <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100">
                <Globe className="h-4 w-4 text-violet-600" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {hospital.languagesSupported.join(", ").toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Visual separator */}
      <div className="h-2 bg-muted/40" />

      {/* Tabs with improved styling */}
      <Tabs defaultValue="procedures" className="px-4 pt-4">
        <TabsList className="w-full h-11 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger
            value="procedures"
            className="flex-1 rounded-lg text-xs font-semibold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            {t("procedures")}
          </TabsTrigger>
          <TabsTrigger
            value="doctors"
            className="flex-1 rounded-lg text-xs font-semibold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            {t("doctors")}
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="flex-1 rounded-lg text-xs font-semibold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            {t("reviews")}
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="flex-1 rounded-lg text-xs font-semibold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            {t("info")}
          </TabsTrigger>
        </TabsList>

        {/* Procedures Tab */}
        <TabsContent value="procedures" className="mt-4 space-y-3">
          {(hospital.procedures as any[]).map((proc: any) => (
            <ProcedureCard key={proc.id} procedure={proc} locale={locale} />
          ))}
          {hospital.procedures.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No procedures available</p>
            </div>
          )}
        </TabsContent>

        {/* Doctors Tab */}
        <TabsContent value="doctors" className="mt-4 space-y-3">
          {(hospital.doctors as any[]).map((doc: any) => (
            <DoctorCard key={doc.id} doctor={doc} locale={locale} />
          ))}
          {hospital.doctors.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Globe className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No doctors listed</p>
            </div>
          )}
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-4 space-y-4">
          {/* Average Rating Display Card */}
          {hospital._count.reviews > 0 && (
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-5">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">
                    {hospital.ratingAvg.toFixed(1)}
                  </span>
                  <div className="mt-1">
                    <RatingStars rating={hospital.ratingAvg} size="sm" />
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {hospital._count.reviews} {hospital._count.reviews === 1 ? "review" : "reviews"}
                  </span>
                </div>
                <div className="h-14 w-px bg-border/60" />
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = (hospital.reviews as any[]).filter(
                      (r: any) => Math.round(r.ratingOverall) === star
                    ).length;
                    const pct = hospital._count.reviews > 0 ? (count / hospital._count.reviews) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-1.5">
                        <span className="w-3 text-[10px] font-medium text-muted-foreground">{star}</span>
                        <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/40">
                          <div
                            className="h-full rounded-full bg-amber-400 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Write Review Form */}
          <div className="rounded-2xl border border-primary/10 bg-primary/[0.02] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <PenLine className="h-3.5 w-3.5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold">{t("writeReview")}</h3>
            </div>
            <ReviewForm
              hospitalId={hospital.id}
              labels={{
                title: t("reviewForm.title"),
                titlePlaceholder: t("reviewForm.titlePlaceholder"),
                content: t("reviewForm.content"),
                contentPlaceholder: t("reviewForm.contentPlaceholder"),
                overall: t("reviewForm.overall"),
                service: t("reviewForm.service"),
                result: t("reviewForm.result"),
                communication: t("reviewForm.communication"),
                facilities: t("reviewForm.facilities"),
                submit: t("reviewForm.submit"),
                success: t("reviewForm.success"),
                loginRequired: t("reviewForm.loginRequired"),
              }}
            />
          </div>

          {/* Review List */}
          {(hospital.reviews as any[]).map((review: any) => (
            <ReviewCard
              key={review.id}
              review={review}
              locale={locale}
            />
          ))}
          {hospital.reviews.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Star className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{t("noReviewsYet")}</p>
            </div>
          )}
        </TabsContent>

        {/* Info Tab */}
        <TabsContent value="info" className="mt-4">
          <div className="space-y-4 text-sm">
            {description && (
              <div className="rounded-2xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground">About</h4>
                <p className="mt-2 text-muted-foreground leading-relaxed">{description}</p>
              </div>
            )}
            {(hospital as any).website && (
              <div className="rounded-2xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground">Website</h4>
                <a
                  href={(hospital as any).website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex text-primary underline decoration-primary/30 underline-offset-2"
                >
                  {(hospital as any).website}
                </a>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Spacer to ensure content not hidden behind sticky CTA */}
      <div className="h-24" />

      {/* Sticky CTA with gradient and shadow */}
      <div className="sticky bottom-16 border-t border-border/50 bg-background/95 backdrop-blur-md p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <Button
          className="w-full bg-gradient-to-r from-primary to-primary/80 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-200 text-base font-semibold"
          size="lg"
          asChild
        >
          <Link href={`/hospitals/${hospital.slug}/book`}>
            {t("bookConsultation")}
          </Link>
        </Button>
      </div>
    </MobileContainer>
  );
}
