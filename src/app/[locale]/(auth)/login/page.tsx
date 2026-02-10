"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MobileContainer } from "@/components/layout/mobile-container";
import { Phone, ArrowLeft } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const tc = useTranslations("common");
  const { signInWithOtp, signInWithProvider } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signInWithOtp(phone);
      if (!error) {
        router.push(`/verify?phone=${encodeURIComponent(phone)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileContainer className="relative flex min-h-screen flex-col justify-center overflow-hidden py-8">
      {/* Decorative background circle */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-primary/10 via-violet-200/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-violet-200/20 to-transparent blur-2xl" />

      <div className="relative z-10">
        {/* Back link */}
        <Link href="/" className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" />
          {tc("back")}
        </Link>

        {/* Brand Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
              Beberia
            </span>
          </h1>
          <p className="mt-1.5 text-sm font-medium text-muted-foreground">
            Your Korean Medical Tourism Partner
          </p>
        </div>

        {/* Login Title */}
        <h2 className="mb-6 text-xl font-bold">{t("title")}</h2>

        {/* Phone Form */}
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">{t("phoneLabel")}</Label>
            <div className="relative flex">
              <div className="flex items-center gap-1.5 rounded-l-lg border border-r-0 bg-muted/50 px-3 text-sm font-medium text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>+84</span>
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder={t("phonePlaceholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-l-none"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-violet-600 font-semibold shadow-md transition-all hover:opacity-90 hover:shadow-lg"
            disabled={loading || !phone}
          >
            {t("sendOtp")}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("or")}</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full bg-[#1877F2] text-white shadow-sm transition-all hover:bg-[#1877F2]/90 hover:shadow-md"
            onClick={() => signInWithProvider("facebook")}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            {t("withFacebook")}
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-300 bg-white font-medium shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
            onClick={() => signInWithProvider("google")}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {t("withGoogle")}
          </Button>
          <Button
            className="w-full bg-[#0068FF] text-white shadow-sm transition-all hover:bg-[#0068FF]/90 hover:shadow-md"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16a.725.725 0 01-.457.602l-2.857 1.2a.727.727 0 01-.94-.34L12 7.29l-1.314 2.332a.727.727 0 01-.94.34l-2.857-1.2a.725.725 0 01-.457-.602.725.725 0 01.34-.68l4.5-2.88a.727.727 0 01.756 0l4.5 2.88a.725.725 0 01.34.68zM12 17.76l-4.8-3.36v-3.84L12 13.92l4.8-3.36v3.84L12 17.76z" />
            </svg>
            {t("withZalo")}
          </Button>
        </div>

        {/* Register link */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t("noAccount")}{" "}
          <Link href="/register" className="font-semibold text-primary transition-colors hover:text-violet-600 hover:underline">
            {t("registerLink")}
          </Link>
        </p>

        {/* Footer terms */}
        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground/60">
          By continuing, you agree to Beberia&apos;s{" "}
          <Link href="/terms" className="underline hover:text-muted-foreground">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-muted-foreground">Privacy Policy</Link>
        </p>
      </div>
    </MobileContainer>
  );
}
