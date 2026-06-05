import { expect, test } from "@playwright/test";

test("site search returns results for a product query", async ({ page }) => {
  await page.goto("/search/?q=nanoflare");

  await expect(page.getByRole("heading", { name: /^Search$/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /nanoflare/i }).first()).toBeVisible();
});

test("site search finds budget rackets guide", async ({ page }) => {
  await page.goto("/search/?q=budget%20rackets%20under%20100");

  await expect(
    page.getByRole("link", { name: /rackets under \$100/i }).first()
  ).toBeVisible();
});

test("site search finds review by body keyword BG80", async ({ page }) => {
  await page.goto("/search/?q=BG80");

  await expect(page.getByRole("heading", { name: /^Search$/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /l69|BG80|string/i }).first()
  ).toBeVisible();
});

test("header search navigates to results page", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const searchbox = page.locator("header").getByPlaceholder(/search rackets/i);
  await searchbox.fill("string tension");
  await searchbox.press("Enter");

  await page.waitForURL(/\/search\/\?q=/);
  await expect(page.getByRole("link", { name: /string tension/i }).first()).toBeVisible();
});

test("site search tolerates common typos", async ({ page }) => {
  await page.goto("/search/?q=badmintn%20string%20tenson");

  await expect(
    page.getByRole("link", { name: /string tension/i }).first()
  ).toBeVisible();
});
