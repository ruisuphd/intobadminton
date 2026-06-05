import { describe, expect, it } from "vitest";
import {
  relatedReadingForPath,
  relatedReadingForProductCategory,
  relatedReadingForQuizCategory,
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

  it("maps explainer how-to slug to all-round cluster", () => {
    const items = relatedReadingForReviewSlug("how-to-choose-a-badminton-racket");
    expect(items.length).toBe(3);
    expect(items.some((i) => i.href.includes("all-round-rackets"))).toBe(true);
  });

  it("maps depreciation explainer to freshness cluster", () => {
    const items = relatedReadingForReviewSlug("used-racket-depreciation");
    expect(items.some((i) => i.href === "/data/")).toBe(true);
  });
});

describe("relatedReadingForProductCategory", () => {
  it("returns racket cluster for catalogue PDP", () => {
    const items = relatedReadingForProductCategory("racket", "yy-arcsaber-7-pro");
    expect(items.length).toBe(3);
    expect(items.some((i) => i.href.includes("all-round-rackets"))).toBe(true);
    expect(items.every((i) => !i.href.includes("yy-arcsaber-7-pro"))).toBe(true);
  });

  it("returns strings cluster for string PDP", () => {
    const items = relatedReadingForProductCategory("string", "yy-bg80");
    expect(items.some((i) => i.href.includes("string-tension"))).toBe(true);
  });

  it("returns shoe-fit cluster for shoes PDP", () => {
    const items = relatedReadingForProductCategory("shoes", "yy-grpht-thrttl");
    expect(items.length).toBe(3);
    expect(items.some((i) => i.href.includes("shoes"))).toBe(true);
  });
});

describe("relatedReadingForPath extended clusters", () => {
  it("returns strings cluster for best strings hub", () => {
    const items = relatedReadingForPath("/best/strings/");
    expect(items.some((i) => i.href.includes("string-tension"))).toBe(true);
  });

  it("returns doubles cluster for doubles rackets best page", () => {
    const items = relatedReadingForPath("/best/doubles-rackets/");
    expect(items.some((i) => i.href.includes("doubles-roles"))).toBe(true);
  });

  it("returns budget cluster for rackets under 200", () => {
    const items = relatedReadingForPath("/best/rackets-under-200/");
    expect(items.some((i) => i.href.includes("rackets-under-100"))).toBe(true);
  });

  it("returns compare cluster for best-of hub", () => {
    const items = relatedReadingForPath("/best/");
    expect(items.length).toBe(3);
    expect(items.every((i) => i.href !== "/best/")).toBe(true);
    expect(items.some((i) => i.href.startsWith("/compare-guides/"))).toBe(true);
  });

  it("returns brands cluster for brands index", () => {
    const items = relatedReadingForPath("/brands/");
    expect(items.some((i) => i.href.includes("yonex-victor-li-ning"))).toBe(
      true
    );
  });

  it("returns brands cluster for Yonex brand profile", () => {
    const items = relatedReadingForPath("/brands/yonex/");
    expect(items.every((i) => i.href !== "/brands/yonex/")).toBe(true);
    expect(items.some((i) => i.href.includes("compare-guides"))).toBe(true);
  });

  it("returns compare cluster for catalog browse", () => {
    const items = relatedReadingForPath("/catalog/");
    expect(items.some((i) => i.href.startsWith("/compare-guides/"))).toBe(true);
  });

  it("returns compare cluster for compare-guides hub", () => {
    const items = relatedReadingForPath("/compare-guides/");
    expect(items.length).toBe(3);
    expect(items.every((i) => i.href !== "/compare-guides/")).toBe(true);
    expect(items.some((i) => i.href.startsWith("/compare-guides/"))).toBe(true);
  });

  it("returns guides-hub cluster for guides index", () => {
    const items = relatedReadingForPath("/guides/");
    expect(items.some((i) => i.href.includes("string-tension"))).toBe(true);
    expect(items.every((i) => i.href !== "/guides/")).toBe(true);
  });

  it("returns discovery cluster for search page", () => {
    const items = relatedReadingForPath("/search/");
    expect(items.some((i) => i.href === "/compare/")).toBe(true);
    expect(items.some((i) => i.href === "/catalog/")).toBe(true);
  });

  it("returns discovery cluster for saved shelf", () => {
    const items = relatedReadingForPath("/saved/");
    expect(items.some((i) => i.href === "/compare/")).toBe(true);
    expect(items.some((i) => i.href === "/best/")).toBe(true);
  });

  it("returns reviews-hub cluster for review index", () => {
    const items = relatedReadingForPath("/review/");
    expect(items.length).toBe(3);
    expect(items.every((i) => i.href !== "/review/")).toBe(true);
    expect(items.some((i) => i.href === "/best/")).toBe(true);
    expect(items.some((i) => i.href === "/compare-guides/")).toBe(true);
    expect(items.some((i) => i.href === "/quiz/")).toBe(true);
  });
});

describe("relatedReadingForQuizCategory", () => {
  it("returns shoe-fit cluster for shoe quiz results", () => {
    const items = relatedReadingForQuizCategory("shoes");
    expect(items.some((i) => i.href.includes("shoes"))).toBe(true);
  });

  it("returns strings cluster for string quiz results", () => {
    const items = relatedReadingForQuizCategory("string");
    expect(items.some((i) => i.href.includes("string-tension"))).toBe(true);
  });

  it("defaults to all-round rackets when category missing", () => {
    const items = relatedReadingForQuizCategory(undefined);
    expect(items.some((i) => i.href.includes("all-round-rackets"))).toBe(true);
  });
});
