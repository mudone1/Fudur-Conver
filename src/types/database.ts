/**
 * Hand-written stub matching the Phase 1 schema below. Once Supabase
 * is provisioned, replace this with generated types:
 *   pnpm supabase gen types typescript --project-id <id> > src/types/database.ts
 * Keep it in sync with /supabase/migrations.
 */
export type WorkspaceRole = "owner" | "admin" | "member";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string | null;
          avatar_url: string | null;
          timezone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      workspaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          owner_id: string;
          plan_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["workspaces"]["Row"]> & {
          name: string;
          slug: string;
          owner_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["workspaces"]["Row"]>;
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          role: WorkspaceRole;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["workspace_members"]["Row"]> & {
          workspace_id: string;
          user_id: string;
          role: WorkspaceRole;
        };
        Update: Partial<Database["public"]["Tables"]["workspace_members"]["Row"]>;
      };
    };
  };
}
