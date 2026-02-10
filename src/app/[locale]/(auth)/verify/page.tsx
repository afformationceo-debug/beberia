"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileContainer } from "@/components/layout/mobile-container";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function VerifyPage() {
  const t = useTranslations("auth.verify");
  const tc = useTranslations("common");
  const { verifyOtp, signInWithOtp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await verifyOtp(phone, otp);
      if (!error) {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    await signInWithOtp(phone);
    setCountdown(60);
  };

  return (
    <MobileContainer className="flex min-h-screen flex-col justify-center py-8">
      <div className="mb-8">
        <Link
          href="/login"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {tc("back")}
        </Link>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
        {phone && (
          <p className="mt-1 text-sm font-medium">{phone}</p>
        )}
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder={t("otpPlaceholder")}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="text-center text-2xl tracking-[0.5em]"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loading || otp.length !== 6}
        >
          {t("verify")}
        </Button>
      </form>

      <div className="mt-4 text-center">
        {countdown > 0 ? (
          <p className="text-sm text-muted-foreground">
            {t("resendIn", { seconds: countdown })}
          </p>
        ) : (
          <Button variant="ghost" onClick={handleResend}>
            {t("resend")}
          </Button>
        )}
      </div>
    </MobileContainer>
  );
}
