import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  validateReviewProductMapBaselineFile,
  type ReviewProductMapBaselineQuery,
} from "../src/lib/review-product-map-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/review-product-map-queries.json"
);

function e2eReviewPaths(): { id: string; path: string }[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validateReviewProductMapBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter(
      (q: ReviewProductMapBaselineQuery) =>
        q.e2e && !q.expectUnmapped && q.expectProductId
    )
    .map((q: ReviewProductMapBaselineQuery) => ({
      id: q.id,
      path: `/review/${q.slug}/`,
    }));
}

for (const { id, path } of e2eReviewPaths()) {
  test(`review map baseline e2e: ${id}`, async ({ page }) => {
    await page.goto(path);

    await expect(
      page.getByRole("heading", { name: /review/i }).first()
    ).toBeVisible({ timeout: 15_000 });

    await expect(
      page.getByRole("complementary", { name: "Equipment finder" })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Browse .* in catalog/i }).first()
    ).toBeVisible();
    expect(page.url()).toContain("/review/");
  });
}
