import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Badminton Rackets for Shoulder Comfort (2026)",
  description:
    "Six shoulder-friendly badminton rackets — head-light or even balance, forgiving shaft flex, and 4U/5U weight classes ranked for players managing arm load.",
  alternates: pageAlternates("/best/rackets-for-shoulder-comfort/"),
};

const config: BestPicksConfig = {
  slug: "rackets-for-shoulder-comfort",
  breadcrumbLabel: "Shoulder-comfort rackets",
  title: "Best badminton rackets for shoulder comfort (2026)",
  dek: "Frames that reduce arm load without giving up club-level play — prioritising head-light recovery, medium flex, and honest weight class over smash marketing.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What makes a racket shoulder-friendly",
    body: "Shoulder pain in badminton usually comes from <strong>swing weight + stiff shaft + over-tension</strong>, not from playing badminton itself. The fix is rarely “buy the lightest frame on the shelf.” Start with <strong>head-light or even balance</strong>, <strong>medium or hi-flex shaft</strong>, and <strong>4U (or 5U while rebuilding)</strong>. Drop tension 2 lb at the next restring. If pain persists, see a physio — equipment helps only after load management.",
  },
  picks: [
    {
      rank: 1,
      name: "Nanoflare 700 Pro (2024)",
      brand: "Yonex",
      priceUsd: 240,
      productId: "yy-nanoflare-700-pro-2024",
      bestFor: "Club doubles with shoulder caution",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Head-light Nanoflare recovery without 1000Z stiffness. Founder notes the 5U variant as beginner-friendly while keeping speed-frame feel.",
      tradeoff: "Less rear-court smash than head-heavy Astrox — choose attack only if timing is already clean.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Arcsaber 7 Pro",
      brand: "Yonex",
      priceUsd: 220,
      productId: "yy-arcsaber-7-pro",
      bestFor: "Even-balance control without harsh stiffness",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Control-line geometry with a shaft flex club players can actually load. Teaches placement before chasing extra-stiff attack frames.",
      tradeoff: "Not the fastest flat-drive frame — doubles specialists may want Nanoflare speed instead.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Nanoflare 1000 Play",
      brand: "Yonex",
      priceUsd: 75,
      productId: "yy-nanoflare-1000-play",
      bestFor: "Return-to-play after time off",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Play-tier head-light Nanoflare shape with medium flex — keeps mishits from shocking the shoulder while you rebuild timing.",
      tradeoff: "Softer feel than Pro tiers — plan to upgrade once you consistently load a medium shaft.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "DriveX 8S",
      brand: "Victor",
      priceUsd: 180,
      productId: "vic-drivex-8s",
      bestFor: "Victor all-court with medium flex",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "DriveX platform even balance with medium flex — predictable on defensive lifts and flat drives without Astrox-level head mass.",
      tradeoff: "Less marketing pull than Yonex flagships; demo availability varies by region.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Altius N-Feel",
      brand: "Mizuno",
      priceUsd: 200,
      productId: "mizuno-altius-01-feel",
      bestFor: "Softest flagship-class feel",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Mizuno’s feel-forward line — dampened feedback and medium flex suit players who want less shock at contact without going full hi-flex Play tier.",
      tradeoff: "Smaller demo network than Yonex/Victor in Western markets.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Nanoray Light 70i",
      brand: "Yonex",
      priceUsd: 99,
      productId: "yy-nanoray-light-70i",
      bestFor: "Minimum swing weight while rehabbing",
      specs: [
        { label: "Weight", value: "~70 g (7.0i class)" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Hi-flex" },
      ],
      why: "Lowest swing weight on this list — useful for short rehab sessions or warming up before switching to your main 4U frame.",
      tradeoff: "Not match-ready for rear-court attack; treat as a bridge, not a forever racket.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Should I drop tension for shoulder pain?",
      a: "Usually yes — try 2 lb below your current bed on the next restring. Higher tension narrows the sweet spot and transmits more shock on off-centre contact.",
    },
    {
      q: "Are head-heavy rackets always bad for shoulders?",
      a: "They load the shoulder more on recovery, especially with stiff shafts. If you already smash cleanly and pain-free, a moderate head-heavy frame can be fine. If you are managing flare-ups, default head-light or even.",
    },
    {
      q: "When should I see a physio instead of changing rackets?",
      a: "If pain lasts more than two weeks, wakes you at night, or worsens despite load changes. Equipment tuning helps only alongside proper rehab.",
    },
  ],
  ctaHeading: "Score rackets against your comfort flags",
  ctaBody:
    "This page shortlists head-light and even frames for shoulder-friendly setups. The finder’s joint flags cover knee, ankle, and heel — use those plus level and discipline for a personalised score, then keep balance and tension conservative if shoulders are the concern.",
};

export default function RacketsForShoulderComfortPage() {
  return <BestPicksPage config={config} />;
}
