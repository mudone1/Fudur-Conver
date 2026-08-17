import { describe, expect, it } from "vitest";
import { signUpSchema, signInSchema } from "@/types/auth";

describe("signUpSchema", () => {
  it("rejects a password under 8 characters", () => {
    const result = signUpSchema.safeParse({
      email: "user@example.com",
      password: "short",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid email and password", () => {
    const result = signUpSchema.safeParse({
      email: "user@example.com",
      password: "longenoughpassword",
    });
    expect(result.success).toBe(true);
  });
});

describe("signInSchema", () => {
  it("rejects an invalid email", () => {
    const result = signInSchema.safeParse({
      email: "not-an-email",
      password: "whatever",
    });
    expect(result.success).toBe(false);
  });
});
