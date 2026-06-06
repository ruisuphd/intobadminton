import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  evaluateHomeBaseline,
  evaluateHomeBaselineQuery,
  formatHomeBaselineIssues,
  HOME_PATH,
  validateHomeBaselineFile,
} from "@/lib/home-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/home-queries.json"
);

describe("home-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateHomeBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("passes all committed golden profiles against live homepage data", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateHomeBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateHomeBaseline(parsed.file);
    if (!result.ok) {
      console.error(formatHomeBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without expectFinderHref", () => {
    const parsed = validateHomeBaselineFile({
      version: 1,
      queries: [{ id: "bad", expectCatalogHref: "/catalog/" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags featured review shortfalls", () => {
    const issue = evaluateHomeBaselineQuery({
      id: "test",
      expectCatalogHref: "/catalog/",
      expectFinderHref: "/quiz/",
      expectMinFeaturedReviews: 99,
    });
    expect(issue?.message).toContain("featured review count");
  });

  it("flags missing popular search hrefs", () => {
    const issue = evaluateHomeBaselineQuery({
      id: "test",
      expectCatalogHref: "/catalog/",
      expectFinderHref: "/quiz/",
      expectPopularSearchHrefs: ["/nonexistent-path-xyz/"],
    });
    expect(issue?.message).toContain("popular search href");
  });

  it("flags missing featured review hrefs", () => {
    const issue = evaluateHomeBaselineQuery({
      id: "test",
      expectCatalogHref: "/catalog/",
      expectFinderHref: "/quiz/",
      expectFeaturedReviewHrefs: ["/review/nonexistent-featured-slug/"],
    });
    expect(issue?.message).toContain("featured review href");
  });

  it("exposes canonical homepage path", () => {
    expect(HOME_PATH).toBe("/");
  });
});
