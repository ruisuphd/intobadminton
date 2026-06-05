import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

type E2eQuery = {
  query: string;
  e2e?: boolean;
  expectHrefContains?: string;
  expectTopHref?: string;
  maxResults?: number;
};

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/site-search-queries.json"
);

function e2eQueries(): E2eQuery[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eQuery[];
  };
  return raw.queries.filter((q) => q.e2e);
}

for (const spec of e2eQueries()) {
  test(`golden query e2e: ${spec.query}`, async ({ page }) => {
    await page.goto(`/search/?q=${encodeURIComponent(spec.query)}`);

    await expect(page.getByRole("heading", { name: /^Search$/i })).toBeVisible();

    const resultLinks = page.locator("ul.divide-y a[href]");

    if (spec.maxResults === 0) {
      await expect(resultLinks).toHaveCount(0);
      return;
    }

    if (spec.expectTopHref) {
      await expect(resultLinks.first()).toHaveAttribute(
        "href",
        new RegExp(spec.expectTopHref.replace(/\//g, "\\/"))
      );
    }

    if (spec.expectHrefContains) {
      await expect(
        page.locator(`ul.divide-y a[href*="${spec.expectHrefContains}"]`).first()
      ).toBeVisible();
    }
  });
}
