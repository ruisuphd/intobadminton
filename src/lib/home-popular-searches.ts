/** Curated homepage popular-search deep links — shared with golden-profile CI. */
export type HomePopularSearch = {
  label: string;
  href: string;
  tag: string;
};

export const homePopularSearches: HomePopularSearch[] = [
  { label: "Best rackets under $100", href: "/best/rackets-under-100/", tag: "Budget" },
  { label: "Best lightweight 5U rackets", href: "/best/lightweight-rackets-5u/", tag: "5U" },
  { label: "Best rackets for shoulder comfort", href: "/best/rackets-for-shoulder-comfort/", tag: "Comfort" },
  { label: "Best control rackets", href: "/best/control-rackets/", tag: "Control" },
  { label: "Best wide-feet shoes", href: "/best/wide-feet-badminton-shoes/", tag: "Shoes" },
  { label: "Best all-round rackets", href: "/best/all-round-rackets/", tag: "All-round" },
  { label: "Budget shoes under $130", href: "/best/budget-badminton-shoes/", tag: "Shoes" },
  {
    label: "Head-heavy rackets under $150",
    href: "/best/head-heavy-rackets-under-150/",
    tag: "Attack",
  },
  { label: "Browse equipment catalog", href: "/catalog/", tag: "Catalog" },
  { label: "Best beginner rackets", href: "/best/beginner-rackets/", tag: "Beginner" },
  { label: "Best doubles rackets", href: "/best/doubles-rackets/", tag: "Doubles" },
  { label: "Best singles rackets", href: "/best/singles-rackets/", tag: "Singles" },
  { label: "Best head-light rackets", href: "/best/head-light-rackets/", tag: "Control" },
  { label: "Best smash rackets", href: "/best/smash-heavy-rackets/", tag: "Attack" },
  { label: "Best intermediate rackets", href: "/best/intermediate-rackets/", tag: "Intermediate" },
  { label: "Best badminton shoes", href: "/best/shoes/", tag: "Shoes" },
  {
    label: "Badminton shoes vs running shoes",
    href: "/guides/badminton-shoes-vs-running-shoes/",
    tag: "Shoes",
  },
  { label: "Best badminton strings", href: "/best/strings/", tag: "Strings" },
  { label: "Best badminton shuttles", href: "/best/shuttles/", tag: "Shuttles" },
  { label: "Best badminton overgrips", href: "/best/grips/", tag: "Grips" },
  { label: "Best badminton bags", href: "/best/bags/", tag: "Bags" },
  { label: "Yonex rackets decoded", href: "/brands/yonex/", tag: "Yonex" },
  { label: "Victor rackets decoded", href: "/brands/victor/", tag: "Victor" },
  { label: "Li-Ning rackets decoded", href: "/brands/li-ning/", tag: "Li-Ning" },
  { label: "Yonex Astrox vs Nanoflare", href: "/compare-guides/yonex-astrox-vs-nanoflare/", tag: "Compare" },
  { label: "Yonex vs Victor vs Li-Ning", href: "/compare-guides/yonex-victor-li-ning/", tag: "Compare" },
  { label: "Spot fake rackets — authenticity check", href: "/guides/equipment-authenticity/", tag: "Authenticity" },
  { label: "Glossary — 4U, head-heavy, T-throat explained", href: "/guides/glossary/", tag: "Glossary" },
  { label: "68 / 72 / 76 / 78 / 80 hole rackets explained", href: "/review/racket-stringing-hole-patterns-explained/", tag: "Stringing" },
  { label: "Reviews hub", href: "/review/", tag: "Reviews" },
  { label: "Nanoflare 1000 Z review", href: "/review/yonex-nanoflare-1000z-review/", tag: "Reviews" },
  { label: "Yonex Tour vs Pro: which Tour is worth buying", href: "/review/yonex-tour-series-buying-guide/", tag: "Value" },
  { label: "Kumpoo — the fourth major badminton brand", href: "/review/kumpoo-fourth-major-badminton-brand-profile/", tag: "Brand" },
];

export function homePopularSearchHrefs(): string[] {
  return homePopularSearches.map((entry) => entry.href);
}

/** Every homepage popular-search deep link must be PWA-precached — shared with parity CI. */
export function homePopularSearchPrecachePaths(): string[] {
  return homePopularSearchHrefs();
}

