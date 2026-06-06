import { describe, expect, it } from "vitest";
import {
  homeFeaturedOfflineRecoveryLinks,
  homeFeaturedReviewHrefs,
  homeFeaturedReviewPrecachePaths,
  homeFeaturedReviewSlugs,
  homeFeaturedReviews,
} from "@/lib/home-featured";

describe("home-featured", () => {
  it("lists six unique featured review slugs from homepage slice", () => {
    const slugs = homeFeaturedReviewSlugs();
    expect(slugs).toHaveLength(6);
    expect(new Set(slugs).size).toBe(6);
    expect(slugs).toContain("gosen-ryoga-shiden-review");
    expect(slugs).toContain("bonny-leisu-800-lt-review");
  });

  it("builds canonical review hrefs", () => {
    const hrefs = homeFeaturedReviewHrefs();
    expect(hrefs).toHaveLength(homeFeaturedReviews.length);
    expect(hrefs[0]).toMatch(/^\/review\/.+\/$/);
  });

  it("omits slugs already in Lighthouse precache from featured-only precache list", () => {
    const paths = homeFeaturedReviewPrecachePaths();
    expect(paths).not.toContain("/review/gosen-ryoga-shiden-review/");
    expect(paths).not.toContain("/review/anta-ah600w-racket-review/");
    expect(paths).toContain("/review/yonex-nanospeed-9900-ltg-green-sword-review/");
    expect(paths).toContain("/review/victor-fz-100xx-budget-attack-review/");
    expect(paths).toHaveLength(4);
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
