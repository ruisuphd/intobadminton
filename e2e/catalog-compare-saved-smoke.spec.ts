import { expect, test } from "@playwright/test";

test("catalog product deep link highlights a row", async ({ page }) => {
  await page.goto("/catalog/?id=yy-nanoflare-1000z");

  await expect(
    page.getByRole("heading", { name: /Equipment catalog/i })
  ).toBeVisible();

  const row = page.locator("#catalog-product-yy-nanoflare-1000z");
  await expect(row).toBeVisible();
  await expect(row.getByText(/Nanoflare/i).first()).toBeVisible();
});

test("catalog filters sync to URL and narrow results", async ({ page }) => {
  await page.goto("/catalog/?cat=racket&brand=Yonex");

  await expect(
    page.getByRole("heading", { name: /Equipment catalog/i })
  ).toBeVisible();

  const yonexLinks = page.getByRole("link").filter({ hasText: /Yonex/i });
  await expect(yonexLinks.first()).toBeVisible();

  const url = page.url();
  expect(url).toContain("cat=racket");
  expect(url).toContain("brand=Yonex");
});

test("compare page loads shared product set from URL", async ({ page }) => {
  await page.goto("/compare/?p=yy-nanoflare-1000z,yy-astrox-100zz");

  await expect(
    page.getByRole("heading", {
      name: /Compare badminton equipment, spec for spec/i,
    })
  ).toBeVisible();

  await expect(page.getByRole("table")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText(/Nanoflare/i).first()).toBeVisible();
  await expect(page.getByText(/Astrox 100ZZ/i).first()).toBeVisible();
});

test("saved shelf persists a product from results", async ({ page }) => {
  await page.goto("/quiz/");
  const funnel = page.locator("#quiz-funnel");

  await funnel.getByRole("button", { name: /^Club$/i }).click();
  await funnel.getByRole("button", { name: /^Doubles$/i }).click();
  await funnel.getByRole("button", { name: /^Balanced$/i }).click();
  await funnel.getByRole("button", { name: /^Continue$/i }).click();
  await funnel.getByRole("button", { name: /^Racket$/i }).click();
  await funnel.getByRole("button", { name: /See recommendations/i }).click();

  await page.waitForURL(/\/results\//, { timeout: 15_000 });

  await page.getByRole("button", { name: /Save .* for later/i }).first().click();

  await page.goto("/saved/");
  await expect(
    page.getByRole("heading", { name: /Your saved shelf/i })
  ).toBeVisible();
  await expect(page.getByText(/1 item saved/i)).toBeVisible();
});
