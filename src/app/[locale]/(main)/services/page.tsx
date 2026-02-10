import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getAllServices } from "@/lib/actions/services";
import { getFeaturedPackages } from "@/lib/actions/services";
import { getLocalizedField, formatPrice } from "@/lib/i18n-helpers";
import {
  Plane,
  Languages,
  Hotel,
  HeartPulse,
  Package,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Star,
  Crown,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { ServiceType } from "@prisma/client";

const serviceConfig: {
  type: ServiceType;
  key: string;
  icon: typeof Plane;
  href: string;
  color: string;
}[] = [
  { type: "AIRPORT_PICKUP", key: "pickup", icon: Plane, href: "/services/pickup", color: "bg-blue-100 text-blue-600" },
  { type: "TRANSLATION", key: "translation", icon: Languages, href: "/services/translation", color: "bg-green-100 text-green-600" },
  { type: "ACCOMMODATION", key: "accommodation", icon: Hotel, href: "/services/accommodation", color: "bg-purple-100 text-purple-600" },
  { type: "POST_CARE", key: "postCare", icon: HeartPulse, href: "/services/post-care", color: "bg-red-100 text-red-600" },
];

export default async function ServicesPage() {
  const locale = (await getLocale()) as Locale;

  const [services, packages] = await Promise.all([
    getAllServices(),
    getFeaturedPackages(),
  ]);

  return <ServicesContent locale={locale} services={services} packages={packages} />;
}

function ServicesContent({
  locale,
  services,
  packages,
}: {
  locale: Locale;
  services: Awaited<ReturnType<typeof getAllServices>>;
  packages: Awaited<ReturnType<typeof getFeaturedPackages>>;
}) {
  const t = useTranslations("services");
  const tc = useTranslations("common");

  return (
    <MobileContainer className="pb-4">
      {/* Gradient Hero Section */}
      <div className="relative -mx-4 overflow-hidden bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700 px-4 pb-8 pt-6 text-white">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-white/5 blur-xl" />
        <div className="relative z-10">
          <div className="mb-1 flex items-center gap-2">
            <Star className="h-4 w-4 text-emerald-200" />
            <span className="text-xs font-medium tracking-wide text-emerald-100 uppercase">Premium Services</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100/90">
            Complete medical tourism support from arrival to recovery
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="mt-6 space-y-3">
        {serviceConfig.map((item, index) => {
          const Icon = item.icon;
          const dbService = services.find((s) => s.type === item.type);
          const stepNum = String(index + 1).padStart(2, "0");
          return (
            <div key={item.key} className="relative">
              <Link href={item.href}>
                <Card className="overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative">
                      <span className="absolute -left-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white shadow-sm">
                        {stepNum}
                      </span>
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${
                          index === 0
                            ? "from-blue-100 to-blue-200 text-blue-600"
                            : index === 1
                            ? "from-green-100 to-green-200 text-green-600"
                            : index === 2
                            ? "from-purple-100 to-purple-200 text-purple-600"
                            : "from-red-100 to-red-200 text-red-600"
                        }`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold leading-tight">{t(`${item.key}.title`)}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                        {t(`${item.key}.description`)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {dbService && (
                        <span className="text-sm font-bold text-teal-600">
                          {formatPrice(dbService.price, locale)}
                        </span>
                      )}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50">
                        <ChevronRight className="h-4 w-4 text-teal-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              {index < serviceConfig.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowRight className="h-4 w-4 rotate-90 text-muted-foreground/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Total Packages Section */}
      <div className="mt-10">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20">
                <Sparkles className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{t("packages.title")}</h2>
                <p className="text-xs text-slate-400">Save more with bundles</p>
              </div>
            </div>
            <Link
              href="/services/packages"
              className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
            >
              {tc("viewAll")}
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {packages.length > 0 ? (
          <div className="-mt-1 flex gap-3 overflow-x-auto px-1 pb-2 pt-4 scrollbar-hide">
            {packages.map((pkg) => {
              const pkgName = getLocalizedField(pkg, "name", locale);
              const hospitalName = pkg.hospital
                ? getLocalizedField(pkg.hospital, "name", locale)
                : "";
              const discount = Math.round(
                ((pkg.originalTotal - pkg.packagePrice) / pkg.originalTotal) * 100
              );
              return (
                <Link
                  key={pkg.id}
                  href="/services/packages"
                  className="min-w-[250px] flex-shrink-0"
                >
                  <Card className="group relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-500 text-white text-[10px] shadow-sm">
                          <Sparkles className="mr-1 h-2.5 w-2.5" />
                          -{discount}%
                        </Badge>
                      </div>
                      <h4 className="mt-2.5 font-bold leading-tight">{pkgName}</h4>
                      {hospitalName && (
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {hospitalName}
                        </p>
                      )}
                    </div>
                    <CardContent className="relative p-3.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(pkg.originalTotal, locale)}
                        </span>
                        <span className="text-lg font-bold text-teal-600">
                          {formatPrice(pkg.packagePrice, locale)}
                        </span>
                      </div>
                      {pkg.beberiaPrice && (
                        <div className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-amber-50 px-2 py-1">
                          <Crown className="h-3 w-3 text-amber-600" />
                          <span className="text-[11px] font-medium text-amber-700">
                            Beberia: {formatPrice(pkg.beberiaPrice, locale)}
                          </span>
                        </div>
                      )}
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        {pkg.items.length} services included
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
              <Package className="h-7 w-7 text-amber-600" />
            </div>
            <p className="mt-3 text-sm font-medium text-amber-900">{t("packages.description")}</p>
            <Button className="mt-4 bg-amber-600 hover:bg-amber-700 shadow-sm" size="sm" asChild>
              <Link href="/services/packages">{tc("viewAll")}</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="h-4" />
    </MobileContainer>
  );
}
