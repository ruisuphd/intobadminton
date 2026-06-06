import { describe, expect, it } from "vitest";
import {
  compareGuideReviewHrefs,
  compareGuideReviewLinks,
  compareGuideReviewSlugs,
} from "@/lib/compare-guide-reviews";

describe("compare-guide-reviews", () => {
  it("lists seven unique editorial review slugs from compare-guide shelves", () => {
    const slugs = compareGuideReviewSlugs();
    expect(slugs).toHaveLength(7);
    expect(new Set(slugs).size).toBe(7);
    expect(slugs).toContain("yonex-nanoflare-speed-series-explained");
    expect(slugs).toContain("li-ning-halbertec-8000-vs-9000-vs-9000-power");
  });

  it("builds canonical review hrefs", () => {
    const hrefs = compareGuideReviewHrefs();
    expect(hrefs).toHaveLength(compareGuideReviewLinks.length);
    expect(hrefs[0]).toMatch(/^\/review\/.+\/$/);
  });
});
