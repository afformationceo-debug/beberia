import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import {
  Heart,
  MessageCircle,
  Pin,
  ImageIcon,
  HelpCircle,
  Star,
  Camera,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import type { CommunityPostType } from "@prisma/client";

const typeConfig: Record<
  CommunityPostType,
  { icon: typeof HelpCircle; color: string; label: string }
> = {
  QA: { icon: HelpCircle, color: "bg-blue-100 text-blue-700", label: "Q&A" },
  REVIEW: { icon: Star, color: "bg-amber-100 text-amber-700", label: "Review" },
  BEFORE_AFTER: { icon: Camera, color: "bg-pink-100 text-pink-700", label: "Before & After" },
  DISCUSSION: { icon: MessageSquare, color: "bg-green-100 text-green-700", label: "Discussion" },
  TIP: { icon: Lightbulb, color: "bg-purple-100 text-purple-700", label: "Tip" },
};

interface PostCardProps {
  post: {
    id: string;
    type: CommunityPostType;
    title: string;
    content: string;
    images: string[];
    likeCount: number;
    commentCount: number;
    isPinned: boolean;
    createdAt: Date;
    user: {
      id: string;
      name: string | null;
      avatar: string | null;
      isBeberiaMember?: boolean;
    };
    _count: { comments: number };
  };
}

export function PostCard({ post }: PostCardProps) {
  const config = typeConfig[post.type];
  const Icon = config.icon;
  const timeAgo = getTimeAgo(post.createdAt);

  return (
    <Link href={`/community/posts/${post.id}`}>
      <Card className="transition-colors hover:bg-accent/50">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {post.user.avatar ? (
                <img
                  src={post.user.avatar}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                post.user.name?.[0] || "U"
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium truncate">
                  {post.user.name || "User"}
                </p>
                {post.user.isBeberiaMember && (
                  <Badge className="bg-amber-500 text-white text-[8px] px-1 py-0">
                    Beberia
                  </Badge>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground">{timeAgo}</p>
            </div>
            <div className="flex items-center gap-1.5">
              {post.isPinned && <Pin className="h-3 w-3 text-primary" />}
              <Badge variant="secondary" className={`text-[10px] gap-0.5 ${config.color}`}>
                <Icon className="h-2.5 w-2.5" />
                {config.label}
              </Badge>
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-2 text-sm font-semibold line-clamp-1">{post.title}</h3>

          {/* Content */}
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
            {post.content}
          </p>

          {/* Images preview */}
          {post.images.length > 0 && (
            <div className="mt-2 flex gap-1">
              {post.images.slice(0, 3).map((url, i) => (
                <div key={i} className="h-12 w-12 overflow-hidden rounded bg-muted">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
              {post.images.length > 3 && (
                <div className="flex h-12 w-12 items-center justify-center rounded bg-muted text-[10px] text-muted-foreground">
                  +{post.images.length - 3}
                </div>
              )}
              {post.images.length === 0 && post.type === "BEFORE_AFTER" && (
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <ImageIcon className="h-3 w-3" />
                  Photos
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-2.5 flex items-center gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {post.likeCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {post._count.comments}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}
