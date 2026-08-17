-- Phase 1: workspaces + membership. This is the tenant boundary that
-- every future table (contacts, conversations, personas, etc.) hangs
-- off of via workspace_id.
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_id uuid not null references auth.users(id) on delete restrict,
  plan_id text not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger workspaces_set_updated_at
  before update on public.workspaces
  for each row execute function public.set_updated_at();

do $$ begin
  create type public.workspace_role as enum ('owner', 'admin', 'member');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.workspace_role not null default 'member',
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create index if not exists workspace_members_workspace_idx on public.workspace_members(workspace_id);
create index if not exists workspace_members_user_idx on public.workspace_members(user_id);

-- Creating a workspace automatically makes the creator its owner member.
create or replace function public.handle_new_workspace()
returns trigger as $$
begin
  insert into public.workspace_members (workspace_id, user_id, role)
  values (new.id, new.owner_id, 'owner');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_workspace_created
  after insert on public.workspaces
  for each row execute function public.handle_new_workspace();

-- Helper used throughout RLS policies: is the current user a member
-- of the given workspace (optionally at-or-above a minimum role)?
create or replace function public.is_workspace_member(ws_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id and user_id = auth.uid()
  );
$$ language sql security definer stable set search_path = public;

create or replace function public.is_workspace_admin(ws_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
  );
$$ language sql security definer stable set search_path = public;
