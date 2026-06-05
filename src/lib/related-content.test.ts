import { describe, expect, it } from "vitest";
import {
  relatedReadingForPath,
  relatedReadingForReviewSlug,
} from "./related-content";

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

  it("returns defensive cluster for defensive best-of page", () => {
    const items = relatedReadingForPath("/best/defensive-rackets/");
    expect(items.some((i) => i.href.includes("head-light-rackets"))).toBe(true);
    expect(items.every((i) => i.href !== "/best/defensive-rackets/")).toBe(true);
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
  });

  it("returns all-round cluster for singles rackets best page", () => {
    const items = relatedReadingForPath("/best/singles-rackets/");
    expect(items.length).toBe(3);
    expect(items.some((i) => i.href.includes("all-round-rackets"))).toBe(true);
  });

  it("returns shoe-fit cluster for budget shoes best page", () => {
    const items = relatedReadingForPath("/best/budget-badminton-shoes/");
    expect(items.some((i) => i.href.includes("shoes"))).toBe(true);
  });

  it("returns freshness cluster for season refresh guide", () => {
    const items = relatedReadingForPath("/guides/season-refresh/");
    expect(items.some((i) => i.href === "/data/")).toBe(true);
  });

  it("includes string feel guide in strings cluster", () => {
    const items = relatedReadingForPath("/guides/string-tension/");
    expect(
      items.some((i) => i.href === "/guides/string-feel-vs-durability/")
    ).toBe(true);
  });

  it("maps review shoe slugs to shoe-fit cluster", () => {
    const items = relatedReadingForReviewSlug("yonex-65z4-shoes-review");
    expect(items.some((i) => i.href.includes("shoes"))).toBe(true);
    expect(items.every((i) => !i.href.includes("yonex-65z4-shoes-review"))).toBe(
      true
    );
  });

  it("maps review string slugs to strings cluster", () => {
    const items = relatedReadingForReviewSlug("li-ning-l69-string-review");
    expect(
      items.some((i) => i.href.includes("string-feel-vs-durability"))
    ).toBe(true);
  });
});
