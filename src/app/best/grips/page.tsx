import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/grips/",
  title: "Best Badminton Grips 2026 — Super Grap, Towel, Li-Ning GP100",
  description:
    "Seven badminton overgrips ranked by tackiness, sweat handling, and replacement cadence — Yonex Super Grap, Towel Grip, Strong Grap, and Li-Ning GP100 Pro.",
});

const config: BestPicksConfig = {
  slug: "grips",
  breadcrumbLabel: "Grips",
  title: "Best badminton grips (2026)",
  dek: "Overgrips change handle feel more than most players expect. Seven picks ranked by tackiness, sweat absorption, thickness, and how often you actually need to replace them.",
  productSchemaCategory: "SportingGoods",
  intro: {
    heading: "Choose grips by sweat and feel, not colour",
    body: "If your <strong>hands stay dry</strong>, tacky Super Grap is the default. If you <strong>sweat heavily</strong>, towel grips absorb more but wear faster. If you <strong>change grips weekly</strong>, buy the bulk reel. If you want <strong>dry feedback without stickiness</strong>, Smash Grap or Li-Ning GP100 Pro are worth testing before you commit to a case.",
  },
  picks: [
    {
      rank: 1,
      name: "Super Grap",
      brand: "Yonex",
      priceUsd: 8,
      productId: "yy-ac102c",
      bestFor: "Default tacky overgrip for most club players",
      specs: [
        { label: "Feel", value: "Tacky / soft" },
        { label: "Thickness", value: "0.6 mm" },
        { label: "Pack", value: "3-wrap" },
      ],
      why: "The overgrip in most club bags worldwide. Balanced thickness, forgiving tack, and predictable wear. AC102C is the consumer 3-pack — the right first buy before you commit to a reel.",
      tradeoff: "Tack fades in humid heat. Sweaty players may prefer towel or dry-feel options.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/AC102_Wine_Red_1.jpg?v=1769142157&width=1946",
        source: "yonex",
        credit: "Image: Yonex USA (us.yonex.com)",
        alt: "Yonex Super Grap AC102 badminton overgrip 3-pack",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 2,
      name: "GP100 Pro",
      brand: "Li-Ning",
      priceUsd: 6,
      productId: "ln-gp100-pro-grip",
      bestFor: "Dry-feel value pick with dedicated hands-on review",
      specs: [
        { label: "Feel", value: "Dry / perforated" },
        { label: "Thickness", value: "0.6 mm" },
        { label: "Pack", value: "3-wrap" },
      ],
      why: "Micro-perforations improve grip as sweat builds — the opposite of tacky Super Grap. Strong value per wrap and the only grip in this list with a mapped first-person review on IntoBadminton.",
      tradeoff: "Less brand familiarity at Western retailers. Availability varies outside Asia-Pacific.",
      evidenceLevel: "tested",
    },
    {
      rank: 3,
      name: "Towel Grip",
      brand: "Yonex",
      priceUsd: 50,
      productId: "yy-ac108ex",
      bestFor: "Heavy sweat and thicker handle feel",
      specs: [
        { label: "Feel", value: "Towel" },
        { label: "Thickness", value: "1.8 mm" },
        { label: "Pack", value: "12-wrap reel" },
      ],
      why: "Towelling surface absorbs sweat faster than synthetic overgrips. Popular in humid climates and with players who want a noticeably thicker handle without rebuilding the base grip.",
      tradeoff: "Wears faster than Super Grap. Adds handle bulk — verify G4/G5 sizing still fits your hand.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/AC402EX_RED_2.jpg?v=1751326222&width=1946",
        source: "yonex",
        credit: "Image: Yonex USA (us.yonex.com)",
        alt: "Yonex Towel Grip badminton overgrip",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 4,
      name: "Strong Grap",
      brand: "Yonex",
      priceUsd: 10,
      productId: "yy-ac130ex",
      bestFor: "Extra tack under moderate sweat",
      specs: [
        { label: "Feel", value: "Extra tacky" },
        { label: "Thickness", value: "0.7 mm" },
        { label: "Pack", value: "3-wrap" },
      ],
      why: "Tackier than Super Grap with slightly more secure feel on hard drives. A good A/B test if Super Grap feels slippery mid-session but you do not want towel bulk.",
      tradeoff: "Can feel sticky in heat. Not everyone prefers the extra grab on soft touch shots.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/AC135_OCEAN-BLUE_2.jpg?v=1751330368&width=1946",
        source: "yonex",
        credit: "Image: Yonex USA (us.yonex.com)",
        alt: "Yonex Strong Grap badminton overgrip",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 5,
      name: "Smash Grap",
      brand: "Yonex",
      priceUsd: 10,
      productId: "yy-ac125ex",
      bestFor: "Longer replacement cycles and dry hands",
      specs: [
        { label: "Feel", value: "Dry" },
        { label: "Thickness", value: "0.7 mm" },
        { label: "Pack", value: "3-wrap" },
      ],
      why: "More durable than Super Grap with a dry rather than tacky surface. Suits players who change overgrips less often and want predictable feedback without sticky residue.",
      tradeoff: "Less initial tack than Super Grap or Strong Grap. Heavy sweaters may still prefer towel.",
      evidenceLevel: "tested",
    },
    {
      rank: 6,
      name: "Wave Grap",
      brand: "Yonex",
      priceUsd: 10,
      productId: "yy-ac104ex",
      bestFor: "Textured feedback and moderate sweat",
      specs: [
        { label: "Feel", value: "Perforated / wave" },
        { label: "Thickness", value: "0.65 mm" },
        { label: "Pack", value: "3-wrap" },
      ],
      why: "Wave texture gives more locating feedback on the handle than smooth Super Grap. Slightly thicker — a middle ground between tacky synthetics and towel bulk.",
      tradeoff: "Texture preference is personal. Try one 3-pack before stocking up.",
      evidenceLevel: "tested",
    },
    {
      rank: 7,
      name: "Super Grap Bulk",
      brand: "Yonex",
      priceUsd: 50,
      productId: "yy-ac102ex",
      bestFor: "Club kits and frequent re-grippers",
      specs: [
        { label: "Feel", value: "Tacky / soft" },
        { label: "Thickness", value: "0.6 mm" },
        { label: "Pack", value: "30-wrap reel" },
      ],
      why: "Same product as Super Grap AC102C at lower per-wrap cost. The right buy once you know Super Grap suits your hands and you re-grip every 1-2 weeks.",
      tradeoff: "Upfront cost. Not worth it until you have confirmed Super Grap is your default.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/INT_AC102-30_Wine_Red_1.jpg?v=1769142203&width=1946",
        source: "yonex",
        credit: "Image: Yonex USA (us.yonex.com)",
        alt: "Yonex Super Grap AC102EX badminton overgrip bulk reel",
        width: 480,
        height: 480,
        verified: true,
      },
    },
  ],
  faqs: [
    {
      q: "How often should I replace my overgrip?",
      a: "Club players who play 2-3 times per week: every 1-2 weeks for tacky synthetics, every 3-5 sessions for towel grips. Replace when tack is gone, the surface is shiny, or the wrap loosens at the butt cap.",
    },
    {
      q: "Overgrip vs replacement grip — which do I need?",
      a: "Almost everyone uses overgrips on top of the factory base grip. Replacement grips rebuild the handle from the wood up — only needed when the base cushion is compressed or torn. Start with Super Grap overgrips before touching the base layer.",
    },
    {
      q: "Does grip thickness change my racket size?",
      a: "Yes. Each 0.1 mm of overgrip stacks. Towel grips at 1.8 mm can make a G4 feel like G5. If your hand cramps, try thinner Super Grap before downsizing the racket handle.",
    },
  ],
  ctaHeading: "Match grip feel to your sweat and swing tempo",
  ctaBody: "Our grip guide explains Yonex SKU codes, thickness trade-offs, and when towel beats tacky — so you stop guessing from colour swatches alone.",
};

export default function BestGripsPage() {
  return <BestPicksPage config={config} />;
}
