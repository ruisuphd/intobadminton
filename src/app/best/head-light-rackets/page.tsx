import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/head-light-rackets/",
  title: "Best Head-Light Badminton Rackets 2026",
  description:
    "Six head-light badminton rackets for net control, defensive recovery, and fast flat drives — Nanoflare 1000Z, Auraspeed HS Plus, DriveX 9X B.",
});

const config: BestPicksConfig = {
  slug: "head-light-rackets",
  breadcrumbLabel: "Head-light rackets",
  title: "Best head-light badminton rackets (2026)",
  dek: "Head-light frames trade smash mass for recovery — six picks for net players, defensive specialists, and doubles front-court roles.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "When head-light is the right geometry",
    body: "Head-light balance (typically &lt;285mm) shifts swing weight toward the handle. That makes <strong>net kills, blocks, and flat drives</strong> faster to recover from — but rear-court smashes need more active wrist and shoulder loading. Pick head-light when your points are won at the tape or in flat exchanges, not when your match-winner is a rear-court jump smash. Pair with <strong>medium or stiff shaft</strong> if you want crisp drives; hi-flex if you are still building timing.",
  },
  picks: [
    {
      rank: 1,
      name: "Nanoflare 1000Z",
      brand: "Yonex",
      priceUsd: 280,
      productId: "yy-nanoflare-1000z",
      bestFor: "Flagship head-light speed",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Extra stiff" },
      ],
      why: "Yonex's stiffest Nanoflare platform — maximum flat-drive speed and defensive reflexes. The reference head-light frame for advanced doubles front court and speed-first singles.",
      tradeoff: "Extra-stiff shaft punishes off-centre contact — not a beginner frame.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Auraspeed HS Plus",
      brand: "Victor",
      priceUsd: 220,
      productId: "vic-auraspeed-hs-plus",
      bestFor: "Large-frame head-light drives",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Victor's signature large-frame speed racket — stable on flat drives with more forgiveness than the 1000Z stiff platform. Strong doubles front-court choice.",
      tradeoff: "Large frame slightly slower on the fastest net reflexes versus compact speed frames.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Auraspeed Fantome (影刃)",
      brand: "Victor",
      priceUsd: 195,
      productId: "vic-auraspeed-fantome",
      bestFor: "Club head-light all-court",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Compact head-light Victor line for club doubles and mixed — stiff shaft keeps drives crisp while recovery stays quick.",
      tradeoff: "Less top-end drive speed than HS Plus or 1000Z — upgrade when contact is consistent.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Nanoflare 800 Pro (2024)",
      brand: "Yonex",
      priceUsd: 240,
      productId: "yy-nanoflare-800-pro-2024",
      bestFor: "Head-light defensive recovery",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Designed for fast-flat doubles exchanges and defensive recovery. Stiff shaft rewards clean drives and quick block returns.",
      tradeoff: "Less rear-court power than even-balance Arcsaber lines — pick by role.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Bladex 800 Speed",
      brand: "Li-Ning",
      priceUsd: 160,
      productId: "ln-bladex-800-speed",
      bestFor: "Value head-light speed",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Li-Ning speed geometry at a mid-tier price — credible head-light option for club players testing net-first or front-court doubles roles.",
      tradeoff: "Build consistency varies by batch — inspect grip and frame alignment on delivery.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Nanoray Light 70i",
      brand: "Yonex",
      priceUsd: 99,
      productId: "yy-nanoray-light-70i",
      bestFor: "Budget head-light intro",
      specs: [
        { label: "Weight", value: "7.0i (~70g)" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Hi-flex" },
      ],
      why: "Entry Nanoray head-light template for players learning net-first geometry without flagship pricing. Hi-flex shaft forgives timing while you build contact quality.",
      tradeoff: "Outgrown quickly by competitive players — treat as a learning frame, not a destination racket.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Are head-light rackets easier on the shoulder?",
      a: "Usually yes for net and drive-heavy games because recovery is faster. But a stiff head-light frame can still feel harsh if you force rear-court smashes. Flex and tension matter as much as balance point.",
    },
    {
      q: "Head-light vs 5U — which is lighter?",
      a: "They measure different things. 5U is total weight (75–79g); head-light is where that mass sits. A 4U head-light frame can feel quicker at the net than a 5U head-heavy junior frame.",
    },
    {
      q: "Can rear-court players use head-light rackets?",
      a: "Only if your winners come from placement and steep angle rather than raw mass. Most rear-court specialists want even or head-heavy balance. See our smash-heavy guide if power is the goal.",
    },
  ],
  ctaHeading: "Match balance to your court role",
  ctaBody:
    "The finder scores head-light, even, and head-heavy frames against your discipline, style, and comfort flags — so you do not buy speed geometry when you need smash mass.",
};

export default function HeadLightRacketsPage() {
  return <BestPicksPage config={config} />;
}
