import { describe, expect, it } from "vitest";
import {
  catalogHrefFromKeywordQuery,
  catalogUrlFromState,
  parseCatalogSearchParams,
} from "@/lib/catalog-url";

describe("catalog-url", () => {
  it("parses valid catalog filters from search params", () => {
    const params = new URLSearchParams(
      "cat=racket&brand=Yonex&price=under150&weight=4U&balance=head_light&sort=price-desc"
    );
    expect(parseCatalogSearchParams(params)).toEqual({
      category: "racket",
      brand: "Yonex",
      weightClass: "4U",
      balance: "head_light",
      priceBand: "under150",
      sort: "price-desc",
      q: null,
    });
  });

  it("drops invalid enum values", () => {
    const params = new URLSearchParams(
      "cat=invalid&price=not-a-band&sort=bad"
    );
    expect(parseCatalogSearchParams(params)).toEqual({
      category: null,
      brand: null,
      weightClass: null,
      balance: null,
      priceBand: null,
      sort: "price-asc",
      q: null,
    });
  });

  it("parses fit-desc sort", () => {
    const params = new URLSearchParams("sort=fit-desc");
    expect(parseCatalogSearchParams(params).sort).toBe("fit-desc");
  });

  it("round-trips state to a shareable URL", () => {
    const url = catalogUrlFromState({
      category: "racket",
      brand: "Victor",
      weightClass: null,
      balance: null,
      priceBand: "under200",
      sort: "name",
      q: null,
    });
    expect(url).toBe("/catalog/?cat=racket&brand=Victor&price=under200&sort=name");
    const parsed = parseCatalogSearchParams(new URLSearchParams(url.split("?")[1]));
    expect(parsed.brand).toBe("Victor");
    expect(parsed.priceBand).toBe("under200");
    expect(parsed.sort).toBe("name");
  });

  it("parses and round-trips keyword query", () => {
    const params = new URLSearchParams("q=nanoflare+4u");
    expect(parseCatalogSearchParams(params).q).toBe("nanoflare 4u");

    const url = catalogUrlFromState({
      ...parseCatalogSearchParams(params),
      category: null,
      brand: null,
      weightClass: null,
      balance: null,
      priceBand: null,
      sort: "price-asc",
    });
    expect(url).toContain("q=nanoflare");
    const reparsed = parseCatalogSearchParams(
      new URLSearchParams(url.split("?")[1] ?? "")
    );
    expect(reparsed.q).toBe("nanoflare 4u");
  });

  it("builds keyword-only catalog href for site search", () => {
    const href = catalogHrefFromKeywordQuery("yonex astrox");
    expect(href).toMatch(/^\/catalog\/\?q=/);
    expect(parseCatalogSearchParams(new URLSearchParams(href.split("?")[1])).q).toBe(
      "yonex astrox"
    );
    expect(catalogHrefFromKeywordQuery("   ")).toBe("/catalog/");
  });
});
