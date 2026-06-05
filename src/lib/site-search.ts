import { blogArticles, type BlogArticle } from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { brands } from "@/lib/brands";
import { COMPARE_GUIDES } from "@/lib/compare-guides";
import { reviewableProducts, catalogProductHref } from "@/lib/review-pages";
import { tokenMatchesBlob } from "@/lib/search-fuzzy";

const REVIEW_EXCERPT_MAX_CHARS = 400;

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Plain-text excerpt from review sections for search indexing (dek-only misses body terms). */
export function reviewSearchExcerpt(
  article: BlogArticle,
  maxLen = REVIEW_EXCERPT_MAX_CHARS
): string {
  const plain = stripHtml(
    article.sections.map((section) => `${section.heading} ${section.body}`).join(" ")
  );
  return plain.slice(0, maxLen);
}

export type SearchEntryKind =
  | "review"
  | "guide"
  | "best"
  | "tool"
  | "brand"
  | "compare"
  | "product";

export type SearchEntry = {
  title: string;
  href: string;
  kind: SearchEntryKind;
  /** Short summary for result cards and indexing. */
  summary: string;
  /** Extra tokens (brand names, tags) for matching. */
  keywords: string[];
};

const STATIC_ENTRIES: SearchEntry[] = [
  {
    title: "Equipment catalog",
    href: "/catalog/",
    kind: "tool",
    summary:
      "Browse and filter the full product catalogue by brand, weight, balance, and price.",
    keywords: ["catalog", "browse", "filter", "specs", "products"],
  },
  {
    title: "Verified claims registry",
    href: "/data/",
    kind: "tool",
    summary:
      "Public table of cited facts with source quotes, verification dates, and authority tiers.",
    keywords: ["claims", "data", "sources", "fact check", "registry", "bwf"],
  },
  {
    title: "Equipment finder quiz",
    href: "/quiz/",
    kind: "tool",
    summary:
      "Five-step funnel that ranks rackets, strings, shoes, and bags for your level, style, and budget.",
    keywords: ["finder", "quiz", "recommendation", "fit score"],
  },
  {
    title: "Your saved shelf",
    href: "/saved/",
    kind: "tool",
    summary:
      "30-day local shortlist of saved rackets, shoes, and strings with optional per-product notify-me.",
    keywords: ["saved", "shortlist", "favorites", "bookmark"],
  },
  {
    title: "Best beginner rackets",
    href: "/best/beginner-rackets/",
    kind: "best",
    summary: "Editor-ranked starter rackets with transparent fit scoring.",
    keywords: ["beginner", "starter", "first racket"],
  },
  {
    title: "Best rackets under $100",
    href: "/best/rackets-under-100/",
    kind: "best",
    summary: "Budget shortlist — Yonex Play, Victor value, Li-Ning entry lines under a hundred dollars.",
    keywords: ["budget", "cheap", "under 100", "affordable", "value"],
  },
  {
    title: "Best lightweight & 5U rackets",
    href: "/best/lightweight-rackets-5u/",
    kind: "best",
    summary: "Ultralight and 5U frames for fast recovery, juniors, and front-court doubles.",
    keywords: ["5u", "lightweight", "ultralight", "nanoray light"],
  },
  {
    title: "Best rackets for shoulder comfort",
    href: "/best/rackets-for-shoulder-comfort/",
    kind: "best",
    summary: "Head-light and medium-flex picks for players managing arm and shoulder load.",
    keywords: ["shoulder", "injury", "comfort", "head light", "rehab"],
  },
  {
    title: "Best control rackets",
    href: "/best/control-rackets/",
    kind: "best",
    summary:
      "Control-first frames for placement, doubles net play, and rally craft — Astrox 88S Pro, Arcsaber 11 Pro, Halbertec.",
    keywords: ["control", "placement", "pocketing", "doubles net", "arcsaber", "88s"],
  },
  {
    title: "Best singles rackets",
    href: "/best/singles-rackets/",
    kind: "best",
    summary: "Full-court singles frames ranked for recovery, control, and rear-court power.",
    keywords: ["singles", "full court", "all court", "men's singles", "women's singles"],
  },
  {
    title: "Best head-light rackets",
    href: "/best/head-light-rackets/",
    kind: "best",
    summary: "Head-light frames for net control, defensive recovery, and front-court speed.",
    keywords: ["head light", "head-light", "control", "net", "defensive", "nanoflare"],
  },
  {
    title: "Best wide-feet badminton shoes",
    href: "/best/wide-feet-badminton-shoes/",
    kind: "best",
    summary: "Court shoes with wide or wide-available lasts ranked by stability and cushioning.",
    keywords: ["wide feet", "wide fit", "2e", "3e", "ee width", "shoes"],
  },
  {
    title: "Best all-round badminton rackets",
    href: "/best/all-round-rackets/",
    kind: "best",
    summary: "Even-balance frames for club doubles and players covering every court position.",
    keywords: ["all round", "all-round", "even balance", "versatile", "doubles"],
  },
  {
    title: "Best budget badminton shoes under $130",
    href: "/best/budget-badminton-shoes/",
    kind: "best",
    summary: "Court shoes under $130 with verified lateral stability specs.",
    keywords: ["budget shoes", "cheap shoes", "under 130", "value shoes"],
  },
  {
    title: "Best head-heavy rackets under $150",
    href: "/best/head-heavy-rackets-under-150/",
    kind: "best",
    summary: "Attack-balance rackets under $150 for club rear-court players.",
    keywords: ["head heavy", "attack", "under 150", "astrox game", "rear court"],
  },
  {
    title: "Best intermediate rackets",
    href: "/best/intermediate-rackets/",
    kind: "best",
    summary: "Club-level rackets with spec tables and trade-off notes.",
    keywords: ["intermediate", "club"],
  },
  {
    title: "Best doubles rackets",
    href: "/best/doubles-rackets/",
    kind: "best",
    summary: "Doubles-oriented frames ranked for reaction speed and control.",
    keywords: ["doubles", "mixed"],
  },
  {
    title: "Best smash-heavy rackets",
    href: "/best/smash-heavy-rackets/",
    kind: "best",
    summary: "Head-heavy attack frames for singles power players.",
    keywords: ["smash", "attack", "singles", "power"],
  },
  {
    title: "Rackets under $150",
    href: "/best/rackets-under-150/",
    kind: "best",
    summary: "Club-budget rackets at $150 or less — catalogue discovery page.",
    keywords: ["budget", "under 150", "affordable", "club"],
  },
  {
    title: "Rackets under $200",
    href: "/best/rackets-under-200/",
    kind: "best",
    summary: "Upper club-budget rackets at $200 or less — catalogue discovery page.",
    keywords: ["budget", "under 200", "mid tier", "club"],
  },
  {
    title: "Best badminton shoes",
    href: "/best/shoes/",
    kind: "best",
    summary: "Court shoes ranked for stability, cushioning, and wide feet.",
    keywords: ["shoes", "footwear", "court"],
  },
  {
    title: "Best badminton strings",
    href: "/best/strings/",
    kind: "best",
    summary: "String picks by feel, durability, and tension window.",
    keywords: ["string", "restring", "bg80", "aerobite"],
  },
  {
    title: "Badminton string tension guide",
    href: "/guides/string-tension/",
    kind: "guide",
    summary: "How tension changes feel, power, and control by skill level.",
    keywords: ["tension", "lbs", "pound", "restring"],
  },
  {
    title: "Racket balance vs swing speed",
    href: "/guides/racket-balance/",
    kind: "guide",
    summary: "Head-heavy, even, and head-light balance explained for real play.",
    keywords: ["balance", "head heavy", "swing weight"],
  },
  {
    title: "Badminton shoes and footwork",
    href: "/guides/shoes-footwork/",
    kind: "guide",
    summary: "Why court shoes beat running shoes for lateral stability.",
    keywords: ["footwork", "lateral", "stability"],
  },
  {
    title: "Badminton shoes vs running shoes",
    href: "/guides/badminton-shoes-vs-running-shoes/",
    kind: "guide",
    summary: "Heel drop, grip, and lateral support — why runners fail indoors.",
    keywords: ["running shoes", "trainers", "heel drop", "grip"],
  },
  {
    title: "Wide feet badminton shoes",
    href: "/guides/wide-feet-badminton-shoes/",
    kind: "guide",
    summary: "Fit guidance for wide forefoot and toe splay.",
    keywords: ["wide feet", "fit", "toe box"],
  },
  {
    title: "Doubles roles and rackets",
    href: "/guides/doubles-roles/",
    kind: "guide",
    summary: "Front vs back court roles and how they map to racket choice.",
    keywords: ["doubles", "front court", "back court"],
  },
  {
    title: "Doubles positioning and racket choice",
    href: "/guides/doubles-positioning-and-rackets/",
    kind: "guide",
    summary: "Court zones and attack vs defence shape mapped to gear.",
    keywords: ["positioning", "rotation", "doubles", "zones"],
  },
  {
    title: "Season equipment refresh",
    href: "/guides/season-refresh/",
    kind: "guide",
    summary: "When to restring, regrip, and retire worn gear.",
    keywords: ["maintenance", "restring", "grip"],
  },
  {
    title: "Badminton glossary",
    href: "/guides/glossary/",
    kind: "guide",
    summary: "4U, G5, head-heavy, T-throat, and other terms defined.",
    keywords: ["glossary", "4u", "g5", "terms"],
  },
  {
    title: "Equipment authenticity guide",
    href: "/guides/equipment-authenticity/",
    kind: "guide",
    summary: "Spot counterfeit Yonex, Victor, and Li-Ning rackets.",
    keywords: ["fake", "counterfeit", "authenticity"],
  },
  {
    title: "Badminton toolkit",
    href: "/tools/",
    kind: "tool",
    summary:
      "Calculators and references — skill converter, tension calculator, balance explainer, court diagram, authenticity checker.",
    keywords: ["tools", "calculator", "toolkit", "interactive"],
  },
  {
    title: "Skill-level converter",
    href: "/tools/skill-level-converter/",
    kind: "tool",
    summary: "Convert between China 中羽, BWF, and IntoBadminton tiers.",
    keywords: ["level", "rating", "converter"],
  },
  {
    title: "String tension calculator",
    href: "/tools/string-tension-calculator/",
    kind: "tool",
    summary: "Starting tension range from level, frame, and arm comfort.",
    keywords: ["tension", "calculator", "lbs"],
  },
  {
    title: "Racket balance explainer",
    href: "/tools/racket-balance-explainer/",
    kind: "tool",
    summary: "Interactive slider showing which styles each balance suits.",
    keywords: ["balance", "interactive"],
  },
  {
    title: "Court dimensions diagram",
    href: "/tools/court-diagram/",
    kind: "tool",
    summary: "BWF singles vs doubles court with hover hotspots.",
    keywords: ["court", "dimensions", "bwf"],
  },
  {
    title: "Authenticity checker",
    href: "/tools/authenticity-checker/",
    kind: "tool",
    summary: "Five-step counterfeit triage for major brands.",
    keywords: ["fake", "counterfeit", "checker"],
  },
];

