import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";
import { filterProductsByKeyword } from "@/lib/catalog-keyword";
import { allCatalogProducts } from "@/lib/product-filters";
import { searchSubmitHref } from "@/lib/search-submit-route";
import { countCatalogKeywordMatches } from "@/lib/site-search-catalog";
import {
  evaluateDiscoveryParity,
  evaluateDiscoveryParityQuery,
  formatDiscoveryParityIssues,
  validateDiscoveryParityFile,
} from "@/lib/discovery-parity";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/discovery-parity-queries.json"
);

describe("discovery-parity", () => {
  it("validates committed golden-pair JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateDiscoveryParityFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("passes all committed golden pairs against live routing + catalog", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateDiscoveryParityFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateDiscoveryParity(parsed.file, (query) => {
      const products = filterProductsByKeyword(allCatalogProducts(), query);
      return {
        submitHref: searchSubmitHref(query),
        catalogCount: countCatalogKeywordMatches(query),
        products,
      };
    });
    if (!result.ok) {
      console.error(formatDiscoveryParityIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without expectations", () => {
    const parsed = validateDiscoveryParityFile({
      version: 1,
      queries: [{ query: "test" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags submit href mismatches", () => {
    const issue = evaluateDiscoveryParityQuery(
      { query: "ac102c", expectSubmitHrefContains: "/catalog/?q=ac102c" },
      {
        submitHref: "/search/?q=ac102c",
        catalogCount: 1,
        products: [],
      }
    );
    expect(issue?.message).toContain("submit href");
  });

  it("enforces minE2eGuards coverage counter", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 4 },
      [{ e2e: true }],
      "discovery-parity"
    );
    expect(issue?.message).toContain("minE2eGuards");
  });

  it("commits minE2eGuards on golden-pair coverage", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateDiscoveryParityFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.coverage?.minE2eGuards).toBe(4);
      expect(parsed.file.queries.filter((q) => q.e2e).length).toBe(4);
    }
  });

  it("flags catalog count below minimum", () => {
    const issue = evaluateDiscoveryParityQuery(
      { query: "foo", minCatalogResults: 1 },
      {
        submitHref: "/catalog/?q=foo",
        catalogCount: 0,
        products: [],
      }
    );
    expect(issue?.message).toContain("catalog match");
  });
});
