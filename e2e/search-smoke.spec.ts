import { expect, test } from "@playwright/test";

test("site search returns results for a product query", async ({ page }) => {
  await page.goto("/search/?q=nanoflare");

  await expect(page.getByRole("heading", { name: /^Search$/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /nanoflare/i }).first()).toBeVisible();
});

test("header search navigates to results page", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const searchbox = page.getByPlaceholder(/search rackets/i);
  await searchbox.fill("string tension");
  await searchbox.press("Enter");

  await page.waitForURL(/\/search\/\?q=/);
  await expect(page.getByRole("link", { name: /string tension/i }).first()).toBeVisible();
});
