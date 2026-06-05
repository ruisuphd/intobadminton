import { expect, test } from "@playwright/test";

test("compare page hydrates product ids from share URL", async ({ page }) => {
  await page.goto(
    "/compare/?p=yy-as-50,yy-astrox-88s-pro-2024"
  );

  await expect(
    page.getByRole("heading", { name: "Compare gear", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /copy share link/i })
  ).toBeVisible();
  await expect(page.getByText(/Aerosensa|Astrox/i).first()).toBeVisible();
});
