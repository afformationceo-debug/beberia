import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { getServicePackages } from "@/lib/actions/services";
import { getLocalizedField, formatPrice } from "@/lib/i18n-helpers";
import { RatingStars } from "@/components/shared/rating-stars";
import {
  ArrowLeft,
  Sparkles,
  Check,
  Package,
  Plane,
  Languages,
  Hotel,
  HeartPulse,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { ServiceType } from "@prisma/client";

const serviceTypeIcons: Record<ServiceType, typeof Plane> = {
  AIRPORT_PICKUP: Plane,
  TRANSLATION: Languages,
  ACCOMMODATION: Hotel,
  POST_CARE: HeartPulse,
};

export default async function PackagesPage() {
  const locale = (await getLocale()) as Locale;

  const packages = await getServicePackages();

  return <PackagesContent locale={locale} packages={packages} />;
}

function PackagesContent({
  locale,
  packages,
}: {
  locale: Locale;
  packages: Awaited<ReturnType<typeof getServicePackages>>;
}) {
  const t = useTranslations("services");

  return (
    <MobileContainer className="py-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/services">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-lg font-bold">{t("packages.title")}</h1>
          <p className="text-xs text-muted-foreground">{t("packages.description")}</p>
        </div>
      </div>

      {packages.length > 0 ? (
        <div className="space-y-4">
          {packages.map((pkg) => {
            const pkgName = getLocalizedField(pkg, "name", locale);
            const pkgDesc = getLocalizedField(pkg, "description", locale);
            const hospitalName = pkg.hospital
              ? getLocalizedField(pkg.hospital, "name", locale)
              : null;
            const discount = Math.round(
              ((pkg.originalTotal - pkg.packagePrice) / pkg.originalTotal) * 100
            );
            const savings = pkg.originalTotal - pkg.packagePrice;

            return (
              <Card key={pkg.id} className="overflow-hidden">
                {/* Package Header */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      {pkg.isFeatured && (
                        <Badge className="mb-2 bg-amber-500 text-white text-[10px]">
                          <Sparkles className="mr-1 h-2.5 w-2.5" />
                          Featured
                        </Badge>
                      )}
                      <h3 className="text-base font-bold">{pkgName}</h3>
                      {pkgDesc && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {pkgDesc}
                        </p>
                      )}
                    </div>
                    <Badge variant="destructive" className="shrink-0 text-[11px]">
                      -{discount}%
                    </Badge>
                  </div>

                  {/* Hospital Info */}
                  {pkg.hospital && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/60 p-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {hospitalName?.[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">{hospitalName}</p>
                        {pkg.hospital.ratingAvg > 0 && (
                          <RatingStars rating={pkg.hospital.ratingAvg} size="sm" showValue={false} />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  {/* Included Services */}
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Included services:
                  </p>
                  <div className="space-y-1.5">
                    {pkg.items.map((item) => {
                      const serviceName = getLocalizedField(item.service, "name", locale);
                      const Icon = serviceTypeIcons[item.service.type] || Package;
                      return (
                        <div key={item.id} className="flex items-center gap-2 text-sm">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                          <span>{serviceName}</span>
                          <Check className="ml-auto h-3.5 w-3.5 text-green-500" />
                        </div>
                      );
                    })}
                  </div>

                  <Separator className="my-3" />

                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Individual total</span>
                      <span className="line-through">{formatPrice(pkg.originalTotal, locale)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>You save</span>
                      <span>-{formatPrice(savings, locale)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold">
                      <span>Package price</span>
                      <span className="text-primary">{formatPrice(pkg.packagePrice, locale)}</span>
                    </div>
                    {pkg.beberiaPrice && (
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-600 font-medium">Beberia price</span>
                        <span className="font-bold text-amber-600">
                          {formatPrice(pkg.beberiaPrice, locale)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Button className="mt-4 w-full" asChild>
                    <Link href={pkg.hospital ? `/hospitals/${pkg.hospital.slug}/book` : "/hospitals"}>
                      Book This Package
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Placeholder */
        <div className="space-y-4">
          {[
            {
              name: { vi: "Gói Thẩm mỹ Gangnam", ko: "강남 성형 패키지", en: "Gangnam Beauty Package" },
              desc: { vi: "Phẫu thuật + Đón sân bay + Phiên dịch + Lưu trú + Chăm sóc sau", ko: "수술 + 공항 픽업 + 통역 + 숙소 + 사후관리", en: "Surgery + Airport Pickup + Translation + Stay + Post Care" },
              original: 6530000,
              price: 5200000,
              beberia: 4800000,
              services: ["Airport Pickup", "Translation", "Hotel (7 nights)", "Post Care (7 days)"],
            },
            {
              name: { vi: "Gói Mắt Seoul", ko: "서울 안과 패키지", en: "Seoul Eye Package" },
              desc: { vi: "LASIK + Đón sân bay + Phiên dịch + Lưu trú", ko: "라식 + 공항 픽업 + 통역 + 숙소", en: "LASIK + Airport Pickup + Translation + Stay" },
              original: 2130000,
              price: 1800000,
              beberia: 1600000,
              services: ["Airport Pickup", "Translation", "Hotel (3 nights)"],
            },
            {
              name: { vi: "Gói Nha khoa Premium", ko: "프리미엄 치과 패키지", en: "Premium Dental Package" },
              desc: { vi: "Implant + Đón sân bay + Phiên dịch + Lưu trú + Chăm sóc sau", ko: "임플란트 + 공항 픽업 + 통역 + 숙소 + 사후관리", en: "Implant + Airport Pickup + Translation + Stay + Post Care" },
              original: 2530000,
              price: 2000000,
              beberia: 1800000,
              services: ["Airport Pickup", "Translation", "Hotel (5 nights)", "Post Care (5 days)"],
            },
          ].map((pkg, i) => {
            const discount = Math.round(((pkg.original - pkg.price) / pkg.original) * 100);
            return (
              <Card key={i} className="overflow-hidden">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4">
                  <Badge className="bg-amber-500 text-white text-[10px]">
                    <Sparkles className="mr-1 h-2.5 w-2.5" />
                    -{discount}%
                  </Badge>
                  <h3 className="mt-2 text-base font-bold">{pkg.name[locale]}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{pkg.desc[locale]}</p>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-1.5">
                    {pkg.services.map((svc) => (
                      <div key={svc} className="flex items-center gap-2 text-sm">
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(pkg.original, locale)}
                    </span>
                    <span className="text-base font-bold text-primary">
                      {formatPrice(pkg.price, locale)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-amber-600">
                    Beberia: {formatPrice(pkg.beberia, locale)}
                  </p>
                  <Button className="mt-3 w-full" asChild>
                    <Link href="/hospitals">Book This Package</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="h-4" />
    </MobileContainer>
  );
}
