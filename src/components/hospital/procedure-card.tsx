import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "@/components/shared/price-display";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { Clock, CalendarDays } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Procedure, ProcedureCategory } from "@prisma/client";

interface ProcedureCardProps {
  procedure: Procedure & { category?: ProcedureCategory | null };
  locale: Locale;
  showHospital?: boolean;
}

export function ProcedureCard({
  procedure,
  locale,
  showHospital = false,
}: ProcedureCardProps) {
  const name = getLocalizedField(procedure, "name", locale);
  const description = getLocalizedField(procedure, "description", locale);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{name}</h4>
              {procedure.isPopular && (
                <Badge variant="secondary" className="text-[10px]">
                  Popular
                </Badge>
              )}
            </div>
            {description && (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {description}
              </p>
            )}
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              {procedure.durationMinutes && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {procedure.durationMinutes}min
                </span>
              )}
              {procedure.recoveryDays !== null && procedure.recoveryDays !== undefined && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {procedure.recoveryDays === 0
                    ? "No recovery"
                    : `${procedure.recoveryDays}d recovery`}
                </span>
              )}
            </div>
          </div>
          <PriceDisplay
            originalPrice={procedure.originalPrice}
            discountedPrice={procedure.discountedPrice}
            beberiaPrice={procedure.beberiaPrice}
            locale={locale}
            size="sm"
            className="items-end text-right"
          />
        </div>
      </CardContent>
    </Card>
  );
}
