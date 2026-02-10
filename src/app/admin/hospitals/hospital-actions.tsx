"use client";

import { useTransition } from "react";
import { toggleHospitalActive, toggleHospitalFeatured } from "@/lib/actions/admin";
import { Power, Star } from "lucide-react";

export function HospitalActions({
  hospitalId,
  isActive,
  isFeatured,
}: {
  hospitalId: string;
  isActive: boolean;
  isFeatured: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleToggleActive() {
    startTransition(async () => {
      await toggleHospitalActive(hospitalId);
    });
  }

  function handleToggleFeatured() {
    startTransition(async () => {
      await toggleHospitalFeatured(hospitalId);
    });
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={handleToggleActive}
        disabled={isPending}
        className={`rounded p-1.5 text-xs transition-colors ${
          isActive
            ? "text-green-600 hover:bg-green-50"
            : "text-red-600 hover:bg-red-50"
        }`}
        title={isActive ? "비활성화" : "활성화"}
      >
        <Power className="h-4 w-4" />
      </button>
      <button
        onClick={handleToggleFeatured}
        disabled={isPending}
        className={`rounded p-1.5 text-xs transition-colors ${
          isFeatured
            ? "text-yellow-600 hover:bg-yellow-50"
            : "text-gray-400 hover:bg-gray-50"
        }`}
        title={isFeatured ? "추천 해제" : "추천 설정"}
      >
        <Star className={`h-4 w-4 ${isFeatured ? "fill-yellow-400" : ""}`} />
      </button>
    </div>
  );
}
