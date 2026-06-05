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
    expect(reviewProductIdForBlog("yonex-arcsaber-7-pro-review")).toBe(
      "yy-arcsaber-7-pro"
    );
  });

  it("finds a hands-on blog slug from a review product id", () => {
    const slug = blogSlugForReview("yy-arcsaber-7-pro");
    expect(slug).toBeTruthy();
  });

  it("returns all mapped blog slugs for multi-review products", () => {
    const slugs = blogSlugsForReview("yy-astrox-99-pro");
    expect(slugs.length).toBeGreaterThan(1);
    expect(slugs).toContain("yonex-astrox-99-pro-gen-1-review");
  });

  it("returns flagship Nanoflare 1000 Z review for catalogue id", () => {
    const articles = blogArticlesForReview("yy-nanoflare-1000z");
    expect(articles.length).toBe(1);
    expect(articles[0]?.slug).toBe("yonex-nanoflare-1000z-review");
  });

  it("maps Play comparison article to Nanoflare 1000 Play product id", () => {
    const slugs = blogSlugsForReview("yy-nanoflare-1000-play");
    expect(slugs).toContain("yonex-nanoflare-1000z-play-review");
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
    const links = editorialComparisonsForReview("yy-nanoflare-1000z");
    expect(links.length).toBeGreaterThan(0);
    expect(links.every((link) => link.href.startsWith("/review/"))).toBe(
      true
    );
  });
});
