import { expect, test } from "@playwright/test";

test("defensive rackets best-of page renders picks", async ({ page }) => {
  await page.goto("/best/defensive-rackets/");

  await expect(
    page.getByRole("heading", { name: /best defensive badminton rackets/i })
  ).toBeVisible();
  await expect(page.getByText(/Nanoflare 700 Pro/i).first()).toBeVisible();
});

test("site search finds defensive rackets guide", async ({ page }) => {
  await page.goto("/search/?q=defensive%20doubles%20racket");

  await expect(
    page.getByRole("link", { name: /defensive badminton rackets/i }).first()
  ).toBeVisible();
});
