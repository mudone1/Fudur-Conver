# Progress

## Phase 1 — Foundation — status: code complete, NOT yet verified

### What was implemented
- Next.js 15 / TypeScript / Tailwind project scaffold
- Theme system (light/dark via CSS vars + `.dark` class, no FOUC)
- Supabase browser client, server client, service-role client, middleware session refresh
- Auth: sign up, sign in, sign out (via Supabase client), forgot password,
  reset password, verify-email holding page, email-callback route handler
- Workspace model: `profiles`, `workspaces`, `workspace_members` migrations + RLS
- Onboarding: create-workspace form (Zod-validated)
- Protected app shell: sidebar nav (all Phase 2+ routes linked but not
  yet built), topbar with theme toggle, dashboard page with placeholder stats
- Testing foundation: Vitest config + 2 unit spec files (schema validation),
  Playwright config + 1 e2e spec file (auth redirect + landing page)
- `.env.example`, `docs/architecture.md`, `docs/decisions.md`

### Files created
See repository tree — root config (package.json, tsconfig, tailwind,
eslint, prettier), `src/app/**`, `src/components/**`, `src/lib/**`,
`src/types/**`, `src/hooks/**`, `supabase/migrations/000{1,2,3}_*.sql`,
`tests/**`, `docs/**`.

### Tests run
**None yet — could not run them in the build environment.** This sandbox
has no network egress, so `pnpm install` cannot reach the npm registry
and no `node_modules` exist. Type-check, lint, unit tests, and build
have NOT been executed against this code. Treat it as a first draft that
needs verification, not as CI-green code.

### Remaining issues / next steps (run these locally or in CI)
1. `pnpm install`
2. `pnpm typecheck` — likely candidates for errors: the `as any` casts in
   `(app)/layout.tsx` around the Supabase join result (tighten once
   `database.ts` has generated types), and Next 15's async `cookies()`/
   route param API surface, which shifts across minor versions.
3. `pnpm lint`
4. `pnpm test` (Vitest)
5. Provision a real Supabase project, run the 3 migrations, fill in
   `.env.local` from `.env.example`, then `pnpm dev` and manually walk
   the sign-up → verify-email → onboarding → dashboard flow.
6. `pnpm build` for a production build check.
7. `pnpm test:e2e` (Playwright) against a running dev server + seeded
   Supabase test project.
8. Sidebar links to `/inbox`, `/contacts`, `/personas`, `/goals`,
   `/connections`, `/analytics`, `/billing`, `/settings` — these 404
   until Phase 2/3/5/6 build them out.
9. Wire up real font loading (`next/font`) for Fraunces/Inter — CSS
   variables are named and ready but font files/packages aren't pulled
   in yet.

## Phase 2 onward
Not started. Proceed only after the Phase 1 issues above are resolved.

## Branding pass — status: code complete, NOT yet verified
- Applied product name "Fudur Conver" to package.json, page metadata,
  README, landing page, sidebar, and auth cards.
- Added `public/logo.png` (user-supplied) and `src/app/icon.png` for
  the Next.js auto favicon.
- Retuned `--accent` / added `--brand-orange` in globals.css to match
  the logo's palette.
- Not yet verified: same caveat as Phase 1 — no `pnpm install`/build
  was possible in this sandbox (no network egress). Confirm the
  favicon renders correctly and the landing-page logo sizing looks
  right once `pnpm dev` actually runs.
- Follow-up: current logo file has a dark background baked in, so it
  only appears in the landing page hero. Sidebar/auth-card branding
  uses a text wordmark until a transparent icon-only asset exists.
