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
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(2);
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
    const product = catalogProductById("vic-drivex-12");
    expect(product).toBeDefined();
    const issue = evaluateCatalogRacketBaselineQuery(
      {
        id: "test",
        productId: "vic-drivex-12",
        expectHref: "/product/vic-drivex-12/",
        expectKind: "review",
      },
      product
    );
    expect(issue?.message).toContain("expected href");
  });

  it("enforces minE2eGuards coverage counter", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogRacketBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.file.coverage?.minE2eGuards).toBe(2);
    expect(parsed.file.queries.filter((q) => q.e2e).length).toBe(2);
  });

  it("flags editorial kind mismatches", () => {
    const product = catalogProductById("vic-drivex-12");
    expect(product).toBeDefined();
    const issue = evaluateCatalogRacketBaselineQuery(
      {
        id: "test",
        productId: "vic-drivex-12",
        expectHref: "/review/victor-drivex-12-vs-astrox-88d-pro/",
        expectKind: "guide",
      },
      product
    );
    expect(issue?.message).toContain("editorial kind");
  });
});
