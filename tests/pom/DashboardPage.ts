import { Page, expect } from "@playwright/test";

export class DashboardPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto("/");
  }
  async search(q: string) {
    await this.page.getByTestId("search-input").fill(q);
  }
  rowById(id: number) {
    return this.page.getByTestId(`item-row-${id}`);
  }
  async openNew() {
    await this.page.getByTestId("new-item").click();
  }
  async openEdit(id: number) {
    await this.page.getByTestId(`edit-${id}`).click();
  }
  async expectRowVisible(id: number) {
    await expect(this.rowById(id)).toBeVisible();
  }
}
