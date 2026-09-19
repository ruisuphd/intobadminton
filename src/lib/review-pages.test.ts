import { describe, expect, it } from "vitest";
import { catalogProductById } from "@/lib/catalog-products";
import {
  catalogProductHref,
  editorialReviewHref,
  PRODUCT_REVIEW_ALIASES,
  PRODUCT_REVIEW_EXPLAINER_ALIASES,
  reviewPath,
  reviewUrl,
  editorialReviewKind,
  editorialReviewLinkLabel,
} from "@/lib/review-pages";

describe("review page paths", () => {
  it("maps product ids to canonical blog review slugs", () => {
    expect(reviewPath("vic-drivex-12")).toBe(
      "/review/victor-drivex-12-vs-astrox-88d-pro/"
    );
    expect(reviewPath("ln-axforce-100-gen-2")).toBe(
      "/review/li-ning-thunder-100-gen-2-vs-gen-1/"
    );
  });

  it("falls back to the spec page when no review is published", () => {
    expect(reviewPath("yy-comfort-z3")).toBe("/product/yy-comfort-z3/");
    expect(reviewPath("anta-ah600w")).toBe("/product/anta-ah600w/");
  });

  it("does not link the translated reviews removed in Sept 2026", () => {
    for (const id of [
      "anta-ah600w",
      "yy-nanoflare-1000z",
      "yy-arcsaber-7-pro",
      "ln-l69-string",
      "ln-gp100-pro-grip",
    ]) {
      expect(editorialReviewHref(id)).toBeNull();
    }
  });

  it("builds absolute review URLs from canonical paths", () => {
    expect(reviewUrl("vic-drivex-12")).toBe(
      "https://intobadminton.com/review/victor-drivex-12-vs-astrox-88d-pro/"
    );
  });

  it("links Yonex grip SKUs to the grip-sizes explainer", () => {
    for (const id of [
      "yy-ac102c",
      "yy-ac108ex",
      "yy-ac104ex",
      "yy-ac125ex",
      "yy-ac130ex",
    ]) {
      const product = catalogProductById(id);
      expect(product).toBeDefined();
      expect(catalogProductHref(product!)).toBe(
        "/review/yonex-grip-sizes-explained/"
      );
      expect(editorialReviewKind(id)).toBe("guide");
      expect(editorialReviewLinkLabel(id)).toBe("Read grip guide →");
    }
  });

  it("links bag SKUs to the bag-loadout explainer", () => {
    for (const id of ["yy-pro-racket-bag-92429", "vic-compact-backpack"]) {
      expect(catalogProductHref(catalogProductById(id)!)).toBe(
        "/review/badminton-bag-loadout/"
      );
      expect(editorialReviewKind(id)).toBe("guide");
      expect(editorialReviewLinkLabel(id)).toBe("Read bag guide →");
    }
  });

  it("links string explainer SKUs to the string-selector guide", () => {
    for (const id of [
      "yy-bg65",
      "yy-bg80",
      "yy-exbolt-63",
      "yy-aerobite",
      "yy-bg80-power",
    ]) {
      const product = catalogProductById(id);
      expect(product).toBeDefined();
      expect(catalogProductHref(product!)).toBe(
        "/review/badminton-string-selector/"
      );
    }
  });

  it("editorialReviewHref returns null when no blog article is mapped", () => {
    expect(editorialReviewHref("not-yet-mapped")).toBeNull();
  });

  it("editorialReviewHref returns review path when blog slug exists", () => {
    expect(editorialReviewHref("vic-drivex-12")).toBe(
      "/review/victor-drivex-12-vs-astrox-88d-pro/"
    );
  });

  it("resolves commercial sibling SKUs via PRODUCT_REVIEW_ALIASES", () => {
    // Aliases stay declared, but every aliased sibling review was a
    // translation and is gone, so none resolve until a rewrite returns.
    expect(PRODUCT_REVIEW_ALIASES["vic-p9200"]).toBe("vic-p9200-iii");
    expect(editorialReviewHref("vic-p9200")).toBeNull();
  });

  it("routes Yonex string picks to the string-selector explainer", () => {
    for (const id of [
      "yy-bg65",
      "yy-bg80",
      "yy-exbolt-63",
      "yy-aerobite",
      "yy-bg80-power",
    ]) {
      expect(PRODUCT_REVIEW_EXPLAINER_ALIASES[id]).toBe("badminton-string-selector");
      expect(editorialReviewHref(id)).toBe("/review/badminton-string-selector/");
      expect(editorialReviewKind(id)).toBe("guide");
      expect(editorialReviewLinkLabel(id)).toBe("Read string guide →");
    }
  });

  it("keeps dedicated reviews on review link labels", () => {
    expect(editorialReviewKind("vic-drivex-12")).toBe("review");
    expect(editorialReviewLinkLabel("vic-drivex-12")).toBe("Read full review →");
    expect(editorialReviewLinkLabel("vic-drivex-12", { pdp: true })).toBe(
      "Read the full review →"
    );
  });
});
