import { describe, expect, it } from "vitest";
import {
  brandReviewHrefs,
  brandReviewLinks,
  brandReviewPrecachePaths,
  brandReviewSlugs,
} from "@/lib/brand-reviews";

describe("brand-reviews", () => {
  it("lists the editorial review slugs linked from brand shelves", () => {
    expect(brandReviewSlugs()).toEqual(["how-to-choose-a-badminton-racket"]);
  });

  it("builds canonical review hrefs", () => {
    const hrefs = brandReviewHrefs();
    expect(hrefs).toHaveLength(brandReviewLinks.length);
    expect(hrefs[0]).toMatch(/^\/review\/.+\/$/);
  });

  it("omits slugs already in Lighthouse precache from brand-only precache list", () => {
    expect(brandReviewPrecachePaths()).not.toContain(
      "/review/how-to-choose-a-badminton-racket/"
    );
  });
});
