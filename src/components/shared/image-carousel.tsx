"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  aspectRatio?: "square" | "video" | "wide";
  className?: string;
  showControls?: boolean;
  showDots?: boolean;
}

const ratioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[2/1]",
};

export function ImageCarousel({
  images,
  alt,
  aspectRatio = "video",
  className,
  showControls = true,
  showDots = true,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className={cn(ratioClasses[aspectRatio], "bg-muted", className)} />
    );
  }

  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div className={cn(ratioClasses[aspectRatio], "relative")}>
        <Image
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {showControls && images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            onClick={prev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            onClick={next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === current
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
