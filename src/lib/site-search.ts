import { blogArticles } from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { brands } from "@/lib/brands";
import { COMPARE_GUIDES } from "@/lib/compare-guides";
import { reviewableProducts, catalogProductHref } from "@/lib/review-pages";
import { tokenMatchesBlob } from "@/lib/search-fuzzy";

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
    keywords: [article.slug.replace(/-/g, " ")],
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