function compareGuideEntries(): SearchEntry[] {
  const guides = COMPARE_GUIDES.map((guide) => ({
    title: guide.title,
    href: guide.href,
    kind: "compare" as const,
    summary: guide.dek,
    keywords: guide.keywords,
  }));
  return [
    {
      title: "Comparison guides hub",
      href: "/compare-guides/",
      kind: "compare" as const,
      summary: "Side-by-side racket and shoe comparisons by player role.",
      keywords: ["compare", "versus", "vs"],
    },
    ...guides,
  ];
}

function brandEntries(): SearchEntry[] {
  return brands.map((b) => ({
    title: `${b.name} rackets decoded`,
    href: `/brands/${b.id}/`,
    kind: "brand" as const,
    summary: b.knownFor,
    keywords: [b.name, b.nameZh, b.country, ...b.categoriesCovered],
  }));
}

function reviewEntries(): SearchEntry[] {
  return blogArticles.en.map((article) => ({
    title: article.title,
    href: articlePathForSlug(article.slug),
    kind: "review" as const,
    summary: article.dek ?? "",
    keywords: [article.slug.replace(/-/g, " "), reviewSearchExcerpt(article)],
  }));
}

function productEntries(): SearchEntry[] {
  return reviewableProducts().map((product) => ({
    title: `${product.brand} ${product.name}`,
    href: catalogProductHref(product),
    kind: "product" as const,
    summary:
      product.editorNote?.slice(0, 160) ??
      `Catalog ${product.category}: ${product.bestFor.slice(0, 3).join(", ")}.`,
    keywords: [
      product.brand,
      product.name,
      product.category,
      product.id.replace(/-/g, " "),
      ...product.bestFor,
    ],
  }));
}

