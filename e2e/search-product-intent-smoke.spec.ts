import { expect, test } from "@playwright/test";

/** Catalogue SKU with no editorial index row — see search-submit-route.test.ts */
const PRODUCT_ONLY_QUERY = "ac102c";

test("header search submit routes product-only query to catalog", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const searchbox = page.getByRole("combobox", {
    name: /search reviews, products, and guides/i,
  });
  await searchbox.fill(PRODUCT_ONLY_QUERY);
  await page.getByRole("button", { name: "Search" }).first().click();

  await expect(page).toHaveURL(new RegExp(`/catalog/\\?q=${PRODUCT_ONLY_QUERY}`));
});

test("search page redirects product-only query to catalog", async ({ page }) => {
  await page.goto(`/search/?q=${PRODUCT_ONLY_QUERY}`);

  await expect(page).toHaveURL(new RegExp(`/catalog/\\?q=${PRODUCT_ONLY_QUERY}`));
});

test("editorial query stays on search page", async ({ page }) => {
  await page.goto("/search/?q=string+tension");

  await expect(page).toHaveURL(/\/search\/\?q=string/);
  await expect(page.getByRole("heading", { name: "Search" })).toBeVisible();
});
