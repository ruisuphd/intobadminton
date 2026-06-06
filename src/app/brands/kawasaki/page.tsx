import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BrandPage, type BrandPageConfig } from "@/components/BrandPage";
import { defaultOgImages } from "@/lib/og";
import { reviewPath } from "@/lib/review-pages";

export const metadata: Metadata = {
  title: "Kawasaki Badminton (川崎) — Master Mao, Star Cross, KACE decoded",
  description:
    "Kawasaki's Chinese-market badminton catalogue: Master Mao 20, Star Cross, Chocolate 88D, Glacier 800, H2 Hydrogen rackets plus KACE and Twilight shoes. Value-tier brand widely available in China.",
  alternates: pageAlternates("/brands/kawasaki/"),
  openGraph: {
    title: "Kawasaki Badminton Rackets and Shoes Decoded — Master Mao, Star Cross, KACE",
    description:
      "Kawasaki's main badminton lines mapped to playing role and skill level. Master Mao for attack, Star Cross for speed, Chocolate 88D for value, plus KACE / Twilight shoes.",
    url: "/brands/kawasaki/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kawasaki (川崎) Badminton — Master Mao, Star Cross & KACE Decoded",
    description:
      "Value-tier badminton brand widely sold in China. Rackets, shoes, and shuttles — by role, level, and budget.",
  },
};

