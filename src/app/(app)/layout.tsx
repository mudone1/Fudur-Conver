import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { WorkspaceRole } from "@/types/database";
import type { WorkspaceSummary } from "@/types/workspace";

interface WorkspaceMembershipRow {
  role: WorkspaceRole;
  workspaces: { id: string; name: string; slug: string } | null;
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: memberships } = await supabase
    .from("workspace_members")
    .select("role, workspaces:workspace_id(id, name, slug)")
    .eq("user_id", user.id)
    .limit(1)
    .returns<WorkspaceMembershipRow[]>();

  const first = memberships?.[0];
  const workspace: WorkspaceSummary | null =
    first && first.workspaces
      ? {
          id: first.workspaces.id,
          name: first.workspaces.name,
          slug: first.workspaces.slug,
          role: first.role,
        }
      : null;

  if (!workspace) {
    redirect("/onboarding");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar workspace={workspace} />
        <main className="flex-1 bg-canvas p-6">{children}</main>
      </div>
    </div>
  );
}
