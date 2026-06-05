import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/control-rackets/",
  title: "Best Control Badminton Rackets (2026)",
  description:
    "Six control-first badminton rackets for placement, doubles net play, and singles rally craft — Astrox 88S Pro, Arcsaber 11 Pro, Halbertec 8000, Nanoflare 800 Pro.",
});

const config: BestPicksConfig = {
  slug: "control-rackets",
  breadcrumbLabel: "Control rackets",
  title: "Best control badminton rackets (2026)",
  dek: "When placement beats raw smash — six frames built for drops, drives, and rally discipline rather than head-heavy power.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What makes a racket a control pick",
    body: "Control frames reward <strong>clean timing and shot selection</strong> over swing mass. Look for pocketing feel (longer dwell on the string bed), even or slight head-heavy balance with a shaft you can load on short strokes, and torsional stability on flat drives. Attack specialists who only win points from the rear court should still read our <a href=\"/best/smash-heavy-rackets/\">smash-heavy guide</a>; this list is for players who organise rallies with placement, net pressure, and defensive recovery.",
  },
  picks: [
    {
      rank: 1,
      name: "Astrox 88S Pro (2024)",
      brand: "Yonex",
      priceUsd: 260,
      productId: "yy-astrox-88s-pro-2024",
      bestFor: "Mixed doubles control + placement",
      specs: [
        { label: "Weight", value: "4U (~84g)" },
        { label: "Balance", value: "Slight head-heavy (~301mm)" },
        { label: "Shaft flex", value: "Stiff (pocketing feel)" },
      ],
      why: "Strongest combined control and smash in current Yonex lineup for front-court doubles — pocketing on drops and hairpins without giving up rear-court stability versus older 88S generations.",
      tradeoff: "Stiff shaft entry threshold; rear-court smash specialists may prefer the 88D Pro line.",
      evidenceLevel: "owned",
    },
    {
      rank: 2,
      name: "Arcsaber 11 Pro",
      brand: "Yonex",
      priceUsd: 220,
      productId: "yy-arcsaber-11-pro",
      bestFor: "Singles and doubles placement",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even (~295mm)" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Control-first all-round reference — even balance and Arcsaber pocketing for advanced club players who generate their own power.",
      tradeoff: "Less flat-drive speed than Nanoflare 800 Pro for defensive recovery specialists.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Halbertec 8000 (战戟 8000)",
      brand: "Li-Ning",
      priceUsd: 180,
      productId: "ln-halbertec-8000",
      bestFor: "Pocketing-led control at lower cost",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Soft-medium" },
      ],
      why: "Tectonic-frame pocketing complements the speedier Halbertec 9000 line — strong value when 88S Pro pricing is out of reach.",
      tradeoff: "Less crisp on flat speed exchanges than 9000 Power — pick 9000P if drives matter more than net touch.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Nanoflare 800 Pro (2024)",
      brand: "Yonex",
      priceUsd: 230,
      productId: "yy-nanoflare-800-pro-2024",
      bestFor: "Defensive recovery + flat drives",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Head-light speed DNA tuned for fast-flat doubles exchanges and block returns — control through recovery speed rather than smash mass.",
      tradeoff: "Less rear-court power than head-heavy attack frames — not a smash-first pick.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Brave Sword 12",
      brand: "Victor",
      priceUsd: 165,
      productId: "vic-brave-sword-12",
      bestFor: "Classic even-balance control",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even (~290mm)" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Iconic Victor all-rounder — forgiving sweet spot and medium shaft for club players still discovering whether they are control- or power-oriented.",
      tradeoff: "Specs still on a partial verification pass — confirm regional SKU before buying.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Halbertec 9000 (战戟 9000)",
      brand: "Li-Ning",
      priceUsd: 210,
      productId: "ln-halbertec-9000",
      bestFor: "Control with faster swing than 8000",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Thinner, faster Halbertec generation marketed as control king — bridges pocketing and flat-drive speed for competitive doubles.",
      tradeoff: "Stiffer and less forgiving than 8000 — needs timing to unlock the pocketing feel.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Is control the same as head-light?",
      a: "No. Head-light helps recovery speed; control is about pocketing, shaft flex, and torsional stability on placement shots. Some control frames are even or slight head-heavy (88S Pro, Arcsaber 11 Pro).",
    },
    {
      q: "Should beginners buy a control racket?",
      a: "Beginners usually benefit from medium-flex, forgiving frames first. See our beginner guide — move to control flagships once timing is consistent.",
    },
    {
      q: "How do I match a control frame to my role?",
      a: "Run the finder with doubles or singles discipline and your style tags. Control-oriented play styles score higher on placement and drive factors than raw smash mass.",
    },
  ],
  ctaHeading: "Score control fit against your level and role",
  ctaBody:
    "The finder ranks every catalogue racket on discipline, style, and comfort — so a control frame is not recommended when your profile needs smash mass.",
};

export default function ControlRacketsPage() {
  return <BestPicksPage config={config} />;
}
