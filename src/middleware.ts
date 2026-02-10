import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Update Supabase auth session
  const supabaseResponse = await updateSession(request);

  // Run next-intl middleware
  const intlResponse = intlMiddleware(request);

  // Merge cookies from Supabase session into intl response
  if (supabaseResponse && intlResponse) {
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie.name, cookie.value);
    });
  }

  return intlResponse || supabaseResponse || NextResponse.next();
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /admin (admin dashboard - no locale prefix)
    // - Static files (e.g. favicon.ico, images)
    "/((?!api|_next|_vercel|admin|.*\\..*).*)",
  ],
};
