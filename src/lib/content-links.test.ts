import { describe, expect, it } from "vitest";
import {
  blogArticlesForReview,
  blogSlugForReview,
  blogSlugsForReview,
  compareGuidesForBlog,
  editorialComparisonsForReview,
  reviewDescriptionFromArticles,
  reviewProductIdForBlog,
} from "@/lib/content-links";

describe("content-links", () => {
  it("maps product review blog slugs to catalogue ids", () => {
    expect(reviewProductIdForBlog("victor-drivex-12-vs-astrox-88d-pro")).toBe(
      "vic-drivex-12"
    );
  });

  it("finds a blog slug from a review product id", () => {
    expect(blogSlugForReview("vic-drivex-12")).toBe(
      "victor-drivex-12-vs-astrox-88d-pro"
    );
  });

  it("returns the mapped blog slugs for a product", () => {
    expect(blogSlugsForReview("vic-drivex-12")).toEqual([
      "victor-drivex-12-vs-astrox-88d-pro",
    ]);
    expect(blogSlugsForReview("yy-nanoflare-1000z")).toEqual([]);
  });

  it("returns article records for a mapped product", () => {
    const articles = blogArticlesForReview("vic-drivex-12");
    expect(articles.map((a) => a.slug)).toEqual([
      "victor-drivex-12-vs-astrox-88d-pro",
    ]);
  });

  it("links editorial comparisons through relatedReviewProductId", () => {
    const editorial = editorialComparisonsForReview("ln-axforce-100-gen-2");
    expect(
      editorial.some((link) =>
        link.href.includes("li-ning-thunder-100-gen-2-vs-gen-1")
      )
    ).toBe(true);
  });

  it("prefers editorNote for review descriptions", () => {
    const description = reviewDescriptionFromArticles("Short founder note", []);
    expect(description).toBe("Short founder note");
  });

  it("suggests compare guides from slug keywords", () => {
    const guides = compareGuidesForBlog("yonex-astrox-99-pro-gen-1-review");
    expect(guides.length).toBeGreaterThan(0);
    expect(guides[0]).toContain("/compare-guides/");
  });

  it("merges manual and relatedReviewProductId editorial links", () => {
    const links = editorialComparisonsForReview("ln-axforce-100-gen-2");
    expect(links.length).toBeGreaterThan(0);
    expect(links.every((link) => link.href.startsWith("/review/"))).toBe(
      true
    );
  });
});
