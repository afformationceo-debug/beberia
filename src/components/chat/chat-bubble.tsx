import { Bot, User, Building2 } from "lucide-react";
import type { ChatMessageRole } from "@prisma/client";

interface ChatBubbleProps {
  role: ChatMessageRole | "user" | "assistant";
  content: string;
  senderName?: string | null;
  senderAvatar?: string | null;
  timestamp?: Date;
  isStreaming?: boolean;
}

export function ChatBubble({
  role,
  content,
  senderName,
  senderAvatar,
  timestamp,
  isStreaming,
}: ChatBubbleProps) {
  const isUser = role === "USER" || role === "user";
  const isSystem = role === "SYSTEM";

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <p className="rounded-full bg-muted px-3 py-1 text-[10px] text-muted-foreground">
          {content}
        </p>
      </div>
    );
  }

  const avatarIcon =
    role === "ASSISTANT" || role === "assistant" ? (
      <Bot className="h-4 w-4" />
    ) : role === "HOSPITAL_STAFF" ? (
      <Building2 className="h-4 w-4" />
    ) : (
      <User className="h-4 w-4" />
    );

  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-primary text-primary-foreground"
            : role === "HOSPITAL_STAFF"
              ? "bg-blue-100 text-blue-600"
              : "bg-muted"
        }`}
      >
        {senderAvatar ? (
          <img
            src={senderAvatar}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          avatarIcon
        )}
      </div>
      <div className={`max-w-[75%] ${isUser ? "text-right" : ""}`}>
        {senderName && !isUser && (
          <p className="mb-0.5 text-[10px] text-muted-foreground">{senderName}</p>
        )}
        <div
          className={`inline-block rounded-2xl px-4 py-2 text-sm ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          {isStreaming && (
            <span className="inline-block animate-pulse">▌</span>
          )}
        </div>
        {timestamp && (
          <p className={`mt-0.5 text-[9px] text-muted-foreground ${isUser ? "text-right" : ""}`}>
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
