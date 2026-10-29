const { test, expect } = require("@playwright/test");
const { trackErrors } = require("./helpers");

test("cake builder: pick a sponge and filling, preview and WhatsApp message follow", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/cake-builder");
  await expect(page.getByRole("heading", { level: 1, name: "Build your cake" })).toBeVisible();
  const preview = page.getByRole("img", { name: /sponge with/ });
  await expect(preview).toHaveAttribute("aria-label", "Original sponge with Fresh Cream filling");

  // Arrow buttons (mouse users can't swipe)
  await page.getByRole("button", { name: "Next sponge" }).click();
  await expect(page.getByRole("listbox", { name: "Sponge" }).getByRole("option", { selected: true })).toHaveAccessibleName("Chocolate");

  // The selected item settles exactly in the centre of the strip, including after a free swipe
  const selectedOffset = (name) =>
    page.getByRole("listbox", { name }).evaluate((strip) => {
      const item = strip.querySelector('[aria-selected="true"]');
      return Math.abs(item.offsetLeft + item.offsetWidth / 2 - (strip.scrollLeft + strip.clientWidth / 2));
    });
  await expect.poll(() => selectedOffset("Sponge")).toBeLessThan(2);
  await page.getByRole("listbox", { name: "Filling" }).evaluate((strip) => strip.scrollBy({ left: 300 }));
  await expect(page.getByRole("listbox", { name: "Filling" }).getByRole("option", { selected: true })).not.toHaveAccessibleName("Fresh Cream");
  await expect.poll(() => selectedOffset("Filling")).toBeLessThan(2);

  // Clicking a side item selects it
  await page.getByRole("listbox", { name: "Filling" }).getByRole("option", { name: "Blueberry" }).click();
  await expect(preview).toHaveAttribute("aria-label", "Chocolate sponge with Blueberry filling");

  // Keyboard
  await page.getByRole("listbox", { name: "Filling" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(preview).toHaveAttribute("aria-label", "Chocolate sponge with Oreo filling");

  // Drawing style switch
  await expect(page.getByRole("button", { name: "Crayon" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Soft" }).click();
  await expect(page.getByRole("button", { name: "Soft" })).toHaveAttribute("aria-pressed", "true");

  const href = await page.getByRole("link", { name: "Ask us on WhatsApp" }).getAttribute("href");
  expect(new URL(href).searchParams.get("text")).toContain("Chocolate sponge and Oreo filling");
  expect(errors).toEqual([]);
});

test("cake builder is hidden from search engines", async ({ page, request }) => {
  await page.goto("/cake-builder");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("cake-builder");
});
