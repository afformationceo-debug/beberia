import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatBubble } from "@/components/chat/chat-bubble";
import { Link } from "@/i18n/navigation";
import { getChatMessages } from "@/lib/actions/chat";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { ArrowLeft, Building2, Languages, Bot } from "lucide-react";
import { RoomChatInput } from "./room-input";
import type { Locale } from "@/i18n/routing";

type ChatRoomTypeKey = "AI_CONSULTATION" | "BOOKING_SUPPORT" | "TRANSLATION";

const roomIcons: Record<ChatRoomTypeKey, typeof Bot> = {
  AI_CONSULTATION: Bot,
  BOOKING_SUPPORT: Building2,
  TRANSLATION: Languages,
};

interface PageProps {
  params: Promise<{ roomId: string }>;
}

export default async function ChatRoomPage({ params }: PageProps) {
  const { roomId } = await params;
  const locale = (await getLocale()) as Locale;

  let room: any = null;
  try {
    const { prisma } = await import("@/lib/prisma/client");
    room = await prisma.chatRoom.findUnique({
      where: { id: roomId },
      include: {
        hospital: {
          select: { id: true, nameVi: true, nameKo: true, nameEn: true, slug: true },
        },
        booking: {
          select: { id: true, bookingNumber: true },
        },
      },
    });
  } catch {
    // DB not connected
  }

  if (!room) {
    notFound();
  }

  let chatData: { messages: any[]; hasMore: boolean } = { messages: [], hasMore: false };
  try {
    chatData = await getChatMessages(roomId, { limit: 50 });
  } catch {}

  const Icon = roomIcons[room.type as ChatRoomTypeKey];
  const hospitalName = room.hospital
    ? getLocalizedField(room.hospital, "name", locale)
    : null;
  const title =
    room.title ||
    hospitalName ||
    (room.booking ? `Booking ${room.booking.bookingNumber}` : "Chat");

  return (
    <MobileContainer noPadding className="flex h-[calc(100vh-7.5rem)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/chat">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          {Icon && <Icon className="h-4 w-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold truncate">{title}</h1>
          {room.booking && (
            <Badge variant="secondary" className="text-[9px]">
              {room.booking.bookingNumber}
            </Badge>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatData.messages.map((msg: any) => (
          <ChatBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            senderName={msg.sender?.name}
            senderAvatar={msg.sender?.avatar}
            timestamp={msg.createdAt}
          />
        ))}
        {chatData.messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Start the conversation
            </p>
          </div>
        )}
      </div>

      {/* Input */}
      <RoomChatInput roomId={roomId} />
    </MobileContainer>
  );
}
