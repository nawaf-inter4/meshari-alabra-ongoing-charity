import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  // The animated single-page landing is intentionally resource-intensive. A
  // single worker keeps hydration and navigation assertions deterministic on
  // both small CI runners and local machines.
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    // Keep automated white-label tests isolated from the developer's normal
    // localhost:3000 session so test branding and service workers cannot leak.
    baseURL: "http://localhost:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "npm run dev -- --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ...process.env,
      NEXT_DIST_DIR: ".next-playwright",
      // Pin canonical host so SEO assertions match CI even when .env.local points at localhost.
      NEXT_PUBLIC_SITE_URL: "https://meshari.charity",
      NEXT_PUBLIC_SITE_NAME: "Test Ongoing Charity",
      NEXT_PUBLIC_SITE_SHORT_NAME: "Test Charity",
      NEXT_PUBLIC_ORGANIZATION_NAME: "Test Charity Foundation",
      NEXT_PUBLIC_SEO_TITLE: "Test Ongoing Charity",
      NEXT_PUBLIC_COLOR_BRAND: "#C49A2C",
    },
  },
});
