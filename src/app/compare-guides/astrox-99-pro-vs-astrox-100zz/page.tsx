import type { Metadata } from "next";
import { CompareGuidePage, type CompareGuideConfig } from "@/components/CompareGuidePage";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Yonex Astrox 99 Pro vs Astrox 100ZZ",
  description:
    "Astrox 99 Pro vs 100ZZ — both Yonex flagship attack frames, very different timing windows. Head balance, shaft hardness, who should buy which.",
  keywords: [
    "Astrox 99 Pro vs 100ZZ",
    "Yonex Astrox 99 Pro",
    "Yonex Astrox 100ZZ",
    "Yonex flagship attack racket",
    "Astrox 100ZZ Kurenai vs Axelsen",
    "best Yonex attack racket",
  ],
  alternates: { canonical: "/compare-guides/astrox-99-pro-vs-astrox-100zz/" },
  openGraph: {
    title: "Yonex Astrox 99 Pro vs Astrox 100ZZ — flagship attack compared",
    description:
      "Two head-heavy Yonex flagships, two different timing windows. Specs, on-court behaviour, and who each frame is for.",
    url: "/compare-guides/astrox-99-pro-vs-astrox-100zz/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

const config: CompareGuideConfig = {
  slug: "astrox-99-pro-vs-astrox-100zz",
  breadcrumbLabel: "Astrox 99 Pro vs 100ZZ",
  title: "Yonex Astrox 99 Pro vs Astrox 100ZZ: which Yonex attack flagship?",
  dek: "Two Yonex flagship attack frames — both head-heavy, both built around stiff shafts, both Yonex's pro-tour first-attack picks. The 100ZZ asks more from your timing; the 99 Pro 2 rewards a cleaner, more rotational swing pattern.",
  intro:
    "Both rackets sit at the top of Yonex's Astrox attack hierarchy. Buying decision turns on three things: how stiff a shaft your swing actually loads, whether you want the 100ZZ's smaller-frame precision or the 99 Pro's wider sweet spot, and how often you play in conditions where the heavier rotational head pays off versus costs.",
  productA: {
    name: "Astrox 99 Pro",
    brand: "Yonex",
    productId: "yy-astrox-99-pro",
    bestFor: "Rear-court singles power, smash specialists with clean technique",
    pricePoint: "~$250",
    specBullets: [
      "4U (avg 83g) / 3U (avg 88g) per Yonex official",
      "Stringing advice 4U: 20–28 lb, 3U: 21–29 lb",
      "Stiff shaft, head-heavy balance",
      "Wider sweet spot than 100ZZ — more forgiving on mis-timed contact",
      "Original Kento Momota signature DNA, second generation refines the timing window",
    ],
  },
  productB: {
    name: "Astrox 100ZZ",
    brand: "Yonex",
    productId: "yy-astrox-100zz",
    bestFor: "Elite-tier singles attackers; clean, repeatable rear-court timing",
    pricePoint: "~$280",
    specBullets: [
      "4U / 3U variants, Yonex's traditional flagship weight bands",
      "Extra-stiff shaft, narrower frame than 99 Pro",
      "Smaller sweet spot — punishes late contact",
      "Available as VA (Viktor Axelsen) and Kurenai colourways with slight hardness deltas",
      "Tour-tier frame; not a beginner's first stiff racket",
    ],
  },
  rows: [
    { factor: "Head balance", a: "Head-heavy", b: "Head-heavy", winner: "tie" },
    { factor: "Shaft flex (Yonex official)", a: "Stiff", b: "Extra Stiff", winner: "b" },
    { factor: "Frame profile", a: "Standard 99 Pro frame", b: "Narrower than 99 Pro", winner: "b" },
    { factor: "Sweet spot", a: "Wider, more forgiving", b: "Narrower, more demanding", winner: "a" },
    { factor: "Stringing range (4U, Yonex)", a: "20–28 lb", b: "20–28 lb (similar band)" },
    { factor: "Smash quality on clean contact", a: "Excellent", b: "Best-in-class precision", winner: "b" },
    { factor: "Defensive recovery", a: "Limited (head-heavy)", b: "Limited (head-heavy)", winner: "tie" },
    { factor: "Entry threshold", a: "High", b: "Higher", winner: "a" },
  ],
  middleParagraph:
    "The biggest functional difference between the two frames is the size of the timing window. The 99 Pro's slightly wider sweet spot means a mis-timed smash still produces useful pressure; the 100ZZ converts the same mishit into a flat, short clear. If your match-winning shots come from concentrated rotational power and you can repeat the contact pattern, the 100ZZ is the right tier. If you want the same DNA with one more degree of margin, the 99 Pro is the right tier.",
  whoBuysA:
    "Buy the Astrox 99 Pro if you play singles or rear-court doubles, your match-winning shot is the smash, and you want a flagship attack frame that still rewards you on slightly imperfect contact. The 99 Pro is the better default for ambitious club players and many open-division league players — it has Yonex's flagship attack character without 100ZZ's punishment for late timing. The second generation (2023) widens the window further; if you can find Gen 2 stock at retail, that is the smarter buy.",
  whoBuysB:
    "Buy the Astrox 100ZZ if you have already played a stiff Astrox cleanly for at least six months, you consistently win points from concentrated rotational power, and you specifically value the narrower frame's precision on placement. Pro-tour players use it for exactly these reasons. Most amateurs who upgrade from a friendlier frame to a 100ZZ report their smash gets shorter, not longer, because the bed cannot give back what the swing did not deliver. Earn the frame, then upgrade.",
  founderNote:
    "I've held both. The 99 Pro feels closer to the rest of the Astrox line — it still flatters a strong rotational pattern. The 100ZZ feels like an instrument: pristine when you hit clean, brittle when you don't. For most amateurs at my division and below (Div 4 IE and equivalents), the 99 Pro is more racket than they will fully use; 100ZZ is more racket than is honest to recommend.",
  relatedLinks: [
    { label: "Read the full Astrox 99 Pro review", href: "/review/yy-astrox-99-pro/" },
    { label: "Read the full Astrox 100ZZ review", href: "/review/yy-astrox-100zz/" },
    { label: "Astrox 100ZZ Axelsen VA vs Kurenai — generation breakdown", href: "/blog/yonex-astrox-100zz-axelsen-va-vs-kurenai/" },
    { label: "Astrox 77 Pro vs Astrox 88S Pro — friendlier alternatives", href: "/compare-guides/astrox-77-pro-vs-88s-pro/" },
    { label: "Yonex brand overview", href: "/brands/yonex/" },
    { label: "Best smash-heavy badminton rackets", href: "/best/smash-heavy-rackets/" },
  ],
};

export default function Astrox99ProVs100ZZPage() {
  return <CompareGuidePage config={config} />;
}
