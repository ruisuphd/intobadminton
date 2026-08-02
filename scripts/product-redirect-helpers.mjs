import products from "../src/data/products.json" with { type: "json" };
import productRedirects from "../src/data/product-redirects.json" with { type: "json" };
import { reviewPath } from "./blog-redirect-helpers.mjs";

/**
 * Node mirror of `src/lib/product-redirects.ts`. Read by the postbuild
 * generator (`generate-product-redirects.mjs`) and by the SEO audit, which
 * needs the same source list to exempt the stubs from the sitemap check and to
 * assert each one actually points where it claims.
 */

const catalogIds = new Set(products.map((product) => product.id));

export function productRedirectEntries() {
  return productRedirects.redirects;
}

/**
 * Every id-keyed URL a retired product used to own, paired with its surviving
 * address: the `/product/` PDP shell and the legacy `/review/<id>/` address
 * recorded as a `destination` in blog-url-migrations.json.
 */
export function productRedirectRoutes() {
  const routes = [];
  for (const entry of productRedirects.redirects) {
    routes.push({
      source: `/product/${entry.from}/`,
      destination: `/product/${entry.to}/`,
    });
    routes.push({
      source: `/review/${entry.from}/`,
      destination: reviewPath(entry.to),
    });
  }
  return routes;
}

/**
 * Guards against the two ways a bad entry breaks the build: retiring an id
 * that still has a live PDP (the stub would clobber it) and pointing a stub at
 * a row that does not exist (the stub would land on a 404).
 */
export function productRedirectIssues() {
  const issues = [];
  const retired = new Set(productRedirects.redirects.map((entry) => entry.from));

  for (const entry of productRedirects.redirects) {
    if (catalogIds.has(entry.from)) {
      issues.push(
        `${entry.from}: still present in products.json — a redirect stub would overwrite its live PDP`
      );
    }
    if (!catalogIds.has(entry.to)) {
      issues.push(`${entry.from}: destination ${entry.to} is not in products.json`);
    }
    if (retired.has(entry.to)) {
      issues.push(
        `${entry.from}: destination ${entry.to} is itself retired (redirect chain)`
      );
    }
  }

  for (const route of productRedirectRoutes()) {
    if (route.source === route.destination) {
      issues.push(`${route.source}: redirect stub points at itself`);
    }
  }

  return issues;
}
