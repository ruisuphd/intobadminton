import type { Metadata } from "next";
import { BrandPage, type BrandPageConfig } from "@/components/BrandPage";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Li-Ning Badminton — AxForce, BladeX, Halbertec",
  description:
    "Li-Ning's racket lines decoded: AxForce (attack), BladeX (speed), Halbertec (technical), Aeronaut (control) — plus shoes and L-series strings.",
  keywords: [
    "Li-Ning",
    "Li-Ning badminton",
    "Lining badminton",
    "Li-Ning AxForce",
    "Li-Ning BladeX",
    "Li-Ning Halbertec",
    "Li-Ning Aeronaut",
    "Li-Ning Tectonic",
    "Li-Ning No.1 string",
    "best Li-Ning racket",
    "AxForce 90 New",
    "AxForce 100 Gen 2",
    "Halbertec 8000",
    "Halbertec 9000",
    "Halbertec 9000 Power",
    "BladeX 800 Speed",
    "BladeX 800 New",
    "战戟 8000",
    "雷霆 90",
    "锋影 800",
  ],
  alternates: { canonical: "/brands/li-ning/" },
  openGraph: {
    title: "Li-Ning Badminton — AxForce, BladeX, Halbertec & Aeronaut Decoded",
    description:
      "AxForce (Thunder, attack), BladeX (Sunrise, speed), Halbertec (Tectonic, technical), Aeronaut. Chinese national-team frames, decoded by role with source-verification status.",
    url: "/brands/li-ning/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Li-Ning Badminton — AxForce, BladeX, Halbertec & Aeronaut",
    description:
      "Chinese national-team brand decoded — AxForce, BladeX, Halbertec, Aeronaut by role and skill level.",
  },
};

