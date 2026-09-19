import { describe, expect, it } from "vitest";
import {
  compareGuideReviewHrefs,
  compareGuideReviewLinks,
  compareGuideReviewSlugs,
} from "@/lib/compare-guide-reviews";

describe("compare-guide-reviews", () => {
  // Every review these shelves linked was a translation removed in Sept 2026.
  it("lists no editorial review slugs until a rewritten review returns", () => {
    expect(compareGuideReviewSlugs()).toEqual([]);
  });

  it("builds one canonical review href per link", () => {
    const hrefs = compareGuideReviewHrefs();
    expect(hrefs).toHaveLength(compareGuideReviewLinks.length);
    for (const href of hrefs) expect(href).toMatch(/^\/review\/.+\/$/);
  });
});
