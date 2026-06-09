import { homeFeaturedOfflineRecoveryLinks } from "@/lib/home-featured";
import {
  homePopularSearchEditorialOfflineRecoveryLinks,
  homePopularSearchReviewOfflineRecoveryLinks,
} from "@/lib/home-popular-searches";

/** CrUX-priority and Lighthouse commercial paths listed on `/offline/` recovery sidebar. */
const CORE_OFFLINE_RECOVERY_LINKS = [
  {
    href: "/quiz/",
    label: "Equipment finder",
    description: "Precached — run the five-step quiz offline.",
  },
  {
    href: "/catalog/",
    label: "Catalog",
    description: "Precached — browse rackets, shoes, and strings.",
  },
  {
    href: "/search/",
    label: "Search",
    description: "Precached shell — results need a prior online visit.",
  },
  {
    href: "/saved/",
    label: "Saved shortlist",
    description: "Precached — your saved items stay on this device.",
  },
  {
    href: "/compare/",
    label: "Compare",
    description: "Precached — revisit saved product comparisons.",
  },
  {
    href: "/updates/",
    label: "Updates",
    description: "Precached — editorial freshness feed.",
  },
  {
    href: "/review/",
    label: "Reviews",
    description: "Precached index — open articles you visited before.",
  },
  {
    href: "/review/yonex-arcsaber-7-pro-review/",
    label: "Arcsaber 7 Pro review",
    description: "Precached — flagship first-person racket review.",
  },
  {
    href: "/product/yy-grpht-thrttl/",
    label: "Sample product page",
    description: "Precached — Yonex Grpht Thrttl specs and finder fit.",
  },
  {
    href: "/best/beginner-rackets/",
    label: "Best beginner rackets",
    description: "Precached — top buying guide for first rackets.",
  },
  {
    href: "/compare-guides/yonex-astrox-vs-nanoflare/",
    label: "Astrox vs Nanoflare",
    description: "Precached — flagship Yonex power vs speed comparison.",
  },
  {
    href: "/guides/string-tension/",
    label: "String tension guide",
    description: "Precached — how tension affects control and durability.",
  },
  {
    href: "/tools/string-tension-calculator/",
    label: "String tension calculator",
    description: "Precached — recommended tension by level and arm comfort.",
  },
  {
    href: "/best/doubles-rackets/",
    label: "Best doubles rackets",
    description: "Precached — doubles buying guide for front and rear court.",
  },
  {
    href: "/best/defensive-rackets/",
    label: "Best defensive rackets",
    description: "Precached — defensive and counter-attack racket buying guide.",
  },
  {
    href: "/best/shoes/",
    label: "Best badminton shoes",
    description: "Precached — shoe picks by fit width and stability.",
  },
  {
    href: "/compare-guides/yonex-victor-li-ning/",
    label: "Yonex vs Victor vs Li-Ning",
    description: "Precached — flagship brand comparison for racket buyers.",
  },
  {
    href: "/guides/glossary/",
    label: "Equipment glossary",
    description: "Precached — 40+ badminton gear terms in plain English.",
  },
  {
    href: "/guides/equipment-authenticity/",
    label: "Authenticity guide",
    description: "Precached — counterfeit checks before you buy.",
  },
  {
    href: "/brands/bonny/",
    label: "Bonny brand hub",
    description: "Precached — WuQue, MoJun, and Bonny catalogue decoded.",
  },
  {
    href: "/guides/",
    label: "Guides",
    description: "Precached hub — open guides you visited before.",
  },
  {
    href: "/tools/",
    label: "Tools",
    description: "Precached calculators — tension, skill level, authenticity.",
  },
  {
    href: "/faq/",
    label: "FAQ",
    description: "Precached — common finder and methodology questions.",
  },
  {
    href: "/best/",
    label: "Best-of guides",
    description: "Precached — buying guides for rackets, shoes, and strings.",
  },
  {
    href: "/brands/",
    label: "Brands",
    description: "Precached — Yonex, Victor, Li-Ning, and more brand hubs.",
  },
  {
    href: "/compare-guides/",
    label: "Compare guides",
    description: "Precached hub — open comparisons you visited before.",
  },
  {
    href: "/about/",
    label: "About",
    description: "Precached — who runs IntoBadminton and how we score gear.",
  },
  {
    href: "/sources/",
    label: "Sources",
    description: "Precached — where product data and reviews come from.",
  },
  {
    href: "/source-policy/",
    label: "Source policy",
    description: "Precached — how we cite retailers and manufacturer data.",
  },
  {
    href: "/authors/",
    label: "Authors",
    description: "Precached — editorial team and credentials.",
  },
  {
    href: "/authors/rui-su/",
    label: "Rui Su",
    description: "Precached — lead author profile and experience.",
  },
  {
    href: "/methodology/",
    label: "Methodology",
    description: "Precached — how fit scores and buying guides are built.",
  },
  {
    href: "/data/",
    label: "Claims registry",
    description: "Precached — tracked claims with freshness dates.",
  },
  {
    href: "/contact/",
    label: "Contact",
    description: "Precached — editorial and support contact details.",
  },
  {
    href: "/research/",
    label: "Research",
    description: "Precached — market research signals behind recommendations.",
  },
  {
    href: "/privacy/",
    label: "Privacy policy",
    description: "Precached — how we handle data and consent.",
  },
  {
    href: "/terms/",
    label: "Terms of service",
    description: "Precached — site terms and editorial integrity policy.",
  },
  {
    href: "/cookies/",
    label: "Cookie policy",
    description: "Precached — cookies, Consent Mode, and ad partners.",
  },
  {
    href: "/security/",
    label: "Security",
    description: "Precached — data handling and vulnerability reporting.",
  },
  {
    href: "/privacy-choices/",
    label: "Privacy choices",
    description: "Precached — consent and ad personalization controls.",
  },
] as const;

