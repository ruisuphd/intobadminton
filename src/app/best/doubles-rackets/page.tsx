import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/doubles-rackets/",
  title: "Best Doubles Badminton Rackets 2026",
  description:
    "Six doubles badminton rackets ranked for front-court speed, defensive recovery, and rear-court continuity — Yonex 88S Pro, Nanoflare 1000Z, Auraspeed HS Plus.",
});

const config: BestPicksConfig = {
  slug: "doubles-rackets",
  breadcrumbLabel: "Doubles rackets",
  title: "Best badminton rackets for doubles (2026)",
  dek: "Doubles is won between blocks, drives, and recovery. Six rackets ranked for that game — front court, rear court, and the players who switch.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What 'best for doubles' actually means",
    body: "Doubles is the fastest discipline in badminton. The rally lasts longer than singles, the second shot arrives before you have recovered, and most points are won (or saved) between net touches and flat drives. <strong>Speed and torsional stability matter more than raw smash mass.</strong> Pick a 4U head-light or even-balance frame as your default, and only graduate to head-heavy attack rackets if you reliably play rear court and your timing is consistent.",
  },
  picks: [
    {
      rank: 1,
      name: "Astrox 88S Pro (2024)",
      brand: "Yonex",
      priceUsd: 260,
      bestFor: "Front-court / mixed doubles control",
      specs: [
        { label: "Weight", value: "4U (~84g)" },
        { label: "Balance", value: "Slight head-heavy (~301mm)" },
        { label: "Shaft flex", value: "Stiff (Namd Flex Force)" },
      ],
      why: "Currently rated above the Halbertec 8000 / 9000 and Arcsaber 11 Pro on combined control and smash quality. Founder's main racket. Best in class if your job is to organise the rally with placement, not bury smashes.",
      tradeoff: "If you only play rear court and your match-winner is the smash, the 88D Pro version is the better fit.",
      evidenceLevel: "owned",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/3AX88S-T_Silver_Black_1_02.jpg?v=1740597468&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Astrox 88S Pro 3rd Gen badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 2,
      name: "Nanoflare 1000Z",
      brand: "Yonex",
      priceUsd: 289,
      bestFor: "Pure speed doubles and defense",
      specs: [
        { label: "Weight", value: "4U (~84g)" },
        { label: "Balance", value: "Head-light (~290mm)" },
        { label: "Shaft flex", value: "Extra stiff" },
      ],
      why: "The doubles weapon when defense and flat exchanges are the game. Hexagonal Z-axis frame is the best end-speed in the Nanoflare line. DR carbon adds pocketing for crisper drops than other speed frames.",
      tradeoff: "Higher entry threshold than NF700 Pro — you need force and timing to load the stiff shaft.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/NF1000Z_Lightning_Yellow_1.jpg?v=1740596406&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Nanoflare 1000Z badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 3,
      name: "Auraspeed HS Plus",
      brand: "Victor",
      priceUsd: 240,
      bestFor: "Stable, well-rounded doubles attack",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Extra stiff" },
      ],
      why: "Victor's most balanced top-tier doubles frame — stable enough to absorb hard returns, fast enough to cover front-court duties. Pairs well with a partner playing 88D Pro / 100ZZ.",
      tradeoff: "Less marketing pull than Yonex flagships, so resale liquidity is lower outside Asia.",
      image: {
        url: "https://dkjulgymkya8y.cloudfront.net/victor/en_us/product-107409_0_20231128165241.webp",
        source: "victor",
        credit: "Image: Victor (victorsport.com)",
        alt: "Victor Auraspeed HS Plus C badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 4,
      name: "Nanoflare 700 Pro (2024)",
      brand: "Yonex",
      priceUsd: 240,
      bestFor: "Club doubles, women's doubles speed",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "The friendlier sibling of the 1000Z. Lower swing weight, more forgiving shaft, and noticeably easier to recover with on consecutive shots. Strong choice for women's doubles where rally speed exceeds smash power.",
      tradeoff: "Top-end smash power capped relative to head-heavy frames — rear-court specialists may want more.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/NF700P_Midnight_Purple_1.png?v=1740596024&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Nanoflare 700 Pro Midnight Purple badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 5,
      name: "Astrox 88D Pro (2024)",
      brand: "Yonex",
      priceUsd: 290,
      bestFor: "Rear-court men's doubles attack",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy (~305-308mm)" },
        { label: "Shaft flex", value: "Very stiff" },
      ],
      why: "The 2024 reset improved continuity over the camel-gold predecessor — you fatigue less across long rallies because the new shaft loads and unloads faster. Smash power is similar to the original but with a cleaner contact feel.",
      tradeoff: "Stiff shaft punishes timing errors. Skip if you also play significant front court and need defensive speed.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/3ax88d-p_076-1_02.png",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Astrox 88D Pro 3rd Gen badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 6,
      name: "DriveX 8S",
      brand: "Victor",
      priceUsd: 189,
      bestFor: "Budget-conscious club doubles",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Best $100-bracket racket for flat-drive doubles. Light enough for defense, stiff enough to teach clean contact, and built around the exact rally pattern doubles produces.",
      tradeoff: "Pro-tier 88S Pro / 1000Z players will outscore you with absolute equipment ceiling — but at this price, the gap is closer than the price tag suggests.",
      // TODO image: Victor DriveX 8S J — source from victorsport.com/product/drivex-8-s
      // (page is JS-rendered, copy hero image URL from browser inspector).
    },
  ],
  faqs: [
    {
      q: "Should men's doubles and women's doubles use different rackets?",
      a: "On average, women's doubles rallies are slightly faster and feature more flat-drive exchanges, so head-light or even-balance frames usually outperform head-heavy attack rackets. But this is a gross generalisation — pick by the rally style you actually play, not by gender.",
    },
    {
      q: "Front court vs rear court — does it really change the racket?",
      a: "Yes. Front-court players win on early interception and net taps, where swing speed and torsional stability matter most. Rear-court players win on first attack, where head weight helps load the smash. If you switch roles every game, an even-balance frame like the 88S Pro 2024 is the most universal answer.",
    },
    {
      q: "What's the best racket for mixed doubles?",
      a: "Mixed forces both partners into both roles regularly, so all-court frames win. Yonex Astrox 88S Pro 2024, Arcsaber 11 Pro, Victor Auraspeed HS Plus, and Li-Ning Halbertec 9000 (not 9000 Power) are good defaults. Avoid 100ZZ-tier head-heavy frames unless you specifically anchor rear court.",
    },
    {
      q: "Is the new 88D Pro worth upgrading from the camel-gold version?",
      a: "If you already own the original camel-gold 88D Pro and you adapted to its swing weight, the 2024 version is a marginal upgrade — better continuity, slightly less fatigue, similar smash power. If you do not currently own one, buy the 2024. If you are choosing between 88D Pro 2024 and 88S Pro 2024, the S is the more universal answer for amateurs.",
    },
  ],
  ctaHeading: "Pick by your role and partner, not the marketing tier",
  ctaBody: "The finder weighs your discipline, style, level, body, and budget — then names the rackets that actually fit how you play.",
};

export default function DoublesRacketsPage() {
  return <BestPicksPage config={config} />;
}
