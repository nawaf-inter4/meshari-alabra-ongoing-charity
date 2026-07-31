import { expect, test } from "@playwright/test";
import { mockExternalApis } from "./mock-api";

test.beforeEach(async ({ page }) => {
  await mockExternalApis(page);
});

test("publishes white-label identity, PWA, assets, and theme from one configuration", async ({ page, request }) => {
  const manifestResponse = await request.get("/manifest.webmanifest");
  expect(manifestResponse.ok()).toBeTruthy();

  const manifest = await manifestResponse.json();
  expect(manifest).toMatchObject({
    name: "Test Ongoing Charity",
    short_name: "Test Charity",
    theme_color: "#C49A2C",
    background_color: "#0F172A",
  });
  expect(manifest.icons).toContainEqual(
    expect.objectContaining({ src: "/icons/icon-512x512.png", sizes: "512x512" }),
  );

  const llmsResponse = await request.get("/llms.txt");
  expect(llmsResponse.ok()).toBeTruthy();
  const llmsText = await llmsResponse.text();
  expect(llmsText).toContain("# Test Ongoing Charity");
  expect(llmsText).toMatch(/\[.+\]\(https?:\/\/.+\)/);
  expect(llmsResponse.headers()["content-type"] || "").toContain("text/markdown");

  await page.goto("/en");
  // Below-fold sections mount near-viewport; reveal a few so theme borders are present.
  for (const section of ["quran", "donation", "youtube", "supplications"]) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${section} h2`).first()).toBeVisible({ timeout: 15_000 });
  }
  await expect(page).toHaveTitle(/Test Ongoing Charity/);
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/manifest.webmanifest");
  await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", "/favicon.svg");
  await expect(page.locator("[data-site-logo]")).toHaveCount(0);
  await expect(page.locator("[data-memorial-card]")).toHaveCSS(
    "border-color",
    "rgba(196, 154, 44, 0.3)",
  );

  const goldBorderColors = await page.locator('[class*="border-islamic-gold"]').evaluateAll((elements) =>
    elements.flatMap((element) => {
      const hasPersistentGoldBorder = Array.from(element.classList).some((className) =>
        className === "border-islamic-gold" ||
        className.startsWith("border-islamic-gold/") ||
        className.startsWith("border-t-islamic-gold"),
      );
      if (!hasPersistentGoldBorder) return [];
      const styles = getComputedStyle(element);
      return parseFloat(styles.borderTopWidth) > 0 ? [styles.borderTopColor] : [];
    }),
  );
  expect(goldBorderColors.length).toBeGreaterThan(3);
  expect(goldBorderColors.every((color) => color.includes("196, 154, 44"))).toBeTruthy();

  const colors = await page.locator("html").evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      brand: styles.getPropertyValue("--color-brand").trim(),
      dark: styles.getPropertyValue("--color-background-dark").trim(),
      light: styles.getPropertyValue("--color-background-light").trim(),
    };
  });

  expect(colors).toEqual({ brand: "#C49A2C", dark: "#0F172A", light: "#FAF8F3" });

  await page.goto("/sections/dhikr");
  await expect(page).toHaveTitle(/Test Charity/);
});

test("exposes a redirect-free deployment health check", async ({ request }) => {
  const response = await request.get("/health", { maxRedirects: 0 });
  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toMatchObject({ status: "ok" });
});
