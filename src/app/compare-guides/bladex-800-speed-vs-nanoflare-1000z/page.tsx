import type { Metadata } from "next";
import { CompareGuidePage, type CompareGuideConfig } from "@/components/CompareGuidePage";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Li-Ning Bladex 800 Speed vs Yonex Nanoflare 1000Z",
  description:
    "Bladex 800 Speed vs Nanoflare 1000Z — Li-Ning's speed flagship against Yonex's hexagonal speed weapon. Specs, drive feel, source-authority comparison.",
  alternates: { canonical: "/compare-guides/bladex-800-speed-vs-nanoflare-1000z/" },
  openGraph: {
    title: "Bladex 800 Speed vs Nanoflare 1000Z — Li-Ning or Yonex for speed?",
    description:
      "Speed-tier flagships compared across shaft, frame, and source authority.",
    url: "/compare-guides/bladex-800-speed-vs-nanoflare-1000z/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

const config: CompareGuideConfig = {
  slug: "bladex-800-speed-vs-nanoflare-1000z",
  breadcrumbLabel: "Bladex 800 Speed vs Nanoflare 1000Z",
  title: "Li-Ning Bladex 800 Speed vs Yonex Nanoflare 1000Z",
  dek: "Two speed-tier flagships from rival brands. The Bladex 800 Speed is Li-Ning's tough-elastic answer to the Nanoflare line; the 1000Z is Yonex's hexagonal speed weapon.",
  intro:
    "Both rackets occupy the same place in their brand hierarchy and in roughly the same price band. The decision is part feel preference, part source-authority confidence. Here's how to read them honestly.",
  productA: {
    name: "Bladex 800 Speed",
    brand: "Li-Ning",
    productId: "ln-bladex-800-speed",
    bestFor: "Tough-elastic doubles drives, fast flat exchanges",
    pricePoint: "~$200",
    specBullets: [
      "Li-Ning Bladex speed family flagship",
      "Source authority: BadmintonCN spec only — Li-Ning product-specific page not linked",
      "4U/G6 sample: ~85.2g unstrung, 90.8g w/ grip+string, balance 299mm",
      "Shaft hardness ~7.83 on YuanShi independent rig",
      "Distinct tough-elastic feel — denser than typical head-light speed frames",
    ],
  },
  productB: {
    name: "Nanoflare 1000Z",
    brand: "Yonex",
    productId: "yy-nanoflare-1000z",
    bestFor: "Doubles flat drives, defense, counter-attack",
    pricePoint: "~$289",
    specBullets: [
      "Yonex official: Extra Stiff, 4U (avg 83g) G5/G6 and 3U (avg 88g) G4/G5/G6",
      "Stringing advice: 4U 20–28 lb, 3U 21–29 lb",
      "Hexagonal frame profile — best end-speed of the Nanoflare line",
      "DR carbon for slight pocketing feel",
      "Verified against Yonex product-specific page",
    ],
  },
  rows: [
    { factor: "Source authority", a: "BadmintonCN (Li-Ning product page not linked)", b: "Yonex official product page", winner: "b" },
    { factor: "Shaft tier", a: "Stiff (~7.83 YuanShi)", b: "Extra-stiff (Yonex official)", winner: "b" },
    { factor: "Head balance (4U sample)", a: "~299mm head-light", b: "~299–304mm head-light", winner: "tie" },
    { factor: "Frame character", a: "Tough-elastic, denser feel", b: "Hexagonal, faster end-speed", winner: "tie" },
    { factor: "End-speed on drives", a: "Excellent", b: "Top-tier", winner: "b" },
    { factor: "Net flick character", a: "Slightly damped (denser frame)", b: "Sharper snapback", winner: "b" },
    { factor: "Smash floor (head-light)", a: "Demanding", b: "Demanding", winner: "tie" },
    { factor: "Indicative price (USD)", a: "~$200", b: "~$289", winner: "a" },
  ],
  middleParagraph:
    "On absolute drive speed, the Nanoflare 1000Z holds a small edge — and it's the more rigorously verified frame. The Bladex 800 Speed undercuts on price by a meaningful margin (~$90) and delivers a distinctive denser feel that some players prefer. If you're brand-curious about Li-Ning's speed line and the price gap matters, the Bladex is a legitimate alternative.",
  whoBuysA:
    "Buy the Bladex 800 Speed if you specifically want Li-Ning's tough-elastic feel — denser at contact, slightly damped on drives, sharper through smash than typical speed rackets. The price gap also matters if you're not loyal to Yonex. Accept the source-authority caveat: Li-Ning's published spec for this frame is community-sourced.",
  whoBuysB:
    "Buy the Nanoflare 1000Z if drive speed and end-speed precision are your priority, if you value Yonex's verified product-page spec, and if the $90 price premium is acceptable for the resale and warranty network advantages.",
  founderNote:
    "Bladex 800 Speed feels heavier through contact than the 1000Z despite similar listed weight — that's the tough-elastic design at work. It's a real racket and a fair-value pick at $200. The 1000Z is sharper on the drives I most often need to win points; that's why it's my doubles main.",
  relatedLinks: [
    { label: "Read the full Bladex 800 Speed review", href: "/review/ln-bladex-800-speed/" },
    { label: "Read the full Nanoflare 1000Z review", href: "/review/yy-nanoflare-1000z/" },
    { label: "Li-Ning Bladex 800 Speed deep dive", href: "/blog/li-ning-bladex-800-speed-tough-elastic/" },
    { label: "Yonex Nanoflare speed series explained", href: "/blog/yonex-nanoflare-speed-series-explained/" },
    { label: "Yonex vs Victor vs Li-Ning brand showdown", href: "/compare-guides/yonex-victor-li-ning/" },
    { label: "Best doubles badminton rackets", href: "/best/doubles-rackets/" },
  ],
};

export default function Bladex800SpeedVsNanoflare1000ZPage() {
  return <CompareGuidePage config={config} />;
}
