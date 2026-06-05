import { blogArticles } from "@/lib/blog";
import { editorialMetaByPath } from "@/lib/editorial-meta";

export type EditorialUpdateKind =
  | "best"
  | "guide"
  | "tool"
  | "compare"
  | "brand"
  | "review"
  | "page";

export type EditorialUpdate = {
  path: string;
  title: string;
  lastReviewedAt: string;
  kind: EditorialUpdateKind;
};

/** Hub routes that are not useful as individual update rows. */
const SKIP_STATIC_PATHS = new Set([
  "/",
  "/quiz/",
  "/review/",
  "/faq/",
  "/about/",
  "/search/",
  "/catalog/",
  "/authors/",
  "/guides/",
  "/best/",
  "/brands/",
  "/compare-guides/",
  "/tools/",
]);

const PATH_LABELS: Record<string, string> = {
  "/data/": "Verified claims registry",
  "/updates/": "Editorial updates",
  "/methodology/": "Recommendation methodology",
  "/sources/": "Sources & references",
  "/privacy/": "Privacy policy",
  "/terms/": "Terms of service",
  "/contact/": "Contact",
  "/saved/": "Saved shortlist",
  "/authors/rui-su/": "Rui Su — author profile",
  "/best/beginner-rackets/": "Best beginner rackets",
  "/best/intermediate-rackets/": "Best intermediate rackets",
  "/best/doubles-rackets/": "Best doubles rackets",
  "/best/smash-heavy-rackets/": "Best smash rackets",
  "/best/rackets-under-100/": "Rackets under $100",
  "/best/rackets-under-150/": "Rackets under $150",
  "/best/rackets-under-200/": "Rackets under $200",
  "/best/lightweight-rackets-5u/": "Lightweight & 5U rackets",
  "/best/rackets-for-shoulder-comfort/": "Rackets for shoulder comfort",
  "/best/control-rackets/": "Best control rackets",
  "/best/all-round-rackets/": "Best all-round rackets",
  "/best/singles-rackets/": "Best singles rackets",
  "/best/head-light-rackets/": "Best head-light rackets",
  "/best/head-heavy-rackets-under-150/": "Head-heavy rackets under $150",
  "/best/budget-badminton-shoes/": "Best budget badminton shoes",
  "/best/wide-feet-badminton-shoes/": "Best wide-feet badminton shoes",
  "/best/shoes/": "Best badminton shoes",
  "/best/strings/": "Best badminton strings",
  "/guides/string-tension/": "String tension guide",
  "/guides/string-feel-vs-durability/": "String feel vs durability",
  "/guides/racket-balance/": "Racket balance and flex",
  "/guides/shoes-footwork/": "Shoes and footwork",
  "/guides/badminton-shoes-vs-running-shoes/": "Badminton vs running shoes",
  "/guides/wide-feet-badminton-shoes/": "Shoes for wide feet",
  "/guides/doubles-roles/": "Doubles roles",
  "/guides/doubles-positioning-and-rackets/": "Doubles positioning and rackets",
  "/guides/equipment-authenticity/": "Equipment authenticity",
  "/guides/glossary/": "Equipment glossary",
  "/guides/season-refresh/": "Season refresh",
  "/tools/skill-level-converter/": "Skill level converter",
  "/tools/string-tension-calculator/": "String tension calculator",
  "/tools/racket-balance-explainer/": "Racket balance explainer",
  "/tools/court-diagram/": "Court diagram",
  "/tools/authenticity-checker/": "Authenticity checker",
  "/compare-guides/yonex-astrox-vs-nanoflare/": "Yonex Astrox vs Nanoflare",
  "/compare-guides/yonex-victor-li-ning/": "Yonex vs Victor vs Li-Ning",
  "/compare-guides/badminton-vs-tennis-shoes/": "Badminton vs tennis shoes",
  "/compare-guides/yonex-65z4-vs-eclipsion-z3/": "Yonex 65 Z4 vs Eclipsion Z3",
  "/brands/yonex/": "Yonex brand guide",
  "/brands/victor/": "Victor brand guide",
  "/brands/li-ning/": "Li-Ning brand guide",
};

function kindForPath(path: string): EditorialUpdateKind {
  if (path.startsWith("/best/")) return "best";
  if (path.startsWith("/guides/")) return "guide";
  if (path.startsWith("/tools/")) return "tool";
  if (path.startsWith("/compare-guides/")) return "compare";
  if (path.startsWith("/brands/")) return "brand";
  if (path.startsWith("/review/")) return "review";
  return "page";
}

function humanizePath(path: string): string {
  const slug = path.replace(/^\/|\/$/g, "").split("/").pop() ?? path;
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function titleForPath(path: string): string {
  return PATH_LABELS[path] ?? humanizePath(path);
}

/**
 * Merges static editorial routes and review articles into a single
 * freshness feed sorted by `lastReviewedAt` descending.
 */
export function listEditorialUpdates(limit = 40): EditorialUpdate[] {
  const rows: EditorialUpdate[] = [];

  for (const [path, meta] of Object.entries(editorialMetaByPath)) {
    if (SKIP_STATIC_PATHS.has(path)) continue;
    rows.push({
      path,
      title: titleForPath(path),
      lastReviewedAt: meta.lastReviewedAt,
      kind: kindForPath(path),
    });
  }

  for (const article of blogArticles.en) {
    rows.push({
      path: `/review/${article.slug}/`,
      title: article.title,
      lastReviewedAt: article.updatedAt,
      kind: "review",
    });
  }

  rows.sort(
    (a, b) =>
      b.lastReviewedAt.localeCompare(a.lastReviewedAt) ||
      a.path.localeCompare(b.path)
  );

  return rows.slice(0, limit);
}
