import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

type E2eQuery = {
  id: string;
  productId: string;
  expectHref: string;
  expectKind: "guide" | "review";
  e2e?: boolean;
  note?: string;
};

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-bag-queries.json"
);

const PRODUCT_LABELS: Record<string, RegExp> = {
  "yy-as-50": /AS-50|Aerosensa 50/i,
  "vic-carbonsonic-max-bag": /Carbonsonic MAX/i,
  "rsl-supreme-bag": /Supreme/i,
  "rsl-aero-u-bag": /Aero U/i,
  "rsl-aero-classic-tourney-bag": /Classic Tourney/i,
  "rsl-no4-plus-bag": /No\.?4 Plus/i,
};

function e2eQueries(): E2eQuery[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eQuery[];
  };
  return raw.queries.filter((q) => q.e2e);
}

for (const spec of e2eQueries()) {
  test(`catalog bag editorial exit: ${spec.id}`, async ({ page }) => {
    const label = PRODUCT_LABELS[spec.productId];
    expect(label).toBeDefined();

    await page.goto("/catalog/?cat=bag");

    await page.getByRole("link", { name: label }).first().click();
    await expect(page).toHaveURL(new RegExp(`${spec.expectHref.replace(/\/$/, "")}/?$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}
