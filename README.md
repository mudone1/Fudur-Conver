# Fudur Conver — Phase 1

AI-assisted conversation copilot SaaS, branded as **Fudur Conver**. This is the Phase 1 foundation:
auth, workspace/tenant model, RLS, dashboard shell, theming. See
`docs/architecture.md`, `docs/decisions.md`, and `docs/progress.md`
(the last one lists what still needs to be verified — this code has
**not** been installed, type-checked, linted, or built yet).

## Setup

```bash
pnpm install
cp .env.example .env.local   # fill in Supabase + (later) AI provider keys
```

Run the migrations in `supabase/migrations/` against your Supabase
project (SQL editor or `supabase db push`), then:

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
```
