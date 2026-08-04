import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Cheap accessibility bar: critical/serious axe findings on the Arabic
 * homepage (default locale). Chromium-only to keep CI time reasonable.
 */
test.describe("homepage accessibility", () => {
  test("arabic homepage has no critical or serious axe violations", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "axe smoke runs on Chromium only");

    await page.goto("/ar", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main, [role='main'], body").first()).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    );

    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
});
