import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import blogReviewMap from "@/data/blog-review-product-map.json";
import explainerSlugs from "@/data/explainer-review-slugs.json";
import products from "@/data/products.json";
import { blogArticles } from "@/lib/blog";
import {
  evaluateReviewProductMapBaseline,
  evaluateReviewProductMapBaselineQuery,
  evaluateReviewProductMapCoverage,
  formatReviewProductMapBaselineIssues,
  validateReviewProductMapBaselineFile,
} from "@/lib/review-product-map-baseline";
import { reviewProductById } from "@/lib/review-pages";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/review-product-map-queries.json"
);

const catalog = products as ProductRecord[];
const map = blogReviewMap as Record<string, string>;
const explainerSet = new Set(explainerSlugs as string[]);
const articleSlugs = blogArticles.en.map((a) => a.slug);

describe("review-product-map-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateReviewProductMapBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("passes all committed golden profiles against live review map", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateReviewProductMapBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateReviewProductMapBaseline(
      parsed.file,
      map,
      articleSlugs,
      explainerSet,
      (id) => reviewProductById(id),
      (id) => catalog.some((p) => p.id === id)
    );
    if (!result.ok) {
      console.error(formatReviewProductMapBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without expectProductId or expectUnmapped", () => {
    const parsed = validateReviewProductMapBaselineFile({
      version: 1,
      queries: [{ id: "empty", slug: "some-slug" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags slug→product mismatches", () => {
    const issue = evaluateReviewProductMapBaselineQuery(
      {
        id: "test",
        slug: "yonex-arcsaber-7-pro-review",
        expectProductId: "wrong-id",
      },
      map,
      (id) => reviewProductById(id),
      explainerSet
    );
    expect(issue?.message).toContain("expected");
  });

  it("enforces minExplainerGuards coverage counter", () => {
    const issue = evaluateReviewProductMapCoverage(
      { minExplainerGuards: 13 },
      articleSlugs,
      explainerSet,
      map,
      [{ id: "one", slug: "how-to-choose-a-badminton-racket", expectUnmapped: true }]
    );
    expect(issue?.message).toContain("minExplainerGuards");
  });

  it("enforces minMappedE2eGuards coverage counter", () => {
    const issue = evaluateReviewProductMapCoverage(
      { minMappedE2eGuards: 35 },
      articleSlugs,
      explainerSet,
      map,
      [
        {
          id: "one",
          slug: "yonex-arcsaber-7-pro-review",
          expectProductId: "yy-arcsaber-7-pro",
          e2e: true,
        },
      ]
    );
    expect(issue?.message).toContain("minMappedE2eGuards");
  });

  it("flags explainer slugs that become mapped", () => {
    const issue = evaluateReviewProductMapBaselineQuery(
      {
        id: "test",
        slug: "how-to-choose-a-badminton-racket",
        expectUnmapped: true,
      },
      { "how-to-choose-a-badminton-racket": "yy-nanoflare-1000z" },
      (id) => reviewProductById(id),
      explainerSet
    );
    expect(issue?.message).toContain("must stay unmapped");
  });

  it("validates catalogue ids resolve for all map entries", () => {
    const ids = Object.values(map);
    expect(ids.every((id) => catalog.some((p) => p.id === id))).toBe(true);
  });
});
