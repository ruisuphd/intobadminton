import { expect, test } from "@playwright/test";

test("header search has catalog split button", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const catalogBtn = page.getByRole("button", { name: "Catalog" }).first();
  await expect(catalogBtn).toBeVisible();
});

test("header catalog button routes to catalog with q prefill", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const searchbox = page.getByRole("combobox", {
    name: /search reviews, products, and guides/i,
  });
  await searchbox.fill("yonex astrox");

  await page.getByRole("button", { name: "Catalog" }).first().click();
  await expect(page).toHaveURL(/\/catalog\/\?q=yonex/);
});

test("search page shows autocomplete suggestions", async ({ page }) => {
  await page.goto("/search/");

  const input = page.getByRole("combobox", { name: /search intobadminton/i });
  await input.fill("string tension");

  const listbox = page.getByRole("listbox");
  await expect(listbox).toBeVisible();
  await expect(listbox.getByRole("option").first()).toBeVisible();
});
