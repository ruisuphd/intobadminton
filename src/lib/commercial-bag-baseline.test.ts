import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCommercialBagBaseline,
  evaluateCommercialBagBaselineQuery,
  formatCommercialBagBaselineIssues,
  validateCommercialBagBaselineFile,
} from "@/lib/commercial-bag-baseline";
import {
  evaluateCatalogBagBaseline,
  validateCatalogBagBaselineFile,
} from "@/lib/catalog-bag-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-bag-queries.json"
);
const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-bag-queries.json"
);

const catalog = products as ProductRecord[];

function productLookup(id: string) {
  return catalogProductById(id) ?? catalog.find((p) => p.id === id);
}

describe("commercial-bag-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(COMMERCIAL_BASELINE_PATH, "utf8"));
    const parsed = validateCommercialBagBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(COMMERCIAL_BASELINE_PATH, "utf8"));
    const parsed = validateCommercialBagBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCommercialBagBaseline(parsed.file, productLookup);
    if (!result.ok) {
      console.error(formatCommercialBagBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-as-50");
    expect(product).toBeDefined();
    const issue = evaluateCommercialBagBaselineQuery(
      {
        id: "test",
        productId: "yy-as-50",
        expectHref: "/product/yy-as-50/",
        expectKind: "review",
      },
      product
    );
    expect(issue?.message).toContain("expected href");
  });

  it("flags link label mismatches", () => {
    const product = catalogProductById("yy-pro-racket-bag-92429");
    expect(product).toBeDefined();
    const issue = evaluateCommercialBagBaselineQuery(
      {
        id: "test",
        productId: "yy-pro-racket-bag-92429",
        expectHref: "/review/badminton-bag-loadout/",
        expectKind: "guide",
        expectLinkLabel: "Read string guide →",
      },
      product
    );
    expect(issue?.message).toContain("link label");
  });

  it("catalog and commercial bag baselines agree on href and kind per productId", () => {
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercial = validateCommercialBagBaselineFile(commercialRaw);
    const catalogBaseline = validateCatalogBagBaselineFile(catalogRaw);
    expect(commercial.ok).toBe(true);
    expect(catalogBaseline.ok).toBe(true);
    if (!commercial.ok || !catalogBaseline.ok) return;

    const catalogByProduct = new Map(
      catalogBaseline.file.queries.map((q) => [q.productId, q])
    );

    for (const row of commercial.file.queries) {
      const catalogRow = catalogByProduct.get(row.productId);
      expect(catalogRow, `missing catalog baseline for ${row.productId}`).toBeDefined();
      if (!catalogRow) continue;
      expect(catalogRow.expectHref).toBe(row.expectHref);
      expect(catalogRow.expectKind).toBe(row.expectKind);
    }

    const commercialResult = evaluateCommercialBagBaseline(
      commercial.file,
      productLookup
    );
    const catalogResult = evaluateCatalogBagBaseline(
      catalogBaseline.file,
      productLookup
    );
    expect(commercialResult.ok).toBe(true);
    expect(catalogResult.ok).toBe(true);
  });
});
