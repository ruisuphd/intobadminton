import { expect, test } from "@playwright/test";

test("reviews hub filters narrow the list", async ({ page }) => {
  await page.goto("/review/");

  await expect(page.getByRole("heading", { name: /^Reviews$/i })).toBeVisible();

  const search = page.getByRole("searchbox");
  await search.fill("Astrox");
  await expect(page.getByText(/Showing \d+ of/i)).toBeVisible();

  await page.getByRole("button", { name: /^In catalog$/i }).click();
  await expect(page.getByText(/Showing \d+ of/i)).toBeVisible();

  await page.getByRole("button", { name: /^Rackets$/i }).click();
  await expect(page.getByRole("link").filter({ hasText: /Astrox/i }).first()).toBeVisible();
});
