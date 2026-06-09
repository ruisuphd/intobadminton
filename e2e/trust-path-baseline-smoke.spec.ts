import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  validateTrustPathBaselineFile,
  type TrustPathBaselineQuery,
} from "../src/lib/trust-path-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/trust-path-queries.json"
);

function e2eTrustPathQueries(): {
  id: string;
  path: string;
  expectCatalogHref: string;
  expectHeadingPattern?: string;
  expectCatalogLinkPattern?: string;
}[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validateTrustPathBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: TrustPathBaselineQuery) => q.e2e)
    .map((q: TrustPathBaselineQuery) => ({
      id: q.id,
      path: q.path,
      expectCatalogHref: q.expectCatalogHref,
      expectHeadingPattern: q.expectHeadingPattern,
      expectCatalogLinkPattern: q.expectCatalogLinkPattern,
    }));
}

for (const {
  id,
  path,
  expectCatalogHref,
  expectHeadingPattern,
  expectCatalogLinkPattern,
} of e2eTrustPathQueries()) {
  test(`Trust-path baseline e2e: ${id}`, async ({ page }) => {
    await page.goto(path);

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible({ timeout: 15_000 });

    if (expectHeadingPattern) {
      await expect(heading).toContainText(
        new RegExp(expectHeadingPattern, "i")
      );
    }

    const catalogLink = page.getByRole("link", {
      name: expectCatalogLinkPattern
        ? new RegExp(expectCatalogLinkPattern, "i")
        : /browse full catalog/i,
    });
    await expect(catalogLink).toHaveAttribute("href", expectCatalogHref);
  });
}
