import { expect, test } from "@playwright/test";

test("results page exposes copy share link", async ({ page }) => {
  await page.goto("/quiz/");
  const funnel = page.locator("#quiz-funnel");

  await funnel.getByRole("button", { name: /^Club$/i }).click();
  await funnel.getByRole("button", { name: /^Doubles$/i }).click();
  await funnel.getByRole("button", { name: /^Balanced$/i }).click();
  await funnel.getByRole("button", { name: /^Continue$/i }).click();
  await funnel.getByRole("button", { name: /^Racket$/i }).click();
  await funnel.getByRole("button", { name: /See recommendations/i }).click();

  await page.waitForURL(/\/results\//, { timeout: 15_000 });
  await expect(
    page.getByRole("button", { name: /copy share link/i })
  ).toBeVisible();
});
