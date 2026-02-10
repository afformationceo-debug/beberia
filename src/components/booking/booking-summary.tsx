"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getLocalizedField, formatPrice } from "@/lib/i18n-helpers";
import type { Locale } from "@/i18n/routing";
import type { Procedure, AdditionalService } from "@prisma/client";

interface BookingSummaryProps {
  procedures: Procedure[];
  services: AdditionalService[];
  selectedProcedureIds: string[];
  selectedServiceIds: string[];
  discountAmount: number;
  isBeberiaMember: boolean;
  locale: Locale;
  labels: {
    subtotal: string;
    discount: string;
    services: string;
    total: string;
  };
}

export function BookingSummary({
  procedures,
  services,
  selectedProcedureIds,
  selectedServiceIds,
  discountAmount,
  isBeberiaMember,
  locale,
  labels,
}: BookingSummaryProps) {
  const selectedProcedures = procedures.filter((p) =>
    selectedProcedureIds.includes(p.id)
  );
  const selectedServices = services.filter((s) =>
    selectedServiceIds.includes(s.id)
  );

  const procedureTotal = selectedProcedures.reduce((sum, proc) => {
    let price = proc.discountedPrice || proc.originalPrice;
    if (isBeberiaMember && proc.beberiaPrice) {
      price = proc.beberiaPrice;
    }
    return sum + price;
  }, 0);

  const serviceTotal = selectedServices.reduce(
    (sum, svc) => sum + svc.price,
    0
  );

  const subtotal = procedureTotal + serviceTotal;
  const total = Math.max(subtotal - discountAmount, 0);

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        {/* Procedures */}
        {selectedProcedures.map((proc) => {
          let price = proc.discountedPrice || proc.originalPrice;
          if (isBeberiaMember && proc.beberiaPrice) {
            price = proc.beberiaPrice;
          }
          return (
            <div key={proc.id} className="flex justify-between text-sm">
              <span className="line-clamp-1 mr-2 flex-1">
                {getLocalizedField(proc, "name", locale)}
              </span>
              <span className="shrink-0">{formatPrice(price, locale)}</span>
            </div>
          );
        })}

        {/* Services */}
        {selectedServices.length > 0 && (
          <>
            <Separator />
            <p className="text-xs font-medium text-muted-foreground">
              {labels.services}
            </p>
            {selectedServices.map((svc) => (
              <div key={svc.id} className="flex justify-between text-sm">
                <span className="line-clamp-1 mr-2 flex-1">
                  {getLocalizedField(svc, "name", locale)}
                </span>
                <span className="shrink-0">
                  {formatPrice(svc.price, locale)}
                </span>
              </div>
            ))}
          </>
        )}

        <Separator />

        <div className="flex justify-between text-sm">
          <span>{labels.subtotal}</span>
          <span>{formatPrice(subtotal, locale)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>{labels.discount}</span>
            <span>-{formatPrice(discountAmount, locale)}</span>
          </div>
        )}

        <Separator />
        <div className="flex justify-between text-base font-bold">
          <span>{labels.total}</span>
          <span className="text-primary">{formatPrice(total, locale)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
