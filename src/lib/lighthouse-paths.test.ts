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
        "http://localhost:4173/review/how-to-choose-a-badminton-racket/index.html"
      )
    ).toBe("/review/how-to-choose-a-badminton-racket/");
  });

  it("lists review article slugs from committed Lighthouse CI config", () => {
    // Only original editorials are published; the translated reviews that
    // used to fill these slots were removed in Sept 2026.
    expect(lighthouseReviewArticleSlugs()).toEqual([
      "how-to-choose-a-badminton-racket",
    ]);
  });

  it("includes every review article path in full Lighthouse path list", () => {
    const paths = lighthousePaths();
    for (const slug of lighthouseReviewArticleSlugs()) {
      expect(paths).toContain(`/review/${slug}/`);
    }
  });
});
