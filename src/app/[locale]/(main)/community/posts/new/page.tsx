import { useTranslations } from "next-intl";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Button } from "@/components/ui/button";
import { PostForm } from "@/components/community/post-form";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function NewPostPage() {
  return <NewPostContent />;
}

function NewPostContent() {
  const t = useTranslations("community");

  const labels = {
    type: t("form.type"),
    types: {
      QA: t("tabs.qa"),
      REVIEW: t("tabs.reviews"),
      BEFORE_AFTER: t("tabs.beforeAfter"),
      DISCUSSION: t("form.discussion"),
      TIP: t("tabs.tips"),
    },
    title: t("form.title"),
    titlePlaceholder: t("form.titlePlaceholder"),
    content: t("form.content"),
    contentPlaceholder: t("form.contentPlaceholder"),
    submit: t("form.submit"),
    success: t("form.success"),
    loginRequired: t("loginRequired"),
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
        <h1 className="text-lg font-bold">{t("writePost")}</h1>
      </div>

      <PostForm labels={labels} />

      <div className="h-4" />
    </MobileContainer>
  );
}
