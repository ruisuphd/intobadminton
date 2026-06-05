import { expect, test } from "@playwright/test";

test("site search links to catalog with q prefill", async ({ page }) => {
  await page.goto("/search/?q=yonex+nanoflare");

  const catalogLink = page.getByRole("link", {
    name: /browse \d+ products? in the catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", /\/catalog\/\?q=/);

  await catalogLink.click();
  await expect(page).toHaveURL(/\/catalog\/\?q=yonex/);

  const input = page.getByRole("searchbox", {
    name: /search catalog by name or spec/i,
  });
  await expect(input).toHaveValue(/yonex/i);
});

test("catalog CTA shows product count for brand queries", async ({ page }) => {
  await page.goto("/search/?q=yonex");

  await expect(
    page.getByText(/browse \d+ products? in the catalog/i)
  ).toBeVisible();
});
