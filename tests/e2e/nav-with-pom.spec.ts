import { test, expect } from "../fixtures/base-test";

test.use({ storageState: ".auth/admin.json" });

test("open dashboard with storage and see title", async ({ dashboard }) => {
  await dashboard.goto();
  await expect(
    dashboard["page"].getByRole("heading", { name: "Dashboard" }),
  ).toBeVisible();
});
