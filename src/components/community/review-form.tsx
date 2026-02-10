"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/lib/actions/reviews";
import { Star, Send } from "lucide-react";

interface ReviewFormProps {
  hospitalId: string;
  doctorId?: string;
  bookingId?: string;
  labels: {
    title: string;
    titlePlaceholder: string;
    content: string;
    contentPlaceholder: string;
    overall: string;
    service: string;
    result: string;
    communication: string;
    facilities: string;
    submit: string;
    success: string;
    loginRequired: string;
  };
  onSuccess?: () => void;
}

function StarRating({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <span className="w-24 text-xs text-muted-foreground">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-0.5"
          >
            <Star
              className={`h-5 w-5 transition-colors ${
                star <= (hover || value)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ReviewForm({
  hospitalId,
  doctorId,
  bookingId,
  labels,
  onSuccess,
}: ReviewFormProps) {
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(0);
  const [ratingService, setRatingService] = useState(0);
  const [ratingResult, setRatingResult] = useState(0);
  const [ratingCommunication, setRatingCommunication] = useState(0);
  const [ratingFacilities, setRatingFacilities] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (!content.trim()) {
      setError("Please write a review");
      return;
    }

    setError("");
    startTransition(async () => {
      const result = await createReview({
        hospitalId,
        doctorId,
        bookingId,
        rating,
        ratingService: ratingService || undefined,
        ratingResult: ratingResult || undefined,
        ratingCommunication: ratingCommunication || undefined,
        ratingFacilities: ratingFacilities || undefined,
        title: title || undefined,
        content,
      });

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
      {/* Overall Rating */}
      <StarRating value={rating} onChange={setRating} label={labels.overall} />

      {/* Detailed Ratings */}
      <div className="space-y-1.5 rounded-lg bg-muted/30 p-3">
        <StarRating value={ratingService} onChange={setRatingService} label={labels.service} />
        <StarRating value={ratingResult} onChange={setRatingResult} label={labels.result} />
        <StarRating value={ratingCommunication} onChange={setRatingCommunication} label={labels.communication} />
        <StarRating value={ratingFacilities} onChange={setRatingFacilities} label={labels.facilities} />
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
          rows={4}
          className="mt-1"
        />
      </div>

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={isPending || rating === 0}
        className="w-full gap-2"
      >
        <Send className="h-4 w-4" />
        {isPending ? "..." : labels.submit}
      </Button>
    </div>
  );
}
