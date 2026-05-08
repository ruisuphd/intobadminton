import type { Metadata } from "next";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title:
    "Best Smash Rackets in Badminton 2026 — Astrox 100ZZ, 99 Pro, 88D Pro, Halbertec 9000 | IntoBadminton",
  description:
    "Six head-heavy attack rackets ranked by smash power, rally continuity, and shaft hardness your shoulder can actually drive. Yonex Astrox 100ZZ, 99 Pro, 88D Pro 2024, Li-Ning Halbertec 9000 Power, Victor Auraspeed 100X SE — for singles and rear-court doubles.",
  keywords: [
    "best smash badminton racket",
    "best attacking badminton racket",
    "Yonex Astrox 100ZZ",
    "Yonex Astrox 99 Pro",
    "Yonex Astrox 88D Pro",
    "Li-Ning Halbertec 9000 Power",
    "Victor Auraspeed 100X SE",
    "Yonex Astrox 100ZZ Viktor Axelsen",
    "head-heavy badminton racket",
    "stiff shaft badminton",
    "singles badminton racket",
  ],
  alternates: { canonical: "/best/smash-heavy-rackets/" },
};

const config: BestPicksConfig = {
  slug: "smash-heavy-rackets",
  breadcrumbLabel: "Smash rackets",
  title: "Best smash rackets in badminton (2026)",
  dek: "Six head-heavy attack frames ranked for smash power, continuity across long rallies, and the shaft hardness your shoulder can actually drive.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What separates a smash racket from a power racket",
    body: "All head-heavy rackets feel powerful on a single smash. The honest test is the third smash in a row when your shoulder is tired. The best smash frames combine a head-heavy balance with a shaft that snaps back fast enough that you do not have to muscle every rep. <strong>If your timing is not yet repeatable, an extra-stiff shaft will reduce your real-game power, not increase it.</strong>",
  },
  picks: [
    {
      rank: 1,
      name: "Astrox 100ZZ",
      brand: "Yonex",
      priceUsd: 320,
      bestFor: "Singles attack with elite timing",
      specs: [
        { label: "Weight", value: "3U / 4U" },
        { label: "Balance", value: "Head-heavy (~300mm)" },
        { label: "Shaft flex", value: "Extra stiff" },
      ],
      why: "The marquee smash racket. Massive top-end power and fast repulsion when you load it cleanly. Founder's firsthand take: very demanding but surprisingly fast and very repulsive. Try the 100ZZ VA before this if you find the regular ZZ punishing.",
      tradeoff: "Tiring across full matches. The new-color Astrox 88D Pro now beats it on overall package for many players.",
      image: {
        url: "https://www.badmintonplanet.eu/media/mf_webp/jpg/media/catalog/product/cache/823e6533370b49d0344e6a0285824513/y/o/yonex_astrox_100zz_kurenai.webp",
        source: "yonex",
        credit: "Image: Yonex / via BadmintonPlanet",
        alt: "Yonex Astrox 100ZZ Kurenai badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 2,
      name: "Astrox 99 Pro",
      brand: "Yonex",
      priceUsd: 290,
      bestFor: "Rear-court singles with technique",
      specs: [
        { label: "Weight", value: "3U / 4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "The 99 Pro 2 is the friendlier path to a Yonex pro-tier smash frame. Slightly less brutal shaft than the 100ZZ, with similar real-match power for amateurs. Strong all-rounder if your singles pattern is built around back-court attack.",
      tradeoff: "Still demanding. If you compete in doubles too, the 88S Pro is more flexible.",
      image: {
        url: "https://www.badmintonplanet.eu/media/mf_webp/jpg/media/catalog/product/cache/823e6533370b49d0344e6a0285824513/y/o/yonex_astrox_99_pro_white_tiger_badmintonplanet.webp",
        source: "yonex",
        credit: "Image: Yonex / via BadmintonPlanet",
        alt: "Yonex Astrox 99 Pro White Tiger badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 3,
      name: "Astrox 88D Pro (2024)",
      brand: "Yonex",
      priceUsd: 240,
      bestFor: "Doubles rear-court attack",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy (~305-308mm)" },
        { label: "Shaft flex", value: "Very stiff" },
      ],
      why: "Better continuity than the original camel-gold version — the new shaft loads and unloads faster, which is what really matters across a 30-shot rally. Some BadmintonCN reviewers now rank the new-color 88D Pro above the 100ZZ on overall package.",
      tradeoff: "Less raw top-end smash than the 100ZZ. Front-court players will prefer the 88S Pro.",
      image: {
        url: "https://www.badmintonplanet.eu/media/mf_webp/jpg/media/catalog/product/cache/823e6533370b49d0344e6a0285824513/y/o/yonex_astrox_88_d_pro.webp",
        source: "yonex",
        credit: "Image: Yonex / via BadmintonPlanet",
        alt: "Yonex Astrox 88D Pro 2024 badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    // Note: image is the standard Halbertec 9000 (the Power variant uses the
    // same paint scheme, just heavier 3U weight). Replace with Power-specific
    // image if Li-Ning ships a separate marketing image for the Power SKU.
    {
      rank: 4,
      name: "Halbertec 9000 Power",
      brand: "Li-Ning",
      priceUsd: 260,
      bestFor: "Maximum smash mass per dollar",
      specs: [
        { label: "Weight", value: "3U / 4U" },
        { label: "Balance", value: "Heavy head" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Li-Ning's heaviest-feeling pro frame. The 9000 Power genuinely rivals 100ZZ-tier smash mass at a lower price, and the build quality has caught up with Yonex's flagships in recent years.",
      tradeoff: "The frame demands strength. Skip if you have shoulder, elbow, or wrist comfort flags.",
      image: {
        url: "https://sw3295.sfstatic.io/upload_dir/shop/_thumbs/Li-Ning-Halbertec-9000.w800.h800.fill.png",
        source: "lining",
        credit: "Image: Li-Ning / via Li-Ning Family",
        alt: "Li-Ning Halbertec 9000 badminton racket (Power variant)",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    // TODO: image — Victor Auraspeed 100X SE (Mohammad Ahsan signature).
    // Try victorsport.com/product/auraspeed-100x-se-h or au.victorsport.com
    // (their site is JS-rendered; open in browser and copy image URL).
    {
      rank: 5,
      name: "Auraspeed 100X SE (Mohammad Ahsan)",
      brand: "Victor",
      priceUsd: 270,
      bestFor: "Singles attacker who values speed too",
      specs: [
        { label: "Weight", value: "3U / 4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "A speed-leaning attack frame — closer to a hybrid between Astrox and Nanoflare than either. Smash mass is lower than 100ZZ but recovery between shots is meaningfully faster, which is why Ahsan's tour pairing favoured this profile.",
      tradeoff: "Top-end smash is bottleneck for pure singles attackers; choose 100ZZ or 99 Pro if smash is everything.",
    },
    {
      rank: 6,
      name: "Astrox 100ZZ VA (Viktor Axelsen)",
      brand: "Yonex",
      priceUsd: 340,
      bestFor: "100ZZ feel, less punishment",
      specs: [
        { label: "Weight", value: "3U / 4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Extra stiff (slightly tuned)" },
      ],
      why: "Viktor Axelsen's signature 100ZZ tune is what most amateur 100ZZ buyers actually want. Same iconic frame profile, slightly more forgiving on imperfect timing. If you tried the regular 100ZZ and felt punished, this is the answer.",
      tradeoff: "Premium pricing. Limited availability in some regions — verify retailer stock.",
      image: {
        url: "https://www.badmintonplanet.eu/media/mf_webp/jpg/media/catalog/product/cache/823e6533370b49d0344e6a0285824513/1/0/100va_zz_1.webp",
        source: "yonex",
        credit: "Image: Yonex / via BadmintonPlanet",
        alt: "Yonex Astrox 100VA ZZ Viktor Axelsen badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
  ],
  faqs: [
    {
      q: "How do I tell if my shaft is too stiff for me?",
      a: "Hit five clears from the back to the back tramlines. If they are reliably long when you connect cleanly but short on imperfect contact, the shaft is roughly right. If clean clears barely reach the doubles service line, the shaft is too stiff for your current swing speed — drop a tier.",
    },
    {
      q: "Should I use 3U or 4U for a smash racket?",
      a: "3U adds smash mass but slows recovery. For singles where you set up the smash from a stable rear-court position, 3U is fine. For doubles where you smash and immediately need to defend the return, 4U is almost always faster and produces more cumulative match power.",
    },
    {
      q: "Does string tension matter more than the racket for smash power?",
      a: "Often, yes. Most amateurs are over-strung. A 100ZZ at 30 lb generates less smash power for a club player than the same racket at 26 lb because the sweet spot is too narrow. Test by dropping 2 lb at the next restring; if power improves, go down another 1 lb.",
    },
    {
      q: "What about the Aeronaut 9000?",
      a: "The Li-Ning Aeronaut 9000C is a real attack frame and a legitimate alternative to 88D Pro / 100ZZ for players who want the wind-tunnel cosmetic and a slightly different swing feel. We rate the Halbertec 9000 Power higher overall on smash density per dollar, but Aeronaut buyers rarely regret the choice.",
    },
  ],
  ctaHeading: "Get a smash racket your timing can actually drive",
  ctaBody: "Tell the finder your level, body, and discipline. We will rank attack frames by what you can repeat, not just what reads heaviest on paper.",
};

export default function SmashHeavyRacketsPage() {
  return <BestPicksPage config={config} />;
}
