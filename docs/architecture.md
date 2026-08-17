# Architecture — Fudur Conver — Phase 1

## Stack
Next.js (App Router) + TypeScript + Tailwind, Supabase (Postgres, Auth,
RLS), Zod validation. AI layer (Meta Model API / Muse Spark primary,
OpenAI + Anthropic fallback) is specified for Phase 3 and not yet built.

## Tenant model
`workspaces` is the tenant boundary. Every tenant-owned table added in
later phases must carry a `workspace_id` and be covered by RLS via the
`is_workspace_member()` / `is_workspace_admin()` helper functions
introduced in `0002_workspaces.sql`. Frontend filtering is never treated
as a security boundary — see `0003_rls_policies.sql`.

## Auth flow
Supabase Auth, email/password. `src/middleware.ts` refreshes the session
on every request and redirects unauthenticated users away from
`/dashboard` and `/onboarding`. The `(app)/layout.tsx` server component
re-checks auth and workspace membership as defense in depth, and routes
users with no workspace to `/onboarding`.

## Directory layout
```
src/
  app/
    (auth)/        sign-in, sign-up, forgot/reset password, verify-email
    (app)/          protected shell: dashboard, onboarding
    api/auth/callback/   exchanges email-confirmation code for a session
  components/
    layout/         sidebar, topbar, theme toggle
    auth/           shared auth-card wrapper
  lib/
    supabase/       browser client, server client, service-role client, middleware helper
    env.ts           zod-validated server env access
  types/            zod schemas + row types (hand-written stub until `supabase gen types` is run)
supabase/migrations/ profiles, workspaces, RLS
tests/
  unit/             Vitest — schema validation
  e2e/               Playwright — auth redirect behavior
```

## Theming
CSS custom properties in `globals.css`, toggled via a `.dark` class on
`<html>`. `useTheme()` persists the choice to `localStorage`; an inline
script in `app/layout.tsx` applies it before hydration to avoid a flash.

## What's deliberately not here yet
Contacts, conversations, messages, unified inbox, personas, goals,
memory, AI suggestion generation, platform integrations, billing, and
admin are Phase 2 onward per the master build prompt. The sidebar nav
already links to their future routes so the shell reads as complete,
but those routes are not yet implemented.
