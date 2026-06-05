import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { CompareGuidePage, type CompareGuideConfig } from "@/components/CompareGuidePage";
import { articleSocialMetadata } from "@/lib/og";
import { reviewPath } from "@/lib/review-pages";

const PATH = "/compare-guides/astrox-77-pro-vs-88s-pro/";

export const metadata: Metadata = {
  title: "Astrox 77 Pro vs 88S Pro 2024 — Which Fits You?",
  description:
    "Both 4U Yonex Astrox frames with slight head-heavy balance. Honest comparison of shaft hardness, swing feel, and which player each suits — by an owner of both.",
  alternates: pageAlternates(PATH),
  ...articleSocialMetadata({
    path: PATH,
    title: "Astrox 77 Pro vs 88S Pro 2024 — Which Fits You?",
    description:
      "Owner-level comparison of two Yonex Astrox frames — shaft hardness, balance, and which player each suits.",
  }),
};

const config: CompareGuideConfig = {
  slug: "astrox-77-pro-vs-88s-pro",
  breadcrumbLabel: "Astrox 77 Pro vs 88S Pro",
  title: "Astrox 77 Pro vs Astrox 88S Pro 2024",
  dek: "Both are 4U Yonex Astrox frames with slight head-heavy balance — close to even within the Astrox line. The 77 Pro is the friendliest pro-tier upgrade Yonex makes. The 88S Pro 2024 is the market's current control-balance benchmark for doubles.",
  intro:
    "Author note: I (Rui Su, Division 4 Ireland) currently use the 88S Pro 2024 as my main racket and previously played the 77 Pro for two seasons. Both are excellent. The honest gap between them is smaller than reviewers usually claim.",
  productA: {
    name: "Astrox 77 Pro",
    brand: "Yonex",
    productId: "yy-astrox-77-pro",
    bestFor: "Recreational-to-club players; mixed disciplines; shoulder comfort",
    pricePoint: "~$220",
    specBullets: [
      "4U (~83–85g)",
      "Slightly head-heavy balance",
      "Medium shaft — forgiving timing window",
      "Standard frame size",
      "Friendliest pro-tier Astrox upgrade",
    ],
  },
  productB: {
    name: "Astrox 88S Pro 2024",
    brand: "Yonex",
    productId: "yy-astrox-88s-pro-2024",
    bestFor: "Competitive club doubles; front court and mixed",
    pricePoint: "~$240",
    specBullets: [
      "4U (~84g unstrung)",
      "Slight head-heavy (~301 mm)",
      "Stiff shaft (Namd Flex Force)",
      "Slightly larger frame than 77 Pro",
      "Current control-balance doubles benchmark",
    ],
  },
  rows: [
    { factor: "Weight", a: "4U (~83–85g)", b: "4U (~84g unstrung)", winner: "tie" },
    { factor: "Balance", a: "Slightly head-heavy", b: "Slight head-heavy (~301 mm)", winner: "tie" },
    { factor: "Shaft flex", a: "Medium", b: "Stiff", winner: "a" },
    { factor: "Frame size", a: "Standard", b: "Slightly larger", winner: "b" },
    { factor: "Timing window", a: "Forgiving", b: "Demanding on mishits", winner: "a" },
    { factor: "Net / control", a: "Good", b: "Excellent (longer dwell)", winner: "b" },
    { factor: "Recovery speed", a: "Faster", b: "Slightly slower", winner: "a" },
    { factor: "Entry threshold", a: "Lower", b: "Higher", winner: "a" },
  ],
  middleParagraph:
    "The biggest functional difference is shaft hardness. The 77 Pro loads gently — you feel the bend and snap-back. The 88S Pro 2024 is meaningfully stiffer; when you load it cleanly the response is crisper, when timing slips it punishes more than the 77 Pro.",
  whoBuysA:
    "Buy the 77 Pro if you are recreational-to-club level, your overhead contact is still inconsistent, you play mixed disciplines and want one frame for everything, or you have shoulder, elbow, or wrist comfort flags.",
  whoBuysB:
    "Buy the 88S Pro 2024 if you are a competitive club or league player, your overhead timing is consistent (mishit rate under ~15%), your primary discipline is doubles (especially front court or mixed), and you want the current market benchmark for control-balance doubles.",
  founderNote:
    "If you smash from the back court as your primary attack pattern, consider the 88D Pro instead of 88S. If you switch roles or play significant front court, stay with 88S.",
  relatedLinks: [
    {
      label: "Read the full Astrox 77 Pro review",
      href: reviewPath("yy-astrox-77-pro"),
    },
    {
      label: "Read the full Astrox 88S Pro review",
      href: reviewPath("yy-astrox-88s-pro-2024"),
    },
    {
      label: "Astrox 88D Pro vs 88S Pro 2024 deep-dive",
      href: "/review/yonex-astrox-88d-pro-vs-88s-pro-2024/",
    },
    { label: "Best doubles rackets", href: "/best/doubles-rackets/" },
    { label: "Run the racket finder", href: "/quiz/" },
  ],
};

export default function Astrox77vs88SProPage() {
  return <CompareGuidePage config={config} />;
}
