import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

type E2eQuery = {
  query: string;
  e2e?: boolean;
  expectProductIdContains?: string;
  maxResults?: number;
};

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-keyword-queries.json"
);

function e2eQueries(): E2eQuery[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eQuery[];
  };
  return raw.queries.filter((q) => q.e2e);
}

for (const spec of e2eQueries()) {
  test(`catalog golden query e2e: ${spec.query}`, async ({ page }) => {
    await page.goto(`/catalog/?q=${encodeURIComponent(spec.query)}`);

    const input = page.getByRole("searchbox", {
      name: /search catalog by name or spec/i,
    });
    await expect(input).toHaveValue(spec.query);

    if (spec.maxResults === 0) {
      await expect(page.getByText(/no products match/i)).toBeVisible();
      return;
    }

    const rows = page.locator("ul.divide-y > li");
    await expect(rows.first()).toBeVisible();

    await expect(page.getByText(/products match your search/i)).toBeVisible();
  });
}
