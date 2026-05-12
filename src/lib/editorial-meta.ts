import { blogArticles } from "@/lib/blog";

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
  "/guides/wide-feet-badminton-shoes/": {
    publishedAt: "2025-09-15",
    lastReviewedAt: "2026-05-08",
  },
  "/guides/doubles-roles/": {
    publishedAt: "2025-09-22",
    lastReviewedAt: "2026-05-08",
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

  const blogMatch = path.match(/^\/blog\/([^/]+)\/$/);
  if (blogMatch) {
    const article = blogArticles.en.find(
      (entry) => entry.slug === blogMatch[1]
    );
    if (article) {
      return { lastReviewedAt: article.updatedAt };
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
