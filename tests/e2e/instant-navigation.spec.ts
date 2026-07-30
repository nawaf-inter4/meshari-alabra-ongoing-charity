import { expect, test } from "@playwright/test";
import { mockExternalApis } from "./mock-api";

test("section navigation exposes an instant shared shell", async ({ page }) => {
  await mockExternalApis(page);

  await page.goto("/en");
  await page.waitForSelector('a[href="/en/sections/dhikr"]', { state: "attached" });

  const dhikrLink = page.locator('a[href="/en/sections/dhikr"]').first();
  await dhikrLink.scrollIntoViewIfNeeded();

  await dhikrLink.click();
  await expect(page).toHaveURL(/\/en\/sections\/dhikr$/);
  await expect(page.getByRole("heading", { name: "Dhikr Counter" }).first()).toBeVisible();
});