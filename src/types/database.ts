export type WorkspaceRole = "owner" | "admin" | "member";

export interface Database {
  __InternalSupabase: {
    PostgrestVersion: "13";
  };
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey";
            columns: ["workspace_id"];
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      workspace_role: WorkspaceRole;
    };
    CompositeTypes: Record<string, never>;
  };
}
