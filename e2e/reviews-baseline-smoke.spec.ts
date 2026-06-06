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
  slug: string;
  expectCatalogHref: string;
  expectHeadingPattern?: string;
  expectCatalogLinkPattern?: string;
  expectFinderCta?: boolean;
  expectKeepReadingShelf?: boolean;
  expectEquipmentFinderPanel?: boolean;
  expectUnmapped?: boolean;
}[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validateReviewsBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: ReviewsBaselineQuery) => q.e2e)
    .map((q: ReviewsBaselineQuery) => ({
      id: q.id,
      slug: q.slug,
      path: reviewPathForSlug(q.slug),
      expectCatalogHref: q.expectCatalogHref,
      expectHeadingPattern: q.expectHeadingPattern,
      expectCatalogLinkPattern: q.expectCatalogLinkPattern,
      expectFinderCta: q.expectFinderCta,
      expectKeepReadingShelf: q.expectKeepReadingShelf,
      expectEquipmentFinderPanel: q.expectEquipmentFinderPanel,
      expectUnmapped: q.expectUnmapped,
    }));
}

for (const {
  id,
  path,
  slug,
  expectCatalogHref,
  expectHeadingPattern,
  expectCatalogLinkPattern,
  expectFinderCta,
  expectKeepReadingShelf,
  expectEquipmentFinderPanel,
  expectUnmapped,
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

    if (slug === "index") {
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
    } else if (expectEquipmentFinderPanel) {
      await expect(
        page.getByRole("complementary", { name: "Equipment finder" })
      ).toBeVisible();

      await expect(
        page
          .getByRole("complementary", { name: "Equipment finder" })
          .getByRole("link", {
            name: expectCatalogLinkPattern
              ? new RegExp(expectCatalogLinkPattern, "i")
              : /browse .* in catalog/i,
          })
      ).toHaveAttribute("href", expectCatalogHref);
    } else if (!expectUnmapped) {
      const catalogLink = page
        .getByRole("main")
        .getByRole("link", {
          name: expectCatalogLinkPattern
            ? new RegExp(expectCatalogLinkPattern, "i")
            : /browse.*catalog/i,
        })
        .first();
      await expect(catalogLink).toHaveAttribute("href", expectCatalogHref);
    }

    if (expectKeepReadingShelf) {
      await expect(
        page.getByRole("heading", { name: /keep reading/i })
      ).toBeVisible();
    }
  });
}
