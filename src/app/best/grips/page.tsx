import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/grips/",
  title: "Best Badminton Overgrips 2026 — Super Grap, Towel, Li-Ning GP100",
  description:
    "Six badminton overgrips ranked by tackiness, sweat handling, thickness, and durability — Yonex Super Grap, Towel Grip, Wave, Smash, Strong Grap, plus Li-Ning GP100 Pro.",
});

const config: BestPicksConfig = {
  slug: "grips",
  breadcrumbLabel: "Grips",
  title: "Best badminton overgrips (2026)",
  dek: "Overgrips change handle feel more than most players expect. Six picks ranked by what they actually do — tackiness, sweat absorption, thickness, and how often you need to replace them.",
  productSchemaCategory: "SportingGoods",
  intro: {
    heading: "Choose overgrips by sweat and feel, not colour",
    body: "If your <strong>hands sweat heavily</strong>, towel or perforated dry-feel grips absorb moisture better than tacky synthetics. If you <strong>change grips rarely</strong>, Smash Grap and Strong Grap last longer than Super Grap. If you are <strong>fine-tuning handle size</strong>, remember one overgrip adds roughly half a grip size — our grip-sizes guide explains the math. Most club players should start with Super Grap and only experiment once contact is consistent.",
  },
  picks: [
    {
      rank: 1,
      name: "Super Grap",
      brand: "Yonex",
      priceUsd: 8,
      productId: "yy-ac102c",
      bestFor: "Default first overgrip for most players",
      specs: [
        { label: "Feel", value: "Tacky / soft" },
        { label: "Thickness", value: "0.6 mm" },
        { label: "Pack", value: "3 wraps" },
      ],
      why: "The world's default overgrip for a reason. Balanced tackiness, forgiving thickness, and a price that makes frequent replacement painless. If you have never chosen an overgrip deliberately, start here.",
      tradeoff: "Wears faster than Smash or Strong Grap in humid halls. Tacky feel can feel sticky in extreme heat.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/AC102_Wine_Red_1.jpg?v=1769142157&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Super Grap AC102 badminton overgrip 3-pack",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 2,
      name: "Towel Grip",
      brand: "Yonex",
      priceUsd: 50,
      productId: "yy-ac108ex",
      bestFor: "Heavy sweat and humid climates",
      specs: [
        { label: "Feel", value: "Towel / absorbent" },
        { label: "Thickness", value: "1.8 mm" },
        { label: "Pack", value: "12 wraps" },
      ],
      why: "Towelling material wicks sweat faster than synthetic overgrips. Thicker handle feel suits players who strip the factory underbase or run hot in tropical venues.",
      tradeoff: "Wears out faster than Super Grap. Adds more thickness — verify your handle size before stacking two layers.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/AC402EX_RED_2.jpg?v=1751326222&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Towel Grip badminton overgrip",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 3,
      name: "Wave Grap",
      brand: "Yonex",
      priceUsd: 10,
      productId: "yy-ac104ex",
      bestFor: "Players who want texture feedback on the handle",
      specs: [
        { label: "Feel", value: "Perforated / wavy" },
        { label: "Thickness", value: "0.65 mm" },
        { label: "Pack", value: "3 wraps" },
      ],
      why: "Wave-textured surface gives more locating feedback than smooth Super Grap. Slightly thicker — good if Super Grap feels too thin but towel grips feel too bulky.",
      tradeoff: "Texture is subjective — some players find it abrasive after long sessions.",
      evidenceLevel: "tested",
    },
    {
      rank: 4,
      name: "Smash Grap",
      brand: "Yonex",
      priceUsd: 10,
      productId: "yy-ac125ex",
      bestFor: "Longer replacement cycles and dry hands",
      specs: [
        { label: "Feel", value: "Dry / durable" },
        { label: "Thickness", value: "0.7 mm" },
        { label: "Pack", value: "3 wraps" },
      ],
      why: "More durable than Super Grap with a drier surface. Suits players who hate the sticky phase of fresh tacky grips or who play in cooler halls.",
      tradeoff: "Less initial tack than Super Grap or Strong Grap — may feel slippery until broken in.",
      evidenceLevel: "tested",
    },
    {
      rank: 5,
      name: "Strong Grap",
      brand: "Yonex",
      priceUsd: 10,
      productId: "yy-ac130ex",
      bestFor: "Maximum tack under moderate sweat",
      specs: [
        { label: "Feel", value: "Extra tacky" },
        { label: "Thickness", value: "0.7 mm" },
        { label: "Pack", value: "3 wraps" },
      ],
      why: "Tackier than Super Grap when you want the racket locked in during fast exchanges. Popular with attack players who over-grip under pressure.",
      tradeoff: "Can feel too sticky in heat. Try a 3-pack before committing to a bulk reel.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/AC135_OCEAN-BLUE_2.jpg?v=1751330368&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Strong Grap badminton overgrip",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 6,
      name: "GP100 Pro",
      brand: "Li-Ning",
      priceUsd: 6,
      productId: "ln-gp100-pro-grip",
      bestFor: "Value dry-feel alternative with hands-on review",
      specs: [
        { label: "Feel", value: "Dry / perforated" },
        { label: "Thickness", value: "0.6 mm" },
        { label: "Pack", value: "3 wraps" },
      ],
      why: "Dry micro-perforated surface that improves as sweat builds. Strong value vs Yonex Super Grap where Li-Ning accessories are stocked locally.",
      tradeoff: "Regional availability skews CN/SG — verify Western distributor stock before bulk orders.",
      evidenceLevel: "tested",
    },
  ],
  faqs: [
    {
      q: "How often should I replace an overgrip?",
      a: "Every 4–12 sessions for regular club play, or whenever the surface feels slick. Competitive players in humid halls may replace every 2–3 sessions. A fresh overgrip is cheaper than compensating with a death grip.",
    },
    {
      q: "Towel grip or synthetic overgrip?",
      a: "Synthetic (Super Grap class) for most temperate venues. Towel grips for heavy sweat, humid climates, or when you want a thicker handle without adding a second wrap.",
    },
    {
      q: "Does overgrip thickness change racket balance?",
      a: "Marginally — one 0.6 mm wrap shifts balance a fraction of a millimetre. Two wraps or a towel grip can move you half a grip size and noticeably change swing feel. Our grip-sizes guide covers the sizing math.",
    },
    {
      q: "Can I use tennis overgrips on badminton rackets?",
      a: "Yes, but badminton-specific grips are sized for thinner handles. Tennis overgrips often add more bulk than intended — measure circumference after wrapping if you experiment.",
    },
  ],
  ctaHeading: "Browse all grips in the catalog",
  ctaBody: "Filter by brand, feel, and thickness — then compare specs before you stock your club bag.",
};

export default function BestGripsPage() {
  return <BestPicksPage config={config} />;
}
