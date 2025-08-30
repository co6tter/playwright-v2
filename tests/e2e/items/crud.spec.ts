import { test, expect } from "../../fixtures/base-test";
import type { Item } from "../../../src/types";

const seed = async (page: import("@playwright/test").Page, records: Item[]) => {
  await page.addInitScript((recs) => {
    localStorage.setItem("demo_items_v1", JSON.stringify(recs));
  }, records);
  await page.goto("/");
};

test.describe("items CRUD", () => {
  test.use({ storageState: ".auth/admin.json" });

  test("create", async ({ dashboard, itemForm }) => {
    await seed(dashboard["page"], [
      { id: 1, name: "Apple", qty: 10, price: 120 },
      { id: 2, name: "Banana", qty: 5, price: 80 },
      { id: 3, name: "Cookie", qty: 20, price: 300 },
    ]);

    await dashboard.openNew();
    await itemForm.fill({ name: "Donut", qty: 12, price: 250 });
    await itemForm.save();

    await expect(dashboard["page"].getByTestId("item-row-4")).toContainText(
      "Donut",
    );
  });

  test("edit", async ({ dashboard, itemForm }) => {
    await seed(dashboard["page"], [
      { id: 1, name: "Apple", qty: 10, price: 120 },
      { id: 2, name: "Banana", qty: 5, price: 80 },
      { id: 3, name: "Cookie", qty: 20, price: 300 },
      { id: 4, name: "Donut", qty: 12, price: 250 },
    ]);

    await dashboard.openEdit(4);
    await itemForm.fill({ name: "Donut XL", qty: 24, price: 400 });
    await itemForm.save();

    await expect(dashboard["page"].getByTestId("item-row-4")).toContainText(
      "Donut XL",
    );
    await expect(dashboard["page"].getByTestId("item-row-4")).toContainText(
      "24",
    );
    await expect(dashboard["page"].getByTestId("item-row-4")).toContainText(
      "400",
    );
  });

  test("delete", async ({ dashboard }) => {
    await seed(dashboard["page"], [
      { id: 1, name: "Apple", qty: 10, price: 120 },
      { id: 2, name: "Banana", qty: 5, price: 80 },
      { id: 3, name: "Cookie", qty: 20, price: 300 },
      { id: 4, name: "Donut XL", qty: 24, price: 400 },
    ]);

    await dashboard.delete(4);
    await expect(dashboard["page"].getByTestId("item-row-4")).toHaveCount(0);
  });
});
