"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatBubble } from "@/components/chat/chat-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Bot, Headphones } from "lucide-react";

export default function AIChatPage() {
  const t = useTranslations("chat");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showGreeting, setShowGreeting] = useState(true);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/ai/chat" }),
    []
  );

  const { messages, sendMessage, status } = useChat({ transport });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend(text: string) {
    setShowGreeting(false);
    sendMessage({ text });
  }

  function getMessageText(msg: (typeof messages)[number]): string {
    return msg.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("");
  }

  return (
    <MobileContainer noPadding className="flex h-[calc(100vh-7.5rem)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/chat">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold">{t("aiConsultation")}</h1>
          <p className="text-[10px] text-muted-foreground">
            {isLoading ? t("typing") : t("online")}
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1 text-xs" asChild>
          <Link href="/chat">
            <Headphones className="h-3 w-3" />
            {t("connectHuman")}
          </Link>
        </Button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Greeting */}
        {showGreeting && messages.length === 0 && (
          <ChatBubble
            role="assistant"
            content={t("aiGreeting")}
          />
        )}

        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            role={msg.role as "user" | "assistant"}
            content={getMessageText(msg)}
            isStreaming={
              isLoading &&
              msg.id === messages[messages.length - 1]?.id &&
              msg.role === "assistant"
            }
          />
        ))}
      </div>

      {/* Suggestion Chips */}
      {showGreeting && messages.length === 0 && (
        <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-hide">
          {(["rhinoplasty", "bestEyeHospital", "priceCompare"] as const).map(
            (key) => (
              <Badge
                key={key}
                variant="outline"
                className="cursor-pointer whitespace-nowrap hover:bg-accent"
                onClick={() => handleSend(t(`suggestions.${key}`))}
              >
                {t(`suggestions.${key}`)}
              </Badge>
            )
          )}
        </div>
      )}

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        placeholder={t("inputPlaceholder")}
        disabled={isLoading}
      />
    </MobileContainer>
  );
}
