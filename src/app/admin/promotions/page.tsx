import { getAllPromotions } from "@/lib/actions/admin";
import { PromotionActions } from "./promotion-actions";
import { CreatePromotionForm } from "./create-form";
import {
  Tag,
  Percent,
  Calendar,
  CheckCircle,
  XCircle,
  Crown,
  TicketCheck,
} from "lucide-react";

export default async function AdminPromotionsPage() {
  let promotions: Awaited<ReturnType<typeof getAllPromotions>> = [];
  try {
    promotions = await getAllPromotions();
  } catch {
    // DB error
  }

  const activeCount = promotions.filter((p) => p.isActive).length;
  const beberiaOnly = promotions.filter((p) => p.beberiaOnly).length;
  const totalUsage = promotions.reduce((sum, p) => sum + p.currentUsage, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">프로모션 관리</h1>
        <p className="text-muted-foreground">할인 코드 및 프로모션 관리</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3 text-blue-600" />
            <p className="text-xs text-muted-foreground">전체</p>
          </div>
          <p className="text-xl font-bold">{promotions.length}</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <p className="text-xs text-muted-foreground">활성</p>
          </div>
          <p className="text-xl font-bold text-green-700">{activeCount}</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <Crown className="h-3 w-3 text-pink-600" />
            <p className="text-xs text-muted-foreground">멤버 전용</p>
          </div>
          <p className="text-xl font-bold text-pink-700">{beberiaOnly}</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <TicketCheck className="h-3 w-3 text-orange-600" />
            <p className="text-xs text-muted-foreground">총 사용</p>
          </div>
          <p className="text-xl font-bold text-orange-700">{totalUsage}</p>
        </div>
      </div>

      {/* Create Form */}
      <CreatePromotionForm />

      {/* Promotion List */}
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">프로모션</th>
                <th className="px-4 py-3 text-center font-medium">코드</th>
                <th className="px-4 py-3 text-center font-medium">할인</th>
                <th className="px-4 py-3 text-center font-medium">유효기간</th>
                <th className="px-4 py-3 text-center font-medium">사용</th>
                <th className="px-4 py-3 text-center font-medium">조건</th>
                <th className="px-4 py-3 text-center font-medium">상태</th>
                <th className="px-4 py-3 text-center font-medium">액션</th>
              </tr>
            </thead>
            <tbody>
              {promotions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    등록된 프로모션이 없습니다
                  </td>
                </tr>
              ) : (
                promotions.map((promo) => {
                  const now = new Date();
                  const isExpired = new Date(promo.validTo) < now;
                  const isNotStarted = new Date(promo.validFrom) > now;

                  return (
                    <tr key={promo.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <p className="font-medium">{promo.nameKo}</p>
                        <p className="text-xs text-muted-foreground">{promo.nameVi}</p>
                        {promo.hospital && (
                          <p className="text-[10px] text-blue-600">{promo.hospital.nameKo}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono">
                          {promo.code}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Percent className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">
                            {promo.discountType === "PERCENTAGE"
                              ? `${promo.discountValue}%`
                              : `${promo.discountValue.toLocaleString()}원`}
                          </span>
                        </div>
                        {promo.maxDiscount && (
                          <p className="text-[10px] text-muted-foreground">
                            최대 {promo.maxDiscount.toLocaleString()}원
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <p className="text-xs">
                          {new Date(promo.validFrom).toLocaleDateString("ko-KR")}
                        </p>
                        <p className="text-xs">
                          ~ {new Date(promo.validTo).toLocaleDateString("ko-KR")}
                        </p>
                        {isExpired && (
                          <span className="text-[10px] text-red-600">만료됨</span>
                        )}
                        {isNotStarted && (
                          <span className="text-[10px] text-blue-600">시작 전</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-medium">{promo.currentUsage}</span>
                        <span className="text-muted-foreground">
                          {promo.maxUsage ? ` / ${promo.maxUsage}` : ""}
                        </span>
                        <p className="text-[10px] text-muted-foreground">
                          예약 {promo._count.bookings}건
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {promo.beberiaOnly && (
                          <span className="mb-1 block rounded bg-pink-100 px-1.5 py-0.5 text-[10px] font-medium text-pink-700">
                            멤버전용
                          </span>
                        )}
                        {promo.minOrderAmount && (
                          <span className="block text-[10px] text-muted-foreground">
                            최소 {promo.minOrderAmount.toLocaleString()}원
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {promo.isActive ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                            <CheckCircle className="h-3 w-3" /> 활성
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                            <XCircle className="h-3 w-3" /> 비활성
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <PromotionActions
                          promotionId={promo.id}
                          isActive={promo.isActive}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
