import { describe, expect, it } from "vitest";
import { createWorkspaceSchema } from "@/types/workspace";

describe("createWorkspaceSchema", () => {
  it("accepts a valid name and slug", () => {
    const result = createWorkspaceSchema.safeParse({
      name: "Acme Inc.",
      slug: "acme-inc",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a slug with uppercase or spaces", () => {
    const result = createWorkspaceSchema.safeParse({
      name: "Acme Inc.",
      slug: "Acme Inc",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a name that's too short", () => {
    const result = createWorkspaceSchema.safeParse({
      name: "A",
      slug: "a",
    });
    expect(result.success).toBe(false);
  });
});
