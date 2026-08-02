import { describe, expect, it } from "vitest";
import {
  lighthousePaths,
  lighthouseReviewArticleSlugs,
  lighthouseUrlToPath,
} from "./lighthouse-paths";

describe("lighthouse-paths", () => {
  it("converts local LHCI URLs to trailing-slash paths", () => {
    expect(lighthouseUrlToPath("http://localhost:4173/index.html")).toBe("/");
    expect(
      lighthouseUrlToPath(
        "http://localhost:4173/review/yonex-arcsaber-7-pro-review/index.html"
      )
    ).toBe("/review/yonex-arcsaber-7-pro-review/");
  });

  it("lists review article slugs from committed Lighthouse CI config", () => {
    const slugs = lighthouseReviewArticleSlugs();
    expect(slugs).toContain("yonex-arcsaber-7-pro-review");
    expect(slugs).toContain("yonex-nanoflare-1000z-review");
    // Swapped in when the originals were noindexed as thin content —
    // Lighthouse scores a noindexed page ~0.69 on SEO, which is an error-
    // level assertion. See src/lib/thin-content.test.ts.
    expect(slugs).toContain("li-ning-halbertec-5000-racket-review");
    expect(slugs).toContain("yonex-arcsaber-7-tour-review");
    expect(slugs).toContain("yonex-tour-series-buying-guide");
    expect(slugs).toContain("how-to-choose-a-badminton-racket");
    expect(slugs.length).toBe(6);
  });

  it("includes every review article path in full Lighthouse path list", () => {
    const paths = lighthousePaths();
    for (const slug of lighthouseReviewArticleSlugs()) {
      expect(paths).toContain(`/review/${slug}/`);
    }
  });
});
