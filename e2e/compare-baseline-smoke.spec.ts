import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import { validateFinderBaselineFile } from "../src/lib/finder-baseline";
import {
  sharePathForCompareQuery,
  validateCompareShareBaselineFile,
  type CompareShareBaselineQuery,
} from "../src/lib/compare-baseline";
import { byId, scoreProductCatalog } from "../src/lib/scoring";

const FINDER_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/finder-profile-queries.json"
);
const COMPARE_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/compare-share-queries.json"
);

function e2eComparePaths(): { id: string; path: string }[] {
  const finderRaw = JSON.parse(readFileSync(FINDER_BASELINE_PATH, "utf8"));
  const finderParsed = validateFinderBaselineFile(finderRaw);
  if (!finderParsed.ok) return [];

  const raw = JSON.parse(readFileSync(COMPARE_BASELINE_PATH, "utf8"));
  const parsed = validateCompareShareBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: CompareShareBaselineQuery) => q.e2e)
    .map((q: CompareShareBaselineQuery) => {
      const path = sharePathForCompareQuery(
        q,
        finderParsed.file,
        (id) => byId(id),
        (profile) => scoreProductCatalog(profile)
      );
      return { id: q.id, path: path ?? "" };
    })
    .filter((row) => row.path.length > 0);
}

for (const { id, path } of e2eComparePaths()) {
  test(`compare baseline e2e: ${id}`, async ({ page }) => {
    await page.goto(path);

    await expect(
      page.getByRole("heading", {
        name: /Compare badminton equipment, spec for spec/i,
      })
    ).toBeVisible({ timeout: 15_000 });

    await expect(page.getByRole("table")).toBeVisible();
    expect(page.url()).toContain("/compare/");
  });
}
