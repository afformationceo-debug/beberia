import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { getUserChatRooms } from "@/lib/actions/chat";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { Bot, MessageCircle, Building2, Languages, Inbox, ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";

type ChatRoomTypeKey = "AI_CONSULTATION" | "BOOKING_SUPPORT" | "TRANSLATION";

const roomTypeConfig: Record<ChatRoomTypeKey, { icon: typeof Bot; color: string; ring: string; border: string }> = {
  AI_CONSULTATION: { icon: Bot, color: "bg-primary text-primary-foreground", ring: "ring-primary/20", border: "border-l-primary" },
  BOOKING_SUPPORT: { icon: Building2, color: "bg-blue-100 text-blue-600", ring: "ring-blue-100", border: "border-l-blue-500" },
  TRANSLATION: { icon: Languages, color: "bg-green-100 text-green-600", ring: "ring-green-100", border: "border-l-green-500" },
};

export default async function ChatPage() {
  const locale = (await getLocale()) as Locale;

  const rooms = await getUserChatRooms();

  return <ChatListContent locale={locale} rooms={rooms} />;
}

function ChatListContent({
  locale,
  rooms,
}: {
  locale: Locale;
  rooms: Awaited<ReturnType<typeof getUserChatRooms>>;
}) {
  const t = useTranslations("chat");

  return (
    <MobileContainer className="pb-8">
      {/* Gradient Header */}
      <div className="relative -mx-4 overflow-hidden bg-gradient-to-r from-primary to-indigo-600 px-5 pb-6 pt-5">
        <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute left-1/2 bottom-1 h-12 w-12 rounded-full bg-white/5" />
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">{t("title")}</h1>
        </div>
      </div>

      {/* AI Consultation Card */}
      <Link href="/chat/ai" className="mt-5 block">
        <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-indigo-50 to-violet-50 transition-all hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-md shadow-primary/25">
              <Bot className="h-7 w-7" />
              {/* Pulsing green dot */}
              <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{t("aiConsultation")}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {t("aiDesc")}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/50" />
          </CardContent>
        </Card>
      </Link>

      {/* Chat Rooms */}
      <h2 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
        {t("recentConversations")}
      </h2>

      {rooms.length > 0 ? (
        <div className="space-y-2.5">
          {rooms.map((room) => {
            const config = roomTypeConfig[room.type as ChatRoomTypeKey];
            const Icon = config.icon;
            const lastMsg = room.messages[0];
            const hospitalName = room.hospital
              ? getLocalizedField(room.hospital, "name", locale)
              : null;
            const title =
              room.title ||
              hospitalName ||
              (room.booking
                ? `Booking ${room.booking.bookingNumber}`
                : t(`roomType.${room.type}`));

            return (
              <Link key={room.id} href={`/chat/${room.id}`}>
                <Card className={`border-l-[3px] ${config.border} transition-all hover:bg-accent hover:shadow-sm`}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ${config.ring} ${config.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-medium truncate">
                          {title}
                        </h3>
                        {lastMsg && (
                          <span className="shrink-0 text-[10px] text-muted-foreground">
                            {formatTimeAgo(lastMsg.createdAt)}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-muted-foreground mt-0.5">
                        {lastMsg?.content || t("noMessages")}
                      </p>
                    </div>
                    {room._count.messages > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                        {room._count.messages}
                      </span>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-indigo-50/50 to-violet-50/60 p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100">
            <Bot className="h-8 w-8 text-indigo-500" />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">
            {t("noConversations")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("startAIChat")}
          </p>
        </div>
      )}
    </MobileContainer>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return new Date(date).toLocaleDateString();
}
