import { expect, test } from "@playwright/test";

test("compare-guides hub shows Keep reading shelf", async ({ page }) => {
  await page.goto("/compare-guides/");

  await expect(
    page.getByRole("heading", { name: /badminton comparison guides/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /best-of buying guides/i }).first()
  ).toBeVisible();
});

test("guides hub shows Keep reading shelf", async ({ page }) => {
  await page.goto("/guides/");

  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /string tension guide/i }).first()
  ).toBeVisible();
});

test("search page shows Keep reading shelf", async ({ page }) => {
  await page.goto("/search/");

  await expect(page.getByRole("heading", { name: /^search$/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /compare products/i }).first()
  ).toBeVisible();
});

test("saved shelf shows Keep reading when empty", async ({ page }) => {
  await page.goto("/saved/");

  await expect(
    page.getByRole("heading", { name: /your saved shelf/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
});
