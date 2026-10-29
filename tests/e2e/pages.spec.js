const { test, expect } = require("@playwright/test");
const { trackErrors } = require("./helpers");
const { cakes } = require("../../src/data/cakes");

const pages = [
  { path: "/", heading: "Custom cakes, baked with love in KL" },
  { path: "/cakes", heading: "Our Cakes" },
  { path: "/order", heading: "Order your cake" },
  { path: "/contact", heading: "Contact Us" },
];

for (const { path, heading } of pages) {
  test(`${path} loads without errors`, async ({ page }) => {
    const errors = trackErrors(page);
    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page).toHaveTitle(/VBake\.KL/);
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
}

test("every cake has its own page", async ({ page }) => {
  for (const cake of cakes) {
    const response = await page.goto(`/cakes/${cake.id}`);
    expect(response.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: cake.name })).toBeVisible();
    await expect(page).toHaveTitle(`${cake.name} in KL | VBake.KL`);
  }
});

test("unknown cake returns 404", async ({ page }) => {
  const response = await page.goto("/cakes/not-a-cake");
  expect(response.status()).toBe(404);
});

test("removed pages redirect to the cakes catalogue", async ({ page }) => {
  for (const path of ["/promotions", "/gifts", "/flowers", "/catering"]) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/cakes$/);
  }
});

test("sitemap lists the main pages and every cake page", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("<loc>https://www.vbakekl.com</loc>");
  for (const cake of cakes) {
    expect(sitemap).toContain(`<loc>https://www.vbakekl.com/cakes/${cake.id}</loc>`);
  }
});

test("occasion filter on the catalogue shows matching cakes", async ({ page }) => {
  await page.goto("/cakes");
  const cards = page.locator('a[href^="/cakes/"]');
  await expect(cards).toHaveCount(cakes.length);
  await page.getByRole("button", { name: "Weddings", exact: true }).click();
  await expect(cards).toHaveCount(cakes.filter((cake) => cake.occasions.includes("Weddings")).length);
});

test("homepage shows customer reviews", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "What our customers say" })).toBeVisible();
  await expect(page.locator("figure blockquote")).toHaveCount(require("../../src/data/reviews").reviews.length);
  await expect(page.getByRole("link", { name: "See the real chats on Instagram" })).toHaveAttribute("href", /instagram\.com/);
});
