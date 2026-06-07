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
  "docs/baselines/catalog-shoe-queries.json"
);

const PRODUCT_LABELS: Record<string, RegExp> = {
  "yy-power-cushion-65z-wide": /65 Z Wide|65Z Wide/i,
  "yy-aerus-z2": /Aerus Z2/i,
  "yy-comfort-z3": /Comfort Z3/i,
  "vic-p9200": /P9200/i,
  "yy-eclipsion-z3": /Eclipsion Z3/i,
  "ln-bladesabre-max": /BladeSabre Max|Bladesabre MAX/i,
  "vic-p9200-iii": /P9200 III/i,
  "vic-p8500-ii": /P8500 II/i,
  "bonny-future-land-3": /Future Land 3|Polaris/i,
  "asics-blast-ff-3": /Blast FF 3/i,
  "yy-grpht-thrttl": /Grpht Thrttl|Graphite Thrttl/i,
  "ln-bladesabre-2-pro": /Bladesabre 2 Pro/i,
  "kumpoo-kh-g805-lite-pro": /G805 Lite Pro|KH-G805/i,
  "bonny-carbon-armour": /Carbon Armour/i,
  "kawasaki-kace": /KACE/i,
  "yy-subaxia-gt": /Subaxia GT/i,
};

function e2eQueries(): E2eQuery[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eQuery[];
  };
  return raw.queries.filter((q) => q.e2e);
}

for (const spec of e2eQueries()) {
  test(`catalog shoe editorial exit: ${spec.id}`, async ({ page }) => {
    const label = PRODUCT_LABELS[spec.productId];
    expect(label).toBeDefined();

    await page.goto("/catalog/?cat=shoes");

    await page.getByRole("link", { name: label }).first().click();
    await expect(page).toHaveURL(new RegExp(`${spec.expectHref.replace(/\/$/, "")}/?$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}
