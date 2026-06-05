import { expect, test } from "@playwright/test";

test("tools index lists interactive toolkit", async ({ page }) => {
  await page.goto("/tools/");

  await expect(
    page.getByRole("heading", { name: /Badminton toolkit/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Skill-level converter/i })
  ).toBeVisible();
});

test("skill-level converter renders", async ({ page }) => {
  await page.goto("/tools/skill-level-converter/");

  await expect(
    page.getByRole("heading", { name: /Badminton skill-level converter/i })
  ).toBeVisible();
});
