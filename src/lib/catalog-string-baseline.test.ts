import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCatalogStringBaseline,
  evaluateCatalogStringBaselineQuery,
  formatCatalogStringBaselineIssues,
  validateCatalogStringBaselineFile,
} from "@/lib/catalog-string-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-string-queries.json"
);

const catalog = products as ProductRecord[];

describe("catalog-string-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogStringBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogStringBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCatalogStringBaseline(
      parsed.file,
      (id) => catalogProductById(id) ?? catalog.find((p) => p.id === id)
    );
    if (!result.ok) {
      console.error(formatCatalogStringBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-bg65");
    expect(product).toBeDefined();
    const issue = evaluateCatalogStringBaselineQuery(
      {
        id: "test",
        productId: "yy-bg65",
        expectHref: "/product/yy-bg65/",
        expectKind: "guide",
      },
      product
    );
    expect(issue?.message).toContain("expected href");
  });

  it("flags editorial kind mismatches", () => {
    const product = catalogProductById("ln-l69-string");
    expect(product).toBeDefined();
    const issue = evaluateCatalogStringBaselineQuery(
      {
        id: "test",
        productId: "ln-l69-string",
        expectHref: "/review/li-ning-l69-string-review/",
        expectKind: "guide",
      },
      product
    );
    expect(issue?.message).toContain("editorial kind");
  });
});
