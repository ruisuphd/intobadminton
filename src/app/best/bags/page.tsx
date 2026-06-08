import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/bags/",
  title: "Best Badminton Bags 2026 — Yonex Tournament & Victor Backpack",
  description:
    "Two badminton bags ranked by capacity, compartment design, and commute workflow — Yonex Pro Tournament Racket Bag and Victor Compact Court Backpack.",
});

const config: BestPicksConfig = {
  slug: "bags",
  breadcrumbLabel: "Bags",
  title: "Best badminton bags (2026)",
  dek: "Bag choice is workflow, not fashion. Two picks ranked by what they actually do — racket capacity, shoe and wet-kit separation, and whether you commute light or haul a full club night.",
  productSchemaCategory: "SportingGoods",
  intro: {
    heading: "Choose bags by session workflow, not logo",
    body: "If you <strong>commute with one or two rackets</strong>, a compact backpack with a shoe pocket is enough. If you <strong>play club nights twice a week</strong>, you want separate shoe and wet compartments so odor and moisture never touch your frames. Our bag-loadout guide lists what to carry — this page picks the shells that fit those habits.",
  },
  picks: [
    {
      rank: 1,
      name: "Pro Tournament Bag",
      brand: "Yonex",
      priceUsd: 110,
      productId: "yy-pro-racket-bag-92429",
      bestFor: "Regular club sessions with shoes, wet kit, and multiple rackets",
      specs: [
        { label: "Capacity", value: "6 rackets" },
        { label: "Shoe pocket", value: "Yes" },
        { label: "Wet compartment", value: "Yes" },
      ],
      why: "Full club-night workflow in one bag — dedicated shoe and wet zones keep frames and clothes separated. Six-racket capacity covers spare frames, loaner rackets, and seasonal rotation without a second bag.",
      tradeoff: "Oversized for casual one-racket commuters. Verify exact local SKU — Yonex bag line codes vary by region.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/INT_BA92431W_031-1.jpg?v=1757097764&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
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
      bestFor: "Light commute and casual sessions",
      specs: [
        { label: "Capacity", value: "2 rackets" },
        { label: "Shoe pocket", value: "Yes" },
        { label: "Wet compartment", value: "No" },
      ],
      why: "Backpack carry suits players who bike or take public transit to the hall. Two-racket capacity plus a shoe pocket covers most recreational sessions without tournament bulk.",
      tradeoff: "No dedicated wet compartment — pack a separate pouch for damp kit. Verify exact Victor SKU in your market before affiliate use.",
      evidenceLevel: "tested",
    },
  ],
  faqs: [
    {
      q: "Racket bag or backpack?",
      a: "Racket bags when you carry 3+ frames and want vertical racket slots. Backpacks when you commute and only need one or two rackets plus shoes. Hybrid tournament bags work for drivers who park at the venue.",
    },
    {
      q: "Do I need a shoe compartment?",
      a: "If you ever wear court shoes only at the hall, yes. Separating shoes from rackets and clothes reduces odor transfer and keeps rubber grit off your frames.",
    },
    {
      q: "How many rackets should my bag hold?",
      a: "Casual players: 1–2. Regular club: 2–3 (main, spare, experimental setup). Competitive players: 3–6 depending on stringing rotation. Buy capacity for your busiest session, not your lightest.",
    },
    {
      q: "What else should I pack?",
      a: "Towel, water, spare overgrips, shuttles for casual sessions, and a clean shirt if you shower at the venue. Our bag-loadout guide walks through a full club-night checklist.",
    },
  ],
  ctaHeading: "Browse all bags in the catalog",
  ctaBody: "Filter by capacity, carry style, and compartment layout — then compare specs before you commit.",
};

export default function BestBagsPage() {
  return <BestPicksPage config={config} />;
}
