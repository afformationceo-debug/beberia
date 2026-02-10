"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { likePost } from "@/lib/actions/community";

interface LikeButtonProps {
  postId: string;
  initialCount: number;
}

export function LikeButton({ postId, initialCount }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleLike() {
    if (liked) return;
    setLiked(true);
    setCount((c) => c + 1);
    startTransition(async () => {
      await likePost(postId);
    });
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={isPending || liked}
      className="gap-1.5 text-xs"
    >
      <Heart
        className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
      />
      {count}
    </Button>
  );
}
