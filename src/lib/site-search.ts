import { blogArticles } from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { brands } from "@/lib/brands";

export type SearchEntryKind =
  | "review"
  | "guide"
  | "best"
  | "tool"
  | "brand"
  | "compare";

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
    title: "Yonex Astrox vs Nanoflare",
    href: "/compare-guides/yonex-astrox-vs-nanoflare/",
    kind: "compare",
    summary: "Attack vs speed Yonex families decoded for club players.",
    keywords: ["yonex", "astrox", "nanoflare", "compare"],
  },
  {
    title: "Yonex vs Victor vs Li-Ning",
    href: "/compare-guides/yonex-victor-li-ning/",
    kind: "compare",
    summary: "Brand philosophy and lineup comparison for doubles players.",
    keywords: ["yonex", "victor", "li-ning", "brand"],
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

/** Build-time search catalogue — static export friendly. */
export function buildSearchIndex(): SearchEntry[] {
  return [...STATIC_ENTRIES, ...brandEntries(), ...reviewEntries()];
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
    if (blob.includes(token)) tokenHits += 1;
  }
  if (tokenHits === 0) return 0;
  return 40 + (tokenHits / tokens.length) * 30;
}

export function searchSite(query: string, limit = 20): SearchEntry[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return SEARCH_INDEX.map((entry) => ({
    entry,
    score: scoreEntry(entry, trimmed),
  }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((row) => row.entry);
}

export const searchIndexSize = SEARCH_INDEX.length;
