import productRedirectData from "@/data/product-redirects.json";
import { allCatalogProductIds, productPath } from "@/lib/catalog-products";
import { reviewPath } from "@/lib/review-pages";

/**
 * A catalogue row that was collapsed into another row (duplicate SKU, retired
 * colourway, renamed id). The `from` id no longer exists in products.json, so
 * Next never emits its pages — `scripts/generate-product-redirects.mjs` writes
 * noindex + canonical + meta-refresh stubs at the retired addresses instead.
 *
 * Mirrored by `scripts/product-redirect-helpers.mjs`, which the postbuild
 * generator and the SEO audit both read. Keep the two in sync.
 */
export type ProductRedirect = {
  from: string;
  to: string;
  note?: string;
};

export type ProductRedirectRoute = {
  source: string;
  destination: string;
};

const { redirects } = productRedirectData as { redirects: ProductRedirect[] };

export function productRedirectEntries(): ProductRedirect[] {
  return redirects;
}

/**
 * Every id-keyed URL a retired product used to own, paired with its surviving
 * address. Two per entry:
 *
 * - `/product/<from>/` — the PDP shell, which `generateStaticParams` no longer
 *   emits once the row is gone.
 * - `/review/<from>/` — the id-keyed review address. This is a legacy shape
 *   inherited from the pre-slug URL structure and is also the `destination`
 *   recorded in `blog-url-migrations.json`, so it can carry live inbound links
 *   even though it is never in the sitemap.
 */
export function productRedirectRoutes(): ProductRedirectRoute[] {
  const routes: ProductRedirectRoute[] = [];
  for (const entry of redirects) {
    routes.push({
      source: productPath(entry.from),
      destination: productPath(entry.to),
    });
    routes.push({
      source: `/review/${entry.from}/`,
      destination: reviewPath(entry.to),
    });
  }
  return routes;
}

export function productRedirectSources(): string[] {
  return productRedirectRoutes().map((route) => route.source);
}

/**
 * Integrity issues that would make a redirect entry unsafe to publish. A
 * non-empty result means the postbuild generator would either clobber a live
 * page or point a stub at a 404.
 */
export function productRedirectIssues(): string[] {
  const issues: string[] = [];
  const catalogIds = new Set(allCatalogProductIds());
  const seen = new Set<string>();

  for (const entry of redirects) {
    if (catalogIds.has(entry.from)) {
      issues.push(
        `${entry.from}: still present in products.json — a redirect stub would overwrite its live PDP`
      );
    }
    if (!catalogIds.has(entry.to)) {
      issues.push(`${entry.from}: destination ${entry.to} is not in products.json`);
    }
    if (entry.from === entry.to) {
      issues.push(`${entry.from}: redirects to itself`);
    }
    if (seen.has(entry.from)) {
      issues.push(`${entry.from}: duplicate redirect entry`);
    }
    seen.add(entry.from);
  }

  // A retired id must not be the target of another retired id, otherwise the
  // stub chain needs two hops.
  const retired = new Set(redirects.map((entry) => entry.from));
  for (const entry of redirects) {
    if (retired.has(entry.to)) {
      issues.push(`${entry.from}: destination ${entry.to} is itself retired (redirect chain)`);
    }
  }

  for (const route of productRedirectRoutes()) {
    if (route.source === route.destination) {
      issues.push(`${route.source}: redirect stub points at itself`);
    }
  }

  return issues;
}
