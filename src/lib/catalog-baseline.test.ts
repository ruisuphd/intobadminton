import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { filterProductsByKeyword } from "@/lib/catalog-keyword";
import { allCatalogProducts } from "@/lib/product-filters";
import {
  evaluateCatalogBaseline,
  evaluateCatalogBaselineQuery,
  formatCatalogBaselineIssues,
  validateCatalogBaselineFile,
} from "@/lib/catalog-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-keyword-queries.json"
);

describe("catalog-baseline", () => {
  it("validates committed golden-query JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(8);
    }
  });

  it("passes all committed golden queries against live catalog index", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCatalogBaseline(parsed.file, (query) =>
      filterProductsByKeyword(allCatalogProducts(), query)
    );
    if (!result.ok) {
      console.error(formatCatalogBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("enforces minE2eGuards coverage counter", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCatalogBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.file.coverage?.minE2eGuards).toBe(9);
    expect(parsed.file.queries.filter((q) => q.e2e).length).toBe(9);
  });

  it("rejects baseline rows without expectations", () => {
    const parsed = validateCatalogBaselineFile({
      version: 1,
      queries: [{ query: "test" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags minResults violations", () => {
    const issue = evaluateCatalogBaselineQuery(
      { query: "foo", minResults: 1 },
      []
    );
    expect(issue?.message).toContain("at least 1");
  });

  it("flags expectProductIdContains mismatches", () => {
    const issue = evaluateCatalogBaselineQuery(
      { query: "foo", expectProductIdContains: "nanoflare" },
      [
        {
          id: "yy-astrox-77-pro",
          brand: "Yonex",
          name: "Astrox 77 Pro",
          category: "racket",
          priceUsd: 100,
        } as never,
      ]
    );
    expect(issue?.message).toContain("nanoflare");
  });

  it("accepts maxResults zero for nonsense queries", () => {
    const issue = evaluateCatalogBaselineQuery(
      { query: "xyzzy", maxResults: 0 },
      []
    );
    expect(issue).toBeNull();
  });
});
