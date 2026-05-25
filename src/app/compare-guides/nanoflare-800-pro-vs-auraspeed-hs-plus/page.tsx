import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { CompareGuidePage, type CompareGuideConfig } from "@/components/CompareGuidePage";
import { defaultOgImages } from "@/lib/og";
import { reviewPath } from "@/lib/review-pages";

export const metadata: Metadata = {
  title: "Yonex Nanoflare 800 Pro vs Victor Auraspeed HS Plus",
  description:
    "Nanoflare 800 Pro vs Auraspeed HS Plus — mid-flagship speed rackets compared. Drive speed, swing weight, and source-authority confidence.",
  alternates: pageAlternates("/compare-guides/nanoflare-800-pro-vs-auraspeed-hs-plus/"),
  openGraph: {
    title: "Nanoflare 800 Pro vs Auraspeed HS Plus — mid-flagship speed compared",
    description:
      "Two head-light mid-flagship rackets compared by source authority, swing feel, and doubles role.",
    url: "/compare-guides/nanoflare-800-pro-vs-auraspeed-hs-plus/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

const config: CompareGuideConfig = {
  slug: "nanoflare-800-pro-vs-auraspeed-hs-plus",
  breadcrumbLabel: "Nanoflare 800 Pro vs Auraspeed HS Plus",
  title: "Yonex Nanoflare 800 Pro vs Victor Auraspeed HS Plus",
  dek: "Two mid-flagship head-light speed frames. The 800 Pro has Yonex's product-page verification; the HS Plus is Victor's well-loved community choice. The picture flips depending on which factor you weight first.",
  intro:
    "These are the rackets most ambitious club players actually buy — flagship-adjacent, not full flagship, and significantly more accessible than the 1000Z or Auraspeed 99. The 800 Pro and HS Plus do the same job from opposite directions.",
  productA: {
    name: "Nanoflare 800 Pro",
    brand: "Yonex",
    productId: "yy-nanoflare-800-pro-2024",
    bestFor: "Doubles all-court, mid-flagship speed",
    pricePoint: "~$200",
    specBullets: [
      "Yonex official: Stiff shaft, 4U (avg 83g) G5/G6 and 3U (avg 88g) G4/G5/G6",
      "Stringing advice: 4U 20–28 lb, 3U 21–29 lb",
      "4U/G5 community sample: ~85.2g unstrung, balance 301mm",
      "Head-light feel with measurable end-speed",
      "Verified against Yonex product-specific page",
    ],
  },
  productB: {
    name: "Auraspeed HS Plus",
    brand: "Victor",
    productId: "vic-auraspeed-hs-plus",
    bestFor: "Fast doubles, drive specialists",
    pricePoint: "~$190",
    specBullets: [
      "Victor Auraspeed mid-flagship speed line",
      "Source authority: BadmintonCN — Victor product-specific page not linked",
      "4U/G5 sample: ~88.2g with underbase removed, balance 305mm",
      "6.8mm shaft at 218mm length — slightly thinner than 800 Pro",
      "Max stringing tension 28 lb",
    ],
  },
  rows: [
    { factor: "Source authority", a: "Yonex official product page", b: "BadmintonCN (Victor product page not linked)", winner: "a" },
    { factor: "Shaft tier", a: "Stiff (Yonex official)", b: "Stiff (community report)", winner: "tie" },
    { factor: "Head balance (4U community sample)", a: "~301mm", b: "~305mm — slightly more head-heavy bias", winner: "tie" },
    { factor: "Shaft thickness/length", a: "Standard Yonex profile", b: "6.8mm × 218mm — slightly thinner", winner: "b" },
    { factor: "End-speed on drives", a: "Excellent", b: "Excellent", winner: "tie" },
    { factor: "Smash bias on long-rally fatigue", a: "Better continuity", b: "Slightly more rear-court bias at higher tension", winner: "tie" },
    { factor: "Indicative price (USD)", a: "~$200", b: "~$190", winner: "b" },
    { factor: "Resale liquidity (global)", a: "Stronger", b: "Strong in Asia-Pacific", winner: "a" },
  ],
  middleParagraph:
    "The 800 Pro and HS Plus play similarly enough that most amateurs would not feel a category-difference on first hit. The decision usually comes down to source-authority preference (Yonex's verified page is harder to argue with) and shaft feel preference (Victor's thinner shaft has a slightly different flick character).",
  whoBuysA:
    "Buy the Nanoflare 800 Pro if you value Yonex's product-page-verified spec confidence, if you play men's or mixed doubles with a mid-flagship budget, and if your local stringer is more familiar with Yonex grommets and tension recommendations. The 800 Pro is also the safer used-market buy outside Asia because Yonex resale liquidity is stronger.",
  whoBuysB:
    "Buy the Auraspeed HS Plus if you already play Victor, if you specifically value the slightly thinner shaft's flick feel, and if you're comfortable with the community-sourced spec posture for Victor rackets that don't yet have a product-page link in IntoBadminton's database. The HS Plus is also a great pick if you're upgrading from an earlier Auraspeed and want continuity of feel.",
  founderNote:
    "I've hit with the 800 Pro at club level (4U/G5, BG80 at 26 lb). It feels exactly like a Nanoflare should — fast, light, sharp on drives, demanding on smash. The HS Plus is in the same ballpark with a slightly more flickable shaft. For a club player picking their first mid-flagship speed racket, the 800 Pro's spec confidence makes it the lower-risk default.",
  relatedLinks: [
    { label: "Read the full Nanoflare 800 Pro review", href: reviewPath("yy-nanoflare-800-pro-2024") },
    { label: "Read the full Auraspeed HS Plus review", href: reviewPath("vic-auraspeed-hs-plus") },
    { label: "Nanoflare 800 Pro and Victor HS Plus — extended notes", href: "/review/yonex-nanoflare-800-pro-and-victor-hs-plus/" },
    { label: "Yonex Nanoflare 700, 700 Pro, 1000Z — speed series", href: "/review/yonex-nanoflare-speed-series-explained/" },
    { label: "Yonex vs Victor vs Li-Ning — brand showdown", href: "/compare-guides/yonex-victor-li-ning/" },
    { label: "Best doubles badminton rackets", href: "/best/doubles-rackets/" },
  ],
};

export default function Nanoflare800ProVsAuraspeedHSPlusPage() {
  return <CompareGuidePage config={config} />;
}
