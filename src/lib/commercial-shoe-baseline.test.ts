import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCommercialShoeBaseline,
  evaluateCommercialShoeBaselineQuery,
  formatCommercialShoeBaselineIssues,
  validateCommercialShoeBaselineFile,
} from "@/lib/commercial-shoe-baseline";
import {
  evaluateCatalogShoeBaseline,
  validateCatalogShoeBaselineFile,
} from "@/lib/catalog-shoe-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-shoe-queries.json"
);
const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-shoe-queries.json"
);

const catalog = products as ProductRecord[];

function productLookup(id: string) {
  return catalogProductById(id) ?? catalog.find((p) => p.id === id);
}

describe("commercial-shoe-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(COMMERCIAL_BASELINE_PATH, "utf8"));
    const parsed = validateCommercialShoeBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(COMMERCIAL_BASELINE_PATH, "utf8"));
    const parsed = validateCommercialShoeBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCommercialShoeBaseline(parsed.file, productLookup);
    if (!result.ok) {
      console.error(formatCommercialShoeBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-comfort-z3");
    expect(product).toBeDefined();
    const issue = evaluateCommercialShoeBaselineQuery(
      {
        id: "test",
        productId: "yy-comfort-z3",
        expectHref: "/product/yy-comfort-z3/",
        expectKind: "review",
      },
      product
    );
    expect(issue?.message).toContain("expected href");
  });

  it("flags link label mismatches", () => {
    const product = catalogProductById("yy-comfort-z3");
    expect(product).toBeDefined();
    const issue = evaluateCommercialShoeBaselineQuery(
      {
        id: "test",
        productId: "yy-comfort-z3",
        expectHref: "/review/yonex-comfort-z3-shoes-review/",
        expectKind: "review",
        expectLinkLabel: "Read string guide →",
      },
      product
    );
    expect(issue?.message).toContain("link label");
  });

  it("catalog and commercial shoe baselines agree on href and kind per productId", () => {
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercial = validateCommercialShoeBaselineFile(commercialRaw);
    const catalogBaseline = validateCatalogShoeBaselineFile(catalogRaw);
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

    const commercialResult = evaluateCommercialShoeBaseline(
      commercial.file,
      productLookup
    );
    const catalogResult = evaluateCatalogShoeBaseline(
      catalogBaseline.file,
      productLookup
    );
    expect(commercialResult.ok).toBe(true);
    expect(catalogResult.ok).toBe(true);
  });
});
