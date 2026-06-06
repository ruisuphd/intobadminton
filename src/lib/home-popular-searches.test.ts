import { describe, expect, it } from "vitest";
import {
  homePopularReviewSlugs,
  homePopularSearchEditorialOfflineRecoveryLinks,
  homePopularSearchReviewOfflineRecoveryLinks,
  homePopularSearches,
} from "@/lib/home-popular-searches";

describe("home-popular-searches", () => {
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