/** Build-time search catalogue — static export friendly. */
export function buildSearchIndex(): SearchEntry[] {
  return [
    ...STATIC_ENTRIES,
    ...compareGuideEntries(),
    ...brandEntries(),
    ...reviewEntries(),
    ...productEntries(),
  ];
}

const SEARCH_INDEX = buildSearchIndex();

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function scoreEntry(entry: SearchEntry, query: string): number {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(entry.title);
  const summary = normalize(entry.summary);
  const blob = normalize(
    [entry.title, entry.summary, ...entry.keywords].join(" ")
  );

  if (title === q) return 100;
  if (title.startsWith(q)) return 90;
  if (title.includes(q)) return 80;
  if (summary.includes(q)) return 60;

  const tokens = q.split(" ").filter(Boolean);
  let tokenHits = 0;
  for (const token of tokens) {
    if (blob.includes(token)) {
      tokenHits += 1;
    } else if (tokenMatchesBlob(token, blob)) {
      tokenHits += 0.85;
    }
  }
  if (tokenHits === 0) return 0;
  return 40 + (tokenHits / tokens.length) * 30;
}

export function searchSite(
  query: string,
  limit = 20,
  kind?: SearchEntryKind
): SearchEntry[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return SEARCH_INDEX.map((entry) => ({
    entry,
    score: scoreEntry(entry, trimmed),
  }))
    .filter((row) => row.score > 0 && (!kind || row.entry.kind === kind))
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((row) => row.entry);
}

