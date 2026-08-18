/**
 * Client-safe public env exports. This file intentionally avoids
 * importing server-only modules like `zod` so it can be used from
 * client components without pulling server runtime code into the
 * client bundle.
 */
export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};
