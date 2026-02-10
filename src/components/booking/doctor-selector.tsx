"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components/shared/rating-stars";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { Check, User } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Doctor } from "@prisma/client";

interface DoctorSelectorProps {
  doctors: Doctor[];
  selectedId: string | null;
  onSelect: (doctorId: string | null) => void;
  locale: Locale;
}

export function DoctorSelector({
  doctors,
  selectedId,
  onSelect,
  locale,
}: DoctorSelectorProps) {
  return (
    <div className="space-y-2">
      {/* No preference option */}
      <Card
        className={`cursor-pointer transition-colors ${selectedId === null ? "border-primary bg-primary/5" : ""}`}
        onClick={() => onSelect(null)}
      >
        <CardContent className="flex items-center gap-3 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="flex-1 text-sm font-medium">No preference</span>
          {selectedId === null && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </CardContent>
      </Card>

      {doctors.map((doc) => {
        const name = getLocalizedField(doc, "name", locale);
        const isSelected = selectedId === doc.id;

        return (
          <Card
            key={doc.id}
            className={`cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : ""}`}
            onClick={() => onSelect(doc.id)}
          >
            <CardContent className="flex items-center gap-3 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                {doc.ratingAvg > 0 && (
                  <RatingStars rating={doc.ratingAvg} reviewCount={doc.reviewCount} size="sm" />
                )}
              </div>
              {isSelected && (
                <Check className="h-4 w-4 shrink-0 text-primary" />
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
