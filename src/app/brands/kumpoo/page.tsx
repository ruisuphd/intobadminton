import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BrandPage, type BrandPageConfig } from "@/components/BrandPage";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Kumpoo Badminton (薰风) — Shura II, Shanhai NEW, JS strings decoded",
  description:
    "Kumpoo's (薰风) catalogue decoded: Shura II and Shanhai NEW attack flagships, JS-67 and JS-63 strings, KH-G805 Lite Pro shoes. The strongest candidate for the fourth credible badminton brand alongside Yonex / Victor / Li-Ning.",
  alternates: pageAlternates("/brands/kumpoo/"),
  openGraph: {
    title:
      "Kumpoo Badminton Rackets, Strings & Shoes Decoded — Shura II, Shanhai NEW, JS-67",
    description:
      "Kumpoo's main racket lines mapped to playing role and skill level. Shura II for aggressive attack, Shanhai NEW for controlled attack, JS strings for stringing rotation, shoes for budget-priority.",
    url: "/brands/kumpoo/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumpoo (薰风) Badminton — Shura II, Shanhai NEW & JS Strings Decoded",
    description:
      "The fourth credible badminton brand. Rackets, strings, and shoes — by role, level, and budget.",
  },
};

const config: BrandPageConfig = {
  slug: "kumpoo",
  brandName: "Kumpoo",
  brandNameZh: "薰风",
  founded: 2001,
  hqCountry: "Japan (now China-owned)",
  officialUrl: "https://www.kumpoo.com/",
  title: "Kumpoo badminton: the fourth credible brand, decoded",
  dek: "Kumpoo (薰风) has reached parity with second-tier mainstream brands on build quality and flagship feel — the most credible candidate for the fourth-brand label alongside Yonex / Victor / Li-Ning. Here is how the catalogue maps to player role.",
  intro:
    "Kumpoo was founded in May 2001 in Japan by Yuji Omori and Mitsutoshi Satou; Guangzhou-based Sobey Sports acquired the brand entirely in 2009 and re-headquartered operations to China. The current line has reached flagship-adjacent build quality across attack rackets (Shura II, Shanhai NEW), value-tier shoes (KH-G805 Lite Pro), and premium strings (JS-67 club-durability, JS-63 tournament-repulsion) — the JS-series is produced at Kumpoo's Japan high-end string facility. BadmintonCN community reviewers consistently cover Kumpoo flagships; TiGe XLab has positioned the brand as the credible cross-shop outside the mainstream trio.",
  positioning:
    "Kumpoo's catalogue splits across rackets (two flagships at overlapping price tiers: Shura II for aggressive attack, Shanhai NEW for controlled attack), strings (JS-67 durability vs JS-63 thin-gauge repulsion), and shoes (KH-G805 Lite Pro for value-priority). Smaller catalogue than the mainstream trio but the build quality is genuinely competitive with mid-flagship Yonex / Victor / Li-Ning rackets at a meaningful price advantage.",
  lines: [
    {
      name: "Shura II (修罗 II) and Shanhai NEW (山海 NEW) — attack flagships",
      bestFor: "Doubles attackers wanting flagship-tier feel outside the mainstream trio",
      description:
        "Two flagship-tier attack rackets at overlapping price tiers but different identity emphasis. Shura II is the aggressive-attack pick — head-heavy, stiff shaft, violent-totem (暴力图腾) styling, demanding swing profile. Shanhai NEW (山海 NEW) is the controlled-attack pick — slightly more rounded weight distribution, less stiff shaft, controlled-attack identity matching the mountains-and-seas (镇山海·定乾坤) thematic.",
      signatureModels: [
        "Shura II (修罗 II)",
        "Shanhai NEW (山海 NEW)",
      ],
    },
    {
      name: "KH-G805 Lite Pro — value speed",
      bestFor: "Budget speed pick; junior and small-physique players",
      description:
        "Budget speed racket in the Kumpoo line. 5U weight class with head-light balance for fast drive recovery; head-light feel suitable for junior and small-physique players. Source reviewers position it in the same buyer-decision range as the Yonex Nanoflare 700 Play 5U.",
      signatureModels: ["KH-G805 Lite Pro"],
    },
    {
      name: "JS-67 and JS-63 — premium strings",
      bestFor: "Club-durability buyers (JS-67) and thin-gauge tournament players (JS-63)",
      description:
        "Two premium strings covering durability-versus-repulsion trade-offs. JS-67 is the 0.67mm club-durability string with a distinctive ice-blue colour signature. JS-63 (subtitled 音爆 / Sonic Boom) is the 0.63mm thin-gauge tournament-tier repulsion option. Gauge dominates the buying decision — see the dedicated comparison for the buyer-question filter.",
      signatureModels: [
        "JS-67 String",
        "JS-63 Sonic Boom String",
      ],
    },
  ],
  topPicks: [
    {
      name: "Kumpoo Shura II",
      line: "Shura II",
      bestFor: "Aggressive-attack flagship outside mainstream trio",
      priceUsd: 145,
      href: "/review/kumpoo-shura-2/",
    },
    {
      name: "Kumpoo Shanhai NEW",
      line: "Shanhai NEW",
      bestFor: "Controlled-attack flagship at value pricing",
      priceUsd: 155,
      href: "/review/kumpoo-shanhai-new/",
    },
    {
      name: "Kumpoo JS-67 string",
      line: "Strings",
      bestFor: "Club durability with ice-blue colour signature",
      priceUsd: 12,
      href: "/comparisons/kumpoo-js-67-string-review/",
    },
    {
      name: "Kumpoo KH-G805 Lite Pro shoes",
      line: "Shoes",
      bestFor: "Value-tier court shoes from the Kumpoo line",
      priceUsd: 70,
      href: "/review/kumpoo-kh-g805-lite-pro/",
    },
  ],
  faqs: [
    {
      q: "Is Kumpoo really competitive with Yonex / Victor / Li-Ning?",
      a: "At the mid-flagship tier, yes — competitively. Kumpoo has reached parity with second-tier mainstream brands on build quality, finish, and flagship feel. The differences from Yonex / Victor / Li-Ning flagships are now smaller than the brand recognition gap suggests. At the absolute peak-flagship tier (Astrox 100ZZ, Auraspeed 99 J, AxForce 100 Gen 2), Kumpoo does not yet have a direct equivalent. As a cross-shop for mid-flagship buyers, Kumpoo is the most credible candidate for the fourth-brand label.",
    },
    {
      q: "Shura II vs Shanhai NEW — which Kumpoo flagship should I buy?",
      a: "By playing identity. Shura II for aggressive attack — head-heavy, stiffer shaft, demanding swing profile, violent-totem styling. Shanhai NEW for controlled attack — slightly more rounded weight, more forgiving sweet spot, controlled-attack identity. The two are not redundant; they emphasise different attack identities within the same flagship-tier price range. See the dedicated comparison article for the buyer-question filter.",
    },
    {
      q: "JS-67 vs JS-63 strings — which to buy?",
      a: "Gauge dominates the decision. JS-67 (0.67mm) for club-durability buyers who restring every 2-3 months. JS-63 (0.63mm thin gauge) for tournament-tier players who restring monthly or more and value peak repulsion over durability. The ice-blue colour signature on JS-67 is a distinctive Kumpoo identifier; JS-63 carries the 音爆 / Sonic Boom subtitle.",
    },
    {
      q: "Where can I buy Kumpoo badminton equipment?",
      a: "Concentrated in mainland China; Singapore has authorized resellers. North American and European availability is limited. If you want Kumpoo equipment but cannot find a local stockist, expect to import from a Chinese or SE Asian retailer.",
    },
    {
      q: "Is Kumpoo a Chinese brand or Japanese?",
      a: "Both, in different eras. Kumpoo was founded in May 2001 in Japan by Yuji Omori and Mitsutoshi Satou, registered as Kumpoo Co., Ltd. Guangzhou-based Sobey Sports acquired the brand entirely in 2009, moving R&D and operations to China — the brand is now Chinese-owned but retains the Japanese DNA in product naming and string-manufacturing (the JS-series is still produced at Kumpoo's Japan facility). The Chinese name 薰风 (Xūnfēng) translates roughly to 'fragrant breeze' — referencing the brand's positioning of approachable but capable equipment.",
    },
  ],
  relatedLinks: [
    {
      label: "Kumpoo Shanhai NEW racket review",
      href: "/review/kumpoo-shanhai-new/",
    },
    {
      label: "Kumpoo Shura II racket review",
      href: "/review/kumpoo-shura-2/",
    },
    {
      label: "Kumpoo JS-67 string review",
      href: "/comparisons/kumpoo-js-67-string-review/",
    },
    {
      label: "Kumpoo KH-G805 Lite Pro shoes review",
      href: "/review/kumpoo-kh-g805-lite-pro/",
    },
    {
      label: "Kumpoo — the fourth credible badminton brand decoded",
      href: "/comparisons/kumpoo-fourth-major-badminton-brand-profile/",
    },
    {
      label: "Best beginner badminton rackets",
      href: "/best/beginner-rackets/",
    },
  ],
};

export default function KumpooBrandPage() {
  return <BrandPage config={config} />;
}
