import { expect, test } from "@playwright/test";

test("quiz results page shows Keep reading shelf", async ({ page }) => {
  await page.goto("/quiz/");
  const funnel = page.locator("#quiz-funnel");

  await funnel.getByRole("button", { name: /^Club$/i }).click();
  await funnel.getByRole("button", { name: /^Singles$/i }).click();
  await funnel.getByRole("button", { name: /^Balanced$/i }).click();
  await funnel.getByRole("button", { name: /^Continue$/i }).click();
  await funnel.getByRole("button", { name: /^Racket$/i }).click();
  await funnel.getByRole("button", { name: /See recommendations/i }).click();

  await page.waitForURL(/\/results\//, { timeout: 15_000 });
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /all-round badminton rackets/i }).first()
  ).toBeVisible();
});
