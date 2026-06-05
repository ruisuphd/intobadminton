import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best All-Round Badminton Rackets (2026)",
  description:
    "Six even-balance badminton rackets for players who cover every court position — Arcsaber 7 Pro, DriveX 8S, Halbertec 8000, Brave Sword 12, Jetspeed 12, and Arcsaber 7 Tour.",
  alternates: pageAlternates("/best/all-round-rackets/"),
};

const config: BestPicksConfig = {
  slug: "all-round-rackets",
  breadcrumbLabel: "All-round rackets",
  title: "Best all-round badminton rackets (2026)",
  dek: "Even-balance frames that do not punish wrong role choices — six picks for club doubles, mixed, and singles players still discovering their style.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What 'all-round' actually means",
    body: "An all-round racket sits near <strong>even balance</strong> (~290–298 mm) with a shaft flex you can actually load in real rallies. It clears comfortably, drives flat in doubles, and smashes well enough without the recovery penalty of a head-heavy frame. <strong>All-round is not 'no identity'</strong> — it is a deliberate compromise for players who rotate court positions or have not yet committed to attack vs speed. If you already know you live at the rear court, head-heavy guides will serve you better.",
  },
  picks: [
    {
      rank: 1,
      name: "Arcsaber 7 Pro",
      brand: "Yonex",
      priceUsd: 220,
      productId: "yy-arcsaber-7-pro",
      bestFor: "Control-leaning all-court club player",
      specs: [
        { label: "Balance", value: "Even (~290 mm)" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "4U" },
      ],
      why: "Yonex's modern even-balance control flagship — generous sweet spot, repeatable flat drives, enough head mass for clears without Astrox recovery cost.",
      tradeoff: "Not the heaviest smash frame — rear-court specialists may want head-heavy Astrox or Halbertec Power.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "DriveX 8S",
      brand: "Victor",
      priceUsd: 189,
      productId: "vic-drivex-8s",
      bestFor: "Doubles all-court, medium flex",
      specs: [
        { label: "Balance", value: "Even (~295 mm)" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "3U / 4U" },
      ],
      why: "Victor's even-balance workhorse — fast enough for front court, stable enough for rear-court drives. Medium shaft forgives timing gaps better than extra-stiff flagships.",
      tradeoff: "Less smash ceiling than head-heavy DriveX attack variants.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Halbertec 8000 (战戟 8000)",
      brand: "Li-Ning",
      priceUsd: 165,
      productId: "ln-halbertec-8000",
      bestFor: "Value even-balance doubles",
      specs: [
        { label: "Balance", value: "Even (~304 mm)" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "3U / 4U" },
      ],
      why: "Halbertec control geometry at mid-flagship pricing — stable on defence, quick on flat exchanges. Strong second-racket pick when your main frame is head-heavy.",
      tradeoff: "Brand resale outside Asia is thinner than Yonex/Victor.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Brave Sword 12",
      brand: "Victor",
      priceUsd: 165,
      productId: "vic-brave-sword-12",
      bestFor: "Classic Victor all-rounder",
      specs: [
        { label: "Balance", value: "Even (~290 mm)" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "3U / 4U" },
      ],
      why: "Still in print after years on club courts — reasonable smash, easy clears, forgiving sweet spot. The frame many Victor players recommend when you 'do not yet know your style'.",
      tradeoff: "Aesthetics and tech story feel dated next to 2024–2026 flagships.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Jetspeed 12",
      brand: "Victor",
      priceUsd: 219,
      productId: "vic-jetspeed-12",
      bestFor: "Even balance with speed DNA",
      specs: [
        { label: "Balance", value: "Even (~295 mm)" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "3U / 4U" },
      ],
      why: "Jetspeed aerodynamics with even balance — quicker recovery than head-heavy attack frames while keeping enough mass for baseline clears.",
      tradeoff: "Extra-stiff variants in the line exist; confirm flex stamp — medium is the all-round pick.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Arcsaber 7 Tour",
      brand: "Yonex",
      priceUsd: 130,
      productId: "yy-arcsaber-7-tour",
      bestFor: "Budget even-balance Yonex",
      specs: [
        { label: "Balance", value: "Even (~293 mm)" },
        { label: "Shaft flex", value: "Medium" },
        { label: "Weight", value: "3U / 4U" },
      ],
      why: "Bridges Play-tier pricing and Pro-tier Arcsaber control — strong value for control-leaning amateurs who want Yonex build quality without flagship cost.",
      tradeoff: "Materials and smash mass below Arcsaber 7 Pro — upgrade path is clear once timing stabilises.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "All-round vs head-heavy — which wins in doubles?",
      a: "Front-court specialists often prefer head-light or even frames; rear-court smashers want head-heavy. If you play both positions in social doubles, even balance is the safer default until your role is fixed.",
    },
    {
      q: "Is even balance boring?",
      a: "No — it trades peak smash for consistency. Many competitive club players perform better with even balance because mishits are less punishing and recovery is faster.",
    },
    {
      q: "Can beginners start with all-round frames?",
      a: "Yes — medium flex + even balance is the most forgiving combination for learning timing. Beginner-specific guides bias softer shafts; this list targets players ready for graphite performance frames.",
    },
  ],
  ctaHeading: "Find your even-balance match",
  ctaBody:
    "The finder scores every catalogue racket on style, discipline, level, budget, and comfort — including even-balance rows you might skip in a head-heavy shortlist.",
};

export default function AllRoundRacketsPage() {
  return <BestPicksPage config={config} />;
}
