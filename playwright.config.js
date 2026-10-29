// End-to-end tests. Run `npm run build` first, then `npm run test:e2e`.
const { defineConfig, devices } = require("@playwright/test");

const PORT = 3100;

module.exports = defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Customers are in Malaysia; dates in the order message depend on this
    timezoneId: "Asia/Kuala_Lumpur",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: [
    {
      // Fake "Google Sheet" of closed/full delivery dates
      command: "node tests/e2e/blocked-dates-server.js",
      url: "http://localhost:3101",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `npx next start -p ${PORT}`,
      url: `http://localhost:${PORT}`,
      reuseExistingServer: !process.env.CI,
      env: { BLOCKED_DATES_CSV_URL: "http://localhost:3101" },
    },
  ],
});
