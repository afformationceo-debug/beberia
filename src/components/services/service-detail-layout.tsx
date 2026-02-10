import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { formatPrice, getLocalizedField } from "@/lib/i18n-helpers";
import { ArrowLeft, Check } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { AdditionalService } from "@prisma/client";
import type { LucideIcon } from "lucide-react";

interface ServiceDetailLayoutProps {
  icon: LucideIcon;
  iconColor: string;
  services: AdditionalService[];
  locale: Locale;
  labels: {
    title: string;
    description: string;
    pricing: string;
    howItWorks: string;
    faq: string;
    bookNow: string;
    perSession: string;
  };
  howItWorksSteps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  features: string[];
}

export function ServiceDetailLayout({
  icon: Icon,
  iconColor,
  services,
  locale,
  labels,
  howItWorksSteps,
  faqs,
  features,
}: ServiceDetailLayoutProps) {
  return (
    <>
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/services">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-lg font-bold">{labels.title}</h1>
      </div>

      {/* Hero */}
      <div className={`rounded-2xl ${iconColor} p-6`}>
        <Icon className="h-10 w-10" />
        <h2 className="mt-3 text-xl font-bold">{labels.title}</h2>
        <p className="mt-1.5 text-sm opacity-80">{labels.description}</p>
      </div>

      {/* Features */}
      <div className="mt-5 space-y-2">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {/* Pricing */}
      {services.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-base font-bold">{labels.pricing}</h3>
          <div className="space-y-2">
            {services.map((svc) => {
              const name = getLocalizedField(svc, "name", locale);
              const desc = getLocalizedField(svc, "description", locale);
              return (
                <Card key={svc.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{name}</p>
                      {desc && (
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                          {desc}
                        </p>
                      )}
                    </div>
                    <div className="ml-3 text-right">
                      <p className="font-bold text-primary">
                        {formatPrice(svc.price, locale)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {labels.perSession}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* How it Works */}
      <div className="mt-6">
        <h3 className="mb-3 text-base font-bold">{labels.howItWorks}</h3>
        <div className="space-y-3">
          {howItWorksSteps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-6">
        <h3 className="mb-3 text-base font-bold">{labels.faq}</h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border p-3">
              <p className="text-sm font-medium">{faq.question}</p>
              <p className="mt-1 text-xs text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* CTA */}
      <Button className="w-full" size="lg" asChild>
        <Link href="/hospitals">{labels.bookNow}</Link>
      </Button>

      <div className="h-4" />
    </>
  );
}
