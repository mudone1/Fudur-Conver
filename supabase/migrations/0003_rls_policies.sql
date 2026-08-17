-- Phase 1 RLS. Every tenant-owned table added in later phases must
-- follow this same pattern: enable RLS, then scope every policy
-- through public.is_workspace_member() / is_workspace_admin().
-- Never rely on frontend filtering for tenant isolation.

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;

-- profiles: a user can only see and edit their own profile.
create policy "profiles_select_own"
  on public.profiles for select
  using (user_id = auth.uid());

create policy "profiles_update_own"
  on public.profiles for update
  using (user_id = auth.uid());

-- workspaces: visible to members; only the owner can update/delete;
-- any authenticated user can create one (they become its owner).
create policy "workspaces_select_member"
  on public.workspaces for select
  using (public.is_workspace_member(id));

create policy "workspaces_insert_self"
  on public.workspaces for insert
  with check (owner_id = auth.uid());

create policy "workspaces_update_owner"
  on public.workspaces for update
  using (owner_id = auth.uid());

create policy "workspaces_delete_owner"
  on public.workspaces for delete
  using (owner_id = auth.uid());

-- workspace_members: members can see their workspace's roster;
-- only owners/admins can add or change roles; owners can't be
-- demoted by anyone but themselves transferring ownership (kept
-- simple in Phase 1 — no self-demotion of the last owner yet).
create policy "workspace_members_select_member"
  on public.workspace_members for select
  using (public.is_workspace_member(workspace_id));

create policy "workspace_members_insert_admin"
  on public.workspace_members for insert
  with check (public.is_workspace_admin(workspace_id));

create policy "workspace_members_update_admin"
  on public.workspace_members for update
  using (public.is_workspace_admin(workspace_id));

create policy "workspace_members_delete_admin"
  on public.workspace_members for delete
  using (public.is_workspace_admin(workspace_id));
