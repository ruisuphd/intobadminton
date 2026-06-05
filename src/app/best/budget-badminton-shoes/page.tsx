import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Budget Badminton Shoes Under $130 (2026)",
  description:
    "Six badminton shoes under $130 with real lateral stability — Yonex Graphite Thrttl, Li-Ning Bladesabre 2 Pro, Kumpoo G805 Lite Pro, and value picks for club players.",
  alternates: pageAlternates("/best/budget-badminton-shoes/"),
};

const config: BestPicksConfig = {
  slug: "budget-badminton-shoes",
  breadcrumbLabel: "Budget shoes",
  title: "Best budget badminton shoes under $130 (2026)",
  dek: "Club-ready shoes that still pass the lateral-stability test — six picks from $80–$130, not running trainers rebranded for court sports.",
  productSchemaCategory: "Shoes",
  intro: {
    heading: "What budget still buys in a court shoe",
    body: "Under $130 you should expect <strong>medium cushioning and real outsole grip</strong>, not marathon-foam softness. The failure mode at this price is a narrow last with no cage reinforcement — fine for jogging, dangerous on a split step. Every pick below is a badminton-labelled shoe with manufacturer specs we have verified; run the <a href=\"/quiz/\">finder</a> if you also need width and stability matched to your foot.",
  },
  picks: [
    {
      rank: 1,
      name: "Power Cushion Grpht Thrttl",
      brand: "Yonex",
      priceUsd: 95,
      productId: "yy-grpht-thrttl",
      bestFor: "Value Yonex stability",
      specs: [
        { label: "Fit width", value: "Regular" },
        { label: "Cushioning", value: "Medium" },
        { label: "Stability", value: "High" },
      ],
      why: "The entry point into Yonex court geometry without Aerus pricing — enough Power Cushion for club sessions and a cage that resists roll on lunges.",
      tradeoff: "Not as light as Aerus Z2; wide-foot players should try 65 Z Wide instead.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Bladesabre 2 Pro",
      brand: "Li-Ning",
      priceUsd: 80,
      productId: "ln-bladesabre-2-pro",
      bestFor: "Budget speed + grip",
      specs: [
        { label: "Fit width", value: "Regular" },
        { label: "Cushioning", value: "Medium-low" },
        { label: "Stability", value: "Medium-high" },
      ],
      why: "Li-Ning's value speed line — low profile, sticky rubber, acceptable for recreational doubles where you want ground feel over plush cushion.",
      tradeoff: "Less heel protection than Yonex Power Cushion+ shoes for long tournament days.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "KH-G805 Lite Pro",
      brand: "Kumpoo",
      priceUsd: 95,
      productId: "kumpoo-kh-g805-lite-pro",
      bestFor: "Light club shoe",
      specs: [
        { label: "Fit width", value: "Regular" },
        { label: "Cushioning", value: "Medium" },
        { label: "Stability", value: "Medium" },
      ],
      why: "Surprisingly light for the price — good for younger players or short sessions who do not need flagship durability.",
      tradeoff: "Brand resale and spare parts outside Asia are thinner than Yonex/Victor.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Carbon Armour",
      brand: "Bonny",
      priceUsd: 100,
      productId: "bonny-carbon-armour",
      bestFor: "Wide value shelf",
      specs: [
        { label: "Fit width", value: "Regular to wide" },
        { label: "Cushioning", value: "Medium" },
        { label: "Stability", value: "Medium-high" },
      ],
      why: "Bonny's reinforced upper at a mid price — acceptable for club hitters who want a non-Yonex option without Victor flagship pricing.",
      tradeoff: "Verify sizing against your usual brand — Bonny lasts vary by model.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "KACE",
      brand: "Kawasaki",
      priceUsd: 105,
      productId: "kawasaki-kace",
      bestFor: "All-round club trainer",
      specs: [
        { label: "Fit width", value: "Regular" },
        { label: "Cushioning", value: "Medium" },
        { label: "Stability", value: "Medium" },
      ],
      why: "Balanced cushion and lateral support for mixed recreational play — not flashy, but passes the court-shoe checklist.",
      tradeoff: "Outsole durability on abrasive mats may trail Yonex 65 Z after 12+ months.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Power Cushion Subaxia GT",
      brand: "Yonex",
      priceUsd: 120,
      productId: "yy-subaxia-gt",
      bestFor: "Step-up stability near $130",
      specs: [
        { label: "Fit width", value: "Regular" },
        { label: "Cushioning", value: "Medium-high" },
        { label: "Stability", value: "High" },
      ],
      why: "Sits just under flagship 65 Z pricing with more cushion than Thrttl — a sensible upgrade when knees complain after long club nights.",
      tradeoff: "Still not the wide SKU — check 65 Z Wide if forefoot pressure is your issue.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Can I use running shoes under $130 instead?",
      a: "No — running shoes lack lateral cage reinforcement. The savings disappear the first time you roll an ankle on a lunge. See our guide on badminton shoes vs running shoes.",
    },
    {
      q: "Why is the list capped at $130?",
      a: "This page targets budget discovery. For flagship stability and wide fits, see our main best shoes guide and wide-feet picks.",
    },
  ],
  ctaHeading: "Match shoes to your foot and level",
  ctaBody:
    "The finder scores every catalogue shoe against your discipline, stability needs, and budget — with named reason codes.",
};

export default function BudgetBadmintonShoesPage() {
  return <BestPicksPage config={config} />;
}
