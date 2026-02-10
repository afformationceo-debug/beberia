import { getDashboardStats } from "@/lib/actions/admin";
import {
  ArrowUpRight,
  CalendarCheck,
  Hospital,
  Users,
  Banknote,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  UserCheck,
} from "lucide-react";

function formatKRW(amount: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const totalStatusBookings =
    stats.pendingBookings + stats.confirmedBookings + stats.completedBookings + stats.cancelledBookings || 1;
  const memberPercentage = stats.totalUsers > 0 ? Math.round((stats.beberiaMembers / stats.totalUsers) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header with welcome message and date */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
          <p className="mt-1 text-muted-foreground">Beberia 관리 현황</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          icon={<CalendarCheck className="h-5 w-5" />}
          label="총 예약"
          value={stats.totalBookings.toLocaleString()}
          trend="+12%"
          trendUp={true}
          gradientFrom="from-blue-500"
          gradientTo="to-blue-600"
        />
        <KPICard
          icon={<Hospital className="h-5 w-5" />}
          label="활성 병원"
          value={stats.activeHospitals.toLocaleString()}
          trend="+3%"
          trendUp={true}
          gradientFrom="from-emerald-500"
          gradientTo="to-emerald-600"
        />
        <KPICard
          icon={<Users className="h-5 w-5" />}
          label="가입 사용자"
          value={stats.totalUsers.toLocaleString()}
          trend="+8%"
          trendUp={true}
          gradientFrom="from-violet-500"
          gradientTo="to-violet-600"
        />
        <KPICard
          icon={<Banknote className="h-5 w-5" />}
          label="총 매출"
          value={formatKRW(stats.totalRevenue)}
          trend="+15%"
          trendUp={true}
          gradientFrom="from-amber-500"
          gradientTo="to-amber-600"
        />
      </div>

      {/* Booking Status Distribution with progress bar */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">예약 상태 분포</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatusCard
            icon={<Clock className="h-4 w-4" />}
            label="대기중"
            value={stats.pendingBookings}
            color="text-yellow-600 bg-yellow-50"
            barColor="bg-yellow-400"
            percentage={Math.round((stats.pendingBookings / totalStatusBookings) * 100)}
          />
          <StatusCard
            icon={<CheckCircle className="h-4 w-4" />}
            label="확인됨"
            value={stats.confirmedBookings}
            color="text-blue-600 bg-blue-50"
            barColor="bg-blue-400"
            percentage={Math.round((stats.confirmedBookings / totalStatusBookings) * 100)}
          />
          <StatusCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="완료"
            value={stats.completedBookings}
            color="text-green-600 bg-green-50"
            barColor="bg-green-400"
            percentage={Math.round((stats.completedBookings / totalStatusBookings) * 100)}
          />
          <StatusCard
            icon={<XCircle className="h-4 w-4" />}
            label="취소"
            value={stats.cancelledBookings}
            color="text-red-600 bg-red-50"
            barColor="bg-red-400"
            percentage={Math.round((stats.cancelledBookings / totalStatusBookings) * 100)}
          />
        </div>
      </div>

      {/* Beberia Members -- larger with progress bar */}
      <div className="rounded-2xl border bg-gradient-to-r from-pink-50 via-purple-50 to-violet-50 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-md">
            <UserCheck className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">베베리아 멤버</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-pink-700">
                {stats.beberiaMembers}명
              </p>
              <span className="text-sm text-muted-foreground">
                / {stats.totalUsers}명 중
              </span>
              <span className="ml-auto text-sm font-semibold text-pink-600">{memberPercentage}%</span>
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-pink-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                style={{ width: `${memberPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">최근 예약</h2>
            <a
              href="/admin/bookings"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              전체 보기
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          {stats.recentBookings.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">아직 예약이 없습니다</p>
          ) : (
            <div className="space-y-1">
              {stats.recentBookings.map((booking) => {
                const userName = booking.user?.name || "Unknown";
                const initials = userName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();
                return (
                  <div
                    key={booking.id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
                  >
                    {/* Avatar initials */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 text-xs font-bold text-primary">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{booking.bookingNumber}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {userName} · {booking.hospital?.nameKo}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <BookingStatusBadge status={booking.status} />
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">최근 리뷰</h2>
            <a
              href="/admin/reviews"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              전체 보기
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          {stats.recentReviews.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">아직 리뷰가 없습니다</p>
          ) : (
            <div className="space-y-1">
              {stats.recentReviews.map((review) => {
                const reviewerName = review.user?.name || "Anonymous";
                const reviewInitials = reviewerName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();
                return (
                  <div
                    key={review.id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
                  >
                    {/* Avatar initials */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-orange-50 text-xs font-bold text-orange-600">
                      {reviewInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              className={`h-3 w-3 ${
                                starIdx < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold">{review.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {reviewerName} · {review.hospital?.nameKo}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground shrink-0">
                      {new Date(review.createdAt).toLocaleDateString("ko-KR")}
                    </p>
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

function KPICard({
  icon,
  label,
  value,
  trend,
  trendUp,
  gradientFrom,
  gradientTo,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  gradientFrom: string;
  gradientTo: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white shadow-sm`}>
          {icon}
        </div>
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
            trendUp
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          <TrendingUp className={`h-3 w-3 ${trendUp ? "" : "rotate-180"}`} />
          {trend}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function StatusCard({
  icon,
  label,
  value,
  color,
  barColor,
  percentage,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  barColor: string;
  percentage: number;
}) {
  return (
    <div className={`rounded-xl border p-3.5 ${color}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-1.5 text-2xl font-bold">{value}</p>
      {/* Progress bar */}
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-1 text-[10px] font-medium opacity-60">{percentage}%</p>
    </div>
  );
}

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: { label: "대기", className: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { label: "확인", className: "bg-blue-100 text-blue-700" },
  SCHEDULED: { label: "예정", className: "bg-indigo-100 text-indigo-700" },
  IN_PROGRESS: { label: "진행", className: "bg-purple-100 text-purple-700" },
  COMPLETED: { label: "완료", className: "bg-green-100 text-green-700" },
  CANCELLED: { label: "취소", className: "bg-red-100 text-red-700" },
  NO_SHOW: { label: "노쇼", className: "bg-gray-100 text-gray-700" },
};

function BookingStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-700" };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {config.label}
    </span>
  );
}
