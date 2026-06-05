import { expect, test } from "@playwright/test";

test("homepage quick filters reach results page", async ({ page }) => {
  await page.goto("/");

  const quickFilters = page.getByRole("region", {
    name: /skip the quiz — filter the catalogue/i,
  });

  await quickFilters.getByRole("button", { name: /^Club$/i }).click();
  await quickFilters.getByRole("button", { name: /^Doubles$/i }).click();
  await quickFilters.getByRole("button", { name: /View ranked results/i }).click();

  await page.waitForURL(/\/results\//, { timeout: 15_000 });
  await expect(
    page.getByRole("heading", { name: /Your equipment shortlist/i })
  ).toBeVisible();
});
