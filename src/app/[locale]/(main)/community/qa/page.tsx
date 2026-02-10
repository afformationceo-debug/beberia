import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/community/post-card";
import { Link } from "@/i18n/navigation";
import { getQAPosts } from "@/lib/actions/community";
import { ArrowLeft, HelpCircle, Plus } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export default async function QAPage() {
  const locale = (await getLocale()) as Locale;

  const posts = await getQAPosts(30);

  return <QAContent locale={locale} posts={posts} />;
}

function QAContent({
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
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link href="/community">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-bold">{t("tabs.qa")}</h1>
            <p className="text-xs text-muted-foreground">{t("qaDesc")}</p>
          </div>
        </div>
        <Button size="sm" className="gap-1" asChild>
          <Link href="/community/posts/new">
            <Plus className="h-4 w-4" />
            {t("askQuestion")}
          </Link>
        </Button>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground/30" />
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
