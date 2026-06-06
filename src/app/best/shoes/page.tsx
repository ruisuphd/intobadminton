import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/shoes/",
  title: "Best Badminton Shoes 2026 — Yonex & Victor Picks",
  description:
    "Six badminton shoes ranked by stability, cushioning, fit width, and weight feel — picks for narrow, regular, and wide feet, and for ankle recovery.",
});

const config: BestPicksConfig = {
  slug: "shoes",
  breadcrumbLabel: "Shoes",
  title: "Best badminton shoes (2026)",
  dek: "The shoe matters more than the racket. Six picks ranked by stability, fit width, cushioning, and how they actually feel during a side lunge — not how they look in a photo.",
  productSchemaCategory: "Shoes",
  intro: {
    heading: "How to think about a badminton shoe",
    body: "Three things matter: <strong>fit width</strong> (length is easier to size; width is what locks the foot during a lunge), <strong>stability</strong> (lateral reinforcement that resists rolling on hard direction changes), and <strong>cushioning vs ground feel</strong> (more cushioning protects your knees over long sessions; less cushioning lets you feel the floor under split steps). Running shoes do none of these — they are designed for a forward gait, not a lateral one.",
  },
  picks: [
    {
      rank: 1,
      name: "Power Cushion 65 Z Wide",
      brand: "Yonex",
      priceUsd: 165,
      bestFor: "Wide feet, club to tournament play",
      specs: [
        { label: "Fit width", value: "Wide (also regular avail.)" },
        { label: "Cushioning", value: "Medium-high" },
        { label: "Stability", value: "Very high" },
      ],
      why: "The most universal recommendation in badminton — Z-tier stability with a wide fit option, which is rare. Power Cushion+ midsole protects the heel on landing, the upper locks the forefoot, and the outsole grips wood and synthetic floors equally well.",
      tradeoff: "Slightly heavier than dedicated speed shoes. If you weigh under 60kg and play short sessions, a lighter shoe may feel quicker.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/ALL_SHBVAZM1_452-1.jpg?v=1774306789&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Power Cushion 65 Z VA (Wide) badminton shoe",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 2,
      name: "Power Cushion Aerus Z2",
      brand: "Yonex",
      priceUsd: 175,
      productId: "yy-aerus-z2",
      bestFor: "Light, fast players (singles speed)",
      specs: [
        { label: "Fit width", value: "Narrow / regular" },
        { label: "Cushioning", value: "Low-medium" },
        { label: "Stability", value: "Medium-high" },
      ],
      why: "Yonex's lightest tournament shoe — almost ballet-flat under foot, with enough cushioning to survive 90-minute matches. The choice for narrow feet who want speed and ground feel over protection.",
      tradeoff: "Wide-footed players will find it punishing. Players over 80kg may want more cushioning for knee comfort.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/SBAZ2M_FLASHGREEN_2.jpg?v=1750207255&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Power Cushion Aerus Z2 badminton shoe",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 3,
      name: "Power Cushion Comfort Z3",
      brand: "Yonex",
      productId: "yy-comfort-z3",
      priceUsd: 145,
      bestFor: "Joint-comfort priority",
      specs: [
        { label: "Fit width", value: "Regular / wide" },
        { label: "Cushioning", value: "High" },
        { label: "Stability", value: "High" },
      ],
      why: "Built around all-day comfort. The thicker midsole protects players coming back from ankle, knee, or heel injuries. Trades a fraction of court speed for meaningfully reduced session-end fatigue.",
      tradeoff: "Less responsive than the Aerus Z2. Pure speed players in their 20s rarely need this much cushioning.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/SHBCFZ3M_DARKRED_2.jpg?v=1752620369&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Power Cushion Comfort Z3 badminton shoe",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 4,
      name: "P9200 Series",
      brand: "Victor",
      priceUsd: 130,
      bestFor: "Asian fit, value tournament shoe",
      specs: [
        { label: "Fit width", value: "Regular (slightly snug heel)" },
        { label: "Cushioning", value: "Medium" },
        { label: "Stability", value: "Very high" },
      ],
      why: "Victor's flagship court shoe — popular on the Korean tour. Excellent torsional stability through the midfoot and a competitive price tier. Best alternative to the Yonex 65 Z Wide if your foot fits Asian lasts well.",
      tradeoff: "Narrower heel cup than Yonex equivalents. Try on in store if possible — heel slip ruins the shoe.",
      image: {
        url: "https://dkjulgymkya8y.cloudfront.net/victor/en_us/product-70325_0_20200407103130.webp",
        source: "victor",
        credit: "Image: Victor (victorsport.com)",
        alt: "Victor SH-P9200 AB badminton shoe",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 5,
      name: "Eclipsion Z3",
      brand: "Yonex",
      priceUsd: 200,
      bestFor: "Maximum stability and protection",
      specs: [
        { label: "Fit width", value: "Regular" },
        { label: "Cushioning", value: "High" },
        { label: "Stability", value: "Very high" },
      ],
      why: "The 'tank' of Yonex's lineup — Power Cushion+ heel, reinforced upper, and the strongest torsional plate in the line. The pick for heavier players, ankle-recovery players, or anyone who plays singles tournaments back-to-back.",
      tradeoff: "Heaviest in this list. If you play under 90 minutes per session and weigh under 75kg, the protection is overkill.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/ALL_SHBELZ3M_532-1.png?v=1740774141&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Power Cushion Eclipsion Z3 badminton shoe",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 6,
      name: "BladeSabre Max",
      brand: "Li-Ning",
      priceUsd: 110,
      productId: "ln-bladesabre-max",
      bestFor: "Best sub-$120 shoe",
      specs: [
        { label: "Fit width", value: "Regular" },
        { label: "Cushioning", value: "Medium" },
        { label: "Stability", value: "Medium-high" },
      ],
      why: "Li-Ning's most legitimately competitive court shoe at the value tier. Build quality has caught up to Yonex / Victor mid-range models, and grip on wood courts is excellent. Strong choice if you replace shoes annually and refuse to spend $150+.",
      tradeoff: "Less stability than Power Cushion 65 Z. Skip if you have ankle history.",
      image: {
        url: "https://li-ningsports.co.uk/cdn/shop/files/AYAU003-212.jpg?v=1763149402&width=1520",
        source: "lining",
        credit:
          "Image: Li-Ning (li-ningsports.co.uk) — Blade Max AYAU003-2 (UK name for Bladesabre MAX)",
        alt: "Li-Ning Bladesabre MAX badminton shoe",
        width: 480,
        height: 480,
        verified: true,
      },
    },
  ],
  faqs: [
    {
      q: "How often should I replace my badminton shoes?",
      a: "Most club players need new shoes every 9-15 months even if the upper looks fine. The midsole compresses and the outsole gum rubber loses grip long before visible wear. Track replacement by date, not by appearance — write the purchase date inside the tongue with a marker.",
    },
    {
      q: "Are wide-fit badminton shoes really wider than regular?",
      a: "Yes — and the difference is meaningful. Yonex Power Cushion 65 Z Wide adds about 5-8mm of forefoot width vs the regular 65 Z. Players who run wide should never buy 'regular' fit and 'just go up half a size' — the result is heel slip during lateral lunges and slower recovery.",
    },
    {
      q: "Can I use my running shoes for badminton at first?",
      a: "Strongly discouraged once you play more than once a week. Running shoes have raised heels that promote rolling on lateral movements — it is the most common preventable ankle injury at club level. A $90 entry-tier badminton shoe is dramatically safer than a $200 running shoe on a wood court.",
    },
    {
      q: "Should I size up because feet swell during play?",
      a: "Slightly, but not as much as in running. Try shoes on after a session if possible. As a rule of thumb: a half size up from your daily-walking shoe is usually right. Going a full size up creates heel slip; a tight fit creates blister hot spots on the toes.",
    },
  ],
  ctaHeading: "Tell the finder your foot width and comfort flags",
  ctaBody: "Shoe recommendations are scored against fit width, body weight, joint comfort, and budget — so the result actually fits, not just sells.",
};

export default function BestShoesPage() {
  return <BestPicksPage config={config} />;
}
