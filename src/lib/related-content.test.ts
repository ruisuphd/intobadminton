import { describe, expect, it } from "vitest";
import { relatedReadingForPath } from "./related-content";

describe("relatedReadingForPath", () => {
  it("returns shoe-fit cluster for wide-feet guide", () => {
    const items = relatedReadingForPath("/guides/wide-feet-badminton-shoes/");
    expect(items.length).toBe(3);
    expect(items.some((i) => i.href.includes("wide-feet-badminton-shoes"))).toBe(
      true
    );
    expect(
      items.every((i) => i.href !== "/guides/wide-feet-badminton-shoes/")
    ).toBe(true);
  });

  it("returns all-round cluster for balance guide", () => {
    const items = relatedReadingForPath("/guides/racket-balance/");
    expect(items.some((i) => i.href.includes("all-round-rackets"))).toBe(true);
  });

  it("falls back to compare cluster for unmapped compare guides", () => {
    const items = relatedReadingForPath(
      "/compare-guides/astrox-99-pro-vs-astrox-100zz/"
    );
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => i.href.startsWith("/"))).toBe(true);
  });

  it("returns empty for unmapped paths", () => {
    expect(relatedReadingForPath("/about/")).toEqual([]);

    const catalog = relatedReadingForPath("/catalog/");
    expect(catalog.length).toBeGreaterThan(0);
    expect(catalog.some((item) => item.href === "/quiz/")).toBe(true);
  });
});
