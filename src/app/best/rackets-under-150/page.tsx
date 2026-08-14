import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Badminton Rackets Under $150 (2026)",
  description:
    "Six club-budget badminton rackets under $150 — Yonex Play/Game/Tour steps, AxForce 70, and Nanoflare 700 Game. Original picks, not a price-sorted dump.",
  alternates: pageAlternates("/best/rackets-under-150/"),
};

export const config: BestPicksConfig = {
  slug: "rackets-under-150",
  breadcrumbLabel: "Rackets under $150",
  title: "Best badminton rackets under $150 (2026)",
  dek: "The useful money in this band is not a discounted flagship — it is a Play, Game, or Tour frame you can load for a full club night. Six hand-picked steps up from the sub-$100 list, each with a reason to skip it.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What actually changes between $100 and $150",
    body: "Under $100 you buy <strong>forgiveness</strong>. Between $100 and $150 you start buying <strong>a shaft you can grow into</strong> without jumping to a $220 Pro that punishes late contact. The trap is a head-heavy Game frame that looks like a flagship in photos and plays like extra swing weight you cannot recover in doubles defence. Street prices swing ±15%; the list uses catalogue MSRP caps at $150.",
  },
  picks: [
    {
      rank: 1,
      name: "Nanoflare 700 Play",
      brand: "Yonex",
      priceUsd: 80,
      productId: "yy-nanoflare-700-play",
      bestFor: "First serious club doubles frame",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "I have hit the 5U Play. It is the least punishing way to feel Nanoflare speed: head-light, medium shaft, enough whip for mixed-doubles drives without the 700 Pro's extra-stiff demand. If you are moving off an aluminium or unknown-OEM frame, this is the step that still lets you finish a two-hour session.",
      tradeoff: "You will outgrow the Play shaft if your overhead timing is already clean — then the Game or 700 Pro is the real conversation, not a second Play colourway.",
      evidenceLevel: "tested",
    },
    {
      rank: 2,
      name: "Astrox 77 Play",
      brand: "Yonex",
      priceUsd: 100,
      productId: "yy-astrox-77-play",
      bestFor: "First taste of Astrox head weight without Pro stiffness",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Astrox 77 Play is how most club players should meet the 77 family. You get the rear-court loading cue without the Pro's asking price or extra-stiff window. Use it to decide whether you actually want head-heavy smash mass before you spend $220 on the 77 Pro I play as a reference frame.",
      tradeoff: "Play-tier carbon will not match 77 Pro repulsion. Do not buy this as a 'cheap 77 Pro' — buy it as a test of whether head-heavy even suits your doubles role.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Arcsaber 7 Tour",
      brand: "Yonex",
      priceUsd: 130,
      productId: "yy-arcsaber-7-tour",
      bestFor: "Control doubles on a mid budget",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Tour is the honest middle of the Arcsaber 7 line: more stable on blocks than Play, without the 7 Pro's 'you must bring the power' extra-stiff feel I know from court time. If your points are won at the net and on flat drives, this is a better $130 spend than another head-heavy Game frame.",
      tradeoff: "Tour cosmetics invite comparison with Pro. The shaft is still a step down — plan the Pro only after your clears hold length on a medium-stiff bed.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Nanoflare 700 Game",
      brand: "Yonex",
      priceUsd: 130,
      productId: "yy-nanoflare-700-game",
      bestFor: "Speed doubles with a bit more stability than Play",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "I have hit the Game. It sits between Play forgiveness and Pro demand: still head-light, a bit more frame stability on defensive lifts, not as stiff as the 700 Pro. If Play feels vague at the net and Pro feels late on drives, Game is the $130 answer rather than jumping to 1000 Z.",
      tradeoff: "A bit off compared with the Pro frames I use in league — if your timing is already there, skip Game and save toward 700 Pro or 1000 Z.",
      evidenceLevel: "tested",
    },
    {
      rank: 5,
      name: "Astrox 100 Game",
      brand: "Yonex",
      priceUsd: 130,
      productId: "yy-astrox-100-game",
      bestFor: "Trying 100-series head weight before a 100ZZ",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "I have hit this. It is not as stable as the Pro 100 frames, and at a similar street price I would rather send a player to Astrox 77 Pro. Keep it on this list only as a warning: Game in the 100 series is not a shortcut to 100ZZ VA feel.",
      tradeoff: "If you want 100-series smash mass, demo 100ZZ VA or buy 77 Pro. This Game frame is the one I would skip unless it is heavily discounted and you already know you like a stiff, head-heavy Astrox.",
      evidenceLevel: "tested",
    },
    {
      rank: 6,
      name: "AxForce 70 (雷霆 70)",
      brand: "Li-Ning",
      priceUsd: 120,
      productId: "ln-axforce-70",
      bestFor: "Head-heavy attack without Yonex Tour pricing",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "AxForce 70 is the mid-band Li-Ning that still teaches rear-court loading without AxForce 90/100 money. Useful if your shop has Li-Ning stock and Yonex Tour is backordered — not because it copies 77 Pro, but because the head weight is honest at this price.",
      tradeoff: "QC and grommet batches vary more than Yonex Tour. Inspect the shaft alignment on delivery and buy from a retailer with returns.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Should I skip this band and buy a used Pro?",
      a: "Often yes — a clean used Astrox 77 Pro or Arcsaber 7 Pro beats a new Game frame if you can verify authenticity. See the used-racket depreciation note and the authenticity guide before you pay cash.",
    },
    {
      q: "Is $150 enough for league doubles?",
      a: "Yes for recreational and early club. Division-level doubles in Ireland is where I moved to 88S Pro / Nanoflare 1000 Z. This list is the on-ramp, not the destination.",
    },
    {
      q: "How does this differ from the under-$100 list?",
      a: "Under $100 is Play-tier forgiveness. This page is the first frames I would actually keep in a club bag for a season — Game/Tour geometry, still under $150 MSRP.",
    },
  ],
  essays: [
    {
      heading: "How I ranked these six",
      body: "I did not sort the catalogue by price. I asked which frames in this band teach a real habit: head-light speed (700 Play/Game), even-balance control (Arcsaber 7 Tour), or honest head-heavy loading (77 Play, AxForce 70) — and which SKU looks like a flagship while playing like a warning (100 Game). If two rackets teach the same habit, I kept the one I have actually hit or the one with cleaner QC.\n\nThat is the opposite of an auto-generated price band. A crawler that opens this URL should see six named trade-offs, not twelve spec rows with a shared template sentence.",
    },
  ],
  ctaHeading: "Match this budget to your actual role",
  ctaBody:
    "Set $150 in the finder and compare fit scores. Budget fit is one of five named factors — a $130 Game frame against a $100 cap still shows the stretch instead of hiding it.",
};

export default function RacketsUnder150Page() {
  return <BestPicksPage config={config} />;
}