const config: BrandPageConfig = {
  slug: "li-ning",
  brandName: "Li-Ning",
  brandNameZh: "李宁",
  founded: 1990,
  hqCountry: "China",
  officialUrl: "https://lining.com/",
  title: "Li-Ning badminton: AxForce, BladeX, Halbertec & Aeronaut decoded",
  dek: "AxForce for power, BladeX for speed, Halbertec for technical attack, and Aeronaut for control. Li-Ning rows currently need product-page verification before their specs should be treated as manufacturer-confirmed.",
  intro:
    "Li-Ning was founded by Chinese Olympic gymnast Li Ning — he began the company in 1989 and the modern Li-Ning brand was officially incorporated in 1990, so you'll see both years cited in different sources. Its badminton catalogue includes AxForce, BladeX, Halbertec, Aeronaut, and Tectonic families, but IntoBadminton marks model specs as needing review unless an official product-specific source is attached.",
  positioning:
    "Li-Ning's racket lines split by attack mode rather than by tier. AxForce is generally positioned around attack, BladeX around speed, Halbertec around technical attack, Aeronaut around control, and Tectonic around power-control. Check the exact model row before relying on any spec.",
  lines: [
    {
      name: "AxForce — head-heavy attack flagship",
      bestFor: "Singles smashers, rear-court doubles attackers",
      description:
        "Li-Ning's modern attack flagship. AxForce 90 Tiger and AxForce 100 are the marquee picks. Stiff shaft, head-heavy balance, dense string-bed for high-tension stringing. Comparable in role to Yonex Astrox 99 Pro but typically $30-50 cheaper. Reward proper smash technique; punish late contact like any premium attack frame.",
      signatureModels: [
        "AxForce 100",
        "AxForce 90 Tiger / Dragon",
        "AxForce 80",
        "AxForce 70",
      ],
    },
    {
      name: "BladeX — even-balance speed",
      bestFor: "Doubles drives, fast singles, all-court",
      description:
        "Li-Ning's speed-flagship line. BladeX 900 Sun is the doubles pro pick (Wang Zhiyi's frame); BladeX 800 is the slightly more balanced sibling. Fast through air, generous sweet spot, tuned for repulsion-heavy drives. Often the best Li-Ning recommendation for an intermediate doubles player who wants pace without giving up control.",
      signatureModels: [
        "BladeX 900 Sun",
        "BladeX 900 Moon",
        "BladeX 800",
        "BladeX 700",
      ],
    },
    {
      name: "Halbertec — technical attack",
      bestFor: "Singles attackers who want a control-tilt",
      description:
        "The line built around Chen Long and (originally) Lin Dan-style attacking control. Stiff shaft like AxForce, but with a slightly more even balance for repeatable clears and drops. Halbertec 9000 and 8000 are the modern flagships. Good pick if AxForce feels too aggressively head-heavy.",
      signatureModels: ["Halbertec 9000", "Halbertec 8000", "Halbertec 7000"],
    },
    {
      name: "Aeronaut — aerodynamic control",
      bestFor: "All-court technicians, defenders",
      description:
        "Li-Ning's control-line equivalent. Aerodynamic frame, even balance, medium-flex shaft. Aeronaut 9000 and 7000 are popular with players who want Yonex Arcsaber-style control with Li-Ning pricing. Less marketed than AxForce but worth considering for a club player who values placement over power.",
      signatureModels: ["Aeronaut 9000", "Aeronaut 7000", "Aeronaut 6000"],
    },
    {
      name: "Tectonic / 战戟 / Thunder — doubles & power-control",
      bestFor: "Doubles, recreational power players",
      description:
        "Tectonic and the Thunder/Zhanji lines (战戟, including 9000 Power) sit between AxForce and BladeX. Mid-stiffness, medium-head-heavy, often a good first 'attack-leaning' frame for an intermediate club player who is not ready for AxForce's stiffness.",
      signatureModels: [
        "Zhanji 9000 Power",
        "Zhanji 8000",
        "Tectonic 7",
        "Thunder 80 / 90",
      ],
    },
    {
      name: "Strings & Shoes — No.1, No.5, L69, Ranger",
      bestFor: "Most setups",
      description:
        "Li-Ning No.1 is a BG65 alternative for durability-first club play. No.5 is the BG80 alternative for crisper feel. L69 is a popular all-rounder. On shoes, the Ranger and Ultra series are excellent stability shoes; widely used inside China and increasingly available globally.",
      signatureModels: ["Li-Ning No.1", "Li-Ning No.5", "L69", "Ranger TD"],
    },
  ],
  topPicks: [
    {
      name: "Li-Ning BladeX 900 Sun",
      line: "BladeX",
      bestFor: "Doubles speed-control flagship",
      priceUsd: 230,
      href: "/best/doubles-rackets/",
    },
    {
      name: "Li-Ning AxForce 90 Tiger",
      line: "AxForce",
      bestFor: "Singles smasher",
      priceUsd: 235,
      href: "/best/smash-heavy-rackets/",
    },
    {
      name: "Li-Ning Halbertec 8000",
      line: "Halbertec",
      bestFor: "Technical attacker",
      priceUsd: 195,
      href: "/best/intermediate-rackets/",
    },
    {
      name: "Li-Ning No.1 string",
      line: "Strings",
      bestFor: "Durable club-play default",
      priceUsd: 12,
      href: "/best/strings/",
    },
  ],
  faqs: [
    {
      q: "Is Li-Ning as good as Yonex?",
      a: "On raw racket performance — yes, often. Modern AxForce and BladeX flagships match Yonex Astrox and Nanoflare on smash power and swing speed at lower prices. Where Li-Ning still trails Yonex is global distribution outside Asia and resale liquidity (used Li-Ning sells slower than used Yonex). If you can buy locally and you don't plan to resell, Li-Ning is one of the best values in badminton.",
    },
    {
      q: "AxForce vs BladeX — which Li-Ning line should I pick?",
      a: "AxForce if your game is rear-court smashing — stiff shaft, head-heavy, built for power. BladeX if your game is doubles drives, fast singles, or all-court — even balance, fast through air, generous sweet spot. Most amateurs do better in BladeX than they expect because AxForce's stiffness punishes mishits hard.",
    },
    {
      q: "Is Li-Ning legit, or are these counterfeits?",
      a: "Li-Ning is a major listed Chinese brand; the rackets are absolutely legitimate. The catch is supply: outside China, Li-Ning is often sold by smaller importers, and counterfeits do exist on grey-market marketplaces. Buy from authorised regional distributors (or large reputable shops like BadmintonBay, BadmintonAvenue, Li-Ning Singapore official store) and you'll get the real frame.",
    },
    {
      q: "Are Li-Ning rackets good for beginners?",
      a: "The flagship lines (AxForce, Halbertec) are not — too stiff, too unforgiving. But Li-Ning's lower-tier and Tectonic/Zhanji lines are excellent for ambitious club beginners — Zhanji 9000 Power and Tectonic 7 are forgiving enough to learn on while teaching proper attack technique. Skip AxForce until your contact point is reliable.",
    },
    {
      q: "What's the difference between Li-Ning and Kason?",
      a: "Kason is a Chinese badminton brand that Li-Ning acquired. Today Kason runs as Li-Ning's value sub-brand inside China, with overlapping factory standards but more entry-tier pricing. If you see a Kason racket that looks like a Li-Ning model with a different paint job, that's intentional.",
    },
  ],
  relatedLinks: [
    {
      label: "Spot fake Li-Ning rackets — authenticity check",
      href: "/guides/equipment-authenticity/",
    },
    {
      label: "Yonex vs Victor vs Li-Ning — brand showdown",
      href: "/compare-guides/yonex-victor-li-ning/",
    },
    {
      label: "Best smash-heavy badminton rackets",
      href: "/best/smash-heavy-rackets/",
    },
    {
      label: "Best intermediate badminton rackets",
      href: "/best/intermediate-rackets/",
    },
    {
      label: "Best badminton strings",
      href: "/best/strings/",
    },
  ],
};

export default function LiNingBrandPage() {
  return <BrandPage config={config} />;
}
