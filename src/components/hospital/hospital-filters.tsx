"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { HospitalCategory } from "@prisma/client";

const categories: { value: HospitalCategory; labelKey: string }[] = [
  { value: "PLASTIC_SURGERY", labelKey: "plasticSurgery" },
  { value: "OPHTHALMOLOGY", labelKey: "ophthalmology" },
  { value: "DENTISTRY", labelKey: "dentistry" },
  { value: "DERMATOLOGY", labelKey: "dermatology" },
  { value: "ORIENTAL_MEDICINE", labelKey: "orientalMedicine" },
];

const sortOptions = [
  { value: "recommended", labelKey: "recommended" },
  { value: "rating", labelKey: "highestRated" },
  { value: "reviews", labelKey: "mostReviewed" },
  { value: "price_asc", labelKey: "lowestPrice" },
] as const;

interface HospitalFiltersProps {
  districts: string[];
}

export function HospitalFilters({ districts }: HospitalFiltersProps) {
  const t = useTranslations("hospitals");
  const tc = useTranslations("home.categories");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const activeCategory = searchParams.get("category") as HospitalCategory | null;
  const activeSort = searchParams.get("sort") || "recommended";
  const activeDistrict = searchParams.get("district");
  const beberiaOnly = searchParams.get("beberia") === "true";

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParam("search", search || null);
  }

  function clearAllFilters() {
    router.push(pathname);
    setSearch("");
  }

  const hasActiveFilters = activeCategory || activeDistrict || beberiaOnly || searchParams.get("search");

  return (
    <div className="sticky top-14 z-30 -mx-4 bg-background px-4 pb-3 pt-3">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="pl-10 pr-10"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              type="button"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[80vh]">
            <SheetHeader>
              <SheetTitle>{t("filters.category")}</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-6">
              {/* Category */}
              <div>
                <h4 className="mb-2 text-sm font-medium">{t("filters.category")}</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge
                      key={cat.value}
                      variant={activeCategory === cat.value ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        updateParam(
                          "category",
                          activeCategory === cat.value ? null : cat.value
                        )
                      }
                    >
                      {tc(cat.labelKey)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* District */}
              <div>
                <h4 className="mb-2 text-sm font-medium">{t("filters.district")}</h4>
                <div className="flex flex-wrap gap-2">
                  {districts.map((d) => (
                    <Badge
                      key={d}
                      variant={activeDistrict === d ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        updateParam("district", activeDistrict === d ? null : d)
                      }
                    >
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="mb-2 text-sm font-medium">{t("sort.recommended")}</h4>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((opt) => (
                    <Badge
                      key={opt.value}
                      variant={activeSort === opt.value ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => updateParam("sort", opt.value)}
                    >
                      {t(`sort.${opt.labelKey}`)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Beberia Only */}
              <Badge
                variant={beberiaOnly ? "default" : "outline"}
                className="cursor-pointer bg-amber-50 text-amber-700 border-amber-200"
                onClick={() =>
                  updateParam("beberia", beberiaOnly ? null : "true")
                }
              >
                {t("filters.beberiaDiscount")}
              </Badge>
            </div>
          </SheetContent>
        </Sheet>
      </form>

      {/* Active Filter Chips */}
      <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <Badge
            key={cat.value}
            variant={activeCategory === cat.value ? "default" : "outline"}
            className="shrink-0 cursor-pointer whitespace-nowrap"
            onClick={() =>
              updateParam(
                "category",
                activeCategory === cat.value ? null : cat.value
              )
            }
          >
            {tc(cat.labelKey)}
          </Badge>
        ))}
        <Badge
          variant={beberiaOnly ? "default" : "outline"}
          className="shrink-0 cursor-pointer whitespace-nowrap"
          onClick={() => updateParam("beberia", beberiaOnly ? null : "true")}
        >
          Beberia
        </Badge>
        {hasActiveFilters && (
          <Badge
            variant="destructive"
            className="shrink-0 cursor-pointer whitespace-nowrap"
            onClick={clearAllFilters}
          >
            <X className="mr-1 h-3 w-3" /> Clear
          </Badge>
        )}
      </div>
    </div>
  );
}
