import { defineConfig, devices } from "@playwright/test";

/* PW_SERVER=prod runs against `next start` (CI and the Docker visual run); the default reuses a local dev server. */
const PORT = Number(process.env.PW_PORT ?? 3000);
const PROD = process.env.PW_SERVER === "prod";
const VISUAL = /visual\.spec\.ts/;

const desktop = { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } };
const mobile = { ...devices["Pixel 7"] };

export default defineConfig({
  testDir: "e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: true,
  workers: 2,
  forbidOnly: !!process.env.CI,
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}-{projectName}{ext}",
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: PROD ? `npx next start -p ${PORT}` : `npx next dev -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !PROD,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop", testIgnore: VISUAL, use: desktop },
    { name: "mobile", testIgnore: VISUAL, use: mobile },
    { name: "visual-desktop", testMatch: VISUAL, use: desktop },
    { name: "visual-mobile", testMatch: VISUAL, use: mobile },
  ],
});
