export type RelatedReadingItem = {
  href: string;
  title: string;
  summary: string;
};

/** Editorial clusters — manual links first; paths must exist in static export. */
const CLUSTER_ITEMS: Record<string, RelatedReadingItem[]> = {
  "shoe-fit": [
    {
      href: "/best/wide-feet-badminton-shoes/",
      title: "Best wide-feet badminton shoes",
      summary: "Six picks with wide or wide-available lasts ranked by stability and cushioning.",
    },
    {
      href: "/guides/wide-feet-badminton-shoes/",
      title: "Wide feet badminton shoes guide",
      summary: "How to size wide lasts, what to avoid, and when to size up instead.",
    },
    {
      href: "/guides/badminton-shoes-vs-running-shoes/",
      title: "Badminton shoes vs running shoes",
      summary: "Why lateral stability and court rubber matter more than running-shoe cushioning.",
    },
    {
      href: "/best/shoes/",
      title: "Best badminton shoes (2026)",
      summary: "Full shoe shortlist by fit width, stability, and cushioning.",
    },
    {
      href: "/compare-guides/yonex-65z4-vs-eclipsion-z3/",
      title: "Yonex 65 Z4 vs Eclipsion Z3",
      summary: "Stability flagship vs speed shoe — who each last suits.",
    },
  ],
  "all-round-rackets": [
    {
      href: "/best/all-round-rackets/",
      title: "Best all-round badminton rackets",
      summary: "Even-balance frames that do not punish wrong role choices.",
    },
    {
      href: "/guides/racket-balance/",
      title: "Racket balance and swing weight",
      summary: "Head-heavy vs even vs head-light — how balance changes your game.",
    },
    {
      href: "/best/intermediate-rackets/",
      title: "Best intermediate rackets",
      summary: "Club-level frames between beginner Play tiers and pro flagships.",
    },
    {
      href: "/best/doubles-rackets/",
      title: "Best doubles rackets",
      summary: "Front-court speed and rear-court continuity picks.",
    },
    {
      href: "/compare-guides/yonex-astrox-vs-nanoflare/",
      title: "Yonex Astrox vs Nanoflare",
      summary: "Attack line vs speed line — the brand's two racket philosophies.",
    },
  ],
  "defensive-rackets": [
    {
      href: "/best/defensive-rackets/",
      title: "Best defensive badminton rackets",
      summary: "Frames for blocks, lifts, and flat drives in defensive doubles.",
    },
    {
      href: "/best/head-light-rackets/",
      title: "Best head-light rackets",
      summary: "Head-light geometry for net control and fast recovery.",
    },
    {
      href: "/guides/doubles-roles/",
      title: "Doubles roles and positioning",
      summary: "Side-by-side defence, rotation, and front-court coverage.",
    },
    {
      href: "/best/doubles-rackets/",
      title: "Best doubles rackets",
      summary: "Six frames ranked for mixed, men's, and women's doubles.",
    },
    {
      href: "/compare-guides/yonex-astrox-vs-nanoflare/",
      title: "Yonex Astrox vs Nanoflare",
      summary: "Attack line vs speed line — when to pick each family.",
    },
  ],
  doubles: [
    {
      href: "/guides/doubles-positioning-and-rackets/",
      title: "Doubles positioning and rackets",
      summary: "Front vs rear court roles and how racket balance maps to each.",
    },
    {
      href: "/guides/doubles-roles/",
      title: "Doubles roles and positioning",
      summary: "Rotation, coverage, and communication basics.",
    },
    {
      href: "/best/doubles-rackets/",
      title: "Best doubles rackets",
      summary: "Six frames ranked for mixed, men's, and women's doubles.",
    },
    {
      href: "/best/all-round-rackets/",
      title: "Best all-round rackets",
      summary: "Even-balance picks when you play every court position.",
    },
  ],
  strings: [
    {
      href: "/guides/string-feel-vs-durability/",
      title: "String feel vs durability",
      summary: "Gauge, repulsion, and how long strings last before you re-string.",
    },
    {
      href: "/guides/string-tension/",
      title: "String tension guide",
      summary: "How lbs changes feel, power, and control by skill level.",
    },
    {
      href: "/tools/string-tension-calculator/",
      title: "String tension calculator",
      summary: "Recommended starting tension from level and arm comfort.",
    },
    {
      href: "/best/strings/",
      title: "Best badminton strings",
      summary: "Strings ranked by feel, durability, and tension window.",
    },
  ],
  freshness: [
    {
      href: "/updates/",
      title: "Editorial updates",
      summary: "What changed recently — guides, best-of pages, and reviews.",
    },
    {
      href: "/data/",
      title: "Verified claims registry",
      summary: "Manufacturer specs with source URLs and last-checked dates.",
    },
    {
      href: "/methodology/",
      title: "Recommendation methodology",
      summary: "How fit scores, source labels, and verification gates work.",
    },
  ],
  authenticity: [
    {
      href: "/tools/authenticity-checker/",
      title: "Authenticity checker tool",
      summary: "Interactive five-step flow for spotting counterfeit gear.",
    },
    {
      href: "/guides/equipment-authenticity/",
      title: "Equipment authenticity guide",
      summary: "Serial numbers, packaging tells, and safe buying channels.",
    },
  ],
  budget: [
    {
      href: "/best/rackets-under-100/",
      title: "Best rackets under $100",
      summary: "Hard budget cap with trade-offs named.",
    },
    {
      href: "/best/rackets-under-150/",
      title: "Rackets under $150",
      summary: "Club-budget catalogue discovery with comparison table.",
    },
    {
      href: "/best/beginner-rackets/",
      title: "Best beginner rackets",
      summary: "Forgiving starter frames by shaft flex and balance.",
    },
  ],
  compare: [
    {
      href: "/compare-guides/yonex-astrox-vs-nanoflare/",
      title: "Yonex Astrox vs Nanoflare",
      summary: "Attack vs speed — Yonex's two racket families compared.",
    },
    {
      href: "/compare-guides/yonex-victor-li-ning/",
      title: "Yonex vs Victor vs Li-Ning",
      summary: "Brand philosophy, price bands, and who each suits.",
    },
    {
      href: "/best/",
      title: "Best-of buying guides",
      summary: "All curated shortlists in one hub.",
    },
    {
      href: "/catalog/",
      title: "Equipment catalog",
      summary: "Filter the full catalogue by brand, weight, and balance.",
    },
  ],
};

