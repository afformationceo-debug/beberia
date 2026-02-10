"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileContainer } from "@/components/layout/mobile-container";
import { ArrowLeft, Phone } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tLogin = useTranslations("auth.login");
  const tc = useTranslations("common");
  const { signInWithOtp } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    beberiaId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signInWithOtp(formData.phone);
      if (!error) {
        router.push(
          `/verify?phone=${encodeURIComponent(formData.phone)}&name=${encodeURIComponent(formData.name)}&beberiaId=${encodeURIComponent(formData.beberiaId)}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileContainer className="flex min-h-screen flex-col justify-center py-8">
      <div className="mb-8">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" />
          {tc("back")}
        </Link>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("nameLabel")}</Label>
          <Input
            id="name"
            placeholder={t("namePlaceholder")}
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{tLogin("phoneLabel")}</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder={tLogin("phonePlaceholder")}
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="beberiaId">{t("beberiaIdLabel")}</Label>
          <Input
            id="beberiaId"
            placeholder={t("beberiaIdPlaceholder")}
            value={formData.beberiaId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, beberiaId: e.target.value }))
            }
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading || !formData.name || !formData.phone}
        >
          {t("submit")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("hasAccount")}{" "}
        <Link href="/login" className="font-medium text-primary underline">
          {t("loginLink")}
        </Link>
      </p>
    </MobileContainer>
  );
}
