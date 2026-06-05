import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

type E2eQuery = {
  query: string;
  e2e?: boolean;
};

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/discovery-parity-queries.json"
);

function e2eQueries(): E2eQuery[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eQuery[];
  };
  return raw.queries.filter((q) => q.e2e);
}

for (const spec of e2eQueries()) {
  test(`discovery parity e2e: ${spec.query}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const searchbox = page.getByRole("combobox", {
      name: /search reviews, products, and guides/i,
    });
    await searchbox.fill(spec.query);
    await page.getByRole("button", { name: "Search" }).first().click();

    const escaped = spec.query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    await expect(page).toHaveURL(new RegExp(`/catalog/\\?q=${escaped}`));

    const catalogSearch = page.getByRole("searchbox", {
      name: /search catalog by name or spec/i,
    });
    await expect(catalogSearch).toHaveValue(spec.query);

    const rows = page.locator("ul.divide-y > li");
    await expect(rows.first()).toBeVisible();
    await expect(page.getByText(/products match your search/i)).toBeVisible();
  });
}
