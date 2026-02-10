"use client";

import { useTransition } from "react";
import { ChatInput } from "@/components/chat/chat-input";
import { sendMessage } from "@/lib/actions/chat";

export function RoomChatInput({ roomId }: { roomId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleSend(content: string) {
    startTransition(async () => {
      await sendMessage({ roomId, content });
    });
  }

  return (
    <ChatInput
      onSend={handleSend}
      placeholder="Type a message..."
      disabled={isPending}
    />
  );
}
