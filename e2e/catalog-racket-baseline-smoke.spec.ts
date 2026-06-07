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
  "docs/baselines/catalog-racket-queries.json"
);

const PRODUCT_LABELS: Record<string, RegExp> = {
  "kumpoo-shura-2": /Shura II/i,
  "ln-halbertec-9000-power": /Halbertec 9000 Power/i,
  "vic-auraspeed-90k-ii": /Auraspeed 90K II/i,
  "vic-thruster-9900": /Thruster 9900/i,
  "vic-thruster-hwql": /Thruster HWQL/i,
  "yy-arcsaber-11-pro": /Arcsaber 11 Pro/i,
  "yy-arcsaber-7-pro": /Arcsaber 7 Pro/i,
  "yy-astrox-100zz": /Astrox 100ZZ(?! VA)/i,
  "yy-astrox-77-play": /Astrox 77 Play/i,
  "yy-astrox-77-pro": /Astrox 77 Pro/i,
  "yy-astrox-99-pro": /Astrox 99 Pro(?!\s*\(2nd)/i,
  "yy-nanoflare-1000-play": /Nanoflare 1000 Play/i,
  "yy-nanoflare-1000z": /Nanoflare 1000 Z/i,
  "yy-nanoflare-700-play": /Nanoflare 700 Play/i,
  "yy-nanoflare-700-pro-2024": /Nanoflare 700 Pro \(2024\)/i,
};

function e2eQueries(): E2eQuery[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eQuery[];
  };
  return raw.queries.filter((q) => q.e2e);
}

for (const spec of e2eQueries()) {
  test(`catalog racket editorial exit: ${spec.id}`, async ({ page }) => {
    const label = PRODUCT_LABELS[spec.productId];
    expect(label).toBeDefined();

    await page.goto("/catalog/?cat=racket");

    await page.getByRole("link", { name: label }).first().click();
    await expect(page).toHaveURL(
      new RegExp(`${spec.expectHref.replace(/\/$/, "")}/?$`)
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}
