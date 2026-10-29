const { test, expect } = require("@playwright/test");
const { stubWhatsApp, placeOrder, trackErrors } = require("./helpers");

test.beforeEach(async ({ page }) => {
  await stubWhatsApp(page);
});

const flavorSelect = (page) => page.getByLabel("Select Flavor");

test("Coriander Cake is locked to Coriander Flavor", async ({ page }) => {
  await page.goto("/order?cakeId=coriander");
  await expect(flavorSelect(page)).toBeDisabled();
  await expect(flavorSelect(page)).toHaveValue("coriander");
  const message = await placeOrder(page);
  expect(message).toContain("- Cake: Coriander Cake (6-inch)");
  expect(message).toContain("- Flavor: Coriander Flavor");
});

test("Baka Cake is locked to Original Flavor and 6-inch only", async ({ page }) => {
  await page.goto("/order?cakeId=baka");
  await expect(flavorSelect(page)).toBeDisabled();
  await expect(flavorSelect(page)).toHaveValue("original");
  await expect(page.getByRole("button", { name: /inch/ })).toHaveCount(1);
  const message = await placeOrder(page);
  expect(message).toContain("- Price: RM 180");
  expect(message).toContain("- Total Amount: RM 180");
});

test("other cakes offer every flavour except Coriander", async ({ page }) => {
  await page.goto("/order?cakeId=crystal");
  await expect(flavorSelect(page)).toBeEnabled();
  const options = await flavorSelect(page).locator("option").allTextContents();
  expect(options.some((name) => /coriander/i.test(name))).toBe(false);
  expect(options.some((name) => /tiramisu/i.test(name))).toBe(true);
});

test("size, flavour top-up and contact number go into the WhatsApp message", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/order?cakeId=crystal");
  await page.getByRole("button", { name: /^8-inch/ }).click();
  await flavorSelect(page).selectOption("tiramisu");
  await page.getByLabel("Contact Number").fill("012-345 6789");
  await page.getByLabel("Occasion").fill("Birthday");

  const message = await placeOrder(page);
  expect(message).toContain("- Cake: Crystal Cake (8-inch)");
  expect(message).toContain("- Flavor: Tiramisu");
  expect(message).toContain("- Price: RM 200");
  expect(message).toContain("- Flavor Adjustment: RM 30");
  expect(message).toContain("- Total Amount: RM 230");
  expect(message).toContain("- Time: 12 PM - 3 PM");
  expect(message).toContain("- Contact Number: 012-345 6789");
  expect(message).toContain("- Occasion: Birthday");
  expect(errors).toEqual([]);
});

test("WhatsApp message has no blank gaps when there are no extras", async ({ page }) => {
  await page.goto("/order?cakeId=coriander");
  const message = await placeOrder(page);
  const lines = message.split("\n");
  // Only the blank line after the greeting
  expect(lines.filter((line) => line.trim() === "")).toHaveLength(1);
  expect(lines[1].trim()).toBe("");
});

test("delivery date in the message matches the date picked in Malaysia", async ({ page }) => {
  await page.goto("/order");
  // The 20th of next month is always a future date
  await page.locator(".react-calendar__navigation__next-button").click();
  const tile = page.locator(".react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)").filter({ hasText: /^20$/ });
  const label = await tile.locator("abbr").getAttribute("aria-label");
  await tile.click();

  const picked = new Date(`${label} 12:00`);
  const expected = `${picked.getFullYear()}-${String(picked.getMonth() + 1).padStart(2, "0")}-20`;
  const message = await placeOrder(page);
  expect(message).toContain(`- Delivery Date: ${expected}`);
});

test("past dates can't be picked", async ({ page }) => {
  await page.goto("/order");
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const label = yesterday.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "Asia/Kuala_Lumpur" });
  const tile = page.locator(`abbr[aria-label="${label}"]`);
  if (await tile.count()) {
    await expect(tile.locator("xpath=..")).toBeDisabled();
  }
});

test("order page doesn't shift while loading", async ({ page }) => {
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/order?cakeId=flaming");
  await page.waitForLoadState("networkidle");
  expect(await page.evaluate(() => window.__cls)).toBeLessThan(0.1);
});

test("catalogue → cake page → order preselects the cake", async ({ page }) => {
  await page.goto("/cakes");
  await page.locator('a[href="/cakes/mahjong"]').click();
  await expect(page.getByRole("heading", { level: 1, name: "Mahjong Cake" })).toBeVisible();
  await page.getByRole("link", { name: "Order this cake" }).click();
  await expect(page).toHaveURL(/\/order\?cakeId=mahjong$/);
  const message = await placeOrder(page);
  expect(message).toContain("- Cake: Mahjong Cake (6-inch)");
  expect(message).toContain("- Price: RM 160");
});

test("Contact Number is required before opening WhatsApp", async ({ page }) => {
  await page.goto("/order?cakeId=crystal");
  const placeOrderButton = page.getByRole("button", { name: "Place Order" });
  const phone = page.getByLabel("Contact Number");

  await placeOrderButton.click();
  await expect(page.getByText("Please enter your contact number")).toBeVisible();
  await expect(phone).toBeFocused();
  expect(await page.evaluate(() => window.__openedUrl)).toBeUndefined();

  await phone.fill("123");
  await placeOrderButton.click();
  await expect(page.getByText("Please check your contact number")).toBeVisible();
  expect(await page.evaluate(() => window.__openedUrl)).toBeUndefined();

  await phone.fill("+60 12-345 6789");
  await expect(page.getByText("Please check your contact number")).toBeHidden();
  const message = await placeOrder(page);
  expect(message).toContain("- Contact Number: +60 12-345 6789");
});

test("tapping a cake photo selects it", async ({ page }) => {
  await page.goto("/order");
  await page.getByRole("button", { name: /^Angelic Cake/ }).click();
  await expect(page.getByRole("button", { name: /^Angelic Cake/ })).toHaveAttribute("aria-pressed", "true");
  const message = await placeOrder(page);
  expect(message).toContain("- Cake: Angelic Cake (6-inch)");
  expect(message).toContain("- Price: RM 160");
});

test("switching cakes keeps prices and flavours valid", async ({ page }) => {
  await page.goto("/order?cakeId=crystal");
  await page.getByRole("button", { name: /^10-inch/ }).click();
  await flavorSelect(page).selectOption("matcha");

  // Flaming Cake only comes in 6-inch
  await page.getByRole("button", { name: /^Flaming Cake/ }).click();
  let message = await placeOrder(page);
  expect(message).toContain("- Cake: Flaming Cake (6-inch)");
  expect(message).toContain("- Total Amount: RM 170");
  expect(message).toContain("- Flavor: Matcha");

  // Coriander locks its flavour; leaving it clears Coriander Flavor
  await page.getByRole("button", { name: /^Coriander Cake/ }).click();
  await expect(flavorSelect(page)).toHaveValue("coriander");
  await page.getByRole("button", { name: /^Mahjong Cake/ }).click();
  await expect(flavorSelect(page)).toHaveValue("");
  message = await placeOrder(page);
  expect(message).toContain("- Flavor: Not selected");
});
