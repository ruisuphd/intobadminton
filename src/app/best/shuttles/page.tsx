import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/shuttles/",
  title: "Best Badminton Shuttles 2026 — AS-50, Carbonsonic, RSL",
  description:
    "Six badminton shuttles ranked by flight consistency, durability, and cost per rally — Yonex AS-50, Victor Carbonsonic MAX, and four RSL tournament picks.",
});

const config: BestPicksConfig = {
  slug: "shuttles",
  breadcrumbLabel: "Shuttles",
  title: "Best badminton shuttles (2026)",
  dek: "Shuttle choice changes rally rhythm more than most players admit. Six picks ranked by what they actually do — flight stability, durability per tube, and whether feather or synthetic fits your session.",
  productSchemaCategory: "SportingGoods",
  intro: {
    heading: "Choose shuttles by session type, not brand loyalty",
    body: "If you are <strong>drilling clears for an hour</strong>, nylon lasts longer and costs less per rally. If you are <strong>playing club matches</strong>, feather flight teaches timing that plastic cannot. If you are <strong>hosting a tournament</strong>, consistency tube-to-tube matters more than saving $5. Speed code (76 vs 77) should match your venue temperature — ask the venue what they stock before you buy a full case.",
  },
  picks: [
    {
      rank: 1,
      name: "AS-50",
      brand: "Yonex",
      priceUsd: 45,
      productId: "yy-as-50",
      bestFor: "Tournament and BWF-sanctioned match play",
      specs: [
        { label: "Type", value: "Feathered goose" },
        { label: "Speed", value: "76" },
        { label: "BWF", value: "Approved" },
      ],
      why: "The reference tournament shuttle in most Western markets. AS-50 flight is predictable from the first rally, cork base holds shape through long sessions, and tube-to-tube variance is lower than mid-tier feather options.",
      tradeoff: "Premium pricing and short life on mishits. Overkill for casual drilling — use AS-30 or nylon instead.",
      evidenceLevel: "tested",
    },
    {
      rank: 2,
      name: "Carbonsonic MAX",
      brand: "Victor",
      priceUsd: 24,
      productId: "vic-carbonsonic-max-shuttle",
      bestFor: "High-volume practice and synthetic-first clubs",
      specs: [
        { label: "Type", value: "Nylon synthetic" },
        { label: "Speed", value: "77" },
        { label: "BWF", value: "Tier-3 events" },
      ],
      why: "Victor's third-generation synthetic finally closes the flight gap with mid-tier naturals while lasting several times longer per tube. Weight consistency across the tube is tighter than many goose-feather options above $30.",
      tradeoff: "Still not a full substitute for AS-50 in serious feather-only leagues. Sound and spin feedback differ from feather.",
      evidenceLevel: "tested",
      image: {
        url: "https://dkjulgymkya8y.cloudfront.net/images/ba22bfd3-c778-4237-9ee0-532c9434e815.webp",
        source: "victor",
        credit: "Image: Victor Sport (victorsport.com)",
        alt: "Victor Carbonsonic MAX synthetic shuttlecock",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 3,
      name: "Supreme",
      brand: "RSL",
      priceUsd: 32,
      productId: "rsl-supreme-shuttle",
      bestFor: "Club tournaments wanting RSL flight without No.1 pricing",
      specs: [
        { label: "Type", value: "Feathered goose" },
        { label: "Speed", value: "77" },
        { label: "BWF", value: "Approved" },
      ],
      why: "RSL Supreme sits in the stable rear-guard of RSL's competition line — durable cork, clean late-rally trajectory, and better cost per rally than flagship No.1 tubes in many club rotations.",
      tradeoff: "Less brand familiarity at venues that only stock Yonex. Verify speed code with your climate before bulk orders.",
      evidenceLevel: "tested",
    },
    {
      rank: 4,
      name: "Aero U",
      brand: "RSL",
      priceUsd: 35,
      productId: "rsl-aero-u-shuttle",
      bestFor: "Serious club nights and semi-competitive ladders",
      specs: [
        { label: "Type", value: "Feathered goose" },
        { label: "Speed", value: "77" },
        { label: "BWF", value: "Approved" },
      ],
      why: "Half-step above Aero C with thicker feathers and cleaner deceleration on lifts. A strong pick when your group alternates between practice and match intensity within the same session.",
      tradeoff: "Premium within the RSL Aero line — Classic Tourney may be enough if budget is tight.",
      evidenceLevel: "tested",
    },
    {
      rank: 5,
      name: "Classic Tourney",
      brand: "RSL",
      priceUsd: 28,
      productId: "rsl-aero-classic-tourney-shuttle",
      bestFor: "Value tournament feather with honest flight",
      specs: [
        { label: "Type", value: "Feathered goose" },
        { label: "Speed", value: "77" },
        { label: "BWF", value: "Approved" },
      ],
      why: "RSL's premium-value goose shuttle — comparable durability to numbered-series options at lower tube cost. Community testing shows stable arcs and natural deceleration without the cannonball outliers some budget tubes throw.",
      tradeoff: "Mixed left/right wing feathers in some tubes — fine for amateur play, less ideal for elite consistency requirements.",
      evidenceLevel: "tested",
    },
    {
      rank: 6,
      name: "No4 Plus",
      brand: "RSL",
      priceUsd: 22,
      productId: "rsl-no4-plus-shuttle",
      bestFor: "High-volume club practice on a feather budget",
      specs: [
        { label: "Type", value: "Feathered duck/goose blend" },
        { label: "Speed", value: "77" },
        { label: "BWF", value: "Not listed" },
      ],
      why: "Step up from entry RSL practice tubes without jumping to tournament pricing. Good for academies running multi-court drills where shuttle consumption is the main cost driver.",
      tradeoff: "Flight consistency trails Supreme and Aero U. Not for sanctioned events that mandate specific approved models.",
      evidenceLevel: "tested",
    },
  ],
  faqs: [
    {
      q: "Feather or nylon — which should I buy?",
      a: "Nylon for backyard play, schools, and casual drilling where shuttles die from floor contact. Feather for club matches and any session where you are training timing, net spin, or smash defence. Most serious players own both.",
    },
    {
      q: "What shuttle speed code do I need?",
      a: "Speed 76 is the default in temperate climates (roughly 15–25°C). Speed 77 for warmer halls; speed 75 for cold or high-altitude venues. When in doubt, buy what your local club already stocks — mixing speeds within a session changes lift depth.",
    },
    {
      q: "How many shuttles should I bring to club night?",
      a: "One tube (12 feathered or 6 nylon) is enough for a 2-hour recreational session. Competitive doubles: budget 2–3 shuttles per hour. Tournament hosts should plan 4–6 tubes per court for a full day.",
    },
    {
      q: "Why do my shuttles fly differently week to week?",
      a: "Humidity changes feather moisture, hall temperature shifts speed code effective carry, and worn cork bases alter lift. Store tubes cork-down in a cool bag and rotate tubes rather than playing one shuttle until it dies.",
    },
  ],
  ctaHeading: "Browse all shuttles in the catalog",
  ctaBody: "Filter by feather vs nylon, speed code, and brand — then compare specs side by side before you commit to a full case.",
};

export default function BestShuttlesPage() {
  return <BestPicksPage config={config} />;
}
