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
    for (const slug of slugs) {
      expect(slug.length).toBeGreaterThan(8);
    }
  });

  it("builds canonical review hrefs", () => {
    const hrefs = homeFeaturedReviewHrefs();
    expect(hrefs).toHaveLength(homeFeaturedReviews.length);
    expect(hrefs[0]).toMatch(/^\/review\/.+\/$/);
  });

  it("precaches every featured article (none are covered by the Lighthouse block)", () => {
    expect(homeFeaturedReviewPrecachePaths()).toEqual(homeFeaturedReviewHrefs());
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
