import { getAllUsers } from "@/lib/actions/admin";
import { UserActions } from "./user-actions";
import {
  Users,
  Crown,
  Shield,
  CalendarCheck,
  MessageSquare,
} from "lucide-react";

const roleLabels: Record<string, { label: string; className: string }> = {
  CUSTOMER: { label: "고객", className: "bg-gray-100 text-gray-700" },
  HOSPITAL_ADMIN: { label: "병원관리자", className: "bg-blue-100 text-blue-700" },
  ADMIN: { label: "관리자", className: "bg-red-100 text-red-700" },
};

const tierLabels: Record<string, { label: string; className: string }> = {
  FREE: { label: "Free", className: "bg-gray-100 text-gray-700" },
  BEBERIA_MEMBER: { label: "Member", className: "bg-pink-100 text-pink-700" },
  BEBERIA_VIP: { label: "VIP", className: "bg-purple-100 text-purple-700" },
};

export default async function AdminUsersPage() {
  let result: Awaited<ReturnType<typeof getAllUsers>> = {
    users: [],
    total: 0,
    page: 1,
    pageSize: 20,
    hasMore: false,
  };

  try {
    result = await getAllUsers({ pageSize: 50 });
  } catch {
    // DB error
  }

  const { users, total } = result;

  const memberCount = users.filter((u) => u.membershipTier !== "FREE").length;
  const adminCount = users.filter((u) => u.role === "ADMIN" || u.role === "HOSPITAL_ADMIN").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">사용자 관리</h1>
        <p className="text-muted-foreground">사용자 및 멤버십 관리</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-blue-600" />
            <p className="text-xs text-muted-foreground">전체 사용자</p>
          </div>
          <p className="text-xl font-bold">{total}</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <Crown className="h-3 w-3 text-pink-600" />
            <p className="text-xs text-muted-foreground">베베리아 멤버</p>
          </div>
          <p className="text-xl font-bold text-pink-700">{memberCount}</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-red-600" />
            <p className="text-xs text-muted-foreground">관리자</p>
          </div>
          <p className="text-xl font-bold text-red-700">{adminCount}</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-xs text-muted-foreground">VIP</p>
          <p className="text-xl font-bold text-purple-700">
            {users.filter((u) => u.membershipTier === "BEBERIA_VIP").length}
          </p>
        </div>
      </div>

      {/* User List */}
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">사용자</th>
                <th className="px-4 py-3 text-left font-medium">연락처</th>
                <th className="px-4 py-3 text-center font-medium">역할</th>
                <th className="px-4 py-3 text-center font-medium">멤버십</th>
                <th className="px-4 py-3 text-center font-medium">예약</th>
                <th className="px-4 py-3 text-center font-medium">리뷰</th>
                <th className="px-4 py-3 text-left font-medium">가입일</th>
                <th className="px-4 py-3 text-center font-medium">액션</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    등록된 사용자가 없습니다
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const role = roleLabels[user.role] || roleLabels.CUSTOMER;
                  const tier = tierLabels[user.membershipTier] || tierLabels.FREE;

                  return (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {user.name?.charAt(0) || "?"}
                          </div>
                          <div>
                            <p className="font-medium">{user.name || "이름 없음"}</p>
                            {user.beberiaId && (
                              <p className="text-[10px] text-pink-600">
                                Beberia: {user.beberiaId}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs">{user.email || "-"}</p>
                        <p className="text-xs text-muted-foreground">{user.phone || "-"}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${role.className}`}>
                          {role.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tier.className}`}>
                          {tier.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <CalendarCheck className="h-3 w-3 text-muted-foreground" />
                          <span>{user._count.bookings}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <MessageSquare className="h-3 w-3 text-muted-foreground" />
                          <span>{user._count.reviews}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString("ko-KR")}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <UserActions
                          userId={user.id}
                          currentRole={user.role}
                          currentTier={user.membershipTier}
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
