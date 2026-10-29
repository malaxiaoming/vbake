const { expect } = require("@playwright/test");

// Stop Place Order from opening WhatsApp and remember the URL it would have opened
async function stubWhatsApp(page) {
  await page.addInitScript(() => {
    window.open = (url) => {
      window.__openedUrl = url;
    };
  });
}

// Click Place Order and return the pre-filled WhatsApp message text.
// Contact Number is required, so fill a valid one unless the test already did.
async function placeOrder(page) {
  const phone = page.getByLabel("Contact Number");
  if (!(await phone.inputValue())) await phone.fill("012-345 6789");
  await page.getByRole("button", { name: "Place Order" }).click();
  const url = await page.evaluate(() => window.__openedUrl);
  expect(url).toMatch(/^https:\/\/wa\.me\/60149308327\?text=/);
  return new URL(url).searchParams.get("text");
}

// Fail the test on uncaught page errors and console errors (the Pixel warns locally without its ID)
function trackErrors(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

module.exports = { stubWhatsApp, placeOrder, trackErrors };
