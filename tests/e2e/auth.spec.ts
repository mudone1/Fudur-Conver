import { test, expect } from "@playwright/test";

// Placeholder E2E scaffold for Phase 1. Expand once Supabase is
// provisioned in a test project — do not point this at production
// or real user data (see Section 38 of the master prompt).
test.describe("Authentication", () => {
  test("landing page shows sign in and sign up", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Get started" })).toBeVisible();
  });

  test("unauthenticated user is redirected away from /dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/sign-in/);
  });
});
