import { expect, test } from "@playwright/test";

async function completeRacketQuiz(page: import("@playwright/test").Page) {
  const funnel = page.locator("#quiz-funnel");
  await funnel.getByRole("button", { name: /^Club$/i }).click();
  await funnel.getByRole("button", { name: /^Doubles$/i }).click();
  await funnel.getByRole("button", { name: /^Balanced$/i }).click();
  await funnel.getByRole("button", { name: /^Continue$/i }).click();
  await funnel.getByRole("button", { name: /^Racket$/i }).click();
  await funnel.getByRole("button", { name: /See recommendations/i }).click();
  await page.waitForURL(/\/results\//, { timeout: 15_000 });
}

test("results page exposes copy share link", async ({ page }) => {
  await page.goto("/quiz/");
  await completeRacketQuiz(page);
  await expect(
    page.getByRole("button", { name: /copy share link/i })
  ).toBeVisible();
});

test("shared results URL reproduces the shortlist", async ({ page, context }) => {
  await page.goto("/quiz/");
  await completeRacketQuiz(page);

  const shareButton = page.getByRole("button", { name: /copy share link/i });
  await expect(shareButton).toBeVisible();

  const firstProductName = await page
    .getByRole("heading", { level: 2 })
    .first()
    .textContent();

  const shareUrl = page.url();
  expect(shareUrl).toMatch(/\/results\//);

  const recipient = await context.newPage();
  await recipient.goto(shareUrl);
  await expect(
    recipient.getByRole("heading", { name: /Your equipment shortlist/i })
  ).toBeVisible({ timeout: 15_000 });

  if (firstProductName?.trim()) {
    await expect(
      recipient.getByRole("heading", { name: firstProductName.trim() }).first()
    ).toBeVisible();
  }
});
