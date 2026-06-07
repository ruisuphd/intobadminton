import { expect, test } from "@playwright/test";

/** Catalogue racket with no dedicated review slug — catalog links to PDP. */
const PDP_ONLY_ID = "vic-thruster-ryuga-ii";

test("product PDP renders specs and finder CTA", async ({ page }) => {
  await page.goto(`/product/${PDP_ONLY_ID}/`);

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Specifications" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /equipment finder/i })
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
});

test("product PDP shows related reading shelf", async ({ page }) => {
  await page.goto(`/product/${PDP_ONLY_ID}/`);

  await expect(
    page.getByRole("heading", { name: "Keep reading" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /read →/i }).first()
  ).toBeVisible();
});

test("catalog links unmapped SKUs to product PDP", async ({ page }) => {
  await page.goto("/catalog/?cat=racket&brand=Victor");

  await page.getByRole("link", { name: /Thruster Ryuga II/i }).click();

  await expect(page).toHaveURL(new RegExp(`/product/${PDP_ONLY_ID}/?$`));
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
