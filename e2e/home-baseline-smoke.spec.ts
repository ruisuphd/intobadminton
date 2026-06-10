import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  HOME_PATH,
  validateHomeBaselineFile,
  type HomeBaselineQuery,
} from "../src/lib/home-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/home-queries.json"
);

function e2eHomeQueries(): {
  id: string;
  path: string;
  expectCatalogHref: string;
  expectFinderHref: string;
  expectHeadingPattern?: string;
  expectCatalogLinkPattern?: string;
  expectFeaturedReviewHrefs?: string[];
  expectContinueReadingSlot?: boolean;
}[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validateHomeBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: HomeBaselineQuery) => q.e2e)
    .map((q: HomeBaselineQuery) => ({
      id: q.id,
      path: HOME_PATH,
      expectCatalogHref: q.expectCatalogHref,
      expectFinderHref: q.expectFinderHref,
      expectHeadingPattern: q.expectHeadingPattern,
      expectCatalogLinkPattern: q.expectCatalogLinkPattern,
      expectFeaturedReviewHrefs: q.expectFeaturedReviewHrefs,
      expectContinueReadingSlot: q.expectContinueReadingSlot,
    }));
}

for (const {
  id,
  path,
  expectCatalogHref,
  expectFinderHref,
  expectHeadingPattern,
  expectCatalogLinkPattern,
  expectFeaturedReviewHrefs,
  expectContinueReadingSlot,
} of e2eHomeQueries()) {
  test(`Home baseline e2e: ${id}`, async ({ page }) => {
    await page.goto(path);

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible({ timeout: 15_000 });

    if (expectHeadingPattern) {
      await expect(heading).toContainText(
        new RegExp(expectHeadingPattern, "i")
      );
    }

    await expect(
      page.getByRole("link", { name: /start finder/i }).first()
    ).toHaveAttribute("href", expectFinderHref);

    const catalogLink = page.getByRole("link", {
      name: expectCatalogLinkPattern
        ? new RegExp(expectCatalogLinkPattern, "i")
        : /browse full catalog/i,
    });
    await expect(catalogLink).toHaveAttribute("href", expectCatalogHref);

    await expect(
      page.getByRole("heading", { name: /latest reviews/i })
    ).toBeVisible();

    if (expectFeaturedReviewHrefs?.length) {
      for (const href of expectFeaturedReviewHrefs) {
        await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
      }
    }

    if (expectContinueReadingSlot) {
      await expect(page.locator("[data-home-continue-reading]")).toBeAttached();
    }
  });
}
