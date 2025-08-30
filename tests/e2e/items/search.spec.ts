import { test, expect } from "@playwright/test";

test.describe("search", () => {
  test.use({ storageState: ".auth/admin.json" });

  test("filters by name", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();

    await page.getByTestId("search-input").fill("ban");
    await expect(page.getByTestId("item-row-2")).toBeVisible();

    await expect(page.getByTestId("item-row-1")).toHaveCount(0);
    await expect(page.getByTestId("item-row-3")).toHaveCount(0);
  });

  test("clearing search shows all items again", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();

    await page.getByTestId("search-input").fill("cookie");
    await expect(page.getByTestId("item-row-3")).toBeVisible();

    await page.getByTestId("search-input").fill("");
    await expect(page.getByTestId("item-row-1")).toBeVisible();
    await expect(page.getByTestId("item-row-2")).toBeVisible();
    await expect(page.getByTestId("item-row-3")).toBeVisible();
  });
});
