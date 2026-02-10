"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PriceDisplay } from "@/components/shared/price-display";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { Clock, CalendarDays } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Procedure, ProcedureCategory } from "@prisma/client";

interface ProcedureSelectorProps {
  procedures: (Procedure & { category?: ProcedureCategory | null })[];
  selectedIds: string[];
  onToggle: (procedureId: string) => void;
  locale: Locale;
}

export function ProcedureSelector({
  procedures,
  selectedIds,
  onToggle,
  locale,
}: ProcedureSelectorProps) {
  return (
    <div className="space-y-2.5">
      {procedures.map((proc) => {
        const name = getLocalizedField(proc, "name", locale);
        const description = getLocalizedField(proc, "description", locale);
        const isSelected = selectedIds.includes(proc.id);

        return (
          <Card
            key={proc.id}
            className={`cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : ""}`}
            onClick={() => onToggle(proc.id)}
          >
            <CardContent className="flex items-start gap-3 p-3">
              <Checkbox
                id={`proc-${proc.id}`}
                checked={isSelected}
                onCheckedChange={() => onToggle(proc.id)}
                className="mt-0.5"
              />
              <Label htmlFor={`proc-${proc.id}`} className="min-w-0 flex-1 cursor-pointer">
                <p className="font-medium leading-tight">{name}</p>
                {description && (
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {description}
                  </p>
                )}
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                  {proc.durationMinutes && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {proc.durationMinutes}min
                    </span>
                  )}
                  {proc.recoveryDays !== null && proc.recoveryDays !== undefined && (
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {proc.recoveryDays === 0 ? "No recovery" : `${proc.recoveryDays}d`}
                    </span>
                  )}
                </div>
              </Label>
              <PriceDisplay
                originalPrice={proc.originalPrice}
                discountedPrice={proc.discountedPrice}
                beberiaPrice={proc.beberiaPrice}
                locale={locale}
                size="sm"
                className="shrink-0 items-end text-right"
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
