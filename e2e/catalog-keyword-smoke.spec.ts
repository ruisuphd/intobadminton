import { expect, test } from "@playwright/test";

test("catalog keyword search filters via shareable q param", async ({ page }) => {
  await page.goto("/catalog/?q=yonex+nanoflare");

  const input = page.getByRole("searchbox", {
    name: /search catalog by name or spec/i,
  });
  await expect(input).toHaveValue("yonex nanoflare");

  const rows = page.locator("ul.divide-y > li");
  await expect(rows.first()).toBeVisible();
  const count = await rows.count();
  expect(count).toBeGreaterThan(0);
  await expect(page.getByText(/products match your search/i)).toBeVisible();
  await expect(
    page.getByRole("link").filter({ hasText: /Yonex.*Nanoflare/i }).first()
  ).toBeVisible();

  await input.fill("zzzznotaproduct");
  await expect(page.getByText(/no products match/i)).toBeVisible();
});

test("catalog keyword round-trips in URL", async ({ page }) => {
  await page.goto("/catalog/");
  const input = page.getByRole("searchbox", {
    name: /search catalog by name or spec/i,
  });
  await input.fill("nanoflare");
  await expect(page).toHaveURL(/q=nanoflare/);
});
