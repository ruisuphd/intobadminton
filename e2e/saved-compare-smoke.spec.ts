import { expect, test } from "@playwright/test";

const COMPARE_PAIR = "yy-nanoray-light-70i,yy-nanoflare-1000z";
const SAVED_ID = "yy-nanoray-light-70i";

test("compare page hydrates from share URL", async ({ page }) => {
  await page.goto(`/compare/?p=${COMPARE_PAIR}`);

  await expect(
    page.getByRole("heading", { name: "Compare gear" })
  ).toBeVisible();
  await expect(page.getByText(/Nanoray Light 70i/i).first()).toBeVisible({
    timeout: 10_000,
  });
  await expect(page.getByText(/Nanoflare 1000 Z/i).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /clear all/i })).toBeVisible();
});

test("saved shelf shows locally stored shortlist", async ({ page }) => {
  await page.addInitScript((productId) => {
    localStorage.setItem(
      "intobadminton.saved.v1",
      JSON.stringify([{ id: productId, savedAt: new Date().toISOString() }])
    );
  }, SAVED_ID);

  await page.goto("/saved/");

  await expect(
    page.getByRole("heading", { name: /your saved shelf/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Nanoray Light 70i/i })).toBeVisible();
});

test("saved empty state prompts finder", async ({ page }) => {
  await page.goto("/saved/");

  await expect(
    page.getByRole("heading", { name: /your saved shelf/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /run the finder/i })).toBeVisible();
});
