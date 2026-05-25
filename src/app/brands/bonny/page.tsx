import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BrandPage, type BrandPageConfig } from "@/components/BrandPage";
import { defaultOgImages } from "@/lib/og";
import { reviewPath } from "@/lib/review-pages";

export const metadata: Metadata = {
  title: "Bonny Badminton (波力) — WuQue, ZhanGui Dao, MoJun decoded",
  description:
    "Bonny's (波力) second-tier-flagship racket lines: WuQue (乌缺) family — Snake Breath, ZhanGui Dao, Xuanwu, Flagship 088 / 089 — plus MoJun, Phantom, Leisu, and Bonny shoes. Honest cross-shop against Yonex / Victor / Li-Ning.",
  alternates: pageAlternates("/brands/bonny/"),
  openGraph: {
    title:
      "Bonny Badminton Rackets, Shoes & WuQue Family Decoded — Snake Breath, ZhanGui Dao, MoJun",
    description:
      "Bonny's main racket lines mapped to playing role and skill level: WuQue family for flagship-tier players, MoJun and Phantom for attackers, Leisu for speed. Plus shoes and accessories.",
    url: "/brands/bonny/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonny (波力) Badminton — WuQue, ZhanGui Dao & MoJun Decoded",
    description:
      "Second-tier-flagship Chinese brand. WuQue family (Snake Breath, ZhanGui Dao, 088 / 089), MoJun attack, Leisu speed, and shoes — by role, level, and budget.",
  },
};

