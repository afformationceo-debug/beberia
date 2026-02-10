"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getLocalizedField, formatPrice } from "@/lib/i18n-helpers";
import { Plane, Languages, Hotel, HeartPulse } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { AdditionalService, ServiceType } from "@prisma/client";

const serviceIcons: Record<ServiceType, typeof Plane> = {
  AIRPORT_PICKUP: Plane,
  TRANSLATION: Languages,
  ACCOMMODATION: Hotel,
  POST_CARE: HeartPulse,
};

interface ServiceSelectorProps {
  services: AdditionalService[];
  selectedIds: string[];
  onToggle: (serviceId: string) => void;
  locale: Locale;
}

export function ServiceSelector({
  services,
  selectedIds,
  onToggle,
  locale,
}: ServiceSelectorProps) {
  return (
    <div className="space-y-2.5">
      {services.map((svc) => {
        const name = getLocalizedField(svc, "name", locale);
        const description = getLocalizedField(svc, "description", locale);
        const isSelected = selectedIds.includes(svc.id);
        const Icon = serviceIcons[svc.type] || Plane;

        return (
          <Card
            key={svc.id}
            className={`cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : ""}`}
            onClick={() => onToggle(svc.id)}
          >
            <CardContent className="flex items-center gap-3 p-3">
              <Checkbox
                id={`svc-${svc.id}`}
                checked={isSelected}
                onCheckedChange={() => onToggle(svc.id)}
              />
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <Label htmlFor={`svc-${svc.id}`} className="min-w-0 flex-1 cursor-pointer">
                <p className="text-sm font-medium">{name}</p>
                {description && (
                  <p className="line-clamp-1 text-[11px] text-muted-foreground">
                    {description}
                  </p>
                )}
              </Label>
              <span className="shrink-0 text-sm font-semibold">
                {formatPrice(svc.price, locale)}
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
