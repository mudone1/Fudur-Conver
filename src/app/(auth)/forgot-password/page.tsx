"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { forgotPasswordSchema } from "@/types/auth";
import { AuthCard } from "@/components/auth/auth-card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      parsed.data.email,
      { redirectTo: `${window.location.origin}/reset-password` }
    );
    setSubmitting(false);

    // Always show the same success state, whether or not the email
    // exists — don't leak account existence.
    if (resetError) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <AuthCard
        title="Check your email"
        subtitle="If an account exists for that address, we sent a password reset link."
      >
        <Link href="/sign-in" className="text-sm text-accent hover:underline">
          Back to sign in
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Reset your password" subtitle="We'll email you a reset link">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink hover:opacity-90 transition disabled:opacity-50"
        >
          {submitting ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </AuthCard>
  );
}
