"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { replyToReview } from "@/lib/actions/reviews";
import { MessageSquare, Send } from "lucide-react";

export function ReviewActions({ reviewId }: { reviewId: string }) {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  function handleReply() {
    if (!reply.trim()) return;
    startTransition(async () => {
      const result = await replyToReview(reviewId, reply);
      if (result.success) {
        setDone(true);
      }
    });
  }

  if (done) {
    return (
      <p className="mt-3 text-xs text-green-600">Reply sent successfully</p>
    );
  }

  return (
    <div className="mt-3">
      {showReply ? (
        <div className="space-y-2">
          <Textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write hospital reply..."
            rows={3}
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleReply}
              disabled={isPending || !reply.trim()}
              className="gap-1"
            >
              <Send className="h-3 w-3" />
              {isPending ? "Sending..." : "Send Reply"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowReply(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowReply(true)}
          className="gap-1"
        >
          <MessageSquare className="h-3 w-3" />
          Reply
        </Button>
      )}
    </div>
  );
}
