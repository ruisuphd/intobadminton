import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  compareGuidePathForSlug,
  validateCompareGuidesBaselineFile,
  type CompareGuidesBaselineQuery,
} from "../src/lib/compare-guides-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/compare-guides-queries.json"
);

function e2eCompareGuidePaths(): {
  id: string;
  path: string;
  expectCatalogHref: string;
  expectHeadingPattern?: string;
  expectCatalogLinkPattern?: string;
  expectComparisonTable?: boolean;
  expectKeepReadingShelf?: boolean;
  expectFinderCta?: boolean;
}[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validateCompareGuidesBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: CompareGuidesBaselineQuery) => q.e2e)
    .map((q: CompareGuidesBaselineQuery) => ({
      id: q.id,
      path: compareGuidePathForSlug(q.slug),
      expectCatalogHref: q.expectCatalogHref,
      expectHeadingPattern: q.expectHeadingPattern,
      expectCatalogLinkPattern: q.expectCatalogLinkPattern,
      expectComparisonTable: q.expectComparisonTable,
      expectKeepReadingShelf: q.expectKeepReadingShelf,
      expectFinderCta: q.expectFinderCta,
    }));
}

for (const {
  id,
  path,
  expectCatalogHref,
  expectHeadingPattern,
  expectCatalogLinkPattern,
  expectComparisonTable,
  expectKeepReadingShelf,
  expectFinderCta,
} of e2eCompareGuidePaths()) {
  test(`Compare guides baseline e2e: ${id}`, async ({ page }) => {
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

    if (expectComparisonTable) {
      await expect(page.getByRole("columnheader", { name: /factor/i })).toBeVisible();
    }

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
