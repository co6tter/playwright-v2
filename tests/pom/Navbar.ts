import { Page, expect } from "@playwright/test";

export class Navbar {
  constructor(private page: Page) {}
  async logout() {
    await this.page.getByTestId("nav-logout").click();
    await expect(this.page).toHaveURL(/\/login$/);
  }
}
