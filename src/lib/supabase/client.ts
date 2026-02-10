import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  // Guard: skip creating real client if no valid URL
  if (!supabaseUrl || !supabaseUrl.startsWith("http")) {
    // Return a mock client that won't crash
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
        }),
        signInWithOtp: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        verifyOtp: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        signInWithOAuth: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        signOut: async () => ({ error: null }),
      },
    } as any;
  }

  client = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return client;
}
