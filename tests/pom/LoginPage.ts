import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto("/login");
  }
  async login(u: string, p: string) {
    await this.page.getByTestId("login-username").fill(u);
    await this.page.getByTestId("login-password").fill(p);
    await this.page.getByTestId("login-submit").click();
  }
  async assertError() {
    await expect(this.page.getByTestId("login-error")).toBeVisible();
  }
}
