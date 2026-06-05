import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/balanced-rackets/",
  title: "Best Balanced Badminton Rackets (2026)",
  description:
    "Six even-balance badminton rackets for all-round club play — Arcsaber 11 Pro, Astrox 77 Pro, Halbertec 7000, DriveX 10 Metallic, Nanoflare Nextage.",
});

const config: BestPicksConfig = {
  slug: "balanced-rackets",
  breadcrumbLabel: "Balanced rackets",
  title: "Best balanced badminton rackets (2026)",
  dek: "Even-balance frames for players who refuse to pick smash-only or control-only — six all-round picks for singles, doubles, and mixed club play.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "Why even balance still wins at club level",
    body: "Balanced rackets sit near <strong>290–298mm</strong> balance point — enough head mass for clears and smashes without the slow recovery of head-heavy attack frames or the rear-court load of extreme head-light speed rackets. They suit players who rotate between singles and doubles, or club doubles where you cover both front and rear. If you already know you want net speed or rear-court smash mass, read our <a href=\"/best/head-light-rackets/\">head-light</a> or <a href=\"/best/smash-heavy-rackets/\">smash-heavy</a> guides instead.",
  },
  picks: [
    {
      rank: 1,
      name: "Arcsaber 11 Pro",
      brand: "Yonex",
      priceUsd: 220,
      productId: "yy-arcsaber-11-pro",
      bestFor: "Control-leaning all-round reference",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even (~295mm)" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "The textbook even-balance control frame — pocketing on drops and drives without giving up rear-court stability. Strong default for advanced club players who generate their own power.",
      tradeoff: "Less flat-drive speed than Nanoflare 800 Pro for defensive recovery specialists.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Astrox 77 Pro",
      brand: "Yonex",
      priceUsd: 240,
      productId: "yy-astrox-77-pro",
      bestFor: "Power-leaning all-round",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even / slight head-heavy" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Rotational inertia system adds smash bite while staying playable at the net — the balanced pick when you want Astrox continuity without 88D head mass.",
      tradeoff: "Stiffer than Arcsaber 11 Pro — intermediate players may prefer 77 Tour or Nextage.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Halbertec 7000",
      brand: "Li-Ning",
      priceUsd: 160,
      productId: "ln-halbertec-7000",
      bestFor: "Value all-round at mid budget",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Tectonic pocketing at a lower price than Yonex flagships — strong club all-rounder for doubles rotation and singles practice.",
      tradeoff: "Less crisp on flat speed than Halbertec 9000 Power when drives dominate your game.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "DriveX 10 Metallic",
      brand: "Victor",
      priceUsd: 200,
      productId: "vic-drivex-10-metallic",
      bestFor: "Victor ecosystem all-round",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "DriveX continuity with metallic finish durability — balanced feel for Victor loyalists who split singles and doubles.",
      tradeoff: "Less pocketing than Arcsaber line on soft net shots.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Nanoflare Nextage",
      brand: "Yonex",
      priceUsd: 130,
      productId: "yy-nanoflare-nextage",
      bestFor: "Budget balanced speed",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Even / head-light" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Entry Nanoflare platform with head-light speed bias but playable balance — strong first serious racket for improvers.",
      tradeoff: "Not a flagship — rear-court smash authority trails 77 Pro and 1000Z.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Blade 500 Pro",
      brand: "Li-Ning",
      priceUsd: 140,
      productId: "ln-blade-500-pro",
      bestFor: "Forgiving balanced starter-pro",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium-soft" },
      ],
      why: "Softer shaft and even balance forgive off-centre contact — good bridge from beginner frames without going head-heavy.",
      tradeoff: "Advanced players may outgrow the flex before the balance.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "What balance point counts as balanced?",
      a: "Most manufacturers label 285–298mm as even balance. Below ~285mm is head-light; above ~300mm is head-heavy. Our catalogue stores measured balance where we have it.",
    },
    {
      q: "Should beginners pick balanced rackets?",
      a: "Often yes — balanced frames let you experiment with net and rear-court without committing to one geometry. Softer shafts (medium or hi-flex) matter more than balance for true beginners.",
    },
    {
      q: "Balanced vs control rackets — what's the difference?",
      a: "Control guides prioritise pocketing and placement (often even or slight head-heavy with stiffer shafts). Balanced picks here are all-round frames that still carry enough mass for clears and smashes.",
    },
    {
      q: "Can I use the finder instead of this list?",
      a: "Yes — the IntoBadminton quiz ranks the full catalogue against your level, role, and body. These picks are editorial shortcuts for all-round shoppers.",
    },
  ],
  ctaHeading: "Want a pick tuned to your profile?",
  ctaBody:
    "The finder ranks every racket in our catalogue against your level, doubles role, and budget — with transparent fit scores.",
};

export default function BalancedRacketsPage() {
  return <BestPicksPage config={config} />;
}
