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

  it("finds saved shelf", () => {
    const hits = searchSite("saved shortlist");
    expect(hits.some((h) => h.href === "/saved/")).toBe(true);
  });

  it("returns empty for nonsense query", () => {
    expect(searchSite("xyzzyplughnotreal")).toEqual([]);
  });
});
