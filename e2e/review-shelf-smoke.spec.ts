import { expect, test } from "@playwright/test";

test("review article shows decision-path shelf", async ({ page }) => {
  await page.goto("/review/yonex-arcsaber-7-pro-review/");

  await expect(
    page.getByRole("heading", { name: "Keep reading" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /read →/i }).first()
  ).toBeVisible();
});

test("explainer review shows decision-path shelf", async ({ page }) => {
  await page.goto("/review/how-to-choose-a-badminton-racket/");

  await expect(
    page.getByRole("heading", { name: "Keep reading" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /all-round/i })
  ).toBeVisible();
});

test("helpful reaction records vote without API", async ({ page }) => {
  await page.goto("/review/yonex-arcsaber-7-pro-review/");

  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByText("Thanks for the feedback.")).toBeVisible();
  await expect(page.getByText(/keep this article on the path/i)).toBeVisible();
});
