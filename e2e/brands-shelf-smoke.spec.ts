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

test("brands hub links to dedicated Anta guide", async ({ page }) => {
  await page.goto("/brands/");

  await expect(page.getByRole("link", { name: /read the anta guide/i })).toBeVisible();
});

test("Anta brand page renders catalogue context", async ({ page }) => {
  await page.goto("/brands/anta/");

  await expect(
    page.getByRole("heading", { name: /anta badminton/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /anta ah600w review/i })).toBeVisible();
});

test("Anta brand page links to filtered catalog browse", async ({ page }) => {
  await page.goto("/brands/anta/");

  const catalogLink = page.getByRole("link", {
    name: /browse anta in catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/?brand=Anta");
});

test("best-of hub shows Keep reading shelf", async ({ page }) => {
  await page.goto("/best/");

  await expect(
    page.getByRole("heading", { name: /best of badminton/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
});
