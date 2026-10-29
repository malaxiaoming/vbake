const { test, expect } = require("@playwright/test");
const { stubWhatsApp, placeOrder, trackErrors } = require("./helpers");

const preview = (page) => page.getByRole("img", { name: /sponge with/ });

// Select an option the way a customer would: press the arrow buttons until it's in the centre
async function choose(page, list, name) {
  const listbox = page.getByRole("listbox", { name: list });
  const names = await listbox.getByRole("option").evaluateAll((options) => options.map((o) => o.getAttribute("aria-label")));
  for (let i = 0; i < names.length; i++) {
    const selected = await listbox.getByRole("option", { selected: true }).getAttribute("aria-label");
    if (selected === name) return;
    const direction = names.indexOf(name) > names.indexOf(selected) ? "Next" : "Previous";
    await page.getByRole("button", { name: `${direction} ${list.toLowerCase()}` }).click();
  }
  await expect(listbox.getByRole("option", { selected: true })).toHaveAccessibleName(name);
}

// Distance (px) between the selected item and the centre of its strip
const selectedOffset = (page, name) =>
  page.getByRole("listbox", { name }).evaluate((strip) => {
    const item = strip.querySelector('[aria-selected="true"]');
    return Math.abs(item.offsetLeft + item.offsetWidth / 2 - (strip.scrollLeft + strip.clientWidth / 2));
  });

test.beforeEach(async ({ page }) => {
  await stubWhatsApp(page);
});

test("cake builder: one tier — pick size, sponge and filling, then order on WhatsApp", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/cake-builder");
  await expect(page.getByRole("heading", { level: 1, name: "Build your cake" })).toBeVisible();
  await expect(preview(page)).toHaveAttribute("aria-label", '6" Original sponge with Fresh Cream filling');

  await page.getByRole("button", { name: /^8"/ }).click();

  // Arrow buttons (mouse users can't swipe); the selection settles in the centre
  await page.getByRole("button", { name: "Next sponge" }).click();
  await expect(page.getByRole("listbox", { name: "Sponge" }).getByRole("option", { selected: true })).toHaveAccessibleName("Chocolate");
  await expect.poll(() => selectedOffset(page, "Sponge")).toBeLessThan(2);

  // A free swipe also settles on an item in the centre
  await page.getByRole("listbox", { name: "Filling" }).evaluate((strip) => strip.scrollBy({ left: 300 }));
  await expect(page.getByRole("listbox", { name: "Filling" }).getByRole("option", { selected: true })).not.toHaveAccessibleName("Fresh Cream");
  await expect.poll(() => selectedOffset(page, "Filling")).toBeLessThan(2);

  // Tapping the neighbouring item selects it
  const fillings = page.getByRole("listbox", { name: "Filling" });
  const nextIndex = (await fillings.getByRole("option").evaluateAll((options) => options.findIndex((o) => o.getAttribute("aria-selected") === "true"))) + 1;
  const nextName = await fillings.getByRole("option").nth(nextIndex).getAttribute("aria-label");
  await fillings.getByRole("option").nth(nextIndex).click();
  await expect(fillings.getByRole("option", { selected: true })).toHaveAccessibleName(nextName);

  // Keyboard
  await choose(page, "Filling", "Blueberry");
  await fillings.focus();
  await page.keyboard.press("ArrowRight");
  await expect(preview(page)).toHaveAttribute("aria-label", '8" Chocolate sponge with Oreo filling');

  const message = await placeOrder(page);
  expect(message).toContain("- Cake: One tier, 8-inch");
  expect(message).toContain("- Flavour: Chocolate sponge, Oreo filling");
  expect(message).toContain("- Total Amount: RM 180");
  expect(message).toContain("- Contact Number: 012-345 6789");
  expect(errors).toEqual([]);
});

test("cake builder: two tiers — each tier has its own sponge and filling", async ({ page }) => {
  await page.goto("/cake-builder");
  await page.getByRole("button", { name: "Two tiers" }).click();
  await page.getByRole("button", { name: /6" \+ 10"/ }).click();

  // Top tier is edited first
  await choose(page, "Sponge", "Chocolate");
  await choose(page, "Filling", "Blueberry");

  await page.getByRole("button", { name: /Bottom tier/ }).click();
  await choose(page, "Sponge", "Pandan");
  await choose(page, "Filling", "Black Plum");

  await expect(preview(page)).toHaveAttribute(
    "aria-label",
    'Two-tier cake: top 6" Chocolate sponge with Blueberry filling, bottom 10" Pandan sponge with Black Plum filling'
  );

  // Switching back to the top tier shows its choices again
  await page.getByRole("button", { name: /Top tier/ }).click();
  await expect(page.getByRole("listbox", { name: "Sponge" }).getByRole("option", { selected: true })).toHaveAccessibleName("Chocolate");

  const message = await placeOrder(page);
  expect(message).toContain('- Cake: Two tiers, 6" on top of 10"');
  expect(message).toContain('- Top tier (6"): Chocolate sponge, Blueberry filling');
  expect(message).toContain('- Bottom tier (10"): Pandan sponge, Black Plum filling');
  expect(message).toContain("- Total Amount: RM 400");
});

test("cake builder: two-tier prices and blocked delivery dates", async ({ page }) => {
  await page.goto("/cake-builder");
  await page.getByRole("button", { name: "Two tiers" }).click();
  for (const [label, price] of [['6" + 8"', 350], ['6" + 10"', 400], ['8" + 10"', 450]]) {
    await expect(page.getByRole("button", { name: new RegExp(label.replace("+", "\\+")) })).toContainText(`RM ${price}`);
  }
  // The usual default date (3 days ahead) is marked Full in the test sheet
  await expect(page.getByText("Dates marked Full, Closed or Holiday can't be booked online")).toBeVisible();
  const message = await placeOrder(page);
  const fourDaysAhead = new Date(Date.now() + 8 * 60 * 60 * 1000 + 4 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  expect(message).toContain(`- Delivery Date: ${fourDaysAhead}`);
});

test("cake builder needs a contact number", async ({ page }) => {
  await page.goto("/cake-builder");
  await page.getByRole("button", { name: "Place Order" }).click();
  await expect(page.getByText("Please enter your contact number")).toBeVisible();
  expect(await page.evaluate(() => window.__openedUrl)).toBeUndefined();
});

test("cake builder is hidden from search engines", async ({ page, request }) => {
  await page.goto("/cake-builder");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("cake-builder");
});
