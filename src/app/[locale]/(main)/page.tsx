import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { HospitalCard } from "@/components/hospital/hospital-card";
import { PriceDisplay } from "@/components/shared/price-display";
import { getFeaturedHospitals } from "@/lib/actions/hospitals";
import { getPopularProcedures, getProcedureCategories } from "@/lib/actions/procedures";
import { getLocalizedField, getCategoryLabel } from "@/lib/i18n-helpers";
import type { Locale } from "@/i18n/routing";
import {
  Scissors,
  Eye,
  SmilePlus,
  Sparkles,
  Leaf,
  Plane,
  Languages,
  Hotel,
  HeartPulse,
  ChevronRight,
  Clock,
  Crown,
  Star,
  ArrowRight,
  Package,
} from "lucide-react";

const categoryIcons = [
  { key: "PLASTIC_SURGERY", icon: Scissors, color: "bg-pink-50 text-pink-600 border-pink-200", accent: "from-pink-500 to-rose-500" },
  { key: "OPHTHALMOLOGY", icon: Eye, color: "bg-blue-50 text-blue-600 border-blue-200", accent: "from-blue-500 to-indigo-500" },
  { key: "DENTISTRY", icon: SmilePlus, color: "bg-cyan-50 text-cyan-600 border-cyan-200", accent: "from-cyan-500 to-teal-500" },
  { key: "DERMATOLOGY", icon: Sparkles, color: "bg-purple-50 text-purple-600 border-purple-200", accent: "from-purple-500 to-violet-500" },
  { key: "ORIENTAL_MEDICINE", icon: Leaf, color: "bg-emerald-50 text-emerald-600 border-emerald-200", accent: "from-emerald-500 to-green-500" },
] as const;

const serviceIcons = [
  { key: "pickup", icon: Plane, color: "bg-sky-50 text-sky-600" },
  { key: "translation", icon: Languages, color: "bg-violet-50 text-violet-600" },
  { key: "accommodation", icon: Hotel, color: "bg-amber-50 text-amber-600" },
  { key: "postCare", icon: HeartPulse, color: "bg-rose-50 text-rose-600" },
] as const;

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;

  const [featuredHospitals, popularProcedures, categories] = await Promise.all([
    getFeaturedHospitals(),
    getPopularProcedures(),
    getProcedureCategories(),
  ]);

  return <HomeContent
    locale={locale}
    featuredHospitals={featuredHospitals}
    popularProcedures={popularProcedures}
    categories={categories}
  />;
}