const config: BrandPageConfig = {
  slug: "bonny",
  brandName: "Bonny",
  brandNameZh: "波力",
  founded: 1982,
  hqCountry: "China",
  officialUrl: "https://www.bonny.com.cn/",
  title: "Bonny badminton: the WuQue flagship line and the rest of the catalogue, decoded",
  dek: "Bonny (波力) is the most credible second-tier-flagship Chinese brand for serious club players who want an alternative to the Yonex / Victor / Li-Ning trio. Here is how each line maps to player role, and which models are actually worth chasing.",
  intro:
    "Bonny has been making racquet sports equipment since 1982 in China. The WuQue (乌缺) family is the brand's flagship-tier work — Snake Breath, ZhanGui Dao 8888AX, Xuanwu, and the WuQue Flagship 088 / 089 models compete against mid-flagship Yonex / Victor / Li-Ning frames at a meaningful price advantage. TiGe XLab regularly covers Bonny flagships in BadmintonCN editorial reviews. The catalogue is small relative to the mainstream trio, but the build quality has reached flagship-adjacent levels.",
  positioning:
    "Bonny's racket lines split by playing intent. WuQue (乌缺) is the flagship-tier family with multiple sub-products targeting different attack identities. MoJun (魔君) is the high-end attack pick positioned against Yonex Arcsaber 11 Pro. Phantom (幻影) covers value-tier attack. Leisu (雷速) is the speed-attack pick. Shoes ship under sub-line names like Future Land (Polaris), WuQue 1982 Y3K, Carbon Armour, and Wind Shadow (风影).",
  lines: [
    {
      name: "WuQue (乌缺) — flagship-tier family",
      bestFor: "Serious club competitive players wanting an alternative to mainstream-trio flagships",
      description:
        "Bonny's flagship-tier umbrella covering multiple sub-products. Snake Breath (蛇之呼吸) is TiGe XLab's 'year's best second-tier flagship' pick with a distinctive G6 handle; ZhanGui Dao 8888AX 紫炎 Ultra (斩鬼刀) is the Demon Slayer-themed heavy-attack pick; Xuanwu (玄武) is a niche curiosity-series flagship; Flagship 088 / 089 are the line's controlled-attack identity frames competitive with Halbertec 9000 and Arcsaber 11 Pro. Source reviewers consistently report flagship-grade build quality across the family.",
      signatureModels: [
        "WuQue Snake Breath (蛇之呼吸)",
        "WuQue ZhanGui Dao 8888AX Ultra (斩鬼刀)",
        "WuQue Xuanwu (玄武)",
        "WuQue Flagship 088",
        "WuQue Flagship 089",
      ],
    },
    {
      name: "MoJun (魔君) — high-end attack",
      bestFor: "Singles attackers wanting controlled-attack feel at a price below mainstream flagships",
      description:
        "Bonny's positioning against Yonex Arcsaber 11 Pro. Head-heavy, medium-stiff shaft, designed for established attackers who want flagship feel without paying mainstream-trio prices. Source reviewers (BadmintonCN) position it as a credible-but-second-tier alternative — competitive on platform identity, behind on resale / retail liquidity.",
      signatureModels: ["MoJun (魔君)"],
    },
    {
      name: "Phantom (幻影) and Leisu (雷速) — value attack and speed",
      bestFor: "Budget-conscious doubles players wanting attack or speed identity at value-tier pricing",
      description:
        "Phantom 88 (幻影 88) is the 'very yellow very violent' value attack pick; Leisu 800 (雷速 800) is the speed-attack value pick. Both deliver real Bonny attack feel at sub-flagship pricing — sensible picks for first-year club doubles attackers building shaft load.",
      signatureModels: [
        "Phantom 88 (幻影 88)",
        "Phantom 100 (幻影 100)",
        "Leisu 800 (雷速 800)",
      ],
    },
    {
      name: "Bonny shoes — Future Land, WuQue 1982 Y3K, Carbon Armour, Wind Shadow",
      bestFor: "Court shoe alternatives to Yonex 65 Z series at lower price",
      description:
        "Future Land 3 (Polaris) is the all-round court pick; WuQue 1982 Y3K is a 'cyberpunk' themed mid-tier shoe; Carbon Armour delivers stability-first court protection; Wind Shadow (风影) is the 'hundred-yuan speed king' budget pick. Sizing runs differently from Yonex / Victor; in-store fit recommended.",
      signatureModels: [
        "Future Land 3 (Polaris / 极星)",
        "WuQue 1982 Y3K",
        "Carbon Armour (碳装甲)",
        "Wind Shadow (风影)",
      ],
    },
  ],
  topPicks: [
    {
      name: "Bonny WuQue Snake Breath",
      line: "WuQue (lower-flagship)",
      bestFor: "Year's-best second-tier flagship pick; smaller-hand G6 handle",
      priceUsd: 145,
      href: reviewPath("bonny-snake-breath"),
    },
    {
      name: "Bonny WuQue Flagship 088",
      line: "WuQue (flagship tier shoes)",
      bestFor: "Court shoe in the WuQue flagship line",
      priceUsd: 110,
      href: reviewPath("bonny-wuque-flagship-088"),
    },
    {
      name: "Bonny MoJun",
      line: "MoJun",
      bestFor: "Arcsaber 11 Pro alternative",
      priceUsd: 155,
      href: "/review/bonny-mojun-vs-arcsaber-11-pro-attack-racket-review/",
    },
    {
      name: "Bonny Leisu 800",
      line: "Leisu",
      bestFor: "Doubles speed value pick",
      priceUsd: 95,
      href: reviewPath("bonny-leisu-800"),
    },
  ],
  faqs: [
    {
      q: "Is Bonny a legitimate flagship-tier brand or just a budget knockoff?",
      a: "Legitimate second-tier brand. Bonny has been making racquet sports equipment since 1982 in China. The WuQue family has reached build-quality and flagship-feel parity with mid-flagship Yonex / Victor / Li-Ning rackets according to BadmintonCN community measurements (chengzhen individual-unit data). The gap to mainstream-trio flagships is now smaller than the brand-recognition gap suggests — but resale liquidity and retail availability outside China are real limitations.",
    },
    {
      q: "Snake Breath, ZhanGui Dao, 088, 089 — which WuQue should I actually buy?",
      a: "By buyer profile: Snake Breath if you have smaller hands and the G6 handle is a feature (the line's signature ergonomic decision). ZhanGui Dao 8888AX Ultra if you want themed heavy-attack and the Demon Slayer styling appeals. Flagship 089 is the controlled-attack pick most worth chasing — it competes against the Halbertec 9000 honestly. Flagship 088 is the all-round / mixed-format pick. Xuanwu is a niche curiosity — only if you specifically want a niche WuQue variant.",
    },
    {
      q: "How does Bonny compare to Yonex, Victor, and Li-Ning?",
      a: "Bonny competes credibly at the mid-flagship tier (matching e.g. Halbertec 8000 / 9000 or Arcsaber 11 Pro at a meaningfully lower price) but does not yet have a true peak-flagship release equivalent to the Astrox 100ZZ, Auraspeed 99 J, or AxForce 100 Gen 2. For mid-flagship buyers cross-shopping outside the mainstream trio, Bonny is the most credible candidate. For absolute peak-tier flagship buyers, stay with the trio.",
    },
    {
      q: "Where can I buy Bonny rackets outside China?",
      a: "Distribution is concentrated in mainland China and Southeast Asia. Singapore and Hong Kong have authorized resellers. North American and European availability is thin — typically only through small specialty importers. If you want a Bonny WuQue but cannot find a local stockist, expect to import from a Chinese or SE Asian retailer.",
    },
    {
      q: "Is the G6 handle on the WuQue Snake Breath a problem?",
      a: "Only if your hand fits G5 well. G6 is roughly 4mm thinner than G5 in circumference; this is enough to feel uncomfortable for adult male hands typically sized for G5. Smaller hands — typically female players, junior-to-adult-transition players, and adult males with hand circumference toward the smaller end of the population distribution — will find G6 measurably easier to track. Try in-hand before committing.",
    },
  ],
  relatedLinks: [
    {
      label: "Bonny Snake Breath review (TiGe XLab attributed)",
      href: reviewPath("bonny-snake-breath"),
    },
    {
      label: "Bonny ZhanGui Dao 8888AX Ultra review",
      href: "/review/bonny-zhangui-dao-8888ax-ultra-review/",
    },
    {
      label: "Bonny MoJun vs Arcsaber 11 Pro attack review",
      href: "/review/bonny-mojun-vs-arcsaber-11-pro-attack-racket-review/",
    },
    {
      label: "Bonny Leisu 800 review",
      href: reviewPath("bonny-leisu-800"),
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

export default function BonnyBrandPage() {
  return <BrandPage config={config} />;
}
