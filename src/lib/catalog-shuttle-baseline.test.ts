import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCatalogShuttleBaseline,
  evaluateCatalogShuttleBaselineQuery,
  formatCatalogShuttleBaselineIssues,
  validateCatalogShuttleBaselineFile,
} from "@/lib/catalog-shuttle-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-shuttle-queries.json"
);

const catalog = products as ProductRecord[];

describe("catalog-shuttle-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogShuttleBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogShuttleBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCatalogShuttleBaseline(
      parsed.file,
      (id) => catalogProductById(id) ?? catalog.find((p) => p.id === id)
    );
    if (!result.ok) {
      console.error(formatCatalogShuttleBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-as-50");
    expect(product).toBeDefined();
    const issue = evaluateCatalogShuttleBaselineQuery(
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
    const product = catalogProductById("rsl-supreme-shuttle");
    expect(product).toBeDefined();
    const issue = evaluateCatalogShuttleBaselineQuery(
      {
        id: "test",
        productId: "rsl-supreme-shuttle",
        expectHref: "/review/rsl-supreme-shuttle-review/",
        expectKind: "guide",
      },
      product
    );
    expect(issue?.message).toContain("editorial kind");
  });
});
