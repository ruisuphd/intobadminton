import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  evaluateReviewsBaseline,
  evaluateReviewsBaselineQuery,
  formatReviewsBaselineIssues,
  reviewPathForSlug,
  validateReviewsBaselineFile,
} from "@/lib/reviews-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/reviews-queries.json"
);

describe("reviews-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateReviewsBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("passes all committed golden profiles against live corpus", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateReviewsBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateReviewsBaseline(parsed.file);
    if (!result.ok) {
      console.error(formatReviewsBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without slug", () => {
    const parsed = validateReviewsBaselineFile({
      version: 1,
      queries: [{ id: "empty", expectCatalogHref: "/catalog/" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags related reading shortfalls on reviews hub", () => {
    const issue = evaluateReviewsBaselineQuery({
      id: "test",
      slug: "index",
      expectCatalogHref: "/catalog/",
      expectMinRelatedReading: 99,
    });
    expect(issue?.message).toContain("related reading count");
  });

  it("flags article count shortfalls on reviews hub", () => {
    const issue = evaluateReviewsBaselineQuery({
      id: "test",
      slug: "index",
      expectCatalogHref: "/catalog/",
      expectMinArticles: 999,
    });
    expect(issue?.message).toContain("review article count");
  });

  it("builds canonical review hub path", () => {
    expect(reviewPathForSlug("index")).toBe("/review/");
  });
});
