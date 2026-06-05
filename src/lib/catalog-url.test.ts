import { describe, expect, it } from "vitest";
import {
  catalogCtaLabelFromProduct,
  catalogHrefFromBestSlug,
  catalogHrefFromBrand,
  catalogHrefFromCompareSlug,
  catalogCtaLabelFromGuideSlug,
  catalogHrefFromGuideSlug,
  catalogHrefFromKeywordQuery,
  catalogHrefFromProduct,
  catalogHrefFromProfile,
  catalogHrefFromToolSlug,
  catalogCtaLabelFromToolSlug,
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

  it("builds brand-filtered catalog href for brand landings", () => {
    expect(catalogHrefFromBrand("Anta")).toBe("/catalog/?brand=Anta");
    expect(parseCatalogSearchParams(new URLSearchParams("brand=Anta")).brand).toBe(
      "Anta"
    );
    expect(catalogHrefFromBrand("   ")).toBe("/catalog/");
  });

  it("builds best-of slug catalog hrefs with matching filters", () => {
    expect(catalogHrefFromBestSlug("rackets-under-100")).toBe(
      "/catalog/?cat=racket&price=under100"
    );
    expect(catalogHrefFromBestSlug("lightweight-rackets-5u")).toBe(
      "/catalog/?cat=racket&weight=5U"
    );
    expect(catalogHrefFromBestSlug("strings")).toBe("/catalog/?cat=string");
    expect(catalogHrefFromBestSlug("unknown-slug")).toBe("/catalog/");
  });

  it("builds compare-guide slug catalog hrefs with matching filters", () => {
    expect(catalogHrefFromCompareSlug("yonex-astrox-vs-nanoflare")).toBe(
      "/catalog/?cat=racket&brand=Yonex"
    );
    expect(catalogHrefFromCompareSlug("badminton-vs-tennis-shoes")).toBe(
      "/catalog/?cat=shoes"
    );
    expect(catalogHrefFromCompareSlug("yonex-65z4-vs-eclipsion-z3")).toBe(
      "/catalog/?cat=shoes&brand=Yonex"
    );
    expect(catalogHrefFromCompareSlug("unknown-slug")).toBe("/catalog/");
  });

  it("builds guide slug catalog hrefs with matching filters", () => {
    expect(catalogHrefFromGuideSlug("string-tension")).toBe(
      "/catalog/?cat=string"
    );
    expect(catalogHrefFromGuideSlug("badminton-shoes-vs-running-shoes")).toBe(
      "/catalog/?cat=shoes"
    );
    expect(catalogHrefFromGuideSlug("racket-balance")).toBe(
      "/catalog/?cat=racket"
    );
    expect(catalogHrefFromGuideSlug("season-refresh")).toBe("/catalog/");
    expect(catalogHrefFromGuideSlug("unknown-slug")).toBe("/catalog/");
  });

  it("labels guide catalog CTAs by category", () => {
    expect(catalogCtaLabelFromGuideSlug("string-tension")).toBe(
      "Browse strings in catalog"
    );
    expect(catalogCtaLabelFromGuideSlug("badminton-shoes-vs-running-shoes")).toBe(
      "Browse shoes in catalog"
    );
    expect(catalogCtaLabelFromGuideSlug("racket-balance")).toBe(
      "Browse rackets in catalog"
    );
    expect(catalogCtaLabelFromGuideSlug("unknown-slug")).toBe(
      "Browse matching catalog"
    );
  });

  it("builds tool slug catalog hrefs with matching filters", () => {
    expect(catalogHrefFromToolSlug("string-tension-calculator")).toBe(
      "/catalog/?cat=string"
    );
    expect(catalogHrefFromToolSlug("racket-balance-explainer")).toBe(
      "/catalog/?cat=racket"
    );
    expect(catalogHrefFromToolSlug("authenticity-checker")).toBe(
      "/catalog/?cat=racket"
    );
    expect(catalogHrefFromToolSlug("court-diagram")).toBe("/catalog/");
    expect(catalogHrefFromToolSlug("unknown-slug")).toBe("/catalog/");
  });

  it("labels tool catalog CTAs by category", () => {
    expect(catalogCtaLabelFromToolSlug("string-tension-calculator")).toBe(
      "Browse strings in catalog"
    );
    expect(catalogCtaLabelFromToolSlug("authenticity-checker")).toBe(
      "Browse rackets in catalog"
    );
    expect(catalogCtaLabelFromToolSlug("court-diagram")).toBe(
      "Browse matching catalog"
    );
  });

  it("builds product catalog hrefs with brand and category filters", () => {
    expect(
      catalogHrefFromProduct({ brand: "Yonex", category: "racket" })
    ).toBe("/catalog/?cat=racket&brand=Yonex");
    expect(
      catalogCtaLabelFromProduct({ brand: "Yonex", category: "racket" })
    ).toBe("Browse Yonex in catalog");
  });

  it("builds profile catalog hrefs from quiz category, budget, style, and sort", () => {
    expect(
      catalogHrefFromProfile({
        level: "club",
        discipline: "doubles",
        styles: ["offensive"],
        category: "racket",
        body: {
          budgetMaxUsd: 120,
          weightKg: 75,
          footWidth: "normal",
          stringTensionLbs: 26,
          injuryFlags: [],
        },
      })
    ).toBe(
      "/catalog/?cat=racket&balance=head_heavy&price=under150&sort=fit-desc"
    );
  });

  it("adds weight class when body weight is a strong racket signal", () => {
    expect(
      catalogHrefFromProfile({
        level: "club",
        discipline: "doubles",
        styles: ["balanced"],
        category: "racket",
        body: {
          budgetMaxUsd: 150,
          weightKg: 55,
          footWidth: "normal",
          stringTensionLbs: 24,
          injuryFlags: [],
        },
      })
    ).toBe(
      "/catalog/?cat=racket&weight=5U&balance=even&price=under150&sort=fit-desc"
    );

    expect(
      catalogHrefFromProfile({
        level: "club",
        discipline: "singles",
        styles: ["offensive"],
        category: "racket",
        body: {
          budgetMaxUsd: 200,
          weightKg: 90,
          footWidth: "normal",
          stringTensionLbs: 28,
          injuryFlags: [],
        },
      })
    ).toBe(
      "/catalog/?cat=racket&weight=3U&balance=head_heavy&price=under200&sort=fit-desc"
    );
  });

  it("builds glossary guide catalog href", () => {
    expect(catalogHrefFromGuideSlug("glossary")).toBe("/catalog/?cat=racket");
  });
});
