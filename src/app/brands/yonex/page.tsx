import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BrandPage, type BrandPageConfig } from "@/components/BrandPage";
import { defaultOgImages } from "@/lib/og";
import { reviewPath } from "@/lib/review-pages";

export const metadata: Metadata = {
  title: "Yonex Badminton — Astrox, Nanoflare, Arcsaber",
  description:
    "Yonex's racket lines decoded: Astrox (power), Nanoflare (speed), Arcsaber (control) — plus Power Cushion shoes and BG / Exbolt strings.",
  alternates: pageAlternates("/brands/yonex/"),
  openGraph: {
    title: "Yonex Badminton Rackets, Shoes & Strings Decoded — Astrox, Nanoflare, Arcsaber",
    description:
      "Yonex's main racket lines mapped to playing role and skill level: Astrox for power attack, Nanoflare for speed, Arcsaber for control. Plus Power Cushion shoes and BG / Exbolt strings.",
    url: "/brands/yonex/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yonex Badminton — Astrox, Nanoflare & Arcsaber Decoded",
    description:
      "Astrox (power), Nanoflare (speed), Arcsaber (control). Plus shoes and strings — by role, level, and budget.",
  },
};

const config: BrandPageConfig = {
  slug: "yonex",
  brandName: "Yonex",
  brandNameZh: "尤尼克斯",
  founded: 1946,
  hqCountry: "Japan",
  officialUrl: "https://www.yonex.com/badminton/",
  title: "Yonex badminton: every racket line, decoded",
  dek: "Astrox for power, Nanoflare for speed, Arcsaber for control, plus shoes, strings, and shuttles. Here is how IntoBadminton maps each line to player role and source status.",
  intro:
    "Yonex is one of the most visible badminton brands globally, with official product pages that usually publish racket flex, frame material, shaft material, weight / grip, stringing advice, colour, and item code. IntoBadminton uses those product pages wherever available.",
  positioning:
    "Yonex's main racket lines are organised around playing intent. Astrox generally leans power attack, Nanoflare generally leans fast swing speed, and Arcsaber generally leans control. Model selection still depends on the exact official spec row: weight class, grip size, shaft flex, stringing advice, and budget.",
  lines: [
    {
      name: "Astrox — head-heavy power and attack",
      bestFor: "Smash-heavy singles, rear-court doubles",
      description:
        "Yonex's flagship attack line. The Rotational Generator System concentrates mass at the head and grip butt to produce more rotational energy on smashes. Stiffness escalates fast as you go up the line — Astrox 88S/D Pro and 99 Pro are pro-spec; the 77 Pro is the friendliest 'Pro' frame Yonex makes; the 100ZZ is reserved for elite clean contact.",
      signatureModels: [
        "Astrox 100ZZ",
        "Astrox 99 Pro",
        "Astrox 88D Pro",
        "Astrox 88S Pro",
        "Astrox 77 Pro",
      ],
    },
    {
      name: "Nanoflare — head-light speed",
      bestFor: "Fast-flat doubles, defense, front-court attack",
      description:
        "Built around fast swing speed and quick reactions. Nanoflare 700 and 800 Pro are the doubles workhorses on the BWF tour. The 1000Z carries serious head-light attack power. Lighter weight classes (4U/5U) are common across the line and tolerate higher tensions surprisingly well.",
      signatureModels: [
        "Nanoflare 1000Z",
        "Nanoflare 800 Pro",
        "Nanoflare 700",
        "Nanoflare 555",
        "Nanoflare 380",
      ],
    },
    {
      name: "Arcsaber — even balance, control-first",
      bestFor: "All-court singles, technique-focused players",
      description:
        "Yonex's control line. Even balance, generous sweet spot, and shaft flex tuned for repeatability rather than raw power. The Arcsaber 11 Pro is the modern flagship; the Arcsaber 7 Pro is one of the best 'second racket' picks for an ambitious club player who is not yet ready for a stiff Astrox.",
      signatureModels: [
        "Arcsaber 11 Pro",
        "Arcsaber 7 Pro",
        "Arcsaber 11 Play",
        "Arcsaber 1 Feel",
      ],
    },
    {
      name: "Voltric — heavy-frame attack, legacy line",
      bestFor: "Players who want a 3U head-heavy classic",
      description:
        "The pre-Astrox attack line. Still made, still loved by players who want a more old-school 3U feel. The Voltric Z-Force II is a legendary smash frame; the Voltric 8DG is a popular durable beginner-to-intermediate option.",
      signatureModels: ["Voltric Z-Force II", "Voltric 8DG", "Voltric 70 E-tune"],
    },
    {
      name: "Shoes — Power Cushion, SHB, Eclipsion",
      bestFor: "Court footwork from beginner to elite",
      description:
        "Yonex's badminton shoe range covers Power Cushion (entry to mid), SHB-Aerus (lightweight speed), and SHB-Eclipsion (premium stability for heavy footwork). Standard fit is medium-narrow; players with wide feet often size up half a US/UK size or look at Mizuno Wave Claw instead.",
      signatureModels: ["SHB-Eclipsion Z3", "SHB-Aerus Z2", "Power Cushion 65Z3", "Power Cushion Comfort Z3"],
    },
    {
      name: "Shuttles — Aerosensa, Mavis",
      bestFor: "Tournament and club nylon/feather",
      description:
        "Aerosensa is Yonex's tournament feather line — AS-50 for top-tier play, AS-30 and AS-20 for club sessions. Mavis covers durable nylon for training. Speed code (76 slow / 77 medium / 78 fast) should match your venue temperature and altitude.",
      signatureModels: ["Aerosensa 50", "Aerosensa 30", "Mavis 350"],
    },
    {
      name: "Strings — BG65, BG80, Aerobite, Exbolt",
      bestFor: "Most club and tournament setups",
      description:
        "BG65 is the durability default for club play. BG80 and BG80 Power add crisper feel. Aerobite is a vertical-horizontal hybrid that rewards clean contact. Exbolt 65/63 are the modern repulsion picks. Pair tension to your level — most players are over-strung and under-restrung.",
      signatureModels: ["BG65", "BG80", "BG80 Power", "Aerobite", "Exbolt 65"],
    },
  ],
  topPicks: [
    {
      name: "Yonex Nanoflare 700 Play",
      line: "Nanoflare (Play tier)",
      bestFor: "First serious club racket",
      priceUsd: 80,
      href: "/product/yy-nanoflare-700-play/",
    },
    {
      name: "Yonex Arcsaber 7 Pro",
      line: "Arcsaber",
      bestFor: "Ambitious beginner-to-intermediate",
      priceUsd: 195,
      href: "/best/beginner-rackets/",
    },
    {
      name: "Yonex Astrox 77 Pro",
      line: "Astrox",
      bestFor: "Friendly 'Pro' attack frame",
      priceUsd: 220,
      href: "/best/intermediate-rackets/",
    },
    {
      name: "Yonex Astrox 88D Pro",
      line: "Astrox",
      bestFor: "Doubles rear-court attack",
      priceUsd: 240,
      href: "/best/doubles-rackets/",
    },
  ],
  faqs: [
    {
      q: "Which Yonex racket should a beginner buy?",
      a: "For most adult beginners, a 4U flexible-shaft frame with even or head-light balance — the Nanoflare 700 Play (speed-leaning) or Arcsaber 7 Pro (control) are both safe picks, and the Astrox 77 Play is the right answer if you specifically want to learn head-heavy attack from day one. Skip the Pro-tier Astrox line for at least the first six months: those frames are engineered around stiff shafts and demanding sweet spots that punish late contact.",
    },
    {
      q: "Astrox vs Nanoflare — which line is better?",
      a: "Different jobs. Astrox is head-heavy attack; if your game is rear-court smashing in singles or doubles, that's the line. Nanoflare is head-light speed; if your game is fast-flat doubles drives, defense, or front-court interception, that's the line. Most amateurs benefit more from a Nanoflare than they expect, because head-heavy frames are slower to recover with on flat exchanges.",
    },
    {
      q: "What does 3U, 4U, and 5U mean on Yonex rackets?",
      a: "Weight class. 3U is roughly 85-89g (heavier, more momentum), 4U is roughly 80-84g (the modern adult default), 5U is roughly 75-79g (lightest, best for shoulder protection and quick exchanges). Most amateurs do best at 4U; smaller players or anyone with shoulder caution should look at 5U. 3U is overkill unless you specifically want a head-heavy attack feel and have a conditioned shoulder.",
    },
    {
      q: "Are Yonex rackets worth the premium over Victor and Li-Ning?",
      a: "Only if the specific Yonex model fits your level, role, and local support needs. Compare the exact official product-page specs, warranty channel, stringer familiarity, and local availability against the Victor or Li-Ning model you are considering.",
    },
    {
      q: "What strings come pre-strung on a new Yonex racket?",
      a: "Factory string is usually a generic nylon at low tension and is meant to ship the racket safely, not to play. Restring before your first serious session — BG65 at 22-24 lb is a safe default for club players. The original string and tension is not what the marketing materials describe.",
    },
  ],
  relatedLinks: [
    {
      label: "Nanoflare 1000 Z review",
      href: reviewPath("yy-nanoflare-1000z"),
    },
    {
      label: "Power Cushion Comfort Z3 shoe review",
      href: reviewPath("yy-comfort-z3"),
    },
    {
      label: "Yonex Aerosensa 50 shuttle review",
      href: reviewPath("yy-as-50"),
    },
    {
      label: "Spot fake Yonex rackets — authenticity check",
      href: "/guides/equipment-authenticity/",
    },
    {
      label: "Yonex Astrox vs Nanoflare — full comparison",
      href: "/compare-guides/yonex-astrox-vs-nanoflare/",
    },
    {
      label: "Astrox 77 Pro vs Astrox 88S Pro",
      href: "/compare-guides/astrox-77-pro-vs-88s-pro/",
    },
    {
      label: "Yonex vs Victor vs Li-Ning — brand showdown",
      href: "/compare-guides/yonex-victor-li-ning/",
    },
    {
      label: "Best beginner badminton rackets",
      href: "/best/beginner-rackets/",
    },
    {
      label: "Best smash-heavy badminton rackets",
      href: "/best/smash-heavy-rackets/",
    },
  ],
};

export default function YonexBrandPage() {
  return <BrandPage config={config} />;
}
