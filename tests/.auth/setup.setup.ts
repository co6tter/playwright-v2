import { test, expect } from "@playwright/test";

test("login and save storage", async ({ page, context }) => {
  await page.goto("/login");
  await page.getByTestId("login-username").fill("admin");
  await page.getByTestId("login-password").fill("playwright");
  await page.getByTestId("login-submit").click();
  await expect(page).toHaveURL("/");
  await context.storageState({ path: ".auth/admin.json" });
});
