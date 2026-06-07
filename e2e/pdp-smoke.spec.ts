import { expect, test } from "@playwright/test";

/** Catalogue grip with no dedicated review slug — catalog links to PDP. */
const PDP_ONLY_ID = "yy-ac102c";

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
  await page.goto("/catalog/?cat=grip&brand=Yonex");

  await page.getByRole("link", { name: /Super Grap \(AC102C/i }).click();

  await expect(page).toHaveURL(new RegExp(`/product/${PDP_ONLY_ID}/?$`));
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("catalog links Yonex BG65 string to string-selector guide", async ({
  page,
}) => {
  await page.goto("/catalog/?cat=string&brand=Yonex");

  await page.getByRole("link", { name: /BG65/i }).first().click();

  await expect(page).toHaveURL(/\/review\/badminton-string-selector\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("BG65 PDP shows string guide exit", async ({ page }) => {
  await page.goto("/product/yy-bg65/");

  await expect(
    page.getByRole("link", { name: "Read string guide →" })
  ).toHaveAttribute("href", "/review/badminton-string-selector/");
});

test("catalog links Yonex BG80 string to string-selector guide", async ({
  page,
}) => {
  await page.goto("/catalog/?cat=string&brand=Yonex");

  await page.getByRole("link", { name: /BG80(?! Power)/i }).first().click();

  await expect(page).toHaveURL(/\/review\/badminton-string-selector\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("catalog links Yonex EXBOLT 63 string to string-selector guide", async ({
  page,
}) => {
  await page.goto("/catalog/?cat=string&brand=Yonex");

  await page.getByRole("link", { name: /EXBOLT 63/i }).first().click();

  await expect(page).toHaveURL(/\/review\/badminton-string-selector\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("catalog links Yonex Aerobite string to string-selector guide", async ({
  page,
}) => {
  await page.goto("/catalog/?cat=string&brand=Yonex");

  await page.getByRole("link", { name: /Aerobite/i }).first().click();

  await expect(page).toHaveURL(/\/review\/badminton-string-selector\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("catalog links Yonex BG80 Power string to string-selector guide", async ({
  page,
}) => {
  await page.goto("/catalog/?cat=string&brand=Yonex");

  await page.getByRole("link", { name: /BG80 Power/i }).first().click();

  await expect(page).toHaveURL(/\/review\/badminton-string-selector\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("catalog links Li-Ning L69 string to dedicated review", async ({
  page,
}) => {
  await page.goto("/catalog/?cat=string&brand=Li-Ning");

  await page.getByRole("link", { name: /L69/i }).first().click();

  await expect(page).toHaveURL(/\/review\/li-ning-l69-string-review\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
