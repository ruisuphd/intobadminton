import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/all-round-rackets/",
  title: "Best All-Round Badminton Rackets (2026)",
  description:
    "Six balanced badminton rackets for singles and doubles — Arcsaber 11 Pro, Astrox 77 Pro, Halbertec 8000, Nanoflare 700 Pro, DriveX 12, Brave Sword 12.",
});

const config: BestPicksConfig = {
  slug: "all-round-rackets",
  breadcrumbLabel: "All-round rackets",
  title: "Best all-round badminton rackets (2026)",
  dek: "When you need one frame for singles, doubles, and club nights — six even-balance picks that do not force you into a specialist role.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What makes a racket all-round",
    body: "All-round frames sit between attack and control: <strong>even or slight head-heavy balance</strong>, a shaft stiff enough for flat drives but not so harsh that defensive blocks feel brittle, and enough torsional stability to survive mixed-pace rallies. If you already know you only smash from the rear court, read our <a href=\"/best/smash-heavy-rackets/\">smash-heavy guide</a>; if you live at the net, start with <a href=\"/best/control-rackets/\">control rackets</a>. This list is for players who rotate roles or want one racket in the bag.",
  },
  picks: [
    {
      rank: 1,
      name: "Arcsaber 11 Pro",
      brand: "Yonex",
      priceUsd: 220,
      productId: "yy-arcsaber-11-pro",
      bestFor: "Singles + doubles placement",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even (~295mm)" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "The reference control-all-round frame — pocketing feel without giving up enough head speed for rear-court pressure when your timing is clean.",
      tradeoff: "Less flat-drive recovery than Nanoflare 700 Pro for pure defensive specialists.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Astrox 77 Pro",
      brand: "Yonex",
      priceUsd: 200,
      productId: "yy-astrox-77-pro",
      bestFor: "Club singles and mixed doubles",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even (~296mm)" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Easier entry than 88 Pro lines with enough attack bias for club singles — a common step-up from beginner Astrox Play frames.",
      tradeoff: "Not as sharp on net touch as 88S Pro for front-court specialists.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Halbertec 8000",
      brand: "Li-Ning",
      priceUsd: 180,
      productId: "ln-halbertec-8000",
      bestFor: "Doubles rotation + singles craft",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even (~296mm)" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Strong Li-Ning all-round value — stable on drives, forgiving enough for mixed-pace club play, and widely available outside flagship pricing.",
      tradeoff: "9000 Power is the better pick if rear-court smash mass is your main weapon.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Nanoflare 700 Pro",
      brand: "Yonex",
      priceUsd: 210,
      productId: "yy-nanoflare-700-pro-2024",
      bestFor: "Fast doubles with defensive recovery",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light (~293mm)" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Head-light speed with enough pocketing for placement — excellent when your game is split-step first, smash second.",
      tradeoff: "Rear-court finishers who rely on mass may prefer Astrox 88D Pro.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "DriveX 12",
      brand: "Victor",
      priceUsd: 190,
      productId: "vic-drivex-12",
      bestFor: "Victor all-round at club level",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even (~297mm)" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Balanced Victor flagship feel without Thruster head mass — good for players switching from Nanoflare-speed lines who want a touch more stability.",
      tradeoff: "Less outright smash than Thruster Ryuga II for rear-court attackers.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Brave Sword 12",
      brand: "Victor",
      priceUsd: 170,
      productId: "vic-brave-sword-12",
      bestFor: "Budget all-round with Victor DNA",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even (~296mm)" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Older-generation Victor all-round reference still stocked at many clubs — predictable feel and lower replacement cost than current flagships.",
      tradeoff: "Outpaced on flat-drive speed by Nanoflare 700 Pro for defensive doubles.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "What balance is best for an all-round racket?",
      a: "Even balance is the default. Slight head-heavy works if you play more rear court; head-light if you prioritise net speed and defensive recovery.",
    },
    {
      q: "Can one racket work for singles and doubles?",
      a: "Yes at club level. Pick a 4U even-balance frame with medium shaft flex, then adjust string tension by discipline rather than buying two frames immediately.",
    },
    {
      q: "How is this list different from control or smash guides?",
      a: "Control picks prioritise placement over smash mass; smash picks are head-heavy attack frames. All-round picks balance both without specialising.",
    },
  ],
  ctaHeading: "Find your all-round fit in the catalogue",
  ctaBody:
    "The finder scores every racket on level, discipline, and style — so an all-round frame is not pushed when your profile needs pure smash or net-control extremes.",
};

export default function AllRoundRacketsPage() {
  return <BestPicksPage config={config} />;
}
