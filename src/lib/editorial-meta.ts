import { blogArticles } from "@/lib/blog";
import { catalogProductById } from "@/lib/catalog-products";

export type EditorialMeta = {
  /**
   * ISO date (YYYY-MM-DD) when the page was first published.
   * Falls back to `lastReviewedAt` if not specified.
   */
  publishedAt?: string;
  /**
   * ISO date (YYYY-MM-DD) of the most recent editorial review.
   * Surfaced to readers under the H1 and used as the sitemap lastmod.
   */
  lastReviewedAt: string;
  /**
   * ISO date (YYYY-MM-DD) when the displayed prices were last verified.
   * Omit on pages that do not show prices (most guides, brand overviews).
   */
  priceCheckedAt?: string;
};

/**
 * Single source of truth for per-route freshness signals. Page components
 * read from this registry; the sitemap reads `lastReviewedAt` so the visible
 * date and the crawler-facing date never drift apart.
 *
 * Paths use trailing slashes to match the static-export route map.
 */
export const editorialMetaByPath: Record<string, EditorialMeta> = {
  "/": {
    publishedAt: "2025-08-01",
    lastReviewedAt: "2026-05-24",
  },
  "/quiz/": {
    publishedAt: "2025-08-15",
    lastReviewedAt: "2026-05-24",
  },
  "/review/": {
    publishedAt: "2025-09-01",
    lastReviewedAt: "2026-05-24",
  },
  "/faq/": {
    publishedAt: "2025-09-01",
    lastReviewedAt: "2026-05-24",
  },
  "/about/": {
    publishedAt: "2025-08-01",
    lastReviewedAt: "2026-05-24",
  },
  // Hub / index pages — these list other content; their lastReviewedAt
  // tracks the most recent editorial sweep across the hub's children, not
  // a per-pick price check. Without these entries the sitemap emits no
  // lastmod for the hubs, which weakens freshness signals.
  "/best/": {
    publishedAt: "2025-09-12",
    lastReviewedAt: "2026-05-18",
  },
  "/brands/": {
    publishedAt: "2025-09-26",
    lastReviewedAt: "2026-05-18",
  },
  "/compare-guides/": {
    publishedAt: "2025-10-21",
    lastReviewedAt: "2026-05-18",
  },
  "/guides/": {
    publishedAt: "2025-09-01",
    lastReviewedAt: "2026-05-18",
  },
  "/search/": {
    publishedAt: "2026-06-04",
    lastReviewedAt: "2026-06-04",
  },
  "/catalog/": {
    publishedAt: "2026-06-04",
    lastReviewedAt: "2026-06-04",
    priceCheckedAt: "2026-06-04",
  },
  "/data/": {
    publishedAt: "2026-06-05",
    lastReviewedAt: "2026-06-05",
  },

  // Best-pick roundups (have prices → priceCheckedAt set).
  "/best/beginner-rackets/": {
    publishedAt: "2025-09-12",
    lastReviewedAt: "2026-05-08",
    priceCheckedAt: "2026-05-08",
  },
  "/best/intermediate-rackets/": {
    publishedAt: "2025-09-12",
    lastReviewedAt: "2026-05-08",
    priceCheckedAt: "2026-05-08",
  },
  "/best/doubles-rackets/": {
    publishedAt: "2025-09-19",
    lastReviewedAt: "2026-05-08",
    priceCheckedAt: "2026-05-08",
  },
  "/best/smash-heavy-rackets/": {
    publishedAt: "2025-10-04",
    lastReviewedAt: "2026-05-08",
    priceCheckedAt: "2026-05-08",
  },
  "/best/rackets-under-100/": {
    publishedAt: "2026-06-04",
    lastReviewedAt: "2026-06-04",
    priceCheckedAt: "2026-06-04",
  },
  "/best/lightweight-rackets-5u/": {
    publishedAt: "2026-06-04",
    lastReviewedAt: "2026-06-04",
    priceCheckedAt: "2026-06-04",
  },
  "/best/rackets-for-shoulder-comfort/": {
    publishedAt: "2026-06-04",
    lastReviewedAt: "2026-06-04",
    priceCheckedAt: "2026-06-04",
  },
  "/best/control-rackets/": {
    publishedAt: "2026-06-05",
    lastReviewedAt: "2026-06-05",
    priceCheckedAt: "2026-06-05",
  },
  "/best/wide-feet-badminton-shoes/": {
    publishedAt: "2026-06-05",
    lastReviewedAt: "2026-06-05",
    priceCheckedAt: "2026-06-05",
  },
  "/best/budget-badminton-shoes/": {
    publishedAt: "2026-06-05",
    lastReviewedAt: "2026-06-05",
    priceCheckedAt: "2026-06-05",
  },
  "/best/all-round-rackets/": {
    publishedAt: "2026-06-05",
    lastReviewedAt: "2026-06-05",
    priceCheckedAt: "2026-06-05",
  },
  "/best/defensive-rackets/": {
    publishedAt: "2026-06-05",
    lastReviewedAt: "2026-06-05",
    priceCheckedAt: "2026-06-05",
  },
  "/best/head-heavy-rackets-under-150/": {
    publishedAt: "2026-06-05",
    lastReviewedAt: "2026-06-05",
    priceCheckedAt: "2026-06-05",
  },
  "/best/shoes/": {
    publishedAt: "2025-10-11",
    lastReviewedAt: "2026-05-08",
    priceCheckedAt: "2026-05-08",
  },
  "/best/strings/": {
    publishedAt: "2025-10-18",
    lastReviewedAt: "2026-05-08",
    priceCheckedAt: "2026-05-08",
  },
  "/best/rackets-under-150/": {
    publishedAt: "2026-06-04",
    lastReviewedAt: "2026-06-04",
    priceCheckedAt: "2026-06-04",
  },
  "/best/singles-rackets/": {
    publishedAt: "2026-06-05",
    lastReviewedAt: "2026-06-05",
    priceCheckedAt: "2026-06-05",
  },
  "/best/head-light-rackets/": {
    publishedAt: "2026-06-05",
    lastReviewedAt: "2026-06-05",
    priceCheckedAt: "2026-06-05",
  },
  "/best/rackets-under-200/": {
    publishedAt: "2026-06-04",
    lastReviewedAt: "2026-06-04",
    priceCheckedAt: "2026-06-04",
  },

  // Brand pages (no prices → no priceCheckedAt).
  "/brands/yonex/": {
    publishedAt: "2025-09-26",
    lastReviewedAt: "2026-05-08",
  },
  "/brands/victor/": {
    publishedAt: "2025-09-26",
    lastReviewedAt: "2026-05-08",
  },
  "/brands/li-ning/": {
    publishedAt: "2025-09-26",
    lastReviewedAt: "2026-05-08",
  },
  "/brands/bonny/": {
    publishedAt: "2026-05-21",
    lastReviewedAt: "2026-05-21",
  },
  "/brands/kawasaki/": {
    publishedAt: "2026-05-21",
    lastReviewedAt: "2026-05-21",
  },
  "/brands/kumpoo/": {
    publishedAt: "2026-05-21",
    lastReviewedAt: "2026-05-21",
  },

  // Comparison guides (mix of price-bearing and pure spec/decision guides).
  "/compare-guides/astrox-77-pro-vs-88s-pro/": {
    publishedAt: "2025-10-21",
    lastReviewedAt: "2026-05-08",
    priceCheckedAt: "2026-05-08",
  },
  "/compare-guides/yonex-astrox-vs-nanoflare/": {
    publishedAt: "2025-10-28",
    lastReviewedAt: "2026-05-08",
  },
  "/compare-guides/yonex-victor-li-ning/": {
    publishedAt: "2025-11-04",
    lastReviewedAt: "2026-05-08",
  },
  "/compare-guides/badminton-vs-tennis-shoes/": {
    publishedAt: "2025-11-11",
    lastReviewedAt: "2026-05-08",
  },

  // P1 expansion: high-intent product-vs-product comparison pages.
  "/compare-guides/astrox-99-pro-vs-astrox-100zz/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },
  "/compare-guides/astrox-99-pro-vs-halbertec-9000-power/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },
  "/compare-guides/astrox-88d-pro-vs-axforce-90-new/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },
  "/compare-guides/nanoflare-1000z-vs-auraspeed-99/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },
  "/compare-guides/nanoflare-800-pro-vs-auraspeed-hs-plus/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },
  "/compare-guides/bladex-800-speed-vs-nanoflare-1000z/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },
  "/compare-guides/halbertec-9000-power-vs-axforce-100-gen-2/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },
  "/compare-guides/yonex-65z4-vs-eclipsion-z3/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },

  // Long-form guides (concept pieces, no prices).
  "/guides/racket-balance/": {
    publishedAt: "2025-09-01",
    lastReviewedAt: "2026-05-08",
  },
  "/guides/string-tension/": {
    publishedAt: "2025-09-01",
    lastReviewedAt: "2026-05-08",
  },
  "/guides/shoes-footwork/": {
    publishedAt: "2025-09-08",
    lastReviewedAt: "2026-05-08",
  },
  "/guides/badminton-shoes-vs-running-shoes/": {
    publishedAt: "2026-06-04",
    lastReviewedAt: "2026-06-04",
  },
  "/guides/wide-feet-badminton-shoes/": {
    publishedAt: "2025-09-15",
    lastReviewedAt: "2026-05-08",
  },
  "/guides/doubles-roles/": {
    publishedAt: "2025-09-22",
    lastReviewedAt: "2026-05-08",
  },
  "/guides/doubles-positioning-and-rackets/": {
    publishedAt: "2026-06-04",
    lastReviewedAt: "2026-06-04",
  },
  "/guides/equipment-authenticity/": {
    publishedAt: "2025-09-29",
    lastReviewedAt: "2026-05-08",
  },
  "/guides/glossary/": {
    publishedAt: "2025-10-06",
    lastReviewedAt: "2026-05-08",
  },
  "/guides/season-refresh/": {
    publishedAt: "2025-10-13",
    lastReviewedAt: "2026-05-08",
  },

  // Author pages (E-E-A-T).
  "/authors/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },
  "/authors/rui-su/": {
    publishedAt: "2026-05-15",
    lastReviewedAt: "2026-05-15",
  },

  // Interactive tools (Sprint 4 of IMPROVEMENT_PLAN_2026Q2).
  "/tools/": {
    publishedAt: "2026-05-17",
    lastReviewedAt: "2026-05-17",
  },
  "/tools/skill-level-converter/": {
    publishedAt: "2026-05-17",
    lastReviewedAt: "2026-05-17",
  },
  "/tools/string-tension-calculator/": {
    publishedAt: "2026-05-17",
    lastReviewedAt: "2026-05-17",
  },
  "/tools/racket-balance-explainer/": {
    publishedAt: "2026-05-17",
    lastReviewedAt: "2026-05-17",
  },
  "/tools/court-diagram/": {
    publishedAt: "2026-05-17",
    lastReviewedAt: "2026-05-17",
  },
  "/tools/authenticity-checker/": {
    publishedAt: "2026-05-17",
    lastReviewedAt: "2026-05-17",
  },
};

