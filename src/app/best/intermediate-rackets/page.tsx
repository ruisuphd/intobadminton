import type { Metadata } from "next";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best intermediate badminton rackets (2026 picks)",
  description:
    "Six badminton rackets for intermediate club players who have outgrown beginner frames but are not ready for extra-stiff pro shafts. Picks by role and budget.",
  alternates: { canonical: "/best/intermediate-rackets/" },
};

const config: BestPicksConfig = {
  slug: "intermediate-rackets",
  breadcrumbLabel: "Intermediate rackets",
  title: "Best intermediate badminton rackets (2026)",
  dek: "You can clear from back to back, you defend smashes more than half the time, and beginner rackets feel underpowered. These six are the right next step.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "When you have outgrown a beginner racket",
    body: "The intermediate window is the most slept-on tier in badminton equipment. Beginner rackets feel underpowered, but pro flagships will actively make you worse. The sweet spot is a <strong>medium-stiff or stiff shaft</strong>, <strong>4U weight</strong>, and a balance that matches your role — head-light if you defend more than you smash, slightly head-heavy if you set up rallies from the rear.",
  },
  picks: [
    {
      rank: 1,
      name: "Astrox 77 Pro",
      brand: "Yonex",
      priceUsd: 220,
      bestFor: "All-court intermediate (most players)",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Slightly head-heavy" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "The honest 'graduation racket'. Forgives mishits a 88D Pro punishes, and gives enough head weight to start training rear-court attack without overcommitting. Founder's previous main racket — confirmed transition-friendly.",
      tradeoff: "Plateaus once you can drive a stiffer pro shaft cleanly. Plan ~1-2 years before the next upgrade.",
    },
    {
      rank: 2,
      name: "Astrox 88S Pro (2024)",
      brand: "Yonex",
      priceUsd: 240,
      bestFor: "Front-court doubles / mixed doubles",
      specs: [
        { label: "Weight", value: "4U (~84g)" },
        { label: "Balance", value: "Slight head-heavy (~301mm)" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "The most versatile pro-tier racket on the market right now. Founder uses this as the daily driver. Demanding when your timing is off, exceptional when it is on, and the sweet spot is more generous than the spec sheet implies.",
      tradeoff: "Stiff shaft expects clean contact. Skip if you still mishit more than 20% of overheads.",
    },
    {
      rank: 3,
      name: "Arcsaber 11 Pro",
      brand: "Yonex",
      priceUsd: 235,
      bestFor: "Control players who hate stiff frames",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "A throwback to old-school control rackets. Soft-feeling pocketing on contact, very predictable trajectories on drops and net play. If you grew up on Arcsaber 10 and never moved on, this is the modern equivalent.",
      tradeoff: "Lower top-end smash than 88-line frames. Less suited to attack-heavy singles.",
    },
    {
      rank: 4,
      name: "Halbertec 8000",
      brand: "Li-Ning",
      priceUsd: 215,
      bestFor: "Intermediate doubles attack",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Mild head-heavy" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Li-Ning's intermediate doubles workhorse. Cleaner build quality than older Halbertec generations, and a meaningful price gap below the 88D Pro 2024 with overlapping play characteristics.",
      tradeoff: "Less liquid resale outside Asia. Restring on a stringer who knows Li-Ning grommets.",
    },
    {
      rank: 5,
      name: "Auraspeed 90K II",
      brand: "Victor",
      priceUsd: 200,
      bestFor: "Speed-leaning intermediate doubles",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "A genuine speed racket at sub-$200. Recovers between shots fast, defends well, and the second-generation tune is noticeably crisper than the original 90K. A great way to test whether you actually like head-light frames before spending Nanoflare 1000Z money.",
      tradeoff: "Less smash mass than even-balance options. Pure singles attackers will outgrow it quickly.",
    },
    {
      rank: 6,
      name: "DriveX 12 Metallic",
      brand: "Victor",
      priceUsd: 175,
      bestFor: "Intermediate flat-drive doubles",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "DriveX 12 has a quiet cult following among players who play almost entirely doubles below the front service line. Stable on flat drives, fast on net interceptions, and built around the exact rally pattern doubles produces.",
      tradeoff: "Smaller frame profile is less forgiving on rear-court overheads.",
    },
  ],
  faqs: [
    {
      q: "How do I know I'm 'intermediate' and not beginner?",
      a: "Three rough markers: you can clear from back-line to back-line on most reps, you can hold a 5-shot rally above club average without making the unforced error, and your rackets are starting to feel underpowered or twitchy when you connect cleanly. If you tick all three, intermediate frames will help you. If you tick one, stay on a forgiving beginner frame longer.",
    },
    {
      q: "Should I jump to a 100ZZ or 99 Pro now?",
      a: "Almost never. Pro flagships are tuned around extreme stiffness and unforgiving sweet spots. Most intermediate players regress on contact consistency for 4-8 weeks after switching, and many never recover. The 77 Pro and 88S Pro are the safer pro-tier entry points.",
    },
    {
      q: "How long should an intermediate racket last me?",
      a: "Plan 1-2 years before the next upgrade. The transition from intermediate to advanced is more about training volume than equipment — once you can reliably load a stiffer shaft, the racket will tell you it is time. Until then, restring more often and save the racket budget for shoes and coaching.",
    },
    {
      q: "What about Li-Ning AxForce — is that intermediate?",
      a: "AxForce 90 New and AxForce 80 sit between intermediate and advanced. AxForce 80 is comfortably intermediate-friendly. AxForce 90 New leans advanced — drive-able by motivated intermediate players but punishing if your timing slips. Read the deep-dive blog post for the head-to-head against Yonex 88DP.",
    },
  ],
  ctaHeading: "Take the racket finder to land on the right frame",
  ctaBody: "We score the intermediate tier against your role, level, and body — so you upgrade once, not three times in a year.",
};

export default function IntermediateRacketsPage() {
  return <BestPicksPage config={config} />;
}
