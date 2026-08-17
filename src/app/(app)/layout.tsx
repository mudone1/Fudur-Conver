import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { WorkspaceSummary } from "@/types/workspace";

/**
 * Protected app shell. Middleware already redirects unauthenticated
 * requests, but we re-check here as a second line of defense —
 * server components should never assume middleware ran.
 */
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
    .limit(1);

  const first = memberships?.[0];
  const workspace: WorkspaceSummary | null =
    first && first.workspaces
      ? {
          id: (first.workspaces as any).id,
          name: (first.workspaces as any).name,
          slug: (first.workspaces as any).slug,
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
