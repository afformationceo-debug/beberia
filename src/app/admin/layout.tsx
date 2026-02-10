import "@/app/globals.css";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  Users,
  Star,
  Tag,
  BarChart3,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "대시보드", icon: LayoutDashboard },
  { href: "/admin/hospitals", label: "병원 관리", icon: Building2 },
  { href: "/admin/bookings", label: "예약 관리", icon: CalendarCheck },
  { href: "/admin/users", label: "사용자 관리", icon: Users },
  { href: "/admin/reviews", label: "리뷰 관리", icon: Star },
  { href: "/admin/promotions", label: "프로모션", icon: Tag },
  { href: "/admin/analytics", label: "분석", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 border-r bg-muted/30">
            <div className="sticky top-0">
              <div className="flex items-center gap-2 border-b px-4 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  B
                </div>
                <div>
                  <h1 className="text-sm font-bold">Beberia Admin</h1>
                  <p className="text-[10px] text-muted-foreground">Management Console</p>
                </div>
              </div>
              <nav className="p-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
