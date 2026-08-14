import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { CompareGuidePage, type CompareGuideConfig } from "@/components/CompareGuidePage";
import { defaultOgImages } from "@/lib/og";
import { reviewPath } from "@/lib/review-pages";

export const metadata: Metadata = {
  title: "Li-Ning Halbertec 9000 Power vs AxForce 100 Gen 2",
  description:
    "Halbertec 9000 Power vs AxForce 100 Gen 2 — two Li-Ning attack flagships compared. Which is the right Li-Ning upgrade for singles smash specialists.",
  alternates: pageAlternates("/compare-guides/halbertec-9000-power-vs-axforce-100-gen-2/"),
  openGraph: {
    title: "Halbertec 9000 Power vs AxForce 100 Gen 2 — Li-Ning attack flagships compared",
    description:
      "Two Li-Ning singles attack flagships compared by frame profile, shaft feel, and amateur fit.",
    url: "/compare-guides/halbertec-9000-power-vs-axforce-100-gen-2/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

const config: CompareGuideConfig = {
  slug: "halbertec-9000-power-vs-axforce-100-gen-2",
  breadcrumbLabel: "Halbertec 9000 Power vs AxForce 100 Gen 2",
  title: "Li-Ning Halbertec 9000 Power vs AxForce 100 Gen 2",
  dek: "Two Li-Ning singles attack flagships from sibling lines. The Halbertec 9000 Power is Halbertec's most aggressive update; the AxForce 100 Gen 2 is AxForce's tour-derived attack platform. Both head-heavy, both demanding.",
  intro:
    "Most amateurs buying Li-Ning at the singles-attack tier choose between these two. The decision is between two character profiles within the same brand: Halbertec's denser composite Power build versus AxForce's sharper rotational profile.",
  productA: {
    name: "Halbertec 9000 Power",
    brand: "Li-Ning",
    productId: "ln-halbertec-9000-power",
    bestFor: "Singles attack, players upgrading from Halbertec 7000/8000",
    pricePoint: "~$220",
    specBullets: [
      "Li-Ning Halbertec family flagship attack tier",
      "BadmintonCN 4U samples: ~82.5g–84.5g unstrung (10-sample variance)",
      "Stiff shaft, head-heavy",
      "Source authority: BadmintonCN only — Li-Ning product-specific page not linked",
      "Highest entry threshold in the Halbertec line",
    ],
  },
  productB: {
    name: "AxForce 100 Gen 2",
    brand: "Li-Ning",
    productId: "ln-axforce-100-gen-2",
    bestFor: "Singles attack, AxForce-line upgrade from 90 New",
    pricePoint: "~$230",
    specBullets: [
      "Li-Ning AxForce family tour-derived attack flagship",
      "BadmintonCN 4U sample: 88.6g with underbase removed, balance 308mm",
      "Across 4 brand-new 4U samples: 83.0g, 83.9g, 84.7g, 85.1g unstrung — ~2g variance",
      "Stiff shaft, head-heavy with rotational profile",
      "Source authority: BadmintonCN only",
    ],
  },
  rows: [
    { factor: "Source authority", a: "BadmintonCN only", b: "BadmintonCN only", winner: "tie" },
    { factor: "Head balance", a: "Head-heavy (~304mm 4U)", b: "Head-heavy (~308mm 4U)", winner: "tie" },
    { factor: "Frame character", a: "Composite-Power: denser at contact", b: "Rotational-tour: sharper snap, faster recovery", winner: "tie" },
    { factor: "Sample variance (4U unstrung)", a: "82.5–84.5g across 10 samples", b: "83.0–85.1g across 4 samples", winner: "tie" },
    { factor: "Defensive bias", a: "Limited", b: "Limited (slightly more recovery)", winner: "b" },
    { factor: "First-attack smash", a: "Heavier feel at contact", b: "Cleaner rotational delivery", winner: "tie" },
    { factor: "Continuous attack stamina", a: "More demanding", b: "Marginally better", winner: "b" },
    { factor: "Indicative price (USD)", a: "~$220", b: "~$230", winner: "a" },
  ],
  middleParagraph:
    "Both rackets are amateur-honest, real attack frames; both demand conditioned rear-court timing. The Halbertec 9000 Power leans denser at the contact point — players who like a hammer feel choose it. The AxForce 100 Gen 2 leans sharper and slightly more rotational — players who prefer faster shaft snap choose it. Sample variance is real on both: weigh before stringing.",
  whoBuysA:
    "Buy the Halbertec 9000 Power if you already play Halbertec 8000 or 9000 and want the most aggressive tier of the line, if you specifically value the denser composite Power feel at contact, and if you're comfortable with BadmintonCN-sourced spec confidence. The Halbertec 9000 Power is the racket of choice for players who want Li-Ning's hammer character.",
  whoBuysB:
    "Buy the AxForce 100 Gen 2 if you want a slightly faster, more rotational attack profile, if you're moving up from AxForce 80 or 90 New within the same line, and if marginal better continuous-attack stamina matters at your level of play. The AxForce 100 Gen 2 also has a more tour-derived character if that lineage matters to you.",
  founderNote:
    "I've held both at club level. Halbertec 9000 Power and AxForce 100 Gen 2 are within a hair of each other on absolute smash; the difference is character. If you've previously played a Halbertec, you'll prefer the 9000 Power; if you've previously played AxForce, the 100 Gen 2 will feel like home. Cross-line switches inside Li-Ning are real and worth a demo before buying.",
  onCourt:
    "These are not frames I currently play. Club hits only: smash peak is close; the character is not. Halbertec 9000 Power pockets; AxForce 100 Gen 2 hits more like a stiff attack stick. Players who already like Halbertec 8000 will recognise 9000 Power. Players who already like AxForce 90 will recognise 100 Gen 2.\n\nCross-line inside Li-Ning is a real switch, not a colourway. Demo before you spend flagship money because a friend said 'Li-Ning smash'. If you do not already have a Li-Ning stringer, Yonex 77 Pro or 88S is still the lower-friction club buy in Ireland.",
  relatedLinks: [
    { label: "Read the full Halbertec 9000 Power review", href: reviewPath("ln-halbertec-9000-power") },
    { label: "Read the full AxForce 100 Gen 2 review", href: reviewPath("ln-axforce-100-gen-2") },
    { label: "Li-Ning Halbertec 8000 vs 9000 vs 9000 Power", href: "/review/li-ning-halbertec-8000-vs-9000-vs-9000-power/" },
    { label: "Li-Ning AxForce 100 Gen 2 vs 100ZZ vs 90 New", href: "/review/li-ning-axforce-100-gen-2-vs-100zz-vs-90-new/" },
    { label: "Yonex vs Victor vs Li-Ning — brand showdown", href: "/compare-guides/yonex-victor-li-ning/" },
    { label: "Best smash-heavy badminton rackets", href: "/best/smash-heavy-rackets/" },
  ],
};

export default function Halbertec9000PowerVsAxforce100Gen2Page() {
  return <CompareGuidePage config={config} />;
}
