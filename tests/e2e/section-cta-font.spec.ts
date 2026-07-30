import { expect, test } from "@playwright/test";
import { mockExternalApis } from "./mock-api";

test.beforeEach(async ({ page }) => {
  await mockExternalApis(page);
});

test("Visit Section CTA uses direction-appropriate typography", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

  const ltrCta = page.getByText("Visit Section", { exact: true }).first();
  await expect(ltrCta).toBeVisible();
  const ltrFont = await ltrCta.evaluate((element) => getComputedStyle(element).fontFamily);
  expect(ltrFont).toContain("Lexend Deca");
  expect(ltrFont).not.toContain("Amiri");

  await page.goto("/ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  const rtlCta = page.getByText("زيارة القسم", { exact: true }).first();
  await expect(rtlCta).toBeVisible();
  const rtlFont = await rtlCta.evaluate((element) => getComputedStyle(element).fontFamily);
  expect(rtlFont).toContain("Tajawal");
  expect(rtlFont).not.toContain("Lexend Deca");
});
