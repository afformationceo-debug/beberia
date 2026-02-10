"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPost } from "@/lib/actions/community";
import { Send } from "lucide-react";
import type { CommunityPostType } from "@prisma/client";

interface PostFormProps {
  labels: {
    type: string;
    types: Record<string, string>;
    title: string;
    titlePlaceholder: string;
    content: string;
    contentPlaceholder: string;
    submit: string;
    success: string;
    loginRequired: string;
  };
  defaultType?: CommunityPostType;
  onSuccess?: () => void;
}

export function PostForm({ labels, defaultType, onSuccess }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const [type, setType] = useState<CommunityPostType>(defaultType || "DISCUSSION");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }
    setError("");
    startTransition(async () => {
      const result = await createPost({ type, title, content });
      if (result.error) {
        setError(result.error === "Unauthorized" ? labels.loginRequired : result.error);
      } else {
        setSuccess(true);
        onSuccess?.();
      }
    });
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
        <p className="text-sm font-medium text-green-800">{labels.success}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Type */}
      <div>
        <Label className="text-xs">{labels.type}</Label>
        <Select value={type} onValueChange={(v) => setType(v as CommunityPostType)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(labels.types).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Title */}
      <div>
        <Label className="text-xs">{labels.title}</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={labels.titlePlaceholder}
          className="mt-1"
        />
      </div>

      {/* Content */}
      <div>
        <Label className="text-xs">{labels.content}</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={labels.contentPlaceholder}
          rows={6}
          className="mt-1"
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <Button
        onClick={handleSubmit}
        disabled={isPending || !title.trim() || !content.trim()}
        className="w-full gap-2"
      >
        <Send className="h-4 w-4" />
        {isPending ? "..." : labels.submit}
      </Button>
    </div>
  );
}
