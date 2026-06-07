import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCatalogRacketBaseline,
  evaluateCatalogRacketBaselineQuery,
  formatCatalogRacketBaselineIssues,
  validateCatalogRacketBaselineFile,
} from "@/lib/catalog-racket-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-racket-queries.json"
);

const catalog = products as ProductRecord[];

describe("catalog-racket-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogRacketBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogRacketBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCatalogRacketBaseline(
      parsed.file,
      (id) => catalogProductById(id) ?? catalog.find((p) => p.id === id)
    );
    if (!result.ok) {
      console.error(formatCatalogRacketBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-arcsaber-7-pro");
    expect(product).toBeDefined();
    const issue = evaluateCatalogRacketBaselineQuery(
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

  it("flags editorial kind mismatches", () => {
    const product = catalogProductById("yy-arcsaber-7-pro");
    expect(product).toBeDefined();
    const issue = evaluateCatalogRacketBaselineQuery(
      {
        id: "test",
        productId: "yy-arcsaber-7-pro",
        expectHref: "/review/yonex-arcsaber-7-pro-review/",
        expectKind: "guide",
      },
      product
    );
    expect(issue?.message).toContain("editorial kind");
  });
});
