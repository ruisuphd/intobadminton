import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCatalogGripBaseline,
  evaluateCatalogGripBaselineQuery,
  formatCatalogGripBaselineIssues,
  validateCatalogGripBaselineFile,
} from "@/lib/catalog-grip-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-grip-queries.json"
);

const catalog = products as ProductRecord[];

describe("catalog-grip-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogGripBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogGripBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCatalogGripBaseline(
      parsed.file,
      (id) => catalogProductById(id) ?? catalog.find((p) => p.id === id)
    );
    if (!result.ok) {
      console.error(formatCatalogGripBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-as-50");
    expect(product).toBeDefined();
    const issue = evaluateCatalogGripBaselineQuery(
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

  it("flags editorial kind mismatches", () => {
    const product = catalogProductById("yy-ac102c");
    expect(product).toBeDefined();
    const issue = evaluateCatalogGripBaselineQuery(
      {
        id: "test",
        productId: "yy-ac102c",
        expectHref: "/review/yonex-grip-sizes-explained/",
        expectKind: "review",
      },
      product
    );
    expect(issue?.message).toContain("editorial kind");
  });
});
