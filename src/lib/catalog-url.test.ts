import { describe, expect, it } from "vitest";
import {
  catalogProductShareUrl,
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
      productId: null,
    });
  });

  it("parses product deep-link id", () => {
    const params = new URLSearchParams("id=yy-nanoflare-1000z&cat=racket");
    expect(parseCatalogSearchParams(params).productId).toBe("yy-nanoflare-1000z");
  });

  it("builds shareable product URLs", () => {
    expect(catalogProductShareUrl("yy-astrox-100zz")).toBe(
      "/catalog/?id=yy-astrox-100zz"
    );
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
      productId: null,
    });
  });

  it("round-trips state to a shareable URL", () => {
    const url = catalogUrlFromState({
      category: "racket",
      brand: "Victor",
      weightClass: null,
      balance: null,
      priceBand: "under200",
      sort: "name",
      productId: null,
    });
    expect(url).toBe("/catalog/?cat=racket&brand=Victor&price=under200&sort=name");
    const parsed = parseCatalogSearchParams(new URLSearchParams(url.split("?")[1]));
    expect(parsed.brand).toBe("Victor");
    expect(parsed.priceBand).toBe("under200");
    expect(parsed.sort).toBe("name");
  });
});
