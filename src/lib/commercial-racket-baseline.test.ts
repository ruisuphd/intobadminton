import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCommercialRacketBaseline,
  evaluateCommercialRacketBaselineQuery,
  formatCommercialRacketBaselineIssues,
  validateCommercialRacketBaselineFile,
} from "@/lib/commercial-racket-baseline";
import {
  evaluateCatalogRacketBaseline,
  validateCatalogRacketBaselineFile,
} from "@/lib/catalog-racket-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-racket-queries.json"
);
const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-racket-queries.json"
);

const catalog = products as ProductRecord[];

function productLookup(id: string) {
  return catalogProductById(id) ?? catalog.find((p) => p.id === id);
}

describe("commercial-racket-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(COMMERCIAL_BASELINE_PATH, "utf8"));
    const parsed = validateCommercialRacketBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(COMMERCIAL_BASELINE_PATH, "utf8"));
    const parsed = validateCommercialRacketBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCommercialRacketBaseline(parsed.file, productLookup);
    if (!result.ok) {
      console.error(formatCommercialRacketBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-arcsaber-7-pro");
    expect(product).toBeDefined();
    const issue = evaluateCommercialRacketBaselineQuery(
      {
        id: "test",
        productId: "yy-arcsaber-7-pro",
        expectHref: "/product/yy-arcsaber-7-pro/",
        expectKind: "review",
      },
      product
    );
    expect(issue?.message).toContain("expected href");
  });

  it("flags link label mismatches", () => {
    const product = catalogProductById("yy-arcsaber-7-pro");
    expect(product).toBeDefined();
    const issue = evaluateCommercialRacketBaselineQuery(
      {
        id: "test",
        productId: "yy-arcsaber-7-pro",
        expectHref: "/review/yonex-arcsaber-7-pro-review/",
        expectKind: "review",
        expectLinkLabel: "Read string guide →",
      },
      product
    );
    expect(issue?.message).toContain("link label");
  });

  it("catalog and commercial racket baselines agree on href and kind per productId", () => {
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercial = validateCommercialRacketBaselineFile(commercialRaw);
    const catalogBaseline = validateCatalogRacketBaselineFile(catalogRaw);
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

    const commercialResult = evaluateCommercialRacketBaseline(
      commercial.file,
      productLookup
    );
    const catalogResult = evaluateCatalogRacketBaseline(
      catalogBaseline.file,
      productLookup
    );
    expect(commercialResult.ok).toBe(true);
    expect(catalogResult.ok).toBe(true);
  });
});