/** Review article slugs surfaced in the homepage popular-search grid. */
export function homePopularReviewSlugs(): string[] {
  return homePopularSearches
    .filter(
      (entry) =>
        entry.href.startsWith("/review/") && entry.href !== "/review/"
    )
    .map((entry) => entry.href.slice("/review/".length).replace(/\/$/, ""));
}

export type OfflineRecoveryLink = {
  href: string;
  label: string;
  description: string;
};

const POPULAR_SEARCH_OFFLINE_DESCRIPTIONS: Record<string, string> = {
  "/review/racket-stringing-hole-patterns-explained/":
    "Precached — homepage popular-search stringing hole explainer.",
  "/review/yonex-nanoflare-1000z-review/":
    "Precached — homepage popular-search flagship speed racket review.",
  "/review/yonex-tour-series-buying-guide/":
    "Precached — homepage popular-search Tour vs Pro value guide.",
  "/review/kumpoo-fourth-major-badminton-brand-profile/":
    "Precached — homepage popular-search Kumpoo brand profile.",
};

/** Popular-search review deep links for `/offline/` recovery sidebar — shared with parity CI. */
export function homePopularSearchReviewOfflineRecoveryLinks(): OfflineRecoveryLink[] {
  return homePopularSearches
    .filter(
      (entry) =>
        entry.href.startsWith("/review/") && entry.href !== "/review/"
    )
    .map((entry) => ({
      href: entry.href,
      label: entry.label,
      description:
        POPULAR_SEARCH_OFFLINE_DESCRIPTIONS[entry.href] ??
        "Precached — homepage popular-search editorial pick.",
    }));
}

const POPULAR_SEARCH_EDITORIAL_OFFLINE_DESCRIPTIONS: Record<string, string> = {
  "/best/rackets-under-100/":
    "Precached — homepage popular-search budget racket guide.",
  "/best/lightweight-rackets-5u/":
    "Precached — homepage popular-search 5U lightweight guide.",
  "/best/rackets-for-shoulder-comfort/":
    "Precached — homepage popular-search shoulder-comfort guide.",
  "/best/control-rackets/":
    "Precached — homepage popular-search control racket guide.",
  "/best/wide-feet-badminton-shoes/":
    "Precached — homepage popular-search wide-feet shoe guide.",
  "/best/all-round-rackets/":
    "Precached — homepage popular-search all-round racket guide.",
  "/best/budget-badminton-shoes/":
    "Precached — homepage popular-search budget shoe guide.",
  "/best/head-heavy-rackets-under-150/":
    "Precached — homepage popular-search head-heavy attack guide.",
  "/best/singles-rackets/":
    "Precached — homepage popular-search singles racket guide.",
  "/best/head-light-rackets/":
    "Precached — homepage popular-search head-light control guide.",
  "/best/smash-heavy-rackets/":
    "Precached — homepage popular-search smash racket guide.",
  "/best/intermediate-rackets/":
    "Precached — homepage popular-search intermediate racket guide.",
  "/guides/badminton-shoes-vs-running-shoes/":
    "Precached — homepage popular-search shoe comparison guide.",
  "/best/strings/":
    "Precached — homepage popular-search string buying guide.",
  "/best/shuttles/":
    "Precached — homepage popular-search shuttle buying guide.",
  "/best/grips/":
    "Precached — homepage popular-search overgrip buying guide.",
  "/best/bags/":
    "Precached — homepage popular-search bag buying guide.",
  "/brands/yonex/":
    "Precached — homepage popular-search Yonex brand hub.",
  "/brands/victor/":
    "Precached — homepage popular-search Victor brand hub.",
  "/brands/li-ning/":
    "Precached — homepage popular-search Li-Ning brand hub.",
};

/** Best-of, guide, and brand popular-search picks for `/offline/` recovery — shared with parity CI. */
export function homePopularSearchEditorialOfflineRecoveryLinks(): OfflineRecoveryLink[] {
  return homePopularSearches
    .filter((entry) => !entry.href.startsWith("/review/"))
    .map((entry) => ({
      href: entry.href,
      label: entry.label,
      description:
        POPULAR_SEARCH_EDITORIAL_OFFLINE_DESCRIPTIONS[entry.href] ??
        "Precached — homepage popular-search editorial pick.",
    }));
}
