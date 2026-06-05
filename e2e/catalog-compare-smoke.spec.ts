import { expect, test } from "@playwright/test";

test("catalog adds a product to compare and opens compare table", async ({
  page,
}) => {
  await page.goto("/catalog/?cat=racket&brand=Yonex");

  const compareButton = page
    .getByRole("button", { name: /^Compare$/i })
    .first();
  await expect(compareButton).toBeVisible();
  await compareButton.click();

  await page.getByRole("link", { name: /open compare/i }).first().click();
  await page.waitForURL(/\/compare\//);
  await expect(page.getByRole("button", { name: /copy share link/i })).toBeVisible();
});
