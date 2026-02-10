import { getAllReviews } from "@/lib/actions/reviews";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingStars } from "@/components/shared/rating-stars";
import { ReviewActions } from "./review-actions";
import {
  Star,
  CheckCircle,
  MessageSquare,
  ImageIcon,
} from "lucide-react";

export default async function AdminReviewsPage() {
  const data = await getAllReviews({ limit: 50 });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Review Moderation</h1>
          <p className="mt-1 text-muted-foreground">
            {data.total} reviews total
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {data.reviews.filter((r) => r.isVerified).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">With Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {data.reviews.filter((r) => r.beforeImages.length > 0 || r.afterImages.length > 0).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Needs Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              {data.reviews.filter((r) => !r.hospitalReply).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Review List */}
      <div className="mt-6 space-y-4">
        {data.reviews.map((review) => {
          const hospitalName = review.hospital.nameEn || review.hospital.nameKo || review.hospital.nameVi;
          const hasImages = review.beforeImages.length > 0 || review.afterImages.length > 0;

          return (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {review.user.name?.[0] || "U"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{review.user.name || "User"}</p>
                        {review.isVerified && (
                          <Badge variant="secondary" className="text-[10px] gap-0.5">
                            <CheckCircle className="h-2.5 w-2.5 text-green-500" />
                            Verified
                          </Badge>
                        )}
                        {hasImages && (
                          <Badge variant="secondary" className="text-[10px] gap-0.5">
                            <ImageIcon className="h-2.5 w-2.5" />
                            Photos
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {hospitalName} &middot;{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <RatingStars rating={review.rating} size="sm" />
                </div>

                {review.title && (
                  <h4 className="mt-3 font-medium">{review.title}</h4>
                )}
                <p className="mt-1 text-sm text-muted-foreground">
                  {review.content}
                </p>

                {/* Detailed Ratings */}
                {(review.ratingService || review.ratingResult || review.ratingCommunication || review.ratingFacilities) && (
                  <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                    {review.ratingService && <span>Service: {review.ratingService}/5</span>}
                    {review.ratingResult && <span>Result: {review.ratingResult}/5</span>}
                    {review.ratingCommunication && <span>Communication: {review.ratingCommunication}/5</span>}
                    {review.ratingFacilities && <span>Facilities: {review.ratingFacilities}/5</span>}
                  </div>
                )}

                {/* Hospital Reply */}
                {review.hospitalReply ? (
                  <div className="mt-3 rounded-md bg-muted/50 p-3">
                    <div className="flex items-center gap-1 text-xs font-medium text-primary">
                      <MessageSquare className="h-3 w-3" />
                      Hospital Reply
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {review.hospitalReply}
                    </p>
                  </div>
                ) : (
                  <ReviewActions reviewId={review.id} />
                )}
              </CardContent>
            </Card>
          );
        })}

        {data.reviews.length === 0 && (
          <div className="py-12 text-center">
            <Star className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-2 text-muted-foreground">No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
