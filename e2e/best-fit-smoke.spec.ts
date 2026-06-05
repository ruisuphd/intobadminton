import { expect, test } from "@playwright/test";

test("best-of comparison table shows Finder fit column", async ({ page }) => {
  await page.goto("/best/beginner-rackets/");

  await expect(
    page.getByRole("heading", { name: /Best badminton rackets for beginners/i })
  ).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: /Finder fit/i })
  ).toBeVisible();

  await expect(page.getByRole("table")).toBeVisible();
});

test("best-of page omits Read full review when no blog slug is mapped", async ({
  page,
}) => {
  await page.goto("/best/rackets-under-150/");

  const reviewLinks = page.getByRole("link", { name: /Read full review/i });
  const count = await reviewLinks.count();
  for (let i = 0; i < count; i++) {
    const href = await reviewLinks.nth(i).getAttribute("href");
    expect(href).toMatch(/^\/review\/.+\/$/);
  }
});
