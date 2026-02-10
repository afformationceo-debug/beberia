"use client";

import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/hooks/use-auth";
import {
  CalendarCheck,
  Heart,
  Star,
  Crown,
  Settings,
  ChevronRight,
  LogIn,
  LogOut,
  Sparkles,
  UserCircle,
} from "lucide-react";

const menuItems = [
  { key: "bookings", icon: CalendarCheck, href: "/my/bookings", iconBg: "bg-blue-50 text-blue-600" },
  { key: "favorites", icon: Heart, href: "/my/favorites", iconBg: "bg-pink-50 text-pink-600" },
  { key: "reviews", icon: Star, href: "/my/reviews", iconBg: "bg-amber-50 text-amber-600" },
  { key: "membership", icon: Crown, href: "/my/membership", iconBg: "bg-purple-50 text-purple-600" },
  { key: "settings", icon: Settings, href: "/my/settings", iconBg: "bg-slate-100 text-slate-600" },
] as const;

export default function MyPage() {
  const t = useTranslations("my");
  const tc = useTranslations("common");
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <MobileContainer className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">{tc("loading")}</p>
      </MobileContainer>
    );
  }

  if (!user) {
    return (
      <MobileContainer className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-primary/5 via-background to-violet-50 p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-violet-200 ring-4 ring-primary/10">
            <UserCircle className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-5 text-xl font-bold tracking-tight">Welcome to Beberia</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {tc("login")} to access your bookings, favorites, and more
          </p>
          <Button asChild className="mt-6 w-full bg-gradient-to-r from-primary to-violet-600 font-semibold shadow-md hover:opacity-90">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              {tc("login")}
            </Link>
          </Button>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer className="py-4">
      {/* Profile Card */}
      <Card className="mb-6 overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-violet-50 shadow-sm">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-violet-200 text-2xl font-bold text-primary ring-4 ring-primary/20">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-2xl font-bold">
              {user.email?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold tracking-tight">
              {user.user_metadata?.name || user.email || user.phone}
            </h2>
            <Badge variant="secondary" className="mt-1.5 gap-1 bg-violet-100 text-violet-700">
              <Crown className="h-3 w-3" />
              {t("memberBadge.FREE")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Beberia Member CTA */}
      <div className="mb-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold">Become a Beberia Member</h3>
            <p className="text-xs text-white/80">Unlock exclusive discounts & perks</p>
          </div>
          <Link href="/my/membership">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.key} href={item.href}>
              <div className="flex items-center gap-3 rounded-xl border bg-card p-3.5 transition-all duration-200 hover:border-l-4 hover:border-l-primary hover:shadow-sm">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="flex-1 font-medium">{t(item.key)}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </div>

      <Button
        variant="outline"
        className="mt-8 w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        onClick={() => signOut()}
      >
        <LogOut className="mr-2 h-4 w-4" />
        {tc("logout")}
      </Button>
    </MobileContainer>
  );
}
