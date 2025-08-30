import { test as base } from "@playwright/test";
import { LoginPage } from "../pom/LoginPage";
import { DashboardPage } from "../pom/DashboardPage";
import { ItemFormPage } from "../pom/ItemFormPage";
import { Navbar } from "../pom/Navbar";

export type Fixtures = {
  loginPage: LoginPage;
  dashboard: DashboardPage;
  itemForm: ItemFormPage;
  navbar: Navbar;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, provide) => {
    await provide(new LoginPage(page));
  },
  dashboard: async ({ page }, provide) => {
    await provide(new DashboardPage(page));
  },
  itemForm: async ({ page }, provide) => {
    await provide(new ItemFormPage(page));
  },
  navbar: async ({ page }, provide) => {
    await provide(new Navbar(page));
  },
});

export const expect = test.expect;
