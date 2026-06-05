import { expect, test } from "@playwright/test";

test("catalog preserves filter state in the URL", async ({ page }) => {
  await page.goto("/catalog/?cat=racket&brand=Yonex&price=under200&sort=price-desc");

  await expect(page.getByRole("group", { name: "Category" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Yonex", pressed: true })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Price: high to low", pressed: true })
  ).toBeVisible();
  await expect(page.getByText(/product(s)? match your filters/i)).toBeVisible();
});
