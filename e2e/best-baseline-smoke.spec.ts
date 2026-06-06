import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  bestPathForSlug,
  validateBestBaselineFile,
  type BestBaselineQuery,
} from "../src/lib/best-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/best-queries.json"
);

function e2eBestPaths(): {
  id: string;
  path: string;
  expectCatalogHref: string;
  expectHeadingPattern?: string;
  expectCatalogLinkPattern?: string;
  expectFinderCta?: boolean;
  expectKeepReadingShelf?: boolean;
  expectComparisonTable?: boolean;
}[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validateBestBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: BestBaselineQuery) => q.e2e)
    .map((q: BestBaselineQuery) => ({
      id: q.id,
      path: bestPathForSlug(q.slug),
      expectCatalogHref: q.expectCatalogHref,
      expectHeadingPattern: q.expectHeadingPattern,
      expectCatalogLinkPattern: q.expectCatalogLinkPattern,
      expectFinderCta: q.expectFinderCta,
      expectKeepReadingShelf: q.expectKeepReadingShelf,
      expectComparisonTable: q.expectComparisonTable,
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
  expectComparisonTable,
} of e2eBestPaths()) {
  test(`Best baseline e2e: ${id}`, async ({ page }) => {
    await page.goto(path);

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible({ timeout: 15_000 });

    if (expectHeadingPattern) {
      await expect(heading).toContainText(new RegExp(expectHeadingPattern, "i"));
    }

    const catalogLink = page.getByRole("main").getByRole("link", {
      name: expectCatalogLinkPattern
        ? new RegExp(expectCatalogLinkPattern, "i")
        : /browse matching catalog/i,
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

    if (expectComparisonTable) {
      await expect(
        page.getByRole("region", {
          name: /side-by-side comparison of every pick/i,
        })
      ).toBeVisible();
    }
  });
}
