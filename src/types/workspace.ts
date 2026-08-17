import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(2, "Workspace name must be at least 2 characters").max(60),
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;

export interface WorkspaceSummary {
  id: string;
  name: string;
  slug: string;
  role: "owner" | "admin" | "member";
}
