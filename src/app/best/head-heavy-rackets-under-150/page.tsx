import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Head-Heavy Badminton Rackets Under $150 (2026)",
  description:
    "Six head-heavy attack rackets under $150 for club rear-court play — Astrox 100 Game, Nextage, Thruster HWQL, Voltric 8DG, and value frames with verified specs.",
  alternates: pageAlternates("/best/head-heavy-rackets-under-150/"),
};

const config: BestPicksConfig = {
  slug: "head-heavy-rackets-under-150",
  breadcrumbLabel: "Head-heavy under $150",
  title: "Best head-heavy rackets under $150 (2026)",
  dek: "Attack balance without flagship pricing — six head-heavy frames for club rear-court players who want smash mass on a budget.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "Head-heavy on a budget",
    body: "Head-heavy rackets under $150 are where brands park <strong>game-tier Astrox and Thruster lines</strong> — real attack balance, softer shafts, and less recovery speed than $250+ flagships. That trade-off is often ideal for club doubles: you get rear-court punch without extra-stiff punishment. If you already own a 100ZZ and want a backup, look here; if you want maximum smash ceiling, see our smash-heavy guide instead.",
  },
  picks: [
    {
      rank: 1,
      name: "Astrox 100 Game",
      brand: "Yonex",
      priceUsd: 130,
      productId: "yy-astrox-100-game",
      bestFor: "Yonex attack geometry on a budget",
      specs: [
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "4U" },
      ],
      why: "Shares Astrox head-heavy DNA at game-tier pricing — enough mass for clears and smashes without ZZ-level stiffness demands.",
      tradeoff: "Less repulsion and finesse than Astrox 100ZZ; upgrade path is clear if timing improves.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Astrox Nextage",
      brand: "Yonex",
      priceUsd: 130,
      productId: "yy-astrox-nextage",
      bestFor: "Forgiving attack frame",
      specs: [
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "4U / 5U" },
      ],
      why: "Softer shaft than Game for players still building smash timing — popular club doubles backup when a stiff flagship feels dead.",
      tradeoff: "Flat-drive speed trails even-balance DriveX frames for front-court specialists.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Thruster HWQL Light",
      brand: "Victor",
      priceUsd: 130,
      productId: "vic-thruster-hwql",
      bestFor: "Victor head-heavy value",
      specs: [
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "4U" },
      ],
      why: "Victor's accessible Thruster line — head mass for rear court without Jetspeed stiffness. Good pairing when your doubles partner plays even balance.",
      tradeoff: "Resale outside Asia is weaker than Yonex Astrox game lines.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Voltric 8DG",
      brand: "Yonex",
      priceUsd: 129,
      productId: "yy-voltric-8dg",
      bestFor: "Classic Voltric smash feel",
      specs: [
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium-stiff" },
        { label: "Weight", value: "4U" },
      ],
      why: "Older Voltric head-heavy template still relevant for players who want a denser smash sensation than modern Nanoflare speed frames.",
      tradeoff: "Not as quick in flat exchanges as current Astrox Game / Nextage.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "FZ 88D Power Purple",
      brand: "Victor",
      priceUsd: 115,
      productId: "vic-fz-88d-power-purple",
      bestFor: "Sub-$120 Victor attack",
      specs: [
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "4U" },
      ],
      why: "Victor power geometry under flagship pricing — workable club rear-court frame when Astrox game stock is unavailable.",
      tradeoff: "Specs verification tier varies — confirm weight class with your retailer.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Shura II",
      brand: "Kumpoo",
      priceUsd: 140,
      productId: "kumpoo-shura-2",
      bestFor: "Value head-heavy experiment",
      specs: [
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "4U" },
      ],
      why: "Head-heavy Kumpoo line for players testing attack balance before committing to Yonex/Victor resale ecosystems.",
      tradeoff: "Slightly above $130 MSRP in some markets — included because it is a common import SKU.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "How is this different from smash-heavy rackets?",
      a: "Smash-heavy covers flagship attack frames regardless of price. This page only lists head-heavy options under $150 for budget rear-court discovery.",
    },
    {
      q: "Should beginners start head-heavy?",
      a: "Usually no — even-balance or head-light frames forgive timing gaps. Use our beginner rackets guide unless you are a tall rear-court player with coaching.",
    },
  ],
  ctaHeading: "See which attack frame fits your profile",
  ctaBody:
    "The finder scores head-heavy and even-balance rows against your level, discipline, and shoulder comfort signals.",
};

export default function HeadHeavyUnder150Page() {
  return <BestPicksPage config={config} />;
}
