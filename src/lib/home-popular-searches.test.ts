import { describe, expect, it } from "vitest";
import { PRECACHE_ASSERT_PATHS } from "@/lib/pwa-precache-paths";
import { isThinContentNoindex } from "@/lib/thin-content";
import {
  homePopularReviewSlugs,
  homePopularSearchEditorialOfflineRecoveryLinks,
  homePopularSearchPrecachePaths,
  homePopularSearchReviewOfflineRecoveryLinks,
  homePopularSearches,
} from "@/lib/home-popular-searches";

describe("home-popular-searches", () => {
  it("does not deep-link a noindexed review from the homepage grid", () => {
    for (const slug of homePopularReviewSlugs()) {
      expect(isThinContentNoindex(slug), slug).toBe(false);
    }
  });
  it("builds offline recovery links for every popular-search review", () => {
    const links = homePopularSearchReviewOfflineRecoveryLinks();
    expect(links).toHaveLength(homePopularReviewSlugs().length);
    expect(links.map((link) => link.href)).toEqual(
      homePopularSearches
        .filter(
          (entry) =>
            entry.href.startsWith("/review/") && entry.href !== "/review/"
        )
        .map((entry) => entry.href)
    );
    for (const link of links) {
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.description).toMatch(/^Precached —/);
    }
  });

  it("lists every popular-search href for PWA precache parity", () => {
    const paths = homePopularSearchPrecachePaths();
    expect(paths).toEqual(homePopularSearches.map((entry) => entry.href));
    for (const path of paths) {
      expect(PRECACHE_ASSERT_PATHS, `${path} missing from PRECACHE_ASSERT_PATHS`).toContain(
        path
      );
    }
  });

  it("builds offline recovery links for every non-review popular-search pick", () => {
    const links = homePopularSearchEditorialOfflineRecoveryLinks();
    expect(links).toHaveLength(
      homePopularSearches.filter((entry) => !entry.href.startsWith("/review/"))
        .length
    );
    expect(links.map((link) => link.href)).toEqual(
      homePopularSearches
        .filter((entry) => !entry.href.startsWith("/review/"))
        .map((entry) => entry.href)
    );
    for (const link of links) {
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.description).toMatch(/^Precached —/);
    }
  });
});