const PATH_CLUSTER: Record<string, string> = {
  "/guides/wide-feet-badminton-shoes/": "shoe-fit",
  "/guides/badminton-shoes-vs-running-shoes/": "shoe-fit",
  "/guides/shoes-footwork/": "shoe-fit",
  "/best/shoes/": "shoe-fit",
  "/best/wide-feet-badminton-shoes/": "shoe-fit",
  "/compare-guides/yonex-65z4-vs-eclipsion-z3/": "shoe-fit",
  "/compare-guides/badminton-vs-tennis-shoes/": "shoe-fit",

  "/guides/racket-balance/": "all-round-rackets",
  "/best/all-round-rackets/": "all-round-rackets",
  "/best/intermediate-rackets/": "all-round-rackets",
  "/best/beginner-rackets/": "all-round-rackets",
  "/best/lightweight-rackets-5u/": "all-round-rackets",
  "/best/rackets-for-shoulder-comfort/": "all-round-rackets",

  "/guides/doubles-positioning-and-rackets/": "doubles",
  "/guides/doubles-roles/": "doubles",
  "/best/doubles-rackets/": "doubles",
  "/best/defensive-rackets/": "defensive-rackets",
  "/best/head-light-rackets/": "defensive-rackets",
  "/best/control-rackets/": "defensive-rackets",

  "/guides/string-tension/": "strings",
  "/guides/string-feel-vs-durability/": "strings",
  "/best/strings/": "strings",
  "/tools/string-tension-calculator/": "strings",

  "/data/": "freshness",
  "/updates/": "freshness",
  "/methodology/": "freshness",

  "/guides/equipment-authenticity/": "authenticity",
  "/tools/authenticity-checker/": "authenticity",

  "/best/rackets-under-100/": "budget",
  "/best/rackets-under-150/": "budget",
  "/best/head-heavy-rackets-under-150/": "budget",

  "/best/singles-rackets/": "all-round-rackets",

  "/best/budget-badminton-shoes/": "shoe-fit",

  "/guides/glossary/": "all-round-rackets",
  "/guides/season-refresh/": "freshness",

  "/best/smash-heavy-rackets/": "all-round-rackets",
};

function normalizePath(path: string): string {
  if (!path.startsWith("/")) return `/${path}`;
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Up to three related reading cards for guides, best-of, and compare-guide routes.
 * Excludes the current path. Falls back to the compare cluster for unmapped compare pages.
 */
export function relatedReadingForPath(
  path: string,
  limit = 3
): RelatedReadingItem[] {
  const normalized = normalizePath(path);
  let clusterKey = PATH_CLUSTER[normalized];

  if (!clusterKey && normalized.startsWith("/compare-guides/")) {
    clusterKey = "compare";
  }

  if (!clusterKey) return [];

  const items = CLUSTER_ITEMS[clusterKey] ?? [];
  return items.filter((item) => item.href !== normalized).slice(0, limit);
}

const REVIEW_CLUSTER_PATTERNS: { pattern: RegExp; cluster: string }[] = [
  { pattern: /\b(shoe|shoes|footwear|eclipsion|65z|aerus|bladesabre)\b/i, cluster: "shoe-fit" },
  { pattern: /\b(string|gauge|repulsion|lbs|tension)\b/i, cluster: "strings" },
  { pattern: /\b(shuttle|feather|nylon)\b/i, cluster: "compare" },
  { pattern: /\b(grip|overgrip)\b/i, cluster: "strings" },
  {
    pattern: /\b(racket|astrox|nanoflare|arcsaber|halbertec|axforce|drivex|thruster|bladex)\b/i,
    cluster: "all-round-rackets",
  },
];

/**
 * Decision-path shelf for `/review/[slug]/` articles — maps slug keywords to
 * the same editorial clusters used on guides and best-of pages.
 */
export function relatedReadingForReviewSlug(
  slug: string,
  limit = 3
): RelatedReadingItem[] {
  const reviewPath = normalizePath(`/review/${slug}`);
  for (const { pattern, cluster } of REVIEW_CLUSTER_PATTERNS) {
    if (!pattern.test(slug)) continue;
    const items = CLUSTER_ITEMS[cluster] ?? [];
    const filtered = items.filter((item) => item.href !== reviewPath);
    if (filtered.length > 0) return filtered.slice(0, limit);
  }
  return relatedReadingForPath("/compare-guides/yonex-astrox-vs-nanoflare/", limit);
}
