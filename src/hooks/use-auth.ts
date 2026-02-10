"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signInWithOtp = async (phone: string) => {
    return supabase.auth.signInWithOtp({ phone });
  };

  const verifyOtp = async (phone: string, token: string) => {
    return supabase.auth.verifyOtp({ phone, token, type: "sms" });
  };

  const signInWithProvider = async (
    provider: "google" | "facebook"
  ) => {
    return supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  return {
    user,
    loading,
    signInWithOtp,
    verifyOtp,
    signInWithProvider,
    signOut,
  };
}
