import type { Metadata } from "next";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best badminton strings (2026 picks)",
  description:
    "Six badminton strings ranked by feel, repulsion, control, and durability — for beginners, club players, and tournament-tier players. Honest tradeoffs, recommended tensions.",
  alternates: { canonical: "/best/strings/" },
};

const config: BestPicksConfig = {
  slug: "strings",
  breadcrumbLabel: "Strings",
  title: "Best badminton strings (2026)",
  dek: "Strings change feel more per dollar than any other piece of badminton equipment. Six picks ranked by what they actually do — repulsion, control, durability, and how they feel two weeks after stringing.",
  productSchemaCategory: "SportingGoods",
  intro: {
    heading: "Choose strings by outcome, not brand",
    body: "If your <strong>clears die short</strong>, you want a thinner, more elastic string and possibly lower tension. If your <strong>drops sit up</strong>, you want a higher-control string with more bite. If you <strong>break strings every two weeks</strong>, durability and tension hold matter more than feel. Most amateurs are over-strung — start at 22-24 lb if you are unsure, and only go higher when your contact is consistent.",
  },
  picks: [
    {
      rank: 1,
      name: "BG65",
      brand: "Yonex",
      priceUsd: 7,
      bestFor: "Most beginners and high-volume club players",
      specs: [
        { label: "Gauge", value: "0.70 mm" },
        { label: "Feel", value: "Soft / forgiving" },
        { label: "Durability", value: "Very high" },
      ],
      why: "The world's most-played badminton string for a reason. BG65 forgives bad contact, holds tension, lasts forever, and costs nothing. If you are stringing your first racket or you snap strings every fortnight, this is your default.",
      tradeoff: "Less crisp feel than premium strings. Once your technique is consistent, you will notice the muffled response.",
    },
    {
      rank: 2,
      name: "BG80",
      brand: "Yonex",
      priceUsd: 9,
      bestFor: "Club players upgrading from BG65",
      specs: [
        { label: "Gauge", value: "0.68 mm" },
        { label: "Feel", value: "Crisp" },
        { label: "Durability", value: "Medium" },
      ],
      why: "The classic 'first upgrade' string. Noticeably more repulsion than BG65, sharper sound on contact, and meaningfully more crisp on smashes. The sweet spot for most adult club players.",
      tradeoff: "Breaks faster than BG65 — plan to restring every 4-8 weeks if you play 2+ times per week.",
    },
    {
      rank: 3,
      name: "EXBOLT 63",
      brand: "Yonex",
      priceUsd: 13,
      bestFor: "Tournament-tier control + power",
      specs: [
        { label: "Gauge", value: "0.63 mm" },
        { label: "Feel", value: "Very crisp" },
        { label: "Durability", value: "Low-medium" },
      ],
      why: "Yonex's modern flagship string — the thinnest gauge in their tournament line. Generates exceptional repulsion at moderate tension, with surprisingly good control thanks to the heat-treated coating. Many tour pros prefer this over BG80.",
      tradeoff: "Snaps fast on mishits and abrasive court surfaces. Best at 24-27 lb for amateurs; pros run higher.",
    },
    {
      rank: 4,
      name: "Aerobite",
      brand: "Yonex",
      priceUsd: 16,
      bestFor: "Players who slice / hit drops",
      specs: [
        { label: "Gauge", value: "0.61 / 0.67 mm hybrid" },
        { label: "Feel", value: "Textured / biting" },
        { label: "Durability", value: "Medium" },
      ],
      why: "Hybrid string — thinner power string in the mains, textured control string in the crosses. Distinctly more bite on slices and net spin than any single-string setup. The thinking-player's choice.",
      tradeoff: "Marmite. Some players love the texture; others find the feedback too harsh. Try a friend's racket before committing.",
    },
    {
      rank: 5,
      name: "L69",
      brand: "Li-Ning",
      priceUsd: 8,
      bestFor: "Best non-Yonex string under $10",
      specs: [
        { label: "Gauge", value: "0.69 mm" },
        { label: "Feel", value: "Crisp" },
        { label: "Durability", value: "Medium-high" },
      ],
      why: "Li-Ning's mid-tier string has caught up with Yonex BG80 on feel while costing less and lasting slightly longer. Strong choice for club players who restring 4-6 times per year.",
      tradeoff: "Less brand familiarity at non-specialist stringers. Bring your own reel if you play in mixed shops.",
    },
    {
      rank: 6,
      name: "BG80 Power",
      brand: "Yonex",
      priceUsd: 10,
      bestFor: "Smash-heavy players who want max repulsion",
      specs: [
        { label: "Gauge", value: "0.68 mm" },
        { label: "Feel", value: "Crisp + powerful" },
        { label: "Durability", value: "Medium" },
      ],
      why: "BG80's louder sibling. Same gauge, slightly different polymer mix that adds extra repulsion at the cost of a little control. The right pick if your priority is smash power and you do not mind a slightly less precise touch on net play.",
      tradeoff: "Less control than EXBOLT 63 or Aerobite. Front-court doubles specialists may prefer those instead.",
    },
  ],
  faqs: [
    {
      q: "What tension should I string my badminton racket at?",
      a: "If your racket weight is 4U/5U and you are a club player: 22-24 lb is the safe range. 4U intermediate doubles: 24-26 lb. Pro-level singles attackers: 27-29 lb. Anything above 30 lb on amateur swing speed reduces real-game power because the sweet spot becomes too narrow.",
    },
    {
      q: "How often should I restring my racket?",
      a: "Restring at the earlier of: every 30-50 sessions of regular play, OR every 3-4 months even if the string has not broken, OR immediately if you can press through the bed-plane more than 1cm with your finger. Tension drops well before the string visibly fails.",
    },
    {
      q: "Why does my string break in the same spot every time?",
      a: "Mishits. If a string breaks repeatedly near the top of the frame, you are catching shuttles toward the rim instead of the sweet spot. Drop tension by 1-2 lb and work on contact-point drills before upgrading to a more durable string.",
    },
    {
      q: "Are pre-strung rackets okay for beginners?",
      a: "Factory string is usually a low-tension generic — 18-20 lb of unspecified material. It is fine for the first 5 sessions while you confirm you like the racket. Restring at the first opportunity with BG65 at 22 lb; the racket will feel like a different model.",
    },
  ],
  ctaHeading: "Run the string finder to land on the right gauge and tension",
  ctaBody: "We score strings against your level, smash style, and string-breakage history — so you do not pay for tour-tier durability you do not need.",
};

export default function BestStringsPage() {
  return <BestPicksPage config={config} />;
}
