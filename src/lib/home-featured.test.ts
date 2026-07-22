import { describe, expect, it } from "vitest";
import {
  homeFeaturedOfflineRecoveryLinks,
  homeFeaturedReviewHrefs,
  homeFeaturedReviewPrecachePaths,
  homeFeaturedReviewSlugs,
  homeFeaturedReviews,
} from "@/lib/home-featured";

const ALREADY_PRECACHED_FEATURED = new Set([
  "/review/gosen-ryoga-shiden-review/",
  "/review/anta-ah600w-racket-review/",
]);

describe("home-featured", () => {
  it("lists six unique featured review slugs from homepage slice", () => {
    const slugs = homeFeaturedReviewSlugs();
    expect(slugs).toHaveLength(6);
    expect(new Set(slugs).size).toBe(6);
    expect(slugs).toContain("li-ning-axforce-100-gen-1-review");
    expect(slugs).toContain("li-ning-axforce-90-dragon-max-review");
  });

  it("builds canonical review hrefs", () => {
    const hrefs = homeFeaturedReviewHrefs();
    expect(hrefs).toHaveLength(homeFeaturedReviews.length);
    expect(hrefs[0]).toMatch(/^\/review\/.+\/$/);
  });

  it("omits slugs already in Lighthouse precache from featured-only precache list", () => {
    const paths = homeFeaturedReviewPrecachePaths();
    for (const href of ALREADY_PRECACHED_FEATURED) {
      expect(paths).not.toContain(href);
    }
    const expected = homeFeaturedReviewHrefs().filter(
      (href) => !ALREADY_PRECACHED_FEATURED.has(href)
    );
    expect(paths).toEqual(expected);
  });

  it("builds offline recovery links for every featured review", () => {
    const links = homeFeaturedOfflineRecoveryLinks();
    expect(links).toHaveLength(6);
    expect(links.map((link) => link.href)).toEqual(homeFeaturedReviewHrefs());
    for (const link of links) {
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.description).toMatch(/^Precached —/);
    }
  });
});
