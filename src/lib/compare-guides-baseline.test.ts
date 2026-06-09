import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";
import {
  compareGuidePathForSlug,
  evaluateCompareGuidesBaseline,
  evaluateCompareGuidesBaselineQuery,
  formatCompareGuidesBaselineIssues,
  validateCompareGuidesBaselineFile,
} from "@/lib/compare-guides-baseline";
import { catalogHrefFromCompareSlug } from "@/lib/catalog-url";
import { reviewProductById } from "@/lib/review-pages";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/compare-guides-queries.json"
);

const catalog = products as ProductRecord[];

describe("compare-guides-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCompareGuidesBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCompareGuidesBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCompareGuidesBaseline(
      parsed.file,
      (id) => reviewProductById(id) ?? catalog.find((p) => p.id === id)
    );
    if (!result.ok) {
      console.error(formatCompareGuidesBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without slug", () => {
    const parsed = validateCompareGuidesBaselineFile({
      version: 1,
      queries: [{ id: "empty", expectCatalogHref: "/catalog/" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags catalog href mismatches", () => {
    const issue = evaluateCompareGuidesBaselineQuery(
      {
        id: "test",
        slug: "yonex-astrox-vs-nanoflare",
        expectCatalogHref: "/catalog/?cat=shoes",
      },
      () => undefined
    );
    expect(issue?.message).toContain("catalog href");
  });

  it("flags missing manifest entries", () => {
    const issue = evaluateCompareGuidesBaselineQuery(
      {
        id: "test",
        slug: "missing-compare-guide",
        expectCatalogHref: "/catalog/",
        expectInManifest: true,
      },
      () => undefined
    );
    expect(issue?.message).toContain("COMPARE_GUIDES");
  });

  it("flags missing product ids", () => {
    const issue = evaluateCompareGuidesBaselineQuery(
      {
        id: "test",
        slug: "astrox-99-pro-vs-astrox-100zz",
        expectCatalogHref: catalogHrefFromCompareSlug(
          "astrox-99-pro-vs-astrox-100zz"
        ),
        expectProductIds: ["missing-product-id"],
      },
      () => undefined
    );
    expect(issue?.message).toContain("not in catalogue");
  });

  it("resolves compare guide paths with trailing slash", () => {
    expect(compareGuidePathForSlug("yonex-astrox-vs-nanoflare")).toBe(
      "/compare-guides/yonex-astrox-vs-nanoflare/"
    );
  });

  it("enforces minE2eGuards coverage counter", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 13 },
      [{ e2e: true }],
      "compare-guides"
    );
    expect(issue?.message).toContain("minE2eGuards");
  });

  it("commits minE2eGuards on golden-profile coverage", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateCompareGuidesBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.coverage?.minE2eGuards).toBe(13);
    }
  });
});
