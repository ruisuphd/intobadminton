import { describe, expect, it } from "vitest";
import { buildSearchIndex, searchSite, searchIndexSize } from "./site-search";

describe("site-search", () => {
  it("builds a non-empty index", () => {
    const index = buildSearchIndex();
    expect(index.length).toBeGreaterThan(100);
    expect(searchIndexSize).toBe(index.length);
  });

  it("finds reviews by product name", () => {
    const hits = searchSite("nanoflare 1000");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.some((h) => h.href.includes("nanoflare"))).toBe(true);
  });

  it("finds guides by topic", () => {
    const hits = searchSite("string tension");
    expect(hits.some((h) => h.href.includes("string-tension"))).toBe(true);
  });

  it("finds cluster pillar guides", () => {
    expect(
      searchSite("running shoes").some((h) =>
        h.href.includes("badminton-shoes-vs-running")
      )
    ).toBe(true);
    expect(
      searchSite("doubles positioning").some((h) =>
        h.href.includes("doubles-positioning")
      )
    ).toBe(true);
  });

  it("finds tools", () => {
    const hits = searchSite("authenticity checker");
    expect(hits.some((h) => h.href.includes("authenticity-checker"))).toBe(true);
  });

  it("finds budget best-of page", () => {
    const hits = searchSite("rackets under 100");
    expect(hits.some((h) => h.href.includes("rackets-under-100"))).toBe(true);
  });

  it("finds lightweight and shoulder-comfort best pages", () => {
    expect(
      searchSite("5u lightweight").some((h) =>
        h.href.includes("lightweight-rackets-5u")
      )
    ).toBe(true);
    expect(
      searchSite("shoulder comfort").some((h) =>
        h.href.includes("rackets-for-shoulder-comfort")
      )
    ).toBe(true);
  });

  it("finds catalog products by brand and model", () => {
    const hits = searchSite("yonex nanoflare 1000");
    expect(hits.some((h) => h.kind === "product")).toBe(true);
  });

  it("filters by kind when requested", () => {
    const hits = searchSite("yonex", 50, "product");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every((h) => h.kind === "product")).toBe(true);
  });

  it("finds saved shelf", () => {
    const hits = searchSite("saved shortlist");
    expect(hits.some((h) => h.href === "/saved/")).toBe(true);
  });

  it("finds compare guides by model pair", () => {
    const hits = searchSite("astrox 99 pro 100zz");
    expect(
      hits.some((h) => h.href.includes("astrox-99-pro-vs-astrox-100zz"))
    ).toBe(true);
  });

  it("finds equipment catalog", () => {
    const hits = searchSite("equipment catalog");
    expect(hits.some((h) => h.href === "/catalog/")).toBe(true);
  });

  it("returns empty for nonsense query", () => {
    expect(searchSite("xyzzyplughnotreal")).toEqual([]);
  });
});
