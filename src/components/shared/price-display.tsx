import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/i18n-helpers";
import type { Locale } from "@/i18n/routing";

interface PriceDisplayProps {
  originalPrice: number;
  discountedPrice?: number | null;
  beberiaPrice?: number | null;
  locale?: Locale;
  showBeberia?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: { original: "text-xs", price: "text-sm font-semibold", beberia: "text-xs font-bold" },
  md: { original: "text-sm", price: "text-base font-bold", beberia: "text-sm font-bold" },
  lg: { original: "text-base", price: "text-lg font-bold", beberia: "text-base font-bold" },
};

export function PriceDisplay({
  originalPrice,
  discountedPrice,
  beberiaPrice,
  locale = "vi",
  showBeberia = true,
  size = "sm",
  className,
}: PriceDisplayProps) {
  const s = sizeClasses[size];
  const hasDiscount = discountedPrice && discountedPrice < originalPrice;
  const displayPrice = discountedPrice || originalPrice;

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2">
        {hasDiscount && (
          <span className={cn(s.original, "text-muted-foreground line-through")}>
            {formatPrice(originalPrice, locale)}
          </span>
        )}
        <span className={cn(s.price, "text-foreground")}>
          {formatPrice(displayPrice, locale)}
        </span>
      </div>
      {showBeberia && beberiaPrice && beberiaPrice < displayPrice && (
        <span className={cn(s.beberia, "text-amber-600")}>
          Beberia {formatPrice(beberiaPrice, locale)}
        </span>
      )}
    </div>
  );
}
