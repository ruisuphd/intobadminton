import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/defensive-rackets/",
  title: "Best Defensive Badminton Rackets 2026",
  description:
    "Six rackets for defensive doubles and front-court recovery — Nanoflare 700 Pro, 800 Pro, Auraspeed 90K II, Jetspeed 12, Arcsaber 7 Tour, Halbertec 7000 II.",
});

const config: BestPicksConfig = {
  slug: "defensive-rackets",
  breadcrumbLabel: "Defensive rackets",
  title: "Best defensive badminton rackets (2026)",
  dek: "Frames for players who win points on blocks, lifts, and flat drives — six picks for defensive doubles, mixed front court, and side-by-side recovery.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What makes a racket defensive",
    body: "Defensive play is not the same as head-light geometry alone. You need <strong>fast recovery after blocks</strong>, a shaft that returns the shuttle on flat drives without mush, and enough stability to absorb smashes when coverage breaks down. The best defensive frames sit head-light or even with a stiff enough shaft that passive contact still sends the shuttle deep. <strong>If your winners are rear-court smashes, use our smash-heavy guide instead.</strong>",
  },
  picks: [
    {
      rank: 1,
      name: "Nanoflare 700 Pro (2024)",
      brand: "Yonex",
      priceUsd: 210,
      productId: "yy-nanoflare-700-pro-2024",
      bestFor: "Flagship defensive speed",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Yonex's forgiving Nanoflare defensive platform — broad sweet spot, quick block-and-reset, less timing demand than the 1000Z stiff flagship.",
      tradeoff: "Less flat-drive ceiling than 800 Pro or 1000Z — upgrade when contact is consistent.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Nanoflare 800 Pro (2024)",
      brand: "Yonex",
      priceUsd: 240,
      productId: "yy-nanoflare-800-pro-2024",
      bestFor: "Fast-flat defensive doubles",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Crisp-elastic head-light frame built for continuous flat exchanges and defensive recovery in men's doubles — faster off-string than the 700 Pro line.",
      tradeoff: "Stiffer shaft punishes late preparation — not a beginner defensive frame.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Auraspeed 90K II",
      brand: "Victor",
      priceUsd: 230,
      productId: "vic-auraspeed-90k-ii",
      bestFor: "Large-frame defensive drives",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Victor's aero speed platform with a forgiving hoop — stable on rushed defensive lifts and flat counterattacks without the Nanoflare crispness tax.",
      tradeoff: "Large frame feels slower on the fastest net reflexes versus compact speed rackets.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Jetspeed 12",
      brand: "Victor",
      priceUsd: 200,
      productId: "vic-jetspeed-12",
      bestFor: "Even-balance defensive transition",
      specs: [
        { label: "Weight", value: "3U / 4U" },
        { label: "Balance", value: "Even (~295 mm)" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Even-balance Victor classic — enough head mass for rear-court lifts when rotation breaks down, still quick enough for front-court blocks and drives.",
      tradeoff: "Not as head-light as Nanoflare lines — front-court specialists may prefer pure speed geometry.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Arcsaber 7 Tour",
      brand: "Yonex",
      priceUsd: 140,
      productId: "yy-arcsaber-7-tour",
      bestFor: "Control-first defensive craft",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Tour-tier control frame with softer timing than Nanoflare flagships — strong for placement-first defensive players who value net touch over raw drive speed.",
      tradeoff: "Less flat-drive speed than stiff Nanoflare or Auraspeed platforms.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Halbertec 7000 II",
      brand: "Li-Ning",
      priceUsd: 130,
      productId: "ln-halbertec-7000-ii",
      bestFor: "Budget defensive all-court",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Li-Ning defensive-control line at mid-tier pricing — credible block-and-lift platform for club doubles without flagship spend.",
      tradeoff: "Build consistency varies by batch — inspect frame alignment on delivery.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Defensive racket vs head-light racket — what's the difference?",
      a: "Head-light describes where mass sits; defensive describes how you win points. Most defensive frames are head-light, but not every head-light frame forgives rushed blocks. This guide ranks by defensive recovery and flat-drive stability, not balance point alone.",
    },
    {
      q: "Can rear-court players use defensive rackets?",
      a: "Yes in doubles when you rotate and defend side-by-side. Pure rear-court smash specialists usually want even or head-heavy balance. Mixed front-court roles are where defensive geometry shines.",
    },
    {
      q: "What string tension for defensive doubles?",
      a: "Most defensive frames work at 24–26 lb for club players — enough repulsion for flat drives without the harsh feedback of 27+ lb on tired arms. See our string tension guide for level-specific ranges.",
    },
  ],
  ctaHeading: "Match racket geometry to your court role",
  ctaBody:
    "The finder scores defensive, front-court, and all-court styles against your level and comfort flags — so you do not buy smash mass when your points come from blocks and flat drives.",
};

export default function DefensiveRacketsPage() {
  return <BestPicksPage config={config} />;
}
