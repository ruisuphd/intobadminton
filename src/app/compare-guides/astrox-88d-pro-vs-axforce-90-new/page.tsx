import type { Metadata } from "next";
import { CompareGuidePage, type CompareGuideConfig } from "@/components/CompareGuidePage";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Yonex Astrox 88D Pro vs Li-Ning AxForce 90 New",
  description:
    "Astrox 88D Pro 2024 vs Li-Ning AxForce 90 New — doubles rear-court attack compared. Build, balance, and which fits men's vs mixed doubles.",
  alternates: { canonical: "/compare-guides/astrox-88d-pro-vs-axforce-90-new/" },
  openGraph: {
    title: "Astrox 88D Pro vs AxForce 90 New — doubles attack compared",
    description:
      "Yonex vs Li-Ning at the rear-court doubles attack tier. Balance, shaft hardness, and who each frame fits.",
    url: "/compare-guides/astrox-88d-pro-vs-axforce-90-new/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

const config: CompareGuideConfig = {
  slug: "astrox-88d-pro-vs-axforce-90-new",
  breadcrumbLabel: "Astrox 88D Pro vs AxForce 90 New",
  title: "Yonex Astrox 88D Pro vs Li-Ning AxForce 90 New",
  dek: "Two rear-court doubles attack flagships. The 88D Pro 2024 is Yonex's tour-tested rear-court hammer; the AxForce 90 New is Li-Ning's most aggressive answer to it.",
  intro:
    "Both rackets target the same player: men's doubles rear court, smash-heavy. They feel different in the hand and they reward different swing patterns. The honest decision is rarely brand — it is whether you swing through the contact zone (88D Pro) or stack power at the top of the stroke (AxForce 90 New).",
  productA: {
    name: "Astrox 88D Pro",
    brand: "Yonex",
    productId: "yy-astrox-88d-pro-2024",
    bestFor: "Men's doubles rear-court attack, smash specialists",
    pricePoint: "~$240",
    specBullets: [
      "2024 generation: new Namd Flex Force shaft, Power Assist Bumper, 10mm built-in T-joint",
      "4U samples: ~84g unstrung, balance 305–308mm (BadmintonCN community measurements)",
      "Stiff shaft, head-heavy",
      "Stringing advice 4U: 20–28 lb (Yonex official 88 Pro line)",
      "Pro-tour tested via Indonesian men's doubles pairs",
    ],
  },
  productB: {
    name: "AxForce 90 New",
    brand: "Li-Ning",
    productId: "ln-axforce-90-new",
    bestFor: "Men's doubles rear-court attack, ex-Halbertec players",
    pricePoint: "~$210",
    specBullets: [
      "Li-Ning AxForce attack family flagship update",
      "BadmintonCN-sourced spec, no Li-Ning product-specific page verification",
      "Stiff shaft, head-heavy",
      "Slightly heavier feel through swing path than 88D Pro",
      "Strongest in Asia-Pacific resale; thinner elsewhere",
    ],
  },
  rows: [
    { factor: "Source authority", a: "BadmintonCN spec (Yonex 88 Pro line page verified separately)", b: "BadmintonCN spec only", winner: "a" },
    { factor: "Head balance", a: "Head-heavy (~305–308mm 4U)", b: "Head-heavy (~304mm 4U)", winner: "tie" },
    { factor: "Shaft hardness (YuanShi independent rig)", a: "~7.59", b: "~7.65", winner: "tie" },
    { factor: "Swing character", a: "Cleaner rotational, faster snapback", b: "Heavier feel at contact, more dwell", winner: "tie" },
    { factor: "First-attack smash", a: "Excellent", b: "Excellent", winner: "tie" },
    { factor: "Continuous attack stamina", a: "Better (faster shaft unload)", b: "More demanding", winner: "a" },
    { factor: "Best amateur ROI", a: "More forgiving on imperfect timing", b: "Rewards conditioned rear-court timing", winner: "a" },
    { factor: "Indicative price (USD)", a: "~$240", b: "~$210", winner: "b" },
  ],
  middleParagraph:
    "If you're choosing your rear-court doubles attack racket and the 88D Pro is in budget, the lower source-authority confidence on the Li-Ning row is the real tiebreaker. IntoBadminton's source policy downgrades AxForce 90 New until Li-Ning publishes a product-specific page — that does not mean the racket is worse, but it does mean published specs are community-sourced.",
  whoBuysA:
    "Buy the Astrox 88D Pro 2024 if you play men's doubles rear-court and your match-winning shot is the smash, if you want Yonex's pro-tour-validated platform, and if you value the faster shaft snapback for continuous attack patterns. The 2024 generation specifically tightens the timing window — better than the camel-gold predecessor for amateurs who play long rallies.",
  whoBuysB:
    "Buy the AxForce 90 New if you already play Li-Ning's AxForce line, if you specifically prefer the heavier dwell-time feel at contact, or if budget pressure pushes you toward the slightly cheaper option. Li-Ning's AxForce 90 New is a real attack frame — the source-authority caveat is about Li-Ning's publishing posture, not racket quality.",
  founderNote:
    "I've hit with both at club level. The 88D Pro 2024 is the more amateur-friendly of the two — its shaft unloads faster, which protects you over long rallies. The AxForce 90 New rewards conditioned timing on first attack but punishes mid-rally fatigue harder. For most Division 3–4 amateur players I would lean 88D Pro; for league players with conditioned smash mechanics, either works.",
  relatedLinks: [
    { label: "Read the full Astrox 88D Pro 2024 review", href: "/review/yy-astrox-88d-pro-2024/" },
    { label: "Li-Ning AxForce 90 New vs AxForce 80 vs Yonex 88DP — three-way", href: "/blog/li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp/" },
    { label: "Astrox 88D Pro vs Astrox 88S Pro 2024", href: "/blog/yonex-astrox-88d-pro-vs-88s-pro-2024/" },
    { label: "Yonex vs Victor vs Li-Ning — brand showdown", href: "/compare-guides/yonex-victor-li-ning/" },
    { label: "Best doubles badminton rackets", href: "/best/doubles-rackets/" },
    { label: "Source-authority methodology", href: "/methodology/" },
  ],
};

export default function Astrox88DProVsAxforce90NewPage() {
  return <CompareGuidePage config={config} />;
}
