import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  reviewPathForSlug,
  validateReviewsBaselineFile,
  type ReviewsBaselineQuery,
} from "../src/lib/reviews-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/reviews-queries.json"
);

function e2eReviewPaths(): {
  id: string;
  path: string;
  expectCatalogHref: string;
  expectHeadingPattern?: string;
  expectCatalogLinkPattern?: string;
  expectFinderCta?: boolean;
  expectKeepReadingShelf?: boolean;
}[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validateReviewsBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: ReviewsBaselineQuery) => q.e2e)
    .map((q: ReviewsBaselineQuery) => ({
      id: q.id,
      path: reviewPathForSlug(q.slug),
      expectCatalogHref: q.expectCatalogHref,
      expectHeadingPattern: q.expectHeadingPattern,
      expectCatalogLinkPattern: q.expectCatalogLinkPattern,
      expectFinderCta: q.expectFinderCta,
      expectKeepReadingShelf: q.expectKeepReadingShelf,
    }));
}

for (const {
  id,
  path,
  expectCatalogHref,
  expectHeadingPattern,
  expectCatalogLinkPattern,
  expectFinderCta,
  expectKeepReadingShelf,
} of e2eReviewPaths()) {
  test(`Reviews baseline e2e: ${id}`, async ({ page }) => {
    await page.goto(path);

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible({ timeout: 15_000 });

    if (expectHeadingPattern) {
      await expect(heading).toContainText(
        new RegExp(expectHeadingPattern, "i")
      );
    }

    const catalogLink = page
      .getByRole("main")
      .getByRole("link", {
        name: expectCatalogLinkPattern
          ? new RegExp(expectCatalogLinkPattern, "i")
          : /browse.*catalog/i,
      });
    await expect(catalogLink).toHaveAttribute("href", expectCatalogHref);

    if (expectFinderCta) {
      await expect(
        page.getByRole("main").getByRole("link", { name: /start the finder/i })
      ).toHaveAttribute("href", "/quiz/");
    }

    if (expectKeepReadingShelf) {
      await expect(
        page.getByRole("heading", { name: /keep reading/i })
      ).toBeVisible();
    }
  });
}
