import type { Metadata } from "next";
import { CompareGuidePage, type CompareGuideConfig } from "@/components/CompareGuidePage";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Yonex Nanoflare 1000Z vs Victor Auraspeed 99",
  description:
    "Nanoflare 1000Z vs Victor Auraspeed 99 — speed series flagships compared. Head-light feel, drive speed, and which fits men's vs women's doubles.",
  alternates: { canonical: "/compare-guides/nanoflare-1000z-vs-auraspeed-99/" },
  openGraph: {
    title: "Nanoflare 1000Z vs Auraspeed 99 — Yonex or Victor for speed?",
    description:
      "Two head-light speed flagships compared on shaft tier, frame profile, and doubles-role fit.",
    url: "/compare-guides/nanoflare-1000z-vs-auraspeed-99/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

const config: CompareGuideConfig = {
  slug: "nanoflare-1000z-vs-auraspeed-99",
  breadcrumbLabel: "Nanoflare 1000Z vs Auraspeed 99",
  title: "Yonex Nanoflare 1000Z vs Victor Auraspeed 99 (Hayabusa)",
  dek: "Two of the best speed-oriented doubles rackets on the market right now. The Nanoflare 1000Z is Yonex's hexagonal flagship; the Auraspeed 99 (Hayabusa) is Victor's most refined speed answer.",
  intro:
    "Speed rackets are less brand-loyal than attack rackets — most amateurs who try both can list real differences in 30 seconds. Frame profile, shaft tier, and drive speed all matter, and the right pick depends on whether you play more rear-court doubles attack or more front-court interception.",
  productA: {
    name: "Nanoflare 1000Z",
    brand: "Yonex",
    productId: "yy-nanoflare-1000z",
    bestFor: "Doubles flat drives, defense, counter-attack",
    pricePoint: "~$289",
    specBullets: [
      "Yonex official: Extra Stiff, 4U (avg 83g) G5/G6 and 3U (avg 88g) G4/G5/G6",
      "Stringing advice: 4U 20–28 lb, 3U 21–29 lb",
      "Hexagonal frame profile — defining feature of the 1000Z",
      "DR carbon for slight pocketing feel despite the stiff shaft",
      "Best end-speed of the Nanoflare line",
    ],
  },
  productB: {
    name: "Auraspeed 99 (Hayabusa)",
    brand: "Victor",
    productId: "vic-auraspeed-99",
    bestFor: "Fast doubles, women's doubles, flat-game specialists",
    pricePoint: "~$240",
    specBullets: [
      "Victor Auraspeed flagship speed tier",
      "Source authority: Victor product-specific page not currently linked — community-sourced",
      "4U/G5 sample: ~93.5g strung with underbase, balance ~295mm (independent measurement)",
      "6.8mm shaft at 210mm length",
      "Slightly thinner shaft than 1000Z — more flick character on net",
    ],
  },
  rows: [
    { factor: "Source authority", a: "Yonex official product page", b: "BadmintonCN-sourced (Victor product page not linked)", winner: "a" },
    { factor: "Head balance", a: "Head-light", b: "Head-light", winner: "tie" },
    { factor: "Shaft tier", a: "Extra-stiff", b: "Stiff (community report)", winner: "tie" },
    { factor: "Frame profile", a: "Hexagonal (signature)", b: "Aero standard", winner: "tie" },
    { factor: "End-speed on drives", a: "Top-tier", b: "Excellent", winner: "a" },
    { factor: "Smash power (head-light)", a: "Demanding (needs swing speed)", b: "Slightly easier to produce", winner: "b" },
    { factor: "Net flick / wrist game", a: "Sharp, with stiff shaft snap", b: "Sharper — thinner shaft flicks faster", winner: "b" },
    { factor: "Indicative price (USD)", a: "~$289", b: "~$240", winner: "b" },
  ],
  middleParagraph:
    "If your rally pattern is driven by counter-attack and end-speed on long defense, the Nanoflare 1000Z is the more decisive choice. If your value is on the net and your rallies are won by sharp flicks, the Auraspeed 99's thinner shaft can feel more rewarding in the hand. Both demand similar levels of swing fitness — these are not beginner speed rackets.",
  whoBuysA:
    "Buy the Nanoflare 1000Z if you play men's doubles or fast mixed doubles and your role is split between rear-court defense and counter-attack drives. The hexagonal frame produces real, measurable end-speed advantages on drives — and the stiff shaft snaps back fast enough that you can sustain the speed across long matches. The verified Yonex product page also gives you stronger spec confidence.",
  whoBuysB:
    "Buy the Auraspeed 99 (Hayabusa) if you play women's doubles or front-court mixed, if you value the thinner shaft's flick character on net, and if you already trust Victor's spec discipline despite the page-level source-authority gap. The 99's lower price also makes it a better value if you're upgrading from a generation-old Auraspeed.",
  founderNote:
    "I currently play the Nanoflare 1000Z as my doubles racket (4U/G5). It's extremely fast on drives, especially in defense; the timing is sharp on continuation attack. Power has to come from your swing, not from the frame — but with conditioned mechanics, this is the doubles weapon. I've held the Auraspeed 99 only briefly; the thinner shaft is noticeable and would be my pick if I played more front-court.",
  relatedLinks: [
    { label: "Read the full Nanoflare 1000Z review", href: "/review/yy-nanoflare-1000z/" },
    { label: "Read the full Auraspeed 99 Hayabusa review", href: "/review/vic-auraspeed-99/" },
    { label: "Yonex Nanoflare 700, 700 Pro, 1000Z — speed series explained", href: "/blog/yonex-nanoflare-speed-series-explained/" },
    { label: "Yonex vs Victor vs Li-Ning — brand showdown", href: "/compare-guides/yonex-victor-li-ning/" },
    { label: "Yonex Astrox vs Nanoflare", href: "/compare-guides/yonex-astrox-vs-nanoflare/" },
    { label: "Best doubles badminton rackets", href: "/best/doubles-rackets/" },
  ],
};

export default function Nanoflare1000ZVsAuraspeed99Page() {
  return <CompareGuidePage config={config} />;
}
