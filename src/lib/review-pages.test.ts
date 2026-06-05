import { describe, expect, it } from "vitest";
import { catalogProductById } from "@/lib/catalog-products";
import {
  catalogProductHref,
  editorialReviewHref,
  reviewPath,
  reviewUrl,
} from "@/lib/review-pages";

describe("review page paths", () => {
  it("maps product ids to canonical blog review slugs", () => {
    expect(reviewPath("yy-nanoflare-1000z")).toBe(
      "/review/yonex-nanoflare-1000z-review/"
    );
    expect(reviewPath("yy-comfort-z3")).toBe(
      "/review/yonex-comfort-z3-shoes-review/"
    );
    expect(reviewPath("vic-jetspeed-12")).toBe(
      "/review/victor-jetspeed-12-curious-review/"
    );
  });

  it("falls back to product ids only when no blog article is mapped", () => {
    expect(reviewPath("not-yet-mapped")).toBe("/review/not-yet-mapped/");
  });

  it("builds absolute review URLs from canonical paths", () => {
    expect(reviewUrl("yy-as-50")).toBe(
      "https://intobadminton.com/review/yonex-aerosensa-50-shuttle-review/"
    );
  });

  it("links unmapped catalogue rows to PDP-lite pages", () => {
    const grip = catalogProductById("yy-ac102c");
    expect(grip).toBeDefined();
    expect(catalogProductHref(grip!)).toBe("/product/yy-ac102c/");
  });

  it("editorialReviewHref returns null when no blog article is mapped", () => {
    expect(editorialReviewHref("not-yet-mapped")).toBeNull();
  });

  it("editorialReviewHref returns review path when blog slug exists", () => {
    expect(editorialReviewHref("yy-arcsaber-7-pro")).toBe(
      "/review/yonex-arcsaber-7-pro-review/"
    );
  });
});
