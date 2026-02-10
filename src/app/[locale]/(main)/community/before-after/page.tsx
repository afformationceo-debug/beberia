import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getBeforeAfterPosts } from "@/lib/actions/community";
import { ArrowLeft, Camera, Heart, MessageCircle, Lock } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export default async function BeforeAfterPage() {
  const locale = (await getLocale()) as Locale;

  const posts = await getBeforeAfterPosts(30);

  return <BeforeAfterContent locale={locale} posts={posts} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BeforeAfterContent({
  locale,
  posts,
}: {
  locale: Locale;
  posts: any[];
}) {
  const t = useTranslations("community");

  return (
    <MobileContainer className="py-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/community">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-lg font-bold">{t("tabs.beforeAfter")}</h1>
          <p className="text-xs text-muted-foreground">{t("beforeAfterDesc")}</p>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/community/posts/${post.id}`}>
              <Card className="overflow-hidden transition-colors hover:bg-accent/50">
                {post.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-0.5">
                    {(post.images as string[]).slice(0, 2).map((url: string, i: number) => (
                      <div key={i} className="relative aspect-square bg-muted">
                        <img src={url} alt="" className="h-full w-full object-cover" />
                        <Badge
                          className="absolute left-1 top-1 text-[8px]"
                          variant="secondary"
                        >
                          {i === 0 ? "Before" : "After"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-muted">
                    <div className="text-center">
                      <Lock className="mx-auto h-6 w-6 text-muted-foreground/40" />
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {t("loginToView")}
                      </p>
                    </div>
                  </div>
                )}

                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {post.user.name?.[0] || "U"}
                    </div>
                    <span className="text-xs font-medium">{post.user.name || "User"}</span>
                  </div>
                  <h3 className="mt-1.5 text-sm font-semibold line-clamp-1">{post.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                    {post.content}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <Heart className="h-3 w-3" /> {post.likeCount}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MessageCircle className="h-3 w-3" /> {post._count.comments}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Camera className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-2 text-sm text-muted-foreground">{t("noPosts")}</p>
          <Button size="sm" className="mt-3" asChild>
            <Link href="/community/posts/new">{t("writeFirst")}</Link>
          </Button>
        </div>
      )}

      <div className="h-4" />
    </MobileContainer>
  );
}
