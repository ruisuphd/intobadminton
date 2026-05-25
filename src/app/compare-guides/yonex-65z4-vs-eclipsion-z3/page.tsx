import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { CompareGuidePage, type CompareGuideConfig } from "@/components/CompareGuidePage";
import { defaultOgImages } from "@/lib/og";
import { reviewPath } from "@/lib/review-pages";

export const metadata: Metadata = {
  title: "Yonex 65 Z4 vs Eclipsion Z3 — Power Cushion shoes compared",
  description:
    "Yonex Power Cushion 65 Z4 vs Eclipsion Z3 — Yonex's speed-oriented Z series against the premium Eclipsion stability shoe. Fit, stability, and who buys which.",
  alternates: pageAlternates("/compare-guides/yonex-65z4-vs-eclipsion-z3/"),
  openGraph: {
    title: "Yonex 65 Z4 vs Eclipsion Z3 — Power Cushion shoes compared",
    description:
      "Yonex's speed-oriented Z series against the premium Eclipsion stability shoe.",
    url: "/compare-guides/yonex-65z4-vs-eclipsion-z3/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

const config: CompareGuideConfig = {
  slug: "yonex-65z4-vs-eclipsion-z3",
  breadcrumbLabel: "65 Z4 vs Eclipsion Z3",
  title: "Yonex Power Cushion 65 Z4 vs Eclipsion Z3",
  dek: "Two of Yonex's most-recommended court shoes. The 65 Z4 is the speed-oriented Z-series workhorse; the Eclipsion Z3 is the premium Power-Cushion stability flagship. Different jobs.",
  intro:
    "Yonex's shoe family splits cleanly between fast-and-light (65 Z series) and protective-and-stable (Eclipsion series). Choosing the right one matters more than choosing the right racket for most amateurs — shoes carry an injury and return risk that frames don't.",
  productA: {
    name: "65 Z4",
    brand: "Yonex",
    // 65 Z4 is not yet in the products catalog; link to the blog review below.
    bestFor: "Speed-leaning club play, lateral quickness",
    pricePoint: "~$130",
    specBullets: [
      "Yonex Power Cushion 65 Z series, 4th generation",
      "Fast court feel, medium-stack cushioning",
      "Standard medium-narrow Yonex fit",
      "Wide option not consistently available",
      "Most common amateur Yonex shoe pick",
    ],
  },
  productB: {
    name: "Eclipsion Z3",
    brand: "Yonex",
    productId: "yy-eclipsion-z3",
    bestFor: "High-stability play, heavier players, joint-comfort needs",
    pricePoint: "~$180",
    specBullets: [
      "Yonex SHB-Eclipsion premium Power Cushion line",
      "Higher cushioning stack, structural stability cage",
      "Standard medium fit; wide option sometimes available regionally",
      "Heavier than 65 Z4 — protective at the expense of speed",
      "Pro-tour shoe for many men's doubles players",
    ],
  },
  rows: [
    { factor: "Court feel", a: "Fast, low-profile", b: "Protective, planted", winner: "tie" },
    { factor: "Cushioning stack", a: "Medium", b: "High", winner: "b" },
    { factor: "Lateral stability", a: "Adequate", b: "Excellent", winner: "b" },
    { factor: "Weight on foot", a: "Lighter", b: "Heavier", winner: "a" },
    { factor: "Fit width (Yonex standard)", a: "Medium-narrow", b: "Medium", winner: "b" },
    { factor: "Best fit for joint-comfort flags", a: "Limited", b: "Strong recommendation", winner: "b" },
    { factor: "Best fit for fast doubles flat game", a: "Strong", b: "Adequate", winner: "a" },
    { factor: "Indicative price (USD)", a: "~$130", b: "~$180", winner: "a" },
  ],
  middleParagraph:
    "If a wide foot or joint-comfort flag (knee, ankle, heel) is part of your picture, the Eclipsion Z3 is structurally the safer choice. If you're a fast-court doubles player without joint flags, the 65 Z4 is the lighter, more recoverable shoe. Most amateurs over-buy on cushioning; some under-buy on it. The honest signal is whether your knees feel tired by the end of a session — that's usually a cushioning gap, not a racket choice.",
  whoBuysA:
    "Buy the 65 Z4 if you play fast doubles or flat-game heavy mixed, if you're under 80kg and have no joint flags, and if you specifically value the low-profile court feel for quick lateral lunges. The 65 Z4 is the right amateur default for most players who are not currently dealing with knee, ankle, or heel concerns.",
  whoBuysB:
    "Buy the Eclipsion Z3 if you weigh over 80kg, if your knees, ankles, or heels feel tired in the back half of long sessions, or if you specifically need wide-foot accommodation that Yonex doesn't reliably offer in the 65 Z series. The Eclipsion Z3 is also the right pick for heavy-tournament players whose body wears down on consecutive-day play.",
  founderNote:
    "I've worn both extensively. The 65 Z4 is great when I'm light on my feet and the court is dry; the Eclipsion Z3 is the shoe I reach for on consecutive-game tournament days. They're not interchangeable — buying the wrong one because of price or fashion has cost amateur players I've coached a real number of session-time missed to ankle and knee soreness.",
  relatedLinks: [
    { label: "Read the full 65 Z4 review", href: reviewPath("yy-power-cushion-65-z4") },
    { label: "Read the full Eclipsion Z3 review", href: reviewPath("yy-eclipsion-z3") },
    { label: "Yonex shoes overview", href: "/brands/yonex/" },
    { label: "Badminton shoe fit and stability guide", href: "/guides/shoes-footwork/" },
    { label: "Badminton vs tennis shoes — court shoe explainer", href: "/compare-guides/badminton-vs-tennis-shoes/" },
    { label: "Best badminton shoes", href: "/best/shoes/" },
  ],
};

export default function Yonex65Z4VsEclipsionZ3Page() {
  return <CompareGuidePage config={config} />;
}
