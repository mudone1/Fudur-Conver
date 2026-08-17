# Decisions

## 2026 — AI provider: Meta Model API (Muse Spark) primary, OpenAI/Anthropic fallback
Per the updated master prompt, the AI layer (built in Phase 3) will use
Meta Model API as the primary provider with OpenAI and Anthropic as
configurable fallbacks, behind a single `AIProvider` interface. Not yet
implemented in this phase — `.env.example` and `src/lib/env.ts` already
reserve the relevant variables so Phase 3 doesn't require an env-shape
migration.

## Typography
Display font: Fraunces (serif, editorial). Interface font: Inter. Chosen
to avoid the default "Inter everywhere" template look while keeping body
text highly readable. Font loading (next/font) to be wired up when the
real font files/packages are installed — CSS variables are already named
`--font-display` / `--font-sans` so this is a drop-in swap.

## Package manager
pnpm, per the master prompt. `packageManager` field pinned in
`package.json`.

## No Firebase
Confirmed constraint from the master prompt — Supabase covers auth, DB,
storage, and realtime instead.

## RLS helper functions over inline policy logic
`is_workspace_member()` / `is_workspace_admin()` are `security definer`
functions so policies stay short and consistent as more tenant-owned
tables are added in later phases, instead of repeating a membership
subquery in every policy.

## Branding — Fudur Conver
Product named and logo supplied by the user (`public/logo.png`, also
used as the Next.js app icon at `src/app/icon.png`). Theme accent
colors in `globals.css` (`--accent`, `--brand-orange`) were tuned to
match the logo's green/orange palette. The full logo asset (dark
square background, wordmark included) is used on marketing-style
surfaces (landing page) where its own background works; chrome that
must adapt to light/dark surfaces (sidebar, auth cards) uses a plain
two-tone text wordmark instead, since the logo file isn't a
transparent-background icon mark. If a transparent icon-only export
becomes available, swap it into the sidebar and `app/icon.png`.
