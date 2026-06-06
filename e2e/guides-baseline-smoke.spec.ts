import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  guidePathForSlug,
  validateGuidesBaselineFile,
  type GuidesBaselineQuery,
} from "../src/lib/guides-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/guides-queries.json"
);

function e2eGuidePaths(): {
  id: string;
  path: string;
  expectCatalogHref: string;
  expectHeadingPattern?: string;
  expectCatalogLinkPattern?: string;
  expectKeepReadingShelf?: boolean;
  expectFinderCta?: boolean;
}[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validateGuidesBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: GuidesBaselineQuery) => q.e2e)
    .map((q: GuidesBaselineQuery) => ({
      id: q.id,
      path: guidePathForSlug(q.slug),
      expectCatalogHref: q.expectCatalogHref,
      expectHeadingPattern: q.expectHeadingPattern,
      expectCatalogLinkPattern: q.expectCatalogLinkPattern,
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
  expectKeepReadingShelf,
  expectFinderCta,
} of e2eGuidePaths()) {
  test(`Guides baseline e2e: ${id}`, async ({ page }) => {
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
