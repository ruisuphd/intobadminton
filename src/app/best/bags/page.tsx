import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/bags/",
  title: "Best Badminton Bags 2026 — Tournament & Compact Backpack",
  description:
    "Two badminton bags ranked by capacity, shoe separation, and commute workflow — Yonex Pro Tournament and Victor Compact Court Backpack.",
});

const config: BestPicksConfig = {
  slug: "bags",
  breadcrumbLabel: "Bags",
  title: "Best badminton bags (2026)",
  dek: "Bag choice is mostly workflow: how many rackets you carry, whether shoes get their own pocket, and whether you commute on foot or drive to the hall.",
  productSchemaCategory: "SportingGoods",
  intro: {
    heading: "Choose bags by session type, not logo",
    body: "If you <strong>play twice a week with one racket</strong>, a compact backpack is enough. If you <strong>string rackets, carry shoes, and need wet-kit separation</strong>, step up to a 6-racket tournament bag. Measure your commute first — an oversized bag you will not carry is worse than a tight backpack you actually use.",
  },
  picks: [
    {
      rank: 1,
      name: "Pro Tournament Bag",
      brand: "Yonex",
      priceUsd: 110,
      productId: "yy-pro-racket-bag-92429",
      bestFor: "Regular club sessions with multiple rackets and shoes",
      specs: [
        { label: "Capacity", value: "6 rackets" },
        { label: "Shoe pocket", value: "Yes" },
        { label: "Wet pocket", value: "Yes" },
      ],
      why: "Separation for shoes and wet kit is the reason to buy a tournament bag over a generic sports duffel. Six-racket capacity covers mains, backups, and a loaner without cramming frames against zippers.",
      tradeoff: "Bulky for public-transit commutes. Overkill if you only ever carry one racket.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/INT_BA92431W_031-1.jpg?v=1757097764&width=1946",
        source: "yonex",
        credit: "Image: Yonex USA (us.yonex.com)",
        alt: "Yonex Pro Tournament Racket Bag",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 2,
      name: "Compact Backpack",
      brand: "Victor",
      priceUsd: 65,
      productId: "vic-compact-backpack",
      bestFor: "Commute-light players with one or two rackets",
      specs: [
        { label: "Capacity", value: "2 rackets" },
        { label: "Shoe pocket", value: "Yes" },
        { label: "Style", value: "Backpack" },
      ],
      why: "Backpack carry beats shoulder bags on bikes and trains. Two-racket capacity plus a shoe sleeve covers most recreational sessions without the dead weight of a full tournament loadout.",
      tradeoff: "No dedicated wet compartment. Verify exact local Victor SKU before buying — regional variants differ.",
      evidenceLevel: "tested",
    },
  ],
  faqs: [
    {
      q: "How many rackets should my bag hold?",
      a: "Recreational players: 1-2. Club regulars who restring or lend frames: 3-4. Tournament or coaching days: 6+. Buy for your actual weekly load, not your aspirational kit.",
    },
    {
      q: "Do I need a separate shoe compartment?",
      a: "Yes if you walk into the hall in street shoes. Isolating court shoes keeps grit off grips and stops shoe odour soaking into overgrips and towels in the main pocket.",
    },
  ],
  ctaHeading: "Build a repeatable bag loadout",
  ctaBody: "Our bag loadout guide lists what to pack for drills vs matches — grips, shuttles, tape, and the spare items that save a session when something breaks.",
};

export default function BestBagsPage() {
  return <BestPicksPage config={config} />;
}
