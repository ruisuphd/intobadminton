import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";
import {
  brandPathForSlug,
  evaluateBrandsBaseline,
  evaluateBrandsBaselineQuery,
  formatBrandsBaselineIssues,
  validateBrandsBaselineFile,
} from "@/lib/brands-baseline";
import { catalogHrefFromBrandSlug } from "@/lib/catalog-url";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/brands-queries.json"
);

describe("brands-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateBrandsBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(7);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateBrandsBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateBrandsBaseline(parsed.file);
    if (!result.ok) {
      console.error(formatBrandsBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without slug", () => {
    const parsed = validateBrandsBaselineFile({
      version: 1,
      queries: [{ id: "empty", expectCatalogHref: "/catalog/" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags catalog href mismatches", () => {
    const issue = evaluateBrandsBaselineQuery({
      id: "test",
      slug: "yonex",
      expectCatalogHref: "/catalog/?brand=Victor",
    });
    expect(issue?.message).toContain("catalog href");
  });

  it("flags related reading shortfalls on brands hub", () => {
    const issue = evaluateBrandsBaselineQuery({
      id: "test",
      slug: "index",
      expectCatalogHref: "/catalog/",
      expectMinRelatedReading: 99,
    });
    expect(issue?.message).toContain("related reading count");
  });

  it("builds canonical brand paths", () => {
    expect(brandPathForSlug("index")).toBe("/brands/");
    expect(brandPathForSlug("yonex")).toBe("/brands/yonex/");
  });

  it("resolves yonex catalog href from slug", () => {
    expect(catalogHrefFromBrandSlug("yonex")).toBe("/catalog/?brand=Yonex");
  });

  it("enforces minE2eGuards coverage counter", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 8 },
      [{ e2e: true }],
      "brands"
    );
    expect(issue?.message).toContain("minE2eGuards");
  });
});
