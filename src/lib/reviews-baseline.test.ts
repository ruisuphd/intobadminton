import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  catalogHrefFromReviewSlug,
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
      const articleRows = parsed.file.queries.filter((q) => q.slug !== "index");
      expect(articleRows.length).toBeGreaterThanOrEqual(5);
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

  it("rejects expectUnmapped and expectProductId together", () => {
    const parsed = validateReviewsBaselineFile({
      version: 1,
      queries: [
        {
          id: "bad",
          slug: "test-slug",
          expectCatalogHref: "/catalog/",
          expectUnmapped: true,
          expectProductId: "yy-arcsaber-7-pro",
        },
      ],
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

  it("flags missing article slugs", () => {
    const issue = evaluateReviewsBaselineQuery({
      id: "test",
      slug: "nonexistent-slug-xyz",
      expectCatalogHref: "/catalog/",
    });
    expect(issue?.message).toContain("not in corpus");
  });

  it("flags unmapped slug that is mapped", () => {
    const issue = evaluateReviewsBaselineQuery({
      id: "test",
      slug: "yonex-arcsaber-7-pro-review",
      expectCatalogHref: "/catalog/",
      expectUnmapped: true,
    });
    expect(issue?.message).toContain("must stay unmapped");
  });

  it("builds canonical review paths", () => {
    expect(reviewPathForSlug("index")).toBe("/review/");
    expect(reviewPathForSlug("yonex-arcsaber-7-pro-review")).toBe(
      "/review/yonex-arcsaber-7-pro-review/"
    );
  });

  it("resolves catalog href from mapped review slug", () => {
    const href = catalogHrefFromReviewSlug("yonex-arcsaber-7-pro-review");
    expect(href).toContain("/catalog/?cat=racket");
    expect(href).toContain("brand=Yonex");
  });

  it("requires review map article slugs in committed reviews baseline", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateReviewsBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    expect(parsed.file.coverage?.requireReviewMapParity).toBe(true);
    const result = evaluateReviewsBaseline(parsed.file);
    expect(result.ok).toBe(true);
  });

  it("requires homepage featured review slugs in committed reviews baseline", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateReviewsBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    expect(parsed.file.coverage?.requireFeaturedParity).toBe(true);
    const result = evaluateReviewsBaseline(parsed.file);
    expect(result.ok).toBe(true);
  });
});
