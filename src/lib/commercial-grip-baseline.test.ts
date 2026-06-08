import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCommercialGripBaseline,
  evaluateCommercialGripBaselineQuery,
  formatCommercialGripBaselineIssues,
  validateCommercialGripBaselineFile,
} from "@/lib/commercial-grip-baseline";
import {
  evaluateCatalogGripBaseline,
  validateCatalogGripBaselineFile,
} from "@/lib/catalog-grip-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-grip-queries.json"
);
const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-grip-queries.json"
);

const catalog = products as ProductRecord[];

function productLookup(id: string) {
  return catalogProductById(id) ?? catalog.find((p) => p.id === id);
}

describe("commercial-grip-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(COMMERCIAL_BASELINE_PATH, "utf8"));
    const parsed = validateCommercialGripBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(COMMERCIAL_BASELINE_PATH, "utf8"));
    const parsed = validateCommercialGripBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCommercialGripBaseline(parsed.file, productLookup);
    if (!result.ok) {
      console.error(formatCommercialGripBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-ac102c");
    expect(product).toBeDefined();
    const issue = evaluateCommercialGripBaselineQuery(
      {
        id: "test",
        productId: "yy-ac102c",
        expectHref: "/product/yy-ac102c/",
        expectKind: "guide",
      },
      product
    );
    expect(issue?.message).toContain("expected href");
  });

  it("flags link label mismatches", () => {
    const product = catalogProductById("ln-gp100-pro-grip");
    expect(product).toBeDefined();
    const issue = evaluateCommercialGripBaselineQuery(
      {
        id: "test",
        productId: "ln-gp100-pro-grip",
        expectHref: "/review/li-ning-gp100-pro-overgrip-review/",
        expectKind: "review",
        expectLinkLabel: "Read grip guide →",
      },
      product
    );
    expect(issue?.message).toContain("link label");
  });

  it("catalog and commercial grip baselines agree on href and kind per productId", () => {
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercial = validateCommercialGripBaselineFile(commercialRaw);
    const catalogBaseline = validateCatalogGripBaselineFile(catalogRaw);
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

    const commercialResult = evaluateCommercialGripBaseline(
      commercial.file,
      productLookup
    );
    const catalogResult = evaluateCatalogGripBaseline(
      catalogBaseline.file,
      productLookup
    );
    expect(commercialResult.ok).toBe(true);
    expect(catalogResult.ok).toBe(true);
  });
});
