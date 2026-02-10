"use client";

import { useTransition } from "react";
import { togglePromotionActive } from "@/lib/actions/admin";
import { Power } from "lucide-react";

export function PromotionActions({
  promotionId,
  isActive,
}: {
  promotionId: string;
  isActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await togglePromotionActive(promotionId);
    });
  }

  return (
    <button
      onClick={handleToggle}
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
  );
}
