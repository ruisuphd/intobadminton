import { describe, expect, it } from "vitest";
import {
  homeFeaturedOfflineRecoveryLinks,
  homeFeaturedReviewHrefs,
  homeFeaturedReviewPrecachePaths,
  homeFeaturedReviewSlugs,
  homeFeaturedReviews,
} from "@/lib/home-featured";

// Mirrors the Lighthouse precache block in pwa-precache-paths.ts — those paths
// are covered there, so homeFeaturedReviewPrecachePaths() must not repeat them.
const ALREADY_PRECACHED_FEATURED = new Set([
  "/review/li-ning-halbertec-5000-racket-review/",
  "/review/yonex-arcsaber-7-tour-review/",
]);

describe("home-featured", () => {
  it("lists six unique featured review slugs from homepage slice", () => {
    const slugs = homeFeaturedReviewSlugs();
    expect(slugs).toHaveLength(6);
    expect(new Set(slugs).size).toBe(6);
    expect(slugs).toContain("li-ning-mirage-ii-pro-shoes-review");
    expect(slugs).toContain("li-ning-thunder-2-pro-shoes-review");
    expect(slugs).toContain("yonex-astrox-99-pro-2-deep-dive");
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