const STATIC_PATHS = new Set(Object.keys(editorialMetaByPath));

/**
 * Resolve editorial metadata for a given route path.
 *
 * Blog routes are sourced from `blogArticles.en[*].updatedAt` so editors
 * keep updating articles in one place (the blog data) and the sitemap
 * picks the date up automatically.
 */
export function getEditorialMeta(path: string): EditorialMeta | undefined {
  if (STATIC_PATHS.has(path)) {
    return editorialMetaByPath[path];
  }

  const comparisonsMatch = path.match(/^\/comparisons\/([^/]+)\/$/);
  if (comparisonsMatch) {
    const article = blogArticles.en.find(
      (entry) => entry.slug === comparisonsMatch[1]
    );
    if (article) {
      return { lastReviewedAt: article.updatedAt };
    }
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)\/$/);
  if (blogMatch) {
    const article = blogArticles.en.find(
      (entry) => entry.slug === blogMatch[1]
    );
    if (article) {
      return { lastReviewedAt: article.updatedAt };
    }
  }

  const reviewMatch = path.match(/^\/review\/([^/]+)\/$/);
  if (reviewMatch) {
    const article = blogArticles.en.find(
      (entry) => entry.slug === reviewMatch[1]
    );
    if (article) {
      return { lastReviewedAt: article.updatedAt };
    }
  }

  const productMatch = path.match(/^\/product\/([^/]+)\/$/);
  if (productMatch) {
    const product = catalogProductById(productMatch[1]);
    if (product) {
      return { lastReviewedAt: product.lastVerifiedAt };
    }
  }

  return undefined;
}

/**
 * Plain helper used by the sitemap. Returns the most authoritative date
 * to surface as `<lastmod>` for crawlers.
 */
export function lastModifiedForRoute(path: string): string | undefined {
  return getEditorialMeta(path)?.lastReviewedAt;
}
