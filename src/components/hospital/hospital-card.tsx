import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components/shared/rating-stars";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { getLocalizedField, getCategoryLabel, getHighlightLabel } from "@/lib/i18n-helpers";
import type { Locale } from "@/i18n/routing";
import type { Hospital } from "@prisma/client";

interface HospitalCardProps {
  hospital: Hospital & {
    _count?: { reviews: number };
  };
  locale: Locale;
  isFavorited?: boolean;
  variant?: "default" | "compact" | "horizontal";
}

export function HospitalCard({
  hospital,
  locale,
  isFavorited = false,
  variant = "default",
}: HospitalCardProps) {
  const name = getLocalizedField(hospital, "name", locale);
  const highlights = (hospital.highlights as string[]) || [];

  if (variant === "compact") {
    return (
      <Link href={`/hospitals/${hospital.slug}`}>
        <Card className="min-w-[220px] flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          <div className="relative h-32">
            {hospital.thumbnailUrl ? (
              <Image
                src={hospital.thumbnailUrl}
                alt={name}
                fill
                className="object-cover"
                sizes="220px"
              />
            ) : (
              <div className="h-full bg-gradient-to-br from-muted to-muted-foreground/10" />
            )}
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
            <FavoriteButton
              hospitalId={hospital.id}
              initialFavorited={isFavorited}
              size="sm"
              variant="overlay"
              className="absolute right-2 top-2"
            />
          </div>
          <CardContent className="p-3.5">
            <h4 className="line-clamp-1 text-sm font-bold tracking-tight">{name}</h4>
            <div className="mt-1">
              <RatingStars
                rating={hospital.ratingAvg}
                reviewCount={hospital._count?.reviews ?? hospital.reviewCount}
                size="sm"
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {hospital.beberiaPartner && (
                <Badge className="border-0 bg-gradient-to-r from-amber-500 to-orange-500 text-[10px] font-semibold text-white shadow-sm">
                  Beberia
                </Badge>
              )}
              {hospital.categories.slice(0, 1).map((cat) => (
                <Badge key={cat} variant="outline" className="text-[10px] border-primary/30 text-primary/80">
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
                  {getCategoryLabel(cat, locale)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/hospitals/${hospital.slug}`}>
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-primary before:to-violet-500 before:z-10">
        <div className="relative h-44">
          {hospital.thumbnailUrl ? (
            <Image
              src={hospital.thumbnailUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-muted to-muted-foreground/10" />
          )}
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
          <FavoriteButton
            hospitalId={hospital.id}
            initialFavorited={isFavorited}
            size="sm"
            variant="overlay"
            className="absolute right-2 top-2"
          />
          {hospital.beberiaPartner && (
            <Badge className="absolute left-2 top-2 border-0 bg-gradient-to-r from-amber-500 to-orange-500 text-[10px] font-semibold text-white shadow-md">
              Beberia Partner
            </Badge>
          )}
        </div>
        <CardContent className="p-3.5">
          <h3 className="line-clamp-1 text-base font-bold tracking-tight">{name}</h3>
          <div className="mt-1">
            <RatingStars
              rating={hospital.ratingAvg}
              reviewCount={hospital._count?.reviews ?? hospital.reviewCount}
              size="sm"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {highlights.slice(0, 3).map((h) => (
              <Badge key={h} variant="outline" className="text-[10px] border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300">
                {getHighlightLabel(h, locale)}
              </Badge>
            ))}
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            {hospital.categories.map((c, i) => (
              <span key={c} className="inline-flex items-center gap-1">
                {i > 0 && <span className="text-muted-foreground/40">·</span>}
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/50" />
                {getCategoryLabel(c, locale)}
              </span>
            ))}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
