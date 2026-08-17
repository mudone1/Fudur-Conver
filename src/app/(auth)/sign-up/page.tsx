"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { signUpSchema } from "@/types/auth";
import { AuthCard } from "@/components/auth/auth-card";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = signUpSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    setSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <AuthCard
        title="Check your email"
        subtitle="We sent a verification link to confirm your account."
      >
        <Link href="/sign-in" className="text-sm text-accent hover:underline">
          Back to sign in
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Create your account" subtitle="Start your free workspace">
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
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm text-ink">
            Password
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
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="text-sm text-ink-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
