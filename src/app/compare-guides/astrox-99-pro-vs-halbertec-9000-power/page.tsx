import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { CompareGuidePage, type CompareGuideConfig } from "@/components/CompareGuidePage";
import { defaultOgImages } from "@/lib/og";
import { reviewPath } from "@/lib/review-pages";

export const metadata: Metadata = {
  title: "Yonex Astrox 99 Pro vs Li-Ning Halbertec 9000 Power",
  description:
    "Yonex Astrox 99 Pro vs Li-Ning Halbertec 9000 Power — two singles attack flagships from rival brands. Which to pick based on shaft tier, build feel, and resale.",
  alternates: pageAlternates("/compare-guides/astrox-99-pro-vs-halbertec-9000-power/"),
  openGraph: {
    title: "Astrox 99 Pro vs Halbertec 9000 Power — Yonex or Li-Ning for singles attack?",
    description:
      "Two rival flagships compared on shaft tier, build feel, source authority, and amateur resale liquidity.",
    url: "/compare-guides/astrox-99-pro-vs-halbertec-9000-power/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

const config: CompareGuideConfig = {
  slug: "astrox-99-pro-vs-halbertec-9000-power",
  breadcrumbLabel: "Astrox 99 Pro vs Halbertec 9000 Power",
  title: "Yonex Astrox 99 Pro vs Li-Ning Halbertec 9000 Power",
  dek: "Two singles attack flagships from rival brands. The Astrox 99 Pro has the cleaner published spec trail; the Halbertec 9000 Power is the brand's most aggressive Power-frame answer to it. Here's how to pick.",
  intro:
    "Most amateur players choose between these on price or brand loyalty. Both are wrong defaults. The honest decision turns on two things: whether you trust your hand on a stiff shaft, and whether you place value on Yonex's globally resold liquidity versus Li-Ning's slightly more aggressive feel on first contact.",
  productA: {
    name: "Astrox 99 Pro",
    brand: "Yonex",
    productId: "yy-astrox-99-pro",
    bestFor: "Rear-court singles smash specialists",
    pricePoint: "~$250",
    specBullets: [
      "Stiff shaft, head-heavy balance (Yonex official)",
      "4U: 20–28 lb, 3U: 21–29 lb stringing advice (Yonex)",
      "Kento Momota signature DNA",
      "Verified against Yonex official product page",
      "Strong global resale liquidity",
    ],
  },
  productB: {
    name: "Halbertec 9000 Power",
    brand: "Li-Ning",
    productId: "ln-halbertec-9000-power",
    bestFor: "Singles attack, players upgrading from Halbertec 7000/8000",
    pricePoint: "~$220",
    specBullets: [
      "Li-Ning's flagship Halbertec attack tier — most aggressive of the family",
      "BadmintonCN-sourced spec: heavier feel through swing path",
      "Specs not currently verified against a Li-Ning product-specific page",
      "Higher entry threshold than Halbertec 8000/9000",
      "Resale weaker outside Asia",
    ],
  },
  rows: [
    { factor: "Source authority", a: "Yonex official product page", b: "BadmintonCN measurements only", winner: "a" },
    { factor: "Shaft tier", a: "Stiff (Yonex official)", b: "Stiff (community report)", winner: "tie" },
    { factor: "Head balance", a: "Head-heavy", b: "Head-heavy", winner: "tie" },
    { factor: "Frame character", a: "Classic Astrox: clean, rotational", b: "Halbertec Power: denser, sharper first contact", winner: "tie" },
    { factor: "Smash absolute", a: "Top-tier", b: "Top-tier, marginally heavier feel", winner: "tie" },
    { factor: "Defensive recovery", a: "Limited", b: "Limited", winner: "tie" },
    { factor: "Resale liquidity (global)", a: "Strong", b: "Strong in Asia, thin elsewhere", winner: "a" },
    { factor: "Indicative price (USD)", a: "~$250", b: "~$220", winner: "b" },
  ],
  middleParagraph:
    "IntoBadminton's source-authority discipline downgrades Li-Ning racket rows where no product-specific official page exists. The Halbertec 9000 Power is one such row: BadmintonCN reports the spec, but Li-Ning's global page lists it generically. The Astrox 99 Pro is verified against Yonex's product-specific page. If you value the safety of a manufacturer-verified spec — and the wider warranty and reseller network that usually comes with it — the Astrox is the lower-risk pick.",
  whoBuysA:
    "Buy the Astrox 99 Pro if source authority and resale matter, if your match-winning shot is smash, and if you want a flagship that's been validated against the manufacturer's own published spec. The wider distribution network also matters if you live somewhere with thin Li-Ning support — restringing tension recommendations, warranty claims, and replacement grommets are all easier on a globally distributed Yonex.",
  whoBuysB:
    "Buy the Halbertec 9000 Power if you already play Li-Ning's Halbertec line and want the most aggressive tier of it, if you value the slightly sharper first-contact feel, and if you're comfortable buying a frame whose spec is community-sourced rather than manufacturer-verified. The 9000 Power is a real instrument; the source-authority caveat is about confidence in the published numbers, not the racket itself.",
  founderNote:
    "I've hit with both in club sessions. On a clean smash they trade blows; the Halbertec feels marginally heavier through contact, which some players prefer. The decision rarely turns on the racket — it turns on what your local stringer is familiar with and whether you can get the right grommets when you need them.",
  onCourt:
    "Neither of these is my current doubles racket (that is 1000 Z). The club-session takeaway: 99 Pro still feels like Astrox — rotational smash, familiar Yonex sweet spot. Halbertec 9000 Power feels a touch heavier through contact, which some smash-first players like and which I do not need in my doubles role.\n\nIf your stringer already knows Yonex grommets and BG80, 99 Pro is the lower-friction buy. If your shop is Li-Ning and you want pocketing on the smash, 9000 Power is the demo. Do not pick 9000 Power to 'be different' from Astrox; pick it because your contact already likes a heavier pocket.",
  relatedLinks: [
    { label: "Read the full Astrox 99 Pro review", href: reviewPath("yy-astrox-99-pro") },
    { label: "Read the full Halbertec 9000 Power review", href: reviewPath("ln-halbertec-9000-power") },
    { label: "Li-Ning Halbertec 8000 vs 9000 vs 9000 Power — full Halbertec line", href: "/review/li-ning-halbertec-8000-vs-9000-vs-9000-power/" },
    { label: "Yonex vs Victor vs Li-Ning — brand showdown", href: "/compare-guides/yonex-victor-li-ning/" },
    { label: "Best smash-heavy badminton rackets", href: "/best/smash-heavy-rackets/" },
    { label: "Source-authority methodology", href: "/methodology/" },
  ],
};

export default function Astrox99ProVsHalbertec9000PowerPage() {
  return <CompareGuidePage config={config} />;
}
