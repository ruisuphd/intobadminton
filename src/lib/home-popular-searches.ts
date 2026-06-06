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