const config: BrandPageConfig = {
  slug: "kawasaki",
  brandName: "Kawasaki",
  brandNameZh: "川崎",
  founded: 1968,
  hqCountry: "Japan / China-licensed",
  officialUrl: "https://kawasaki-sport.com/",
  title: "Kawasaki badminton: rackets, shoes, and the value-tier alternative decoded",
  dek: "Kawasaki is the most widely-distributed value-tier badminton brand in mainland China. Master Mao 20, Star Cross, Chocolate 88D, Glacier 800, H2 Hydrogen rackets plus KACE and Twilight shoes — here is how each line maps to player role.",
  intro:
    "Kawasaki's badminton catalogue ships under a Japanese-origin brand name with active Chinese manufacturing licensing. The line is value-to-mid tier; mainstream channel for new and returning club players in mainland China. The brand does not currently match Yonex / Victor / Li-Ning on flagship-tier performance but matches them on club-level playing experience at significantly lower prices.",
  positioning:
    "Kawasaki's racket lines split by playing intent: Master Mao (矛) for attack, Star Cross (穿越·星河) for speed, Chocolate 88D for Yonex Astrox 88D Pro budget-alternative, Glacier 800 (冰川 800) for balanced budget, H2 Hydrogen (疾氢) for ultra-light 5U speed. Shoes ship as KACE (speed) and Twilight (暮光, stability all-round).",
  lines: [
    {
      name: "Master Mao (矛) — attack flagship",
      bestFor: "Doubles attackers wanting Kawasaki-tier attack identity",
      description:
        "Kawasaki's master-tuned attack racket. Head-heavy, stiff shaft, designed to deliver attack carry. Master Mao 20 is the current SKU; source reviewers call it 'the attack horn'. Plays in a similar identity range to mid-flagship Yonex / Victor attack frames at a meaningfully lower price.",
      signatureModels: ["Master Mao 20 (矛 20)"],
    },
    {
      name: "Star Cross (穿越·星河) — speed flagship",
      bestFor: "Doubles speed players wanting non-mainstream brand identity",
      description:
        "Kawasaki's speed flagship with cosmic-themed colourway. Head-light, stiff shaft, designed for fast drive sequences. Source reviewers describe it as 'the sky's power, ignition at first touch' (苍穹之力·一触即发).",
      signatureModels: ["Star Cross (穿越·星河)"],
    },
    {
      name: "Chocolate 88D — Yonex Astrox 88D Pro budget alternative",
      bestFor: "Doubles attackers wanting 88D-style attack without paying flagship money",
      description:
        "Kawasaki's value-tier Astrox 88D-style attack racket. Source reviewers explicitly position it as 'Astrox 88D platement' (替代品) — delivers genuine 88D-style attack feel at meaningfully lower price. Real budget-alternative that survives the budget-alternative test more honestly than typical claims.",
      signatureModels: ["Chocolate 88D (鎏金幻彩)"],
    },
    {
      name: "Glacier 800 (冰川 800) and H2 Hydrogen (疾氢) — value picks",
      bestFor: "First-year club players, junior-to-adult transition, smaller-physique speed buyers",
      description:
        "Glacier 800 is the balanced budget pick; H2 Hydrogen is the ultra-light 5U speed pick (per BadmintonCN curiosity-series coverage). H2's 5U accessibility makes the Kawasaki attack/speed identity available to junior players and smaller-physique adult attackers.",
      signatureModels: [
        "Glacier 800 (冰川 800)",
        "H2 Hydrogen (H2 疾氢)",
      ],
    },
    {
      name: "Kawasaki shoes — KACE, Twilight",
      bestFor: "Club-level court shoe alternatives to Yonex 65 Z series",
      description:
        "KACE is the suspension-damping speed shoe — source reviewers describe it as 'suspension filter for speed attack' (悬挂滤震·疾速攻坚). Twilight (暮光) is the stable all-round court shoe with evening-themed colourway. Both deliver value-tier court footwear; tournament-grade reactivity falls behind Yonex 65 Z4.",
      signatureModels: [
        "KACE (speed shoe)",
        "Twilight (暮光)",
      ],
    },
  ],
  topPicks: [
    {
      name: "Kawasaki Chocolate 88D",
      line: "Chocolate 88D",
      bestFor: "Astrox 88D Pro budget alternative",
      priceUsd: 75,
      href: "/product/kawasaki-chocolate-88d/",
    },
    {
      name: "Kawasaki Master Mao 20",
      line: "Master Mao",
      bestFor: "Value-tier attack racket",
      priceUsd: 85,
      href: reviewPath("kawasaki-master-mao-20"),
    },
    {
      name: "Kawasaki Star Cross",
      line: "Star Cross",
      bestFor: "Value-tier speed racket",
      priceUsd: 90,
      href: reviewPath("kawasaki-star-cross"),
    },
    {
      name: "Kawasaki KACE",
      line: "Shoes",
      bestFor: "Speed-priority court shoe",
      priceUsd: 75,
      href: reviewPath("kawasaki-kace"),
    },
  ],
  faqs: [
    {
      q: "Is Kawasaki the same Kawasaki that makes motorcycles?",
      a: "No — separate company. The Japanese motorcycle / heavy industry brand 'Kawasaki Heavy Industries' is unrelated to Kawasaki badminton equipment. The badminton brand is Japanese-origin with significant Chinese-market presence and manufacturing licensing.",
    },
    {
      q: "Is the Chocolate 88D actually as good as the Yonex Astrox 88D Pro?",
      a: "Not as good as the 88D Pro 2024 flagship, but the gap is smaller than the price difference suggests. Source reviewers (BadmintonCN) and observer notes from clubmates who switched both ways consistently report: roughly 80-85% of the 88D Pro 2024's feel at roughly 50-60% of the price. The 88D Pro retains advantages on peak smash carry, refinement, and resale liquidity; the Chocolate 88D wins on cost and is honest about its value-tier positioning.",
    },
    {
      q: "Are Kawasaki shoes safe for serious club use?",
      a: "Yes for club-level use; below tournament-tier for peak responsiveness. KACE has suspension-damping suitable for long sessions; Twilight is stable for all-round court play. For tournament-grade bounce and speed response, mainstream brands (Yonex 65 Z4, Asics Blast FF 3) deliver more. Sand the outsole on concrete before competitive use to remove factory release oxide — standard Asian-brand shoe practice.",
    },
    {
      q: "Where can I buy Kawasaki badminton equipment?",
      a: "Widely available in mainland China and Southeast Asia. Singapore and Hong Kong have authorized resellers. Limited North American and European retail; typically only through small specialty importers. If you want a Kawasaki racket but cannot find a local stockist, expect to import.",
    },
    {
      q: "Which Kawasaki racket should a budget-conscious doubles attacker buy?",
      a: "Chocolate 88D first — most honest budget Astrox 88D alternative in the catalogue. Master Mao 20 second — slightly more aggressive attack tuning. Skip Glacier 800 if you specifically want attack identity; Glacier is balanced rather than attack-leaning. H2 Hydrogen if you specifically want 5U ultra-light speed.",
    },
  ],
  relatedLinks: [
    {
      label: "Kawasaki Chocolate 88D vs Yonex Astrox 88D Pro",
      href: reviewPath("kawasaki-chocolate-88d"),
    },
    {
      label: "Kawasaki Master Mao 20 racket review",
      href: reviewPath("kawasaki-master-mao-20"),
    },
    {
      label: "Kawasaki Star Cross review",
      href: reviewPath("kawasaki-star-cross"),
    },
    {
      label: "Kawasaki KACE shoes review",
      href: reviewPath("kawasaki-kace"),
    },
    {
      label: "Best beginner badminton rackets",
      href: "/best/beginner-rackets/",
    },
  ],
};

export default function KawasakiBrandPage() {
  return <BrandPage config={config} />;
}
