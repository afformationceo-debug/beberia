import { RatingStars } from "@/components/shared/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { CheckCircle, Heart, ImageIcon } from "lucide-react";
import type { Locale } from "@/i18n/routing";

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    ratingService: number | null;
    ratingResult: number | null;
    ratingCommunication: number | null;
    ratingFacilities: number | null;
    title: string | null;
    content: string;
    beforeImages: string[];
    afterImages: string[];
    isVerified: boolean;
    likeCount: number;
    hospitalReply: string | null;
    createdAt: Date;
    user: { id: string; name: string | null; avatar: string | null };
    doctor?: { id: string; nameVi: string; nameKo: string; nameEn: string } | null;
  };
  locale: Locale;
  showHospital?: {
    slug: string;
    nameVi: string;
    nameKo: string;
    nameEn: string;
  } | null;
  compact?: boolean;
}

export function ReviewCard({ review, locale, showHospital, compact }: ReviewCardProps) {
  const hasImages = review.beforeImages.length > 0 || review.afterImages.length > 0;
  const doctorName = review.doctor
    ? getLocalizedField(review.doctor, "name", locale)
    : null;

  const timeAgo = getTimeAgo(review.createdAt, locale);

  return (
    <Card>
      <CardContent className={compact ? "p-3" : "p-4"}>
        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {review.user.avatar ? (
              <img
                src={review.user.avatar}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              review.user.name?.[0] || "U"
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium truncate">
                {review.user.name || "User"}
              </p>
              {review.isVerified && (
                <CheckCircle className="h-3.5 w-3.5 shrink-0 text-green-500" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <RatingStars rating={review.rating} size="sm" showValue={false} />
              <span className="text-[10px] text-muted-foreground">{timeAgo}</span>
            </div>
          </div>
          {hasImages && (
            <Badge variant="secondary" className="shrink-0 text-[10px] gap-0.5">
              <ImageIcon className="h-2.5 w-2.5" />
              Photo
            </Badge>
          )}
        </div>

        {/* Hospital name (for my reviews) */}
        {showHospital && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            {getLocalizedField(showHospital, "name", locale)}
            {doctorName && ` \u00B7 ${doctorName}`}
          </p>
        )}

        {/* Title */}
        {review.title && (
          <h4 className="mt-2 text-sm font-semibold">{review.title}</h4>
        )}

        {/* Content */}
        <p
          className={`mt-1 text-sm text-muted-foreground ${compact ? "line-clamp-2" : "line-clamp-4"}`}
        >
          {review.content}
        </p>

        {/* Detailed Ratings */}
        {!compact && (review.ratingService || review.ratingResult || review.ratingCommunication || review.ratingFacilities) && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-muted-foreground">
            {review.ratingService && (
              <span>Service {review.ratingService}/5</span>
            )}
            {review.ratingResult && (
              <span>Result {review.ratingResult}/5</span>
            )}
            {review.ratingCommunication && (
              <span>Communication {review.ratingCommunication}/5</span>
            )}
            {review.ratingFacilities && (
              <span>Facilities {review.ratingFacilities}/5</span>
            )}
          </div>
        )}

        {/* Before/After images preview */}
        {!compact && hasImages && (
          <div className="mt-2 flex gap-1.5">
            {[...review.beforeImages, ...review.afterImages]
              .slice(0, 4)
              .map((url, i) => (
                <div
                  key={i}
                  className="h-14 w-14 overflow-hidden rounded-md bg-muted"
                >
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            {review.beforeImages.length + review.afterImages.length > 4 && (
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                +{review.beforeImages.length + review.afterImages.length - 4}
              </div>
            )}
          </div>
        )}

        {/* Like */}
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Heart className="h-3 w-3" />
          <span>{review.likeCount}</span>
        </div>

        {/* Hospital Reply */}
        {review.hospitalReply && (
          <div className="mt-2 rounded-md bg-muted/50 p-2.5">
            <p className="text-[10px] font-medium text-primary">Hospital Reply</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {review.hospitalReply}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getTimeAgo(date: Date, _locale: Locale): string {
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
