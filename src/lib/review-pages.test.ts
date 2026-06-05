import { describe, expect, it } from "vitest";
import type { ProductRecord } from "@/lib/types/product";
import {
  blogReviewHrefForProduct,
  catalogProductHref,
  gearPath,
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

  it("catalogProductHref prefers editorial review, then gear PDP", () => {
    const mapped: ProductRecord = {
      id: "yy-as-50",
      name: "Aerosensa 50",
      brand: "Yonex",
      category: "shuttle",
      priceUsd: 15,
      officialSourceUrl: "https://example.com",
    } as ProductRecord;
    expect(catalogProductHref(mapped)).toBe(
      "/review/yonex-aerosensa-50-shuttle-review/"
    );

    const unmapped: ProductRecord = {
      id: "yy-nanoflare-800-pro",
      name: "Nanoflare 800 Pro",
      brand: "Yonex",
      category: "racket",
      priceUsd: 230,
      officialSourceUrl: "https://example.com",
    } as ProductRecord;
    expect(catalogProductHref(unmapped)).toBe(gearPath("yy-nanoflare-800-pro"));
    expect(blogReviewHrefForProduct("yy-nanoflare-800-pro")).toBeNull();
  });
});
