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
  "docs/baselines/catalog-grip-queries.json"
);

const PRODUCT_LABELS: Record<string, RegExp> = {
  "yy-ac102c": /Super Grap \(AC102C/i,
  "yy-ac108ex": /Towel Grip/i,
  "yy-ac104ex": /Wave Grap/i,
  "yy-ac125ex": /Smash Grap/i,
  "yy-ac130ex": /Strong Grap/i,
  "ln-gp100-pro-grip": /GP100 Pro/i,
};

function e2eQueries(): E2eQuery[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eQuery[];
  };
  return raw.queries.filter((q) => q.e2e);
}

for (const spec of e2eQueries()) {
  test(`catalog grip editorial exit: ${spec.id}`, async ({ page }) => {
    const label = PRODUCT_LABELS[spec.productId];
    expect(label).toBeDefined();

    await page.goto("/catalog/?cat=grip");

    await page.getByRole("link", { name: label }).first().click();
    await expect(page).toHaveURL(new RegExp(`${spec.expectHref.replace(/\/$/, "")}/?$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}
