import { getLocale, getTranslations } from "next-intl/server";
import { MobileContainer } from "@/components/layout/mobile-container";
import { HospitalCard } from "@/components/hospital/hospital-card";
import { HospitalFilters } from "@/components/hospital/hospital-filters";
import { getHospitals, getHospitalDistricts } from "@/lib/actions/hospitals";
import { Search, ChevronDown, Building2, Stethoscope } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { HospitalCategory } from "@prisma/client";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    district?: string;
    language?: string;
    beberia?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function HospitalsPage({ searchParams }: PageProps) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hospitals");
  const params = await searchParams;

  const [hospitals, districts] = await Promise.all([
    getHospitals({
      category: params.category as HospitalCategory | undefined,
      district: params.district,
      language: params.language,
      beberiaDiscount: params.beberia === "true",
      search: params.search,
      sort: params.sort as "recommended" | "rating" | "reviews" | "price_asc" | "price_desc",
      page: params.page ? parseInt(params.page) : 1,
    }),
    getHospitalDistricts(),
  ]);

  return (
    <MobileContainer noPadding>
      {/* Gradient Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 px-5 pb-6 pt-8">
        {/* Decorative background elements */}
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5" />
        <div className="absolute right-12 bottom-2 h-16 w-16 rounded-full bg-white/10" />

        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-white/70">
              Beberia Medical
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/80">
            <Search className="h-3.5 w-3.5" />
            {t("searchPlaceholder")}
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="px-4">
        <HospitalFilters districts={districts} />
      </div>

      {/* Results Count Badge */}
      {hospitals.total > 0 && (
        <div className="mt-1 flex items-center gap-2 px-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">
              {hospitals.total}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {t("title")}
          </span>
        </div>
      )}

      {/* Hospital List */}
      <div className="mt-4 space-y-3 px-4 pb-6">
        {hospitals.hospitals.length > 0 ? (
          (hospitals.hospitals as any[]).map((hospital: any) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              locale={locale}
            />
          ))
        ) : (
          /* Skeleton placeholder cards with shimmer animation */
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm"
              >
                {/* Image skeleton */}
                <div className="relative h-48 animate-pulse overflow-hidden bg-gradient-to-br from-muted via-muted/80 to-muted-foreground/5">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
                  {/* Overlay icon placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="h-10 w-10 text-muted-foreground/20" />
                  </div>
                  {/* Badge skeleton */}
                  <div className="absolute left-3 top-3 h-5 w-20 animate-pulse rounded-full bg-white/20" />
                  {/* Favorite button skeleton */}
                  <div className="absolute right-3 top-3 h-8 w-8 animate-pulse rounded-full bg-white/20" />
                </div>

                {/* Content skeleton */}
                <div className="p-4 space-y-3">
                  {/* Title */}
                  <div className="space-y-2">
                    <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted" />
                    <div className="h-3.5 w-1/2 animate-pulse rounded-md bg-muted/70" />
                  </div>
                  {/* Rating stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="h-3.5 w-3.5 animate-pulse rounded-sm bg-muted/60"
                      />
                    ))}
                    <div className="ml-1 h-3 w-8 animate-pulse rounded bg-muted/50" />
                  </div>
                  {/* Tags */}
                  <div className="flex gap-1.5">
                    <div className="h-6 w-16 animate-pulse rounded-full bg-muted/60" />
                    <div className="h-6 w-20 animate-pulse rounded-full bg-muted/60" />
                    <div className="h-6 w-14 animate-pulse rounded-full bg-muted/50" />
                  </div>
                  {/* Category text */}
                  <div className="h-3 w-2/3 animate-pulse rounded bg-muted/40" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hospitals.hasMore && (
        <div className="px-4 pb-8 text-center">
          <a
            href={`?${new URLSearchParams({
              ...params,
              page: String((hospitals.page || 1) + 1),
            }).toString()}`}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:brightness-110 active:scale-[0.98]"
          >
            <span>{t("title")}</span>
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      )}
    </MobileContainer>
  );
}
