const { test, expect } = require("@playwright/test");
const { stubWhatsApp } = require("./helpers");

test("contact form opens WhatsApp with the message", async ({ page }) => {
  await stubWhatsApp(page);
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Aisha");
  await page.getByLabel("Phone").fill("012-345 6789");
  await page.getByLabel("Subject").fill("Wedding cake");
  await page.getByLabel("Message").fill("Do you do 3-tier cakes?");
  await page.getByRole("button", { name: "Send via WhatsApp" }).click();

  const url = await page.evaluate(() => window.__openedUrl);
  const text = new URL(url).searchParams.get("text");
  expect(url).toMatch(/^https:\/\/wa\.me\/60149308327/);
  expect(text).toContain("Aisha");
  expect(text).toContain("Do you do 3-tier cakes?");
});