export const searchIndexSize = SEARCH_INDEX.length;

const SEARCH_SNIPPET_MAX = 140;

/** Longest review-body excerpt token attached in `reviewEntries()`. */
function reviewBodyExcerpt(entry: SearchEntry): string | null {
  const candidates = entry.keywords.filter((k) => k.length >= 60);
  if (candidates.length === 0) return null;
  return candidates.sort((a, b) => b.length - a.length)[0] ?? null;
}

function trimSnippetAround(
  text: string,
  matchStart: number,
  matchLen: number,
  maxLen = SEARCH_SNIPPET_MAX
): string {
  const room = Math.max(0, maxLen - matchLen);
  const before = Math.floor(room / 2);
  const start = Math.max(0, matchStart - before);
  const end = Math.min(text.length, matchStart + matchLen + (room - before));
  let out = text.slice(start, end).trim();
  if (start > 0) out = `…${out}`;
  if (end < text.length) out = `${out}…`;
  return out;
}

/**
 * User-visible summary for a search hit. When the query matched review body
 * tokens but not the title or dek, show a short excerpt around the match.
 */
export function searchResultSummary(entry: SearchEntry, query: string): string {
  const trimmed = query.trim();
  if (!trimmed) return entry.summary;

  const tokens = normalize(trimmed).split(" ").filter(Boolean);
  if (tokens.length === 0) return entry.summary;

  const titleNorm = normalize(entry.title);
  const summaryNorm = normalize(entry.summary);
  const titleOrDekHit = tokens.some(
    (token) =>
      titleNorm.includes(token) ||
      summaryNorm.includes(token) ||
      tokenMatchesBlob(token, titleNorm) ||
      tokenMatchesBlob(token, summaryNorm)
  );
  if (titleOrDekHit) return entry.summary;

  const excerpt = reviewBodyExcerpt(entry);
  if (!excerpt) return entry.summary;

  const excerptNorm = excerpt.toLowerCase();
  for (const token of tokens) {
    const idx = excerptNorm.indexOf(token);
    if (idx >= 0) {
      return trimSnippetAround(excerpt, idx, token.length);
    }
  }

  for (const token of tokens) {
    if (tokenMatchesBlob(token, excerptNorm)) {
      return trimSnippetAround(excerpt, 0, Math.min(token.length, excerpt.length));
    }
  }

  return entry.summary;
}
