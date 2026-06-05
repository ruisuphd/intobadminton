import { describe, expect, it } from "vitest";
import { searchSuggestions } from "./search-suggestions";

describe("search-suggestions", () => {
  it("returns empty for short queries", () => {
    expect(searchSuggestions("a")).toEqual([]);
    expect(searchSuggestions("  ")).toEqual([]);
  });

  it("leads with catalog row when products match", () => {
    const rows = searchSuggestions("yonex nanoflare", 6);
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]?.kind).toBe("catalog");
    if (rows[0]?.kind === "catalog") {
      expect(rows[0].count).toBeGreaterThan(0);
      expect(rows[0].href).toMatch(/\/catalog\/\?q=/);
    }
  });

  it("includes editorial hits after catalog row", () => {
    const rows = searchSuggestions("string tension", 6);
    const entries = rows.filter((r) => r.kind === "entry");
    expect(entries.length).toBeGreaterThan(0);
    expect(
      entries.some(
        (r) => r.kind === "entry" && r.entry.href.includes("string-tension")
      )
    ).toBe(true);
  });

  it("respects limit including catalog row", () => {
    const rows = searchSuggestions("yonex", 3);
    expect(rows.length).toBeLessThanOrEqual(3);
  });
});
