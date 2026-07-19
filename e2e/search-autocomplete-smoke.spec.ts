import { expect, test } from "@playwright/test";

test("header compact search has search submit without catalog button", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const headerForm = page.locator("header form[role='search']");
  await expect(headerForm.getByRole("button", { name: "Search" })).toBeVisible();
  await expect(headerForm.getByRole("button", { name: "Catalog" })).toHaveCount(
    0
  );
});

test("hero catalog button routes to catalog with q prefill", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const heroSearch = page.locator('main form[role="search"][action="/search/"]');
  await heroSearch.getByRole("searchbox").fill("yonex astrox");
  await heroSearch.getByRole("button", { name: "Catalog" }).click();
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
