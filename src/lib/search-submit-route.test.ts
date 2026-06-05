import { describe, expect, it } from "vitest";
import {
  hasEditorialSearchHits,
  isProductIntentQuery,
  searchSubmitHref,
} from "./search-submit-route";

describe("search-submit-route", () => {
  it("routes empty query to search hub", () => {
    expect(searchSubmitHref("")).toBe("/search/");
    expect(searchSubmitHref("   ")).toBe("/search/");
  });

  it("routes editorial queries to /search/", () => {
    expect(searchSubmitHref("string tension")).toMatch(/^\/search\/\?q=/);
    expect(isProductIntentQuery("string tension")).toBe(false);
    expect(hasEditorialSearchHits("string tension")).toBe(true);
  });

  it("routes mixed catalog + editorial queries to /search/", () => {
    expect(searchSubmitHref("yonex nanoflare")).toMatch(/^\/search\/\?q=/);
    expect(isProductIntentQuery("yonex nanoflare")).toBe(false);
  });

  it("routes catalog-only SKU queries to /catalog/?q=", () => {
    expect(searchSubmitHref("ac102c")).toMatch(/\/catalog\/\?q=ac102c/);
    expect(isProductIntentQuery("ac102c")).toBe(true);
    expect(hasEditorialSearchHits("ac102c")).toBe(false);
  });

  it("does not treat short queries as product-intent", () => {
    expect(isProductIntentQuery("a")).toBe(false);
    expect(searchSubmitHref("a")).toMatch(/^\/search\/\?q=a$/);
  });
});
