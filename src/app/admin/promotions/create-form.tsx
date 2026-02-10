"use client";

import { useState, useTransition } from "react";
import { createPromotion } from "@/lib/actions/admin";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";

export function CreatePromotionForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const result = await createPromotion({
        code: data.get("code") as string,
        nameKo: data.get("nameKo") as string,
        nameVi: data.get("nameVi") as string,
        nameEn: data.get("nameEn") as string,
        discountType: data.get("discountType") as "PERCENTAGE" | "FIXED_AMOUNT",
        discountValue: Number(data.get("discountValue")),
        maxDiscount: data.get("maxDiscount") ? Number(data.get("maxDiscount")) : undefined,
        minOrderAmount: data.get("minOrderAmount") ? Number(data.get("minOrderAmount")) : undefined,
        beberiaOnly: data.get("beberiaOnly") === "on",
        validFrom: data.get("validFrom") as string,
        validTo: data.get("validTo") as string,
        maxUsage: data.get("maxUsage") ? Number(data.get("maxUsage")) : undefined,
      });

      if ("error" in result && result.error) {
        setMessage(result.error);
      } else {
        setMessage("프로모션이 생성되었습니다.");
        form.reset();
        setIsOpen(false);
      }
    });
  }

  return (
    <div className="rounded-lg border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/30"
      >
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span className="font-medium">새 프로모션 생성</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium">코드 *</label>
              <input
                name="code"
                required
                placeholder="BEBERIA2024"
                className="w-full rounded border px-3 py-2 text-sm uppercase"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">이름 (한국어) *</label>
              <input
                name="nameKo"
                required
                placeholder="베베리아 신규 할인"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">이름 (베트남어) *</label>
              <input
                name="nameVi"
                required
                placeholder="Beberia khuyến mãi"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">이름 (영어) *</label>
              <input
                name="nameEn"
                required
                placeholder="Beberia New Discount"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">할인 유형 *</label>
              <select
                name="discountType"
                required
                className="w-full rounded border px-3 py-2 text-sm"
              >
                <option value="PERCENTAGE">퍼센트 (%)</option>
                <option value="FIXED_AMOUNT">고정 금액 (원)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">할인 값 *</label>
              <input
                name="discountValue"
                type="number"
                required
                placeholder="10"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">최대 할인 (원)</label>
              <input
                name="maxDiscount"
                type="number"
                placeholder="100000"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">최소 주문금액 (원)</label>
              <input
                name="minOrderAmount"
                type="number"
                placeholder="500000"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">최대 사용 횟수</label>
              <input
                name="maxUsage"
                type="number"
                placeholder="100"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">시작일 *</label>
              <input
                name="validFrom"
                type="date"
                required
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">종료일 *</label>
              <input
                name="validTo"
                type="date"
                required
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm">
                <input name="beberiaOnly" type="checkbox" className="rounded" />
                베베리아 멤버 전용
              </label>
            </div>
          </div>

          {message && (
            <p className={`mt-3 text-sm ${message.includes("생성") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isPending ? "생성 중..." : "프로모션 생성"}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded border px-4 py-2 text-sm hover:bg-muted"
            >
              취소
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
