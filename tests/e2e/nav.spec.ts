import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test.use({ storageState: ".auth/admin.json" });

  test("dashboard visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();
  });
});
