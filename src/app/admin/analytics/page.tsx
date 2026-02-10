import { getAnalyticsData } from "@/lib/actions/admin";
import {
  TrendingUp,
  Users,
  CalendarCheck,
  BarChart3,
  Star,
  Crown,
  Activity,
} from "lucide-react";

export default async function AdminAnalyticsPage() {
  const data = await getAnalyticsData();

  const maxMonthlyCount = Math.max(...data.monthlyBookings.map((m) => m.count), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">분석</h1>
        <p className="text-muted-foreground">플랫폼 분석 및 인사이트</p>
      </div>

      {/* Period Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-muted-foreground">최근 7일 예약</p>
          </div>
          <p className="mt-1 text-3xl font-bold">{data.bookingsLast7d}</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <p className="text-sm text-muted-foreground">최근 30일 예약</p>
          </div>
          <p className="mt-1 text-3xl font-bold">{data.bookingsLast30d}</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-600" />
            <p className="text-sm text-muted-foreground">최근 30일 신규 가입</p>
          </div>
          <p className="mt-1 text-3xl font-bold">{data.usersLast30d}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Booking Trend (Bar Chart) */}
        <div className="rounded-lg border p-4">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <h2 className="font-semibold">월별 예약 추이</h2>
          </div>
          {data.monthlyBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">데이터가 없습니다</p>
          ) : (
            <div className="space-y-2">
              {data.monthlyBookings.map((month) => (
                <div key={month.month} className="flex items-center gap-3">
                  <span className="w-16 text-xs text-muted-foreground">{month.month}</span>
                  <div className="flex-1">
                    <div
                      className="h-6 rounded bg-blue-500 transition-all"
                      style={{
                        width: `${Math.max((month.count / maxMonthlyCount) * 100, 2)}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-medium">{month.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Hospitals */}
        <div className="rounded-lg border p-4">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-600" />
            <h2 className="font-semibold">인기 병원 TOP 5</h2>
          </div>
          {data.topHospitals.length === 0 ? (
            <p className="text-sm text-muted-foreground">데이터가 없습니다</p>
          ) : (
            <div className="space-y-3">
              {data.topHospitals.map((hospital, idx) => (
                <div key={hospital.nameKo} className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      idx === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : idx === 1
                        ? "bg-gray-100 text-gray-700"
                        : idx === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{hospital.nameKo}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {hospital.ratingAvg.toFixed(1)}
                      </span>
                      <span>리뷰 {hospital.reviewCount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{hospital._count.bookings}</p>
                    <p className="text-[10px] text-muted-foreground">예약</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Status Distribution */}
        <div className="rounded-lg border p-4">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-600" />
            <h2 className="font-semibold">예약 상태 분포</h2>
          </div>
          {data.categoryDistribution.length === 0 ? (
            <p className="text-sm text-muted-foreground">데이터가 없습니다</p>
          ) : (
            <div className="space-y-2">
              {data.categoryDistribution.map((cat) => {
                const total = data.categoryDistribution.reduce(
                  (sum, c) => sum + c._count.id,
                  0
                );
                const pct = total > 0 ? ((cat._count.id / total) * 100).toFixed(1) : "0";
                return (
                  <div key={cat.status} className="flex items-center gap-3">
                    <span className="w-24 text-xs">
                      <StatusLabel status={cat.status} />
                    </span>
                    <div className="flex-1">
                      <div className="h-4 w-full rounded bg-muted">
                        <div
                          className={`h-4 rounded ${statusColors[cat.status] || "bg-gray-400"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-12 text-right text-xs font-medium">
                      {cat._count.id} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Membership Distribution */}
        <div className="rounded-lg border p-4">
          <div className="mb-4 flex items-center gap-2">
            <Crown className="h-4 w-4 text-pink-600" />
            <h2 className="font-semibold">멤버십 분포</h2>
          </div>
          {data.membershipStats.length === 0 ? (
            <p className="text-sm text-muted-foreground">데이터가 없습니다</p>
          ) : (
            <div className="space-y-3">
              {data.membershipStats.map((tier) => {
                const total = data.membershipStats.reduce(
                  (sum, t) => sum + t._count.id,
                  0
                );
                const pct = total > 0 ? ((tier._count.id / total) * 100).toFixed(1) : "0";
                return (
                  <div key={tier.membershipTier} className="flex items-center gap-3">
                    <span className={`w-24 rounded px-2 py-0.5 text-xs font-medium ${tierColors[tier.membershipTier] || "bg-gray-100"}`}>
                      {tierLabels[tier.membershipTier] || tier.membershipTier}
                    </span>
                    <div className="flex-1">
                      <div className="h-4 w-full rounded bg-muted">
                        <div
                          className={`h-4 rounded ${tierBarColors[tier.membershipTier] || "bg-gray-400"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-16 text-right text-xs font-medium">
                      {tier._count.id}명 ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const statusLabels: Record<string, string> = {
  PENDING: "대기중",
  CONFIRMED: "확인됨",
  SCHEDULED: "예정됨",
  IN_PROGRESS: "진행중",
  COMPLETED: "완료",
  CANCELLED: "취소",
  NO_SHOW: "노쇼",
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500",
  CONFIRMED: "bg-blue-500",
  SCHEDULED: "bg-indigo-500",
  IN_PROGRESS: "bg-purple-500",
  COMPLETED: "bg-green-500",
  CANCELLED: "bg-red-500",
  NO_SHOW: "bg-gray-500",
};

function StatusLabel({ status }: { status: string }) {
  return <>{statusLabels[status] || status}</>;
}

const tierLabels: Record<string, string> = {
  FREE: "Free",
  BEBERIA_MEMBER: "Member",
  BEBERIA_VIP: "VIP",
};

const tierColors: Record<string, string> = {
  FREE: "bg-gray-100 text-gray-700",
  BEBERIA_MEMBER: "bg-pink-100 text-pink-700",
  BEBERIA_VIP: "bg-purple-100 text-purple-700",
};

const tierBarColors: Record<string, string> = {
  FREE: "bg-gray-500",
  BEBERIA_MEMBER: "bg-pink-500",
  BEBERIA_VIP: "bg-purple-500",
};