function dedupeOfflineRecoveryLinks<
  T extends { href: string; label: string; description: string },
>(links: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const link of links) {
    if (seen.has(link.href)) continue;
    seen.add(link.href);
    out.push(link);
  }
  return out;
}

export const OFFLINE_RECOVERY_LINKS = dedupeOfflineRecoveryLinks([
  ...CORE_OFFLINE_RECOVERY_LINKS,
  ...homeFeaturedOfflineRecoveryLinks(),
  ...homePopularSearchReviewOfflineRecoveryLinks(),
  ...homePopularSearchEditorialOfflineRecoveryLinks(),
]);

/** Paths from `docs/baselines/crux-template.csv` that must appear in offline recovery. */
export const CRUX_OFFLINE_RECOVERY_PATHS = [
  "/quiz/",
  "/catalog/",
  "/best/beginner-rackets/",
  "/best/doubles-rackets/",
  "/best/shoes/",
  "/best/grips/",
  "/best/bags/",
  "/best/strings/",
  "/best/shuttles/",
  "/best/all-round-rackets/",
  "/best/intermediate-rackets/",
  "/best/smash-heavy-rackets/",
  "/best/singles-rackets/",
  "/best/control-rackets/",
  "/best/defensive-rackets/",
  "/best/head-light-rackets/",
  "/best/rackets-for-shoulder-comfort/",
  "/best/wide-feet-badminton-shoes/",
  "/best/budget-badminton-shoes/",
  "/best/lightweight-rackets-5u/",
  "/best/head-heavy-rackets-under-150/",
  "/best/rackets-under-100/",
  "/review/",
  "/review/yonex-arcsaber-7-pro-review/",
  "/tools/string-tension-calculator/",
  "/compare-guides/yonex-astrox-vs-nanoflare/",
  "/compare-guides/yonex-victor-li-ning/",
  "/guides/glossary/",
  "/guides/equipment-authenticity/",
  "/brands/bonny/",
  "/search/",
  "/product/yy-grpht-thrttl/",
  "/guides/string-tension/",
  "/brands/yonex/",
  "/tools/",
] as const;

export const OFFLINE_RECOVERY_PATHS = OFFLINE_RECOVERY_LINKS.map(
  (link) => link.href
);
