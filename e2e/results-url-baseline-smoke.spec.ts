import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import { validateFinderBaselineFile } from "../src/lib/finder-baseline";
import {
  sharePathForResultsUrlQuery,
  validateResultsUrlBaselineFile,
  type ResultsUrlBaselineQuery,
} from "../src/lib/results-url-baseline";

const FINDER_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/finder-profile-queries.json"
);
const RESULTS_URL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/results-url-queries.json"
);

function e2eSharePaths(): { id: string; path: string }[] {
  const finderRaw = JSON.parse(readFileSync(FINDER_BASELINE_PATH, "utf8"));
  const finderParsed = validateFinderBaselineFile(finderRaw);
  if (!finderParsed.ok) return [];

  const raw = JSON.parse(readFileSync(RESULTS_URL_BASELINE_PATH, "utf8"));
  const parsed = validateResultsUrlBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: ResultsUrlBaselineQuery) => q.e2e)
    .map((q: ResultsUrlBaselineQuery) => {
      const path = sharePathForResultsUrlQuery(q, finderParsed.file);
      return { id: q.id, path: path ?? "" };
    })
    .filter((row) => row.path.length > 0);
}

for (const { id, path } of e2eSharePaths()) {
  test(`results url baseline e2e: ${id}`, async ({ page }) => {
    await page.goto(path);

    await expect(
      page.getByRole("heading", { name: /your equipment shortlist/i })
    ).toBeVisible({ timeout: 15_000 });

    const resultCards = page.locator("article").filter({
      has: page.getByRole("heading", { level: 2 }),
    });
    await expect(resultCards.first()).toBeVisible();
    await expect(resultCards).not.toHaveCount(0);

    expect(page.url()).toContain("/results/");
  });
}
