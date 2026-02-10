"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";

interface HeaderProps {
  showSearch?: boolean;
  showNotifications?: boolean;
  title?: string;
}

export function Header({
  showSearch = true,
  showNotifications = true,
  title,
}: HeaderProps) {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {title ? (
            <h1 className="text-lg font-bold">{title}</h1>
          ) : (
            <Link href="/" className="text-xl font-bold tracking-tight">
              {t("appName")}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-1">
          {showSearch && (
            <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
              <Link href="/hospitals">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
          )}
          {showNotifications && (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
            </Button>
          )}
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
