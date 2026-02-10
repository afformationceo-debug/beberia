import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/community/comment-section";
import { LikeButton } from "@/components/community/like-button";
import { getPostById } from "@/lib/actions/community";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  HelpCircle,
  Star,
  Camera,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { CommunityPostType } from "@prisma/client";

const typeConfig: Record<
  CommunityPostType,
  { icon: typeof HelpCircle; color: string }
> = {
  QA: { icon: HelpCircle, color: "bg-blue-100 text-blue-700" },
  REVIEW: { icon: Star, color: "bg-amber-100 text-amber-700" },
  BEFORE_AFTER: { icon: Camera, color: "bg-pink-100 text-pink-700" },
  DISCUSSION: { icon: MessageSquare, color: "bg-green-100 text-green-700" },
  TIP: { icon: Lightbulb, color: "bg-purple-100 text-purple-700" },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const locale = (await getLocale()) as Locale;

  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return <PostDetailContent post={post} locale={locale} />;
}

function PostDetailContent({
  post,
  locale,
}: {
  post: any;
  locale: Locale;
}) {
  const t = useTranslations("community");

  const config = typeConfig[post.type as keyof typeof typeConfig];
  const Icon = config.icon;
  const timeAgo = formatDate(post.createdAt, locale);

  const commentLabels = {
    comments: t("comments"),
    writeComment: t("writeComment"),
    reply: t("reply"),
    submit: t("submit"),
    loginRequired: t("loginRequired"),
    noComments: t("noComments"),
  };

  return (
    <MobileContainer className="py-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/community">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Badge variant="secondary" className={`text-[10px] gap-0.5 ${config.color}`}>
          <Icon className="h-2.5 w-2.5" />
          {t(`tabs.${post.type === "QA" ? "qa" : post.type === "REVIEW" ? "reviews" : post.type === "BEFORE_AFTER" ? "beforeAfter" : post.type === "DISCUSSION" ? "all" : "tips"}`)}
        </Badge>
      </div>

      {/* Author */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {post.user.avatar ? (
            <img
              src={post.user.avatar}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            post.user.name?.[0] || "U"
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium">{post.user.name || "User"}</p>
            {post.user.isBeberiaMember && (
              <Badge className="bg-amber-500 text-white text-[8px] px-1 py-0">
                Beberia
              </Badge>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground">{timeAgo}</p>
        </div>
      </div>

      {/* Title */}
      <h1 className="mt-4 text-lg font-bold">{post.title}</h1>

      {/* Content */}
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {(post.images as string[]).map((url: string, i: number) => (
            <div key={i} className="overflow-hidden rounded-lg bg-muted">
              <img src={url} alt="" className="w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Like Button */}
      <div className="mt-4">
        <LikeButton postId={post.id} initialCount={post.likeCount} />
      </div>

      <Separator className="my-4" />

      {/* Comments */}
      <CommentSection
        postId={post.id}
        comments={post.comments}
        totalCount={post._count.comments}
        labels={commentLabels}
      />

      <div className="h-4" />
    </MobileContainer>
  );
}

function formatDate(date: Date, locale: Locale): string {
  return new Date(date).toLocaleDateString(
    locale === "vi" ? "vi-VN" : locale === "ko" ? "ko-KR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}
