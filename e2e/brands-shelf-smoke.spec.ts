import { expect, test } from "@playwright/test";

test("brands index shows Keep reading shelf", async ({ page }) => {
  await page.goto("/brands/");

  await expect(
    page.getByRole("heading", { name: /badminton brands we cover/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /yonex vs victor vs li-ning/i }).first()
  ).toBeVisible();
});

test("best-of hub shows Keep reading shelf", async ({ page }) => {
  await page.goto("/best/");

  await expect(
    page.getByRole("heading", { name: /best of badminton/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
});
