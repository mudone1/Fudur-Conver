import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getServerEnv } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Server-side Supabase client for use in Server Components, Route
 * Handlers, and Server Actions. Reads/writes the auth cookie via
 * Next's cookies() API. Still runs under RLS with the anon key —
 * this is NOT the service-role client.
 */
export async function createClient() {
  const env = getServerEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — middleware refreshes
            // the session instead, so this can be safely ignored.
          }
        },
      },
    }
  );
}

/**
 * Service-role client. Bypasses RLS entirely — use ONLY in trusted
 * server-side code that performs its own authorization checks
 * (e.g. admin routes, background jobs, webhook handlers). Never
 * import this into anything reachable from a client component.
 */
export function createServiceRoleClient() {
  const env = getServerEnv();
  const { createClient: createSupabaseClient } = require("@supabase/supabase-js");
  return createSupabaseClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
