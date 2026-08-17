import { z } from "zod";

/**
 * Server-side environment validation. Import this from server-only code
 * (route handlers, server components, server actions) — never from
 * client components. Throws early and loudly if required vars are
 * missing, instead of failing deep inside a request handler.
 */
const serverEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  META_MODEL_API_KEY: z.string().optional(),
  META_MODEL_API_BASE_URL: z.string().url().optional(),
  META_MODEL_ID: z.string().optional(),

  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().optional(),

  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_MODEL: z.string().optional(),

  AI_PROVIDER_PRIMARY: z.enum(["meta", "openai", "anthropic"]).default("meta"),
  AI_PROVIDER_FALLBACK_ORDER: z.string().default("openai,anthropic"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid or missing environment variables:\n${parsed.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n")}`
    );
  }
  cached = parsed.data;
  return cached;
}

/** Public env is safe to reference from client components. */
export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};
