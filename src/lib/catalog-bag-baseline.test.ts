import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  evaluateCatalogBagBaseline,
  evaluateCatalogBagBaselineQuery,
  formatCatalogBagBaselineIssues,
  validateCatalogBagBaselineFile,
} from "@/lib/catalog-bag-baseline";
import { catalogProductById } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-bag-queries.json"
);

const catalog = products as ProductRecord[];

describe("catalog-bag-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogBagBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogBagBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCatalogBagBaseline(
      parsed.file,
      (id) => catalogProductById(id) ?? catalog.find((p) => p.id === id)
    );
    if (!result.ok) {
      console.error(formatCatalogBagBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("flags href mismatches", () => {
    const product = catalogProductById("yy-pro-racket-bag-92429");
    expect(product).toBeDefined();
    const issue = evaluateCatalogBagBaselineQuery(
      {
        id: "test",
        productId: "yy-pro-racket-bag-92429",
        expectHref: "/product/yy-pro-racket-bag-92429/",
        expectKind: "guide",
      },
      product
    );
    expect(issue?.message).toContain("expected href");
  });

  it("flags editorial kind mismatches", () => {
    const product = catalogProductById("vic-compact-backpack");
    expect(product).toBeDefined();
    const issue = evaluateCatalogBagBaselineQuery(
      {
        id: "test",
        productId: "vic-compact-backpack",
        expectHref: "/review/badminton-bag-loadout/",
        expectKind: "review",
      },
      product
    );
    expect(issue?.message).toContain("editorial kind");
  });
});
