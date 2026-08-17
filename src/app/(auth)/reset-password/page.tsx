"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { resetPasswordSchema } from "@/types/auth";
import { AuthCard } from "@/components/auth/auth-card";

/**
 * Reached via the emailRedirectTo link from forgot-password. Supabase
 * exchanges the recovery token for a session automatically when this
 * page loads (handled by the client SDK's URL detection), so by the
 * time the user submits, updateUser() just works.
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = resetPasswordSchema.safeParse({ password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password: parsed.data.password,
    });
    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <AuthCard title="Set a new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm text-ink">
            New password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink hover:opacity-90 transition disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Update password"}
        </button>
      </form>
    </AuthCard>
  );
}
