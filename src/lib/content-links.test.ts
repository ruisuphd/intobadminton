import { describe, expect, it } from "vitest";
import {
  blogSlugForReview,
  compareGuidesForBlog,
  reviewProductIdForBlog,
} from "@/lib/content-links";

describe("content-links", () => {
  it("maps product review blog slugs to catalogue ids", () => {
    expect(reviewProductIdForBlog("yonex-arcsaber-7-pro-review")).toBe(
      "yy-arcsaber-7-pro"
    );
  });

  it("finds a hands-on blog slug from a review product id", () => {
    const slug = blogSlugForReview("yy-arcsaber-7-pro");
    expect(slug).toBeTruthy();
  });

  it("suggests compare guides from slug keywords", () => {
    const guides = compareGuidesForBlog("yonex-astrox-99-pro-gen-1-review");
    expect(guides.length).toBeGreaterThan(0);
    expect(guides[0]).toContain("/compare-guides/");
  });
});
