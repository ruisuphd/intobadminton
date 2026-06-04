import { expect, test } from "@playwright/test";

test("finder quiz reaches results page", async ({ page }) => {
  await page.goto("/quiz/");
  const funnel = page.locator("#quiz-funnel");

  await expect(
    funnel.getByRole("heading", { name: /What is your current playing level/i })
  ).toBeVisible();

  await funnel.getByRole("button", { name: /^Club$/i }).click();
  await expect(
    page.getByRole("heading", { name: /What do you mostly play/i })
  ).toBeVisible();

  await funnel.getByRole("button", { name: /^Doubles$/i }).click();
  await expect(
    funnel.getByRole("heading", { name: /Pick up to two playing styles/i })
  ).toBeVisible();

  await funnel.getByRole("button", { name: /^Balanced$/i }).click();
  await funnel.getByRole("button", { name: /^Continue$/i }).click();

  await expect(
    funnel.getByRole("heading", { name: /What are you shopping for/i })
  ).toBeVisible();
  await funnel.getByRole("button", { name: /^Racket$/i }).click();

  await expect(
    funnel.getByRole("heading", { name: /Optional body comfort and budget/i })
  ).toBeVisible();
  await funnel.getByRole("button", { name: /See recommendations/i }).click();

  await page.waitForURL(/\/results\//, { timeout: 15_000 });
  await expect(
    page.getByRole("heading", { name: /Your equipment shortlist/i })
  ).toBeVisible();
});
