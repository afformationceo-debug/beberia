import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/community/post-card";
import { Link } from "@/i18n/navigation";
import { getPosts } from "@/lib/actions/community";
import { Plus, MessageSquare, Sparkles, PenSquare } from "lucide-react";
import type { CommunityPostType } from "@prisma/client";
import type { Locale } from "@/i18n/routing";

const tabMap: { key: string; type?: CommunityPostType }[] = [
  { key: "all" },
  { key: "qa", type: "QA" },
  { key: "reviews", type: "REVIEW" },
  { key: "beforeAfter", type: "BEFORE_AFTER" },
  { key: "tips", type: "TIP" },
];

export default async function CommunityPage() {
  const locale = (await getLocale()) as Locale;

  // Fetch all posts and filtered posts in parallel
  const [allPosts, qaPosts, reviewPosts, baPosts, tipPosts] = await Promise.all([
    getPosts({ limit: 20 }),
    getPosts({ type: "QA", limit: 20 }),
    getPosts({ type: "REVIEW", limit: 20 }),
    getPosts({ type: "BEFORE_AFTER", limit: 20 }),
    getPosts({ type: "TIP", limit: 20 }),
  ]);

  const postsMap: Record<string, typeof allPosts> = {
    all: allPosts,
    qa: qaPosts,
    reviews: reviewPosts,
    beforeAfter: baPosts,
    tips: tipPosts,
  };

  return (
    <CommunityContent locale={locale} postsMap={postsMap} />
  );
}

function CommunityContent({
  locale,
  postsMap,
}: {
  locale: Locale;
  postsMap: Record<string, { posts: any[]; total: number }>;
}) {
  const t = useTranslations("community");

  const totalPosts = postsMap.all?.total ?? 0;

  return (
    <MobileContainer className="pb-24">
      {/* Gradient Header */}
      <div className="relative -mx-4 overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-5 pb-8 pt-6 text-white">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -left-4 bottom-2 h-20 w-20 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-16 bottom-6 h-10 w-10 rounded-full bg-white/10" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
            {totalPosts > 0 && (
              <span className="ml-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                {totalPosts}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-white/70">
            {t("writePost")}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mt-5">
        <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide">
          <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0">
            {tabMap.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="shrink-0 rounded-full border border-border/60 bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-all data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                {t(`tabs.${tab.key}`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabMap.map((tab) => {
          const data = postsMap[tab.key];
          return (
            <TabsContent key={tab.key} value={tab.key} className="mt-4 space-y-3">
              {data.posts.length > 0 ? (
                data.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="mx-auto mt-6 max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 via-purple-50/60 to-indigo-50 p-8 text-center shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100">
                    <Sparkles className="h-8 w-8 text-violet-500" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    {t("noPosts")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("writeFirst")}
                  </p>
                  <Button size="sm" className="mt-5 rounded-full px-6" asChild>
                    <Link href="/community/posts/new">
                      <PenSquare className="mr-1.5 h-3.5 w-3.5" />
                      {t("writePost")}
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Floating Action Button */}
      <Link
        href="/community/posts/new"
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </MobileContainer>
  );
}
