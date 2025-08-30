import { Page } from "@playwright/test";

export class ItemFormPage {
  constructor(private page: Page) {}
  async fill({
    name,
    qty,
    price,
  }: {
    name: string;
    qty: number;
    price: number;
  }) {
    await this.page.getByTestId("item-name").fill(name);
    await this.page.getByTestId("item-qty").fill(String(qty));
    await this.page.getByTestId("item-price").fill(String(price));
  }
  async save() {
    await this.page.getByTestId("item-save").click();
  }
}
