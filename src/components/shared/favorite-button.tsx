"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleFavorite } from "@/lib/actions/favorites";

interface FavoriteButtonProps {
  hospitalId: string;
  initialFavorited?: boolean;
  size?: "sm" | "md";
  variant?: "ghost" | "overlay";
  className?: string;
}

export function FavoriteButton({
  hospitalId,
  initialFavorited = false,
  size = "sm",
  variant = "ghost",
  className,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    setIsFavorited(!isFavorited);
    startTransition(async () => {
      const result = await toggleFavorite(hospitalId);
      if ("error" in result) {
        setIsFavorited(isFavorited);
      } else {
        setIsFavorited(result.isFavorited);
      }
    });
  };

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const btnSize = size === "sm" ? "h-8 w-8" : "h-9 w-9";

  return (
    <Button
      variant={variant === "overlay" ? "secondary" : "ghost"}
      size="icon"
      className={cn(
        btnSize,
        variant === "overlay" && "rounded-full",
        className
      )}
      onClick={handleToggle}
      disabled={isPending}
    >
      <Heart
        className={cn(
          iconSize,
          isFavorited && "fill-red-500 text-red-500",
          isPending && "opacity-50"
        )}
      />
    </Button>
  );
}
