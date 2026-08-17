"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createWorkspaceSchema } from "@/types/workspace";

/**
 * Minimal Phase 1 onboarding: create the first workspace. Persona/goal/
 * platform-connection steps described in the master prompt's onboarding
 * flow land in Phase 3/4 once those features exist.
 */
export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = createWorkspaceSchema.safeParse({ name, slug });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Your session expired. Please sign in again.");
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from("workspaces").insert({
      name: parsed.data.name,
      slug: parsed.data.slug,
      owner_id: user.id,
    });

    setSubmitting(false);

    if (insertError) {
      setError(
        insertError.message.includes("duplicate")
          ? "That workspace URL is already taken."
          : "Couldn't create your workspace. Please try again."
      );
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-lg border border-border bg-surface p-8"
      >
        <div>
          <h1 className="font-display text-xl text-ink">Create your workspace</h1>
          <p className="mt-1 text-sm text-ink-muted">
            This is where your conversations, personas, and goals will live.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm text-ink">
            Workspace name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Acme Inc."
            className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="slug" className="text-sm text-ink">
            Workspace URL
          </label>
          <input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            placeholder="acme-inc"
            className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink hover:opacity-90 transition disabled:opacity-50"
        >
          {submitting ? "Creating…" : "Create workspace"}
        </button>
      </form>
    </main>
  );
}
