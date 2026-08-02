import { describe, expect, it } from "vitest";
import { allCatalogProductIds } from "@/lib/catalog-products";
import { blogSlugs } from "@/lib/blog";
import {
  productRedirectEntries,
  productRedirectIssues,
  productRedirectRoutes,
} from "@/lib/product-redirects";

describe("product redirects", () => {
  it("has no integrity issues", () => {
    expect(productRedirectIssues()).toEqual([]);
  });

  it("never emits a stub for an id that still has a live PDP", () => {
    const catalogIds = new Set(allCatalogProductIds());
    for (const entry of productRedirectEntries()) {
      expect(catalogIds.has(entry.from)).toBe(false);
      expect(catalogIds.has(entry.to)).toBe(true);
    }
  });

  it("covers both id-keyed URLs a retired row used to own", () => {
    const sources = productRedirectRoutes().map((route) => route.source);
    for (const entry of productRedirectEntries()) {
      expect(sources).toContain(`/product/${entry.from}/`);
      expect(sources).toContain(`/review/${entry.from}/`);
    }
  });

  it("never shadows a real review article", () => {
    const slugs = new Set<string>(blogSlugs);
    for (const entry of productRedirectEntries()) {
      expect(slugs.has(entry.from)).toBe(false);
    }
  });

  it("points every stub at a distinct, resolvable destination", () => {
    for (const route of productRedirectRoutes()) {
      expect(route.destination).not.toBe(route.source);
      expect(route.destination.endsWith("/")).toBe(true);
    }
  });

  it("collapses the duplicate Victor DriveX 12 row onto the official-verified id", () => {
    const routes = productRedirectRoutes();
    expect(routes).toContainEqual({
      source: "/product/vic-yu-12/",
      destination: "/product/vic-drivex-12/",
    });
    expect(routes).toContainEqual({
      source: "/review/vic-yu-12/",
      destination: "/review/victor-yu-12-racket-review/",
    });
  });
});
