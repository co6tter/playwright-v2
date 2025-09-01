import { test, expect } from "../../fixtures/base-test";
import type { Item } from "../../../src/types";
import { saveState, tryReadState } from "../../helpers/state";

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

    const items = await dashboard["page"].evaluate(() => {
      return JSON.parse(localStorage.getItem("demo_items_v1") || "[]");
    });

    const createdItem = items.find((item: Item) => item.name === "Donut");
    const id = createdItem?.id;
    await saveState("item.json", { id });

    await expect(dashboard["page"].getByTestId(`item-row-${id}`)).toContainText(
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

    const state = await tryReadState<{ id: number }>("item.json");
    if (!state) {
      throw new Error("item.json not found or invalid");
    }
    const { id } = state;
    console.log(id);

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