function HomeContent({
  locale,
  featuredHospitals,
  popularProcedures,
}: {
  locale: Locale;
  featuredHospitals: any;
  popularProcedures: any;
  categories: any;
}) {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <MobileContainer noPadding>
      {/* Hero Banner with Video Background */}
      <section className="relative overflow-hidden h-[420px] text-white">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster=""
        >
          <source src="/asset_ok3hra47b_1770713912114.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        {/* Additional bottom gradient for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        {/* Content */}
        <div className="relative flex h-full flex-col justify-end px-6 pb-10">
          <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>Trusted by 10,000+ Vietnamese</span>
          </div>
          <h2 className="text-[28px] font-extrabold leading-[1.15] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {t("hero.title")}
          </h2>
          <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            {t("hero.subtitle")}
          </p>
          <Button className="mt-5 w-fit gap-2 rounded-full bg-white px-6 font-bold text-black shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-200 hover:bg-white/90 hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)] hover:scale-[1.02]" asChild>
            <Link href="/hospitals">
              {tc("search")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-6">
        <h3 className="mb-4 text-lg font-bold">{t("categories.title")}</h3>
        <div className="grid grid-cols-5 gap-2">
          {categoryIcons.map((cat) => {
            const Icon = cat.icon;
            const labelKey = cat.key === "PLASTIC_SURGERY" ? "plasticSurgery"
              : cat.key === "OPHTHALMOLOGY" ? "ophthalmology"
              : cat.key === "DENTISTRY" ? "dentistry"
              : cat.key === "DERMATOLOGY" ? "dermatology"
              : "orientalMedicine";
            return (
              <Link
                key={cat.key}
                href={`/hospitals?category=${cat.key}`}
                className="group flex flex-col items-center gap-1.5"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${cat.color} transition-all duration-200 group-hover:scale-105 group-hover:shadow-md`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-center text-[11px] font-medium leading-tight text-foreground/80">
                  {t(`categories.${labelKey}`)}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Hospitals */}
      <section className="py-4">
        <div className="flex items-center justify-between px-4">
          <div>
            <h3 className="text-lg font-bold">{t("featured.title")}</h3>
            <p className="text-xs text-muted-foreground">{t("featured.subtitle")}</p>
          </div>
          <Link
            href="/hospitals"
            className="flex items-center gap-0.5 text-xs font-medium text-primary"
          >
            {tc("viewAll")}
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {(featuredHospitals as any[]).length > 0 ? (
            (featuredHospitals as any[]).map((hospital) => (
              <div key={hospital.id} className="min-w-[240px]">
                <HospitalCard hospital={hospital} locale={locale} variant="compact" />
              </div>
            ))
          ) : (
            [1, 2, 3, 4].map((i) => (
              <Card key={i} className="min-w-[240px] flex-shrink-0 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-muted to-muted-foreground/10" />
                <CardContent className="p-3">
                  <div className="h-4 w-24 rounded bg-muted" />
                  <div className="mt-2 h-3 w-16 rounded bg-muted" />
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Beberia Member CTA */}
      <section className="mx-4 my-4 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-5 shadow-sm ring-1 ring-amber-200/50">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-amber-900">{t("memberCta.title")}</h3>
            <p className="mt-1 text-sm leading-relaxed text-amber-700/80">{t("memberCta.subtitle")}</p>
          </div>
        </div>
        <Button className="mt-4 w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-md" size="sm" asChild>
          <Link href="/register">{t("memberCta.button")}</Link>
        </Button>
      </section>

      {/* Trending Procedures */}
      {(popularProcedures as any[]).length > 0 && (
        <section className="py-4">
          <h3 className="mb-3 px-4 text-lg font-bold">{t("trending.title")}</h3>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {(popularProcedures as any[]).map((proc) => (
              <Link
                key={proc.id}
                href={`/hospitals/${proc.hospital.slug}`}
                className="min-w-[200px] flex-shrink-0"
              >
                <Card className="overflow-hidden border-0 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <div className="relative h-28 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-3">
                    <Badge variant="secondary" className="text-[10px] font-medium">
                      {proc.category
                        ? getLocalizedField(proc.category, "name", locale)
                        : getCategoryLabel("PLASTIC_SURGERY", locale)}
                    </Badge>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="line-clamp-1 text-sm font-semibold">
                      {getLocalizedField(proc, "name", locale)}
                    </h4>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {getLocalizedField(proc.hospital, "name", locale)}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                      {proc.durationMinutes && (
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-2.5 w-2.5" />
                          {proc.durationMinutes}min
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <PriceDisplay
                        originalPrice={proc.originalPrice}
                        discountedPrice={proc.discountedPrice}
                        beberiaPrice={proc.beberiaPrice}
                        locale={locale}
                        size="sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      <section className="px-4 py-4">
        <h3 className="mb-3 text-lg font-bold">{t("services.title")}</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {serviceIcons.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link
                key={svc.key}
                href="/services"
                className="group flex flex-col items-center gap-2 rounded-2xl border bg-card p-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${svc.color} transition-transform group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-center text-[11px] font-medium leading-tight">
                  {t(`services.${svc.key}`)}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Total Packages */}
      <section className="mx-4 my-4 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold">{t("packages.title")}</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/70">{t("packages.subtitle")}</p>
          </div>
        </div>
        <Button variant="secondary" className="mt-4 w-full gap-1.5 font-semibold" size="sm" asChild>
          <Link href="/services/packages">
            {tc("viewAll")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </section>

      <div className="h-4" />
    </MobileContainer>
  );
}
