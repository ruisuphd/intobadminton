import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Badminton Rackets Under $100 (2026)",
  description:
    "Six honest badminton rackets under $100 — Yonex Play tiers, Nanoray Light 70i, Victor Thruster SR, and Li-Ning AxForce 10. Original analysis, not a price-sorted dump.",
  alternates: pageAlternates("/best/rackets-under-100/"),
};

const config: BestPicksConfig = {
  slug: "rackets-under-100",
  breadcrumbLabel: "Rackets under $100",
  title: "Best badminton rackets under $100 (2026)",
  dek: "Budget frames that still teach good habits — not the cheapest graphite on a marketplace sort. Every pick is under $100 MSRP with a clear trade-off versus spending $150–220 on a club frame.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What actually changes below $100",
    body: "Under $100 you are buying <strong>forgiving shaft flex</strong>, <strong>4U–5U weight</strong>, and a <strong>balance point you can recover from</strong> — not flagship carbon layups. The mistake is chasing a discounted pro frame with an extra-stiff shaft you cannot load; the win is a Play-tier or entry Victor/Li-Ning frame that keeps shoulder load low while you build timing. Street prices swing ±15% by region; the list below uses catalogue MSRP caps at $100 so you can compare shape before hunting local deals.",
  },
  picks: [
    {
      rank: 1,
      name: "Nanoflare 1000 Play",
      brand: "Yonex",
      priceUsd: 75,
      productId: "yy-nanoflare-1000-play",
      bestFor: "Speed-first recreational doubles",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Head-light Nanoflare family shape without Nanoflare 1000 Z pricing. Teaches fast flat drives and defensive resets — the frame stays easy to whip on mixed-doubles flat exchanges.",
      tradeoff: "Yellow cosmetics invite comparison with the 1000 Z; specs and feel are entry-tier, not tour repulsion.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Arcsaber 7 Play",
      brand: "Yonex",
      priceUsd: 75,
      productId: "yy-arcsaber-7-play",
      bestFor: "Control-first beginners",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Even-balance Arcsaber handling at Play-tier materials. Better for learning placement and net blocks than chasing rear-court smash mass on a budget.",
      tradeoff: "Softer feel than Arcsaber 7 Tour/Pro — plan to upgrade once you can consistently load a medium shaft.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Nanoray Light 70i",
      brand: "Yonex",
      priceUsd: 99,
      productId: "yy-nanoray-light-70i",
      bestFor: "Ultralight club warm-up / junior transition",
      specs: [
        { label: "Weight", value: "~70 g (7.0i class)" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Hi-flex" },
      ],
      why: "One of the few sub-$100 frames that stays genuinely light without resorting to unknown alloys. Useful for juniors moving out of aluminium or adults who need low swing weight after shoulder flare-ups.",
      tradeoff: "Not enough mass for competitive rear-court attack — pair with a heavier club frame once timing is stable.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Thruster SR Light (樱花刃)",
      brand: "Victor",
      priceUsd: 70,
      productId: "vic-thruster-sr",
      bestFor: "Budget doubles flat-drive practice",
      specs: [
        { label: "Weight", value: "4U–5U class" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Victor Thruster line geometry at entry pricing. Even balance keeps doubles drives predictable while you learn Victor's slightly different sweet spot versus Yonex Play tiers.",
      tradeoff: "Lower brand resale and fewer local demo units — buy from a retailer with a clear return window.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "AxForce 10 (雷霆 10)",
      brand: "Li-Ning",
      priceUsd: 70,
      productId: "ln-axforce-10",
      bestFor: "Cheapest taste of head-heavy attack",
      specs: [
        { label: "Weight", value: "4U / 5U options" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium-soft" },
      ],
      why: "Entry AxForce head weight without AxForce 90/100 pricing. Lets you feel rear-court loading before committing to a $200+ Li-Ning flagship.",
      tradeoff: "Build quality and consistency vary by batch — inspect grommets and shaft alignment on delivery.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Thruster 9900 (TK9900)",
      brand: "Victor",
      priceUsd: 95,
      productId: "vic-thruster-9900",
      bestFor: "Max budget with Thruster smash DNA",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Sits at the top of this list on price but still under $100 MSRP. More attack bias than the SR Light — useful if you already have flat-drive timing and want affordable Thruster smash geometry.",
      tradeoff: "At $95 you are one sale away from used intermediate frames — only buy new if warranty and return policy matter to you.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Is a $100 cap realistic in 2026?",
      a: "Yes for new Play-tier and entry Victor/Li-Ning models. Flagship Yonex/Victor/Li-Ning frames sit $180–320; this list deliberately excludes them. Check local MAP and bundle deals — some shops sell Play tiers under MSRP.",
    },
    {
      q: "Should I buy used instead?",
      a: "A clean used Arcsaber 7 Pro or Astrox 77 Pro often beats a new Play tier if you can verify authenticity and grommet wear. See the equipment authenticity guide and inspect the shaft joint before paying.",
    },
    {
      q: "How does this relate to the finder?",
      a: "Run the quiz with your real budget cap — the scorer penalises over-budget frames smoothly, so a $95 racket against an $80 budget still appears with a clear stretch warning.",
    },
  ],
  ctaHeading: "Match budget to your level and style",
  ctaBody:
    "Set a hard budget in the five-step finder and compare fit scores — budget fit is one of five transparent factors on every result card.",
};

export default function RacketsUnder100Page() {
  return <BestPicksPage config={config} />;
}
