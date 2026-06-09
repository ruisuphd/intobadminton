import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCatalogShoeBaseline,
  evaluateCatalogShoeBaselineQuery,
  formatCatalogShoeBaselineIssues,
  validateCatalogShoeBaselineFile,
} from "@/lib/catalog-shoe-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-shoe-queries.json"
);

const catalog = products as ProductRecord[];

describe("catalog-shoe-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogShoeBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogShoeBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCatalogShoeBaseline(
      parsed.file,
      (id) => catalogProductById(id) ?? catalog.find((p) => p.id === id)
    );
    if (!result.ok) {
      console.error(formatCatalogShoeBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("enforces minE2eGuards coverage counter", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogShoeBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.file.coverage?.minE2eGuards).toBe(16);
    expect(parsed.file.queries.filter((q) => q.e2e).length).toBe(16);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-comfort-z3");
    expect(product).toBeDefined();
    const issue = evaluateCatalogShoeBaselineQuery(
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

  it("flags editorial kind mismatches", () => {
    const product = catalogProductById("yy-comfort-z3");
    expect(product).toBeDefined();
    const issue = evaluateCatalogShoeBaselineQuery(
      {
        id: "test",
        productId: "yy-comfort-z3",
        expectHref: "/review/yonex-comfort-z3-shoes-review/",
        expectKind: "guide",
      },
      product
    );
    expect(issue?.message).toContain("editorial kind");
  });
});
