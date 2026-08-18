import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/env.public";
import type { Database } from "@/types/database";

/**
 * Browser-side Supabase client. Uses the anon key only — RLS enforces
 * tenant isolation, so this client must never be trusted with
 * privileged operations. Safe to import from client components.
 */
export function createClient() {
  return createBrowserClient<Database>(
    publicEnv.supabaseUrl,
    publicEnv.supabaseAnonKey
  );
}
