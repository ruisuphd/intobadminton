import { expect, test } from "@playwright/test";

test("compare-guides hub shows Keep reading shelf", async ({ page }) => {
  await page.goto("/compare-guides/");

  await expect(
    page.getByRole("heading", { name: /badminton comparison guides/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /best-of buying guides/i }).first()
  ).toBeVisible();
});

test("compare-guides hub links to full catalog browse", async ({ page }) => {
  await page.goto("/compare-guides/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("product compare guide links to filtered catalog browse", async ({
  page,
}) => {
  await page.goto("/compare-guides/astrox-99-pro-vs-astrox-100zz/");

  const catalogLink = page.getByRole("link", {
    name: /browse matching catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute(
    "href",
    "/catalog/?cat=racket&brand=Yonex"
  );
});

test("concept compare guide links to filtered catalog browse", async ({
  page,
}) => {
  await page.goto("/compare-guides/yonex-astrox-vs-nanoflare/");

  const catalogLink = page.getByRole("link", {
    name: /browse yonex in catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute(
    "href",
    "/catalog/?cat=racket&brand=Yonex"
  );
});

test("guides hub links to full catalog browse", async ({ page }) => {
  await page.goto("/guides/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("tools hub links to full catalog browse", async ({ page }) => {
  await page.goto("/tools/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("review hub links to full catalog browse", async ({ page }) => {
  await page.goto("/review/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("brands hub links to full catalog browse", async ({ page }) => {
  await page.goto("/brands/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("procedural guide links to filtered catalog browse", async ({ page }) => {
  await page.goto("/guides/string-tension/");

  const catalogLink = page.getByRole("link", {
    name: /browse strings in catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/?cat=string");
});

test("guides hub shows Keep reading shelf", async ({ page }) => {
  await page.goto("/guides/");

  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /string tension guide/i }).first()
  ).toBeVisible();
});

test("search page shows Keep reading shelf", async ({ page }) => {
  await page.goto("/search/");

  await expect(page.getByRole("heading", { name: /^search$/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /compare products/i }).first()
  ).toBeVisible();
});

test("saved shelf shows Keep reading when empty", async ({ page }) => {
  await page.goto("/saved/");

  await expect(
    page.getByRole("heading", { name: /your saved shelf/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
});

test("review index shows Keep reading shelf", async ({ page }) => {
  await page.goto("/review/");

  await expect(page.getByRole("heading", { name: /^reviews$/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /best-of buying guides/i }).first()
  ).toBeVisible();
});
