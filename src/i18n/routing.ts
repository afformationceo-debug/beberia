import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "ko", "en"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
