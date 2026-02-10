import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components/shared/rating-stars";
import { getLocalizedField } from "@/lib/i18n-helpers";
import type { Locale } from "@/i18n/routing";
import type { Doctor } from "@prisma/client";

interface DoctorCardProps {
  doctor: Doctor;
  locale: Locale;
}

export function DoctorCard({ doctor, locale }: DoctorCardProps) {
  const name = getLocalizedField(doctor, "name", locale);
  const bio = getLocalizedField(doctor, "bio", locale);

  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
          {name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
          <div className="mt-1">
            <RatingStars
              rating={doctor.ratingAvg}
              reviewCount={doctor.reviewCount}
              size="sm"
            />
          </div>
          {bio && (
            <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
              {bio}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
