import { describe, expect, it } from "vitest";
import {
  brandReviewHrefs,
  brandReviewLinks,
  brandReviewPrecachePaths,
  brandReviewSlugs,
} from "@/lib/brand-reviews";

describe("brand-reviews", () => {
  it("lists nineteen unique editorial review slugs from brand shelves", () => {
    const slugs = brandReviewSlugs();
    expect(slugs).toHaveLength(19);
    expect(new Set(slugs).size).toBe(19);
    expect(slugs).toContain("yonex-comfort-z3-shoes-review");
    expect(slugs).toContain("kumpoo-fourth-major-badminton-brand-profile");
  });

  it("builds canonical review hrefs", () => {
    const hrefs = brandReviewHrefs();
    expect(hrefs).toHaveLength(brandReviewLinks.length);
    expect(hrefs[0]).toMatch(/^\/review\/.+\/$/);
  });

  it("omits slugs already in Lighthouse precache from brand-only precache list", () => {
    const paths = brandReviewPrecachePaths();
    expect(paths).not.toContain("/review/yonex-nanoflare-1000z-review/");
    expect(paths).toContain("/review/yonex-comfort-z3-shoes-review/");
    expect(paths.length).toBeGreaterThan(10);
  });
});
