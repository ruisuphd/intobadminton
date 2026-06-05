import { expect, test } from "@playwright/test";

test("claims registry shows freshness badges and claim rows", async ({
  page,
}) => {
  await page.goto("/data/");

  await expect(
    page.getByRole("heading", { name: /verified claims registry/i })
  ).toBeVisible();
  await expect(page.getByText(/fresh|stale|review due/i).first()).toBeVisible();
  await expect(page.locator("table tbody tr").first()).toBeVisible();
});

test("editorial updates feed lists recent pages with labels", async ({
  page,
}) => {
  await page.goto("/updates/");

  await expect(
    page.getByRole("heading", { name: /editorial updates/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /verified claims registry/i })).toBeVisible();
  await expect(page.getByRole("link").first()).toBeVisible();
});
