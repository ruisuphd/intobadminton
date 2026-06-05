import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Wide-Feet Badminton Shoes (2026)",
  description:
    "Six badminton shoes with wide or wide-available lasts — Yonex 65 Z Wide, Comfort Z3, Victor P9200 III, P8500 II, Bonny Future Land 3, and ASICS Blast FF 3.",
  alternates: pageAlternates("/best/wide-feet-badminton-shoes/"),
};

const config: BestPicksConfig = {
  slug: "wide-feet-badminton-shoes",
  breadcrumbLabel: "Wide-feet shoes",
  title: "Best badminton shoes for wide feet (2026)",
  dek: "Length is easy to size; width is what locks your foot during a lunge. Six court shoes with genuinely wide or wide-available lasts — not running shoes squeezed into a narrow badminton upper.",
  productSchemaCategory: "Shoes",
  intro: {
    heading: "Why wide feet need a different shoe shortlist",
    body: "Most badminton shoes use a narrow last because Asian-market sizing skews slim. If your forefoot spills over the insole or you feel lateral pressure on split steps, you need either a <strong>dedicated wide SKU</strong> (Yonex 65 Z Wide) or a brand that publishes a <strong>wide variant</strong> (Victor U2.5E / 3.0E, ASICS wide lasts). Running shoes are not a substitute — they lack lateral cage reinforcement. Read the <a href=\"/guides/wide-feet-badminton-shoes/\">wide-feet sizing guide</a> before you buy half a size up just to get width.",
  },
  picks: [
    {
      rank: 1,
      name: "Power Cushion 65 Z Wide",
      brand: "Yonex",
      priceUsd: 160,
      productId: "yy-power-cushion-65z-wide",
      bestFor: "Dedicated wide last, club to tournament",
      specs: [
        { label: "Fit width", value: "Wide (65 Z platform)" },
        { label: "Cushioning", value: "Medium-high" },
        { label: "Stability", value: "Very high" },
      ],
      why: "The only mainstream Yonex shoe with a factory wide last on the 65 Z stability platform. Power Cushion+ heel protection plus a forefoot cage that actually fits EE-width feet without sizing up.",
      tradeoff: "Heavier than Aerus or Eclipsion speed shoes — pick those only if you accept a narrow last.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Power Cushion Comfort Z3",
      brand: "Yonex",
      priceUsd: 145,
      productId: "yy-comfort-z3",
      bestFor: "Wide-available + maximum cushioning",
      specs: [
        { label: "Fit width", value: "Regular / wide available" },
        { label: "Cushioning", value: "High" },
        { label: "Stability", value: "High" },
      ],
      why: "Comfort-line cushioning for knee-friendly sessions with a wider forefoot option than Aerus. Strong pick when you want Yonex court rubber but need more volume than a speed last.",
      tradeoff: "Not as laterally locked as 65 Z — heavy cutters may prefer P9200 or P8500.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "P9200 III",
      brand: "Victor",
      priceUsd: 180,
      productId: "vic-p9200-iii",
      bestFor: "Wide-available stability flagship",
      specs: [
        { label: "Fit width", value: "U2.5E wide variant" },
        { label: "Cushioning", value: "Medium-high" },
        { label: "Stability", value: "Very high" },
      ],
      why: "Victor's stability reference with an explicit wide last option. Lateral eagle-claw plate and ENERGYMAX stack suit heavier players who roll ankles on hard cuts.",
      tradeoff: "Confirm the wide SKU at purchase — standard U2.5 runs narrow vs Yonex Wide.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "P8500 II",
      brand: "Victor",
      priceUsd: 165,
      productId: "vic-p8500-ii",
      bestFor: "Heavy players, wide forefoot",
      specs: [
        { label: "Fit width", value: "U2.5E wide variant" },
        { label: "Cushioning", value: "High (firm)" },
        { label: "Stability", value: "Very high" },
      ],
      why: "P-series protection shoe with enlarged lateral plate and wide last. Community feedback flags fast insole wear — budget for aftermarket replacements.",
      tradeoff: "Breathability is mediocre in humid halls; not a speed shoe.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Future Land 3 (Polaris / 极星)",
      brand: "Bonny",
      priceUsd: 135,
      productId: "bonny-future-land-3",
      bestFor: "Budget wide last (3.0E)",
      specs: [
        { label: "Fit width", value: "3.0E wide last" },
        { label: "Cushioning", value: "Medium" },
        { label: "Stability", value: "High" },
      ],
      why: "Bonny publishes a 3.0E wide last on a carbon torsion stability platform — rare at this price. Strong value when Yonex Wide is out of stock locally.",
      tradeoff: "Resale and warranty channels weaker than the big three brands.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Blast FF 3",
      brand: "ASICS",
      priceUsd: 140,
      productId: "asics-blast-ff-3",
      bestFor: "Indoor-court wide last crossover",
      specs: [
        { label: "Fit width", value: "Wide available (standard 2E+)" },
        { label: "Cushioning", value: "Medium-high" },
        { label: "Stability", value: "High" },
      ],
      why: "Not badminton-branded, but ASICS indoor/handball lasts run wider than Yonex speed shoes. Good escape hatch when badminton SKUs feel cramped.",
      tradeoff: "Outsole rubber tuned for generic indoor courts — verify grip on your hall surface.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Should I size up instead of buying a wide shoe?",
      a: "Only if a wide SKU does not exist for the model you want. Half a size up adds length without fixing forefoot volume — you slide forward on lunges. Prefer dedicated wide or 2E/3E variants first.",
    },
    {
      q: "Are wide running shoes okay for badminton?",
      a: "No. Running shoes lack lateral reinforcement and court rubber. Wide running lasts do not solve the direction-change problem — see our badminton vs running shoes guide.",
    },
    {
      q: "How do I know if a shoe is truly wide?",
      a: "Look for factory wide SKUs (Yonex Wide, Victor 2.5E/3.0E) in the product name or spec sheet — not just 'runs wide' forum advice. The finder scores fit width when you flag wide feet.",
    },
  ],
  ctaHeading: "Match shoe width to your foot and role",
  ctaBody:
    "The finder scores every catalogue shoe on fit width, stability, cushioning, and your injury flags — wide feet included.",
};

export default function WideFeetShoesPage() {
  return <BestPicksPage config={config} />;
}
