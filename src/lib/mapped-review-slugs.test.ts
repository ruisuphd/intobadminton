import { describe, expect, it } from "vitest";
import blogReviewMap from "@/data/blog-review-product-map.json";
import {
  mappedProductIdForSlug,
  mappedReviewSlugs,
} from "@/lib/mapped-review-slugs";

describe("mapped-review-slugs", () => {
  it("lists every key in blog-review-product-map.json", () => {
    const slugs = mappedReviewSlugs();
    expect(slugs.length).toBe(Object.keys(blogReviewMap).length);
    expect(slugs).toEqual([...slugs].sort());
  });

  it("resolves product ids for mapped slugs", () => {
    const slug = "victor-drivex-12-vs-astrox-88d-pro";
    expect(mappedProductIdForSlug(slug)).toBe("vic-drivex-12");
  });
});
