import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Lightweight 5U Badminton Rackets (2026)",
  description:
    "Six 5U and ultralight badminton rackets ranked for swing speed, doubles recovery, and junior transition — Nanoray Light 70i, Bladex Arrow, Thruster SR Light.",
  alternates: pageAlternates("/best/lightweight-rackets-5u/"),
};

const config: BestPicksConfig = {
  slug: "lightweight-rackets-5u",
  breadcrumbLabel: "Lightweight 5U rackets",
  title: "Best lightweight & 5U badminton rackets (2026)",
  dek: "When every gram matters — six frames under ~80g that keep recovery fast without turning into toy-grade aluminium.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "Who actually needs a 5U or ultralight frame",
    body: "5U (75–79g) and 7.0i-class frames exist for three jobs: <strong>juniors graduating from aluminium</strong>, <strong>players returning from shoulder flare-ups</strong>, and <strong>doubles front-court specialists</strong> who live on flat drives. The mistake is buying light to hide bad timing — a stiff 5U still punishes late contact. Pair a light frame with <strong>medium or hi-flex shaft</strong> and a sensible tension window (20–24 lb while rebuilding) unless you already load stiff shafts cleanly.",
  },
  picks: [
    {
      rank: 1,
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
      why: "The reference ultralight Yonex frame — genuinely light without unknown alloys. Teaches head-light recovery before you commit to a heavier 4U club frame.",
      tradeoff: "Not enough mass for competitive rear-court attack — upgrade once timing is stable.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Bladex Arrow (锋影 利箭 / EX)",
      brand: "Li-Ning",
      priceUsd: 32,
      productId: "ln-bladex-arrow",
      bestFor: "Budget 5U doubles front court",
      specs: [
        { label: "Weight", value: "5U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Stiff (speed-oriented)" },
      ],
      why: "Cheapest credible 5U on the catalogue. Fast flat-drive geometry for social doubles when you are still proving badminton is your sport.",
      tradeoff: "Stiff shaft and narrow sweet spot vs Yonex Play tiers — better for quick hands than learning rear-court power.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Thruster SR Light (樱花刃)",
      brand: "Victor",
      priceUsd: 70,
      productId: "vic-thruster-sr",
      bestFor: "Light doubles all-court",
      specs: [
        { label: "Weight", value: "5U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "TK7-platform 5U with medium flex — club-forgiving while keeping recovery quick in mixed doubles. Common second-racket price in Southeast Asia.",
      tradeoff: "Less smash mass than head-heavy options — pick attack frames if power is the goal.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Nanoflare 700 Pro (2024)",
      brand: "Yonex",
      priceUsd: 240,
      productId: "yy-nanoflare-700-pro-2024",
      bestFor: "5U option in a flagship speed line",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "When you want Nanoflare speed DNA but need the 5U swing weight for women's doubles or shoulder caution. More forgiving than the 1000Z stiff platform.",
      tradeoff: "5U variant can be harder to demo locally — confirm weight stamp before buying.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "AxForce 80 JR",
      brand: "Li-Ning",
      priceUsd: 45,
      productId: "ln-axforce-80-jr",
      bestFor: "Junior attack template",
      specs: [
        { label: "Weight", value: "5U" },
        { label: "Balance", value: "Head-heavy (junior)" },
        { label: "Shaft flex", value: "Medium-soft" },
      ],
      why: "Scaled-down Thunder geometry for juniors who outgrew aluminium but are not ready for adult 3U/4U head-heavy frames.",
      tradeoff: "Junior sizing — adults with small grips should still try G5/G6 fit before committing.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Kawasaki Crimson Blade",
      brand: "Kawasaki",
      priceUsd: 55,
      productId: "kawasaki-crimson-blade",
      bestFor: "Value 5U practice frame",
      specs: [
        { label: "Weight", value: "5U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Budget 5U for hall hire and club knockabout — enough graphite quality to learn timing without flagship pricing.",
      tradeoff: "Resale and warranty channels weaker than Yonex/Victor — buy where returns are easy.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Is 5U too light for adult men?",
      a: "Not if you play front court or are rebuilding after shoulder pain. Rear-court smash specialists usually want 4U or 3U mass. Run the finder with your role and injury flags — budget fit and comfort are explicit scoring factors.",
    },
    {
      q: "Should juniors stay on 5U forever?",
      a: "No. Move to 4U once contact timing is consistent and growth plateaus — usually mid-teens for competitive juniors. The Nanoray Light 70i is a bridge, not a destination frame.",
    },
    {
      q: "Does lighter always mean easier on the shoulder?",
      a: "Swing weight matters more than the scale reading. A stiff 5U head-heavy frame can feel harsher than a medium-flex 4U even-balance frame. Prioritise flex and balance, not grams alone.",
    },
  ],
  ctaHeading: "Match weight class to your role and body",
  ctaBody:
    "The finder scores every catalogue racket on level, discipline, comfort flags, and budget — including 5U rows you might otherwise miss.",
};

export default function LightweightRackets5UPage() {
  return <BestPicksPage config={config} />;
}
