import { expect, test } from "@playwright/test";

test("helpful reaction persists vote in localStorage", async ({ page }) => {
  await page.goto("/guides/string-tension/");

  const section = page.locator('section[aria-label="Was this helpful?"]');
  await expect(section.getByText(/was this article helpful/i)).toBeVisible();

  await section.getByRole("button", { name: /yes/i }).click();
  await expect(section.getByText(/thanks for the feedback/i)).toBeVisible();
  await expect(section.getByText(/keep this article on the path/i)).toBeVisible();

  await page.reload();
  await expect(section.getByText(/thanks for the feedback/i)).toBeVisible();

  await section.getByRole("button", { name: /change my vote/i }).click();
  await expect(section.getByText(/was this article helpful/i)).toBeVisible();
});
