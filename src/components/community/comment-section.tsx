"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createComment } from "@/lib/actions/community";
import { MessageCircle, Send, CornerDownRight } from "lucide-react";

interface CommentUser {
  id: string;
  name: string | null;
  avatar: string | null;
}

interface CommentData {
  id: string;
  content: string;
  createdAt: Date;
  user: CommentUser;
  children?: CommentData[];
}

interface CommentSectionProps {
  postId: string;
  comments: CommentData[];
  totalCount: number;
  labels: {
    comments: string;
    writeComment: string;
    reply: string;
    submit: string;
    loginRequired: string;
    noComments: string;
  };
}

function SingleComment({
  comment,
  postId,
  labels,
  isReply,
}: {
  comment: CommentData;
  postId: string;
  labels: CommentSectionProps["labels"];
  isReply?: boolean;
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const timeAgo = getTimeAgo(comment.createdAt);

  function handleReply() {
    if (!replyContent.trim()) return;
    startTransition(async () => {
      const result = await createComment({
        postId,
        content: replyContent,
        parentId: comment.id,
      });
      if (!result.error) {
        setReplyContent("");
        setShowReply(false);
      }
    });
  }

  return (
    <div className={isReply ? "ml-8 mt-2" : ""}>
      <div className="flex gap-2">
        {isReply && <CornerDownRight className="mt-1 h-3 w-3 shrink-0 text-muted-foreground" />}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
              {comment.user.name?.[0] || "U"}
            </div>
            <span className="text-xs font-medium">{comment.user.name || "User"}</span>
            <span className="text-[10px] text-muted-foreground">{timeAgo}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{comment.content}</p>
          {!isReply && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="mt-1 text-[10px] text-primary hover:underline"
            >
              {labels.reply}
            </button>
          )}

          {showReply && (
            <div className="mt-2 flex gap-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={labels.writeComment}
                rows={2}
                className="text-xs"
              />
              <Button
                size="sm"
                onClick={handleReply}
                disabled={isPending || !replyContent.trim()}
                className="shrink-0"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Child comments */}
          {comment.children?.map((child) => (
            <SingleComment
              key={child.id}
              comment={child}
              postId={postId}
              labels={labels}
              isReply
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CommentSection({ postId, comments, totalCount, labels }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!newComment.trim()) return;
    setError("");
    startTransition(async () => {
      const result = await createComment({
        postId,
        content: newComment,
      });
      if (result.error) {
        setError(result.error === "Unauthorized" ? labels.loginRequired : result.error);
      } else {
        setNewComment("");
      }
    });
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        <h3 className="text-sm font-semibold">
          {labels.comments}
        </h3>
        <Badge variant="secondary" className="text-[10px]">{totalCount}</Badge>
      </div>

      {/* New Comment */}
      <div className="flex gap-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={labels.writeComment}
          rows={2}
          className="text-sm"
        />
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={isPending || !newComment.trim()}
          className="shrink-0 self-end"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <SingleComment
              key={comment.id}
              comment={comment}
              postId={postId}
              labels={labels}
            />
          ))}
        </div>
      ) : (
        <p className="py-4 text-center text-xs text-muted-foreground">
          {labels.noComments}
        </p>
      )}
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 30) return `${days}d`;
  return new Date(date).toLocaleDateString();
}
