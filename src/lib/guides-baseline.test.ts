import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";
import {
  evaluateGuidesBaseline,
  evaluateGuidesBaselineQuery,
  formatGuidesBaselineIssues,
  guidePathForSlug,
  validateGuidesBaselineFile,
} from "@/lib/guides-baseline";
import { catalogHrefFromGuideSlug } from "@/lib/catalog-url";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/guides-queries.json"
);

describe("guides-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateGuidesBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateGuidesBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateGuidesBaseline(parsed.file);
    if (!result.ok) {
      console.error(formatGuidesBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without slug", () => {
    const parsed = validateGuidesBaselineFile({
      version: 1,
      queries: [{ id: "empty", expectCatalogHref: "/catalog/" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags catalog href mismatches", () => {
    const issue = evaluateGuidesBaselineQuery({
      id: "test",
      slug: "string-tension",
      expectCatalogHref: "/catalog/?cat=shoes",
    });
    expect(issue?.message).toContain("catalog href");
  });

  it("flags related reading shortfalls", () => {
    const issue = evaluateGuidesBaselineQuery({
      id: "test",
      slug: "string-tension",
      expectCatalogHref: catalogHrefFromGuideSlug("string-tension"),
      expectMinRelatedReading: 99,
    });
    expect(issue?.message).toContain("related reading count");
  });

  it("builds canonical guide paths", () => {
    expect(guidePathForSlug("string-tension")).toBe("/guides/string-tension/");
  });

  it("enforces minE2eGuards coverage counter", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 12 },
      [{ e2e: true }],
      "guides"
    );
    expect(issue?.message).toContain("minE2eGuards");
  });
});
