import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = editorialPageMetadata({
  path: "/best/singles-rackets/",
  title: "Best Singles Badminton Rackets 2026",
  description:
    "Six singles badminton rackets ranked for full-court coverage, smash continuity, and recovery — Arcsaber 11 Pro, Astrox 99 Pro, Halbertec 9000 Power.",
});

const config: BestPicksConfig = {
  slug: "singles-rackets",
  breadcrumbLabel: "Singles rackets",
  title: "Best badminton rackets for singles (2026)",
  dek: "Singles is a footwork and timing test — six frames that reward full-court coverage without turning every rally into a shoulder gamble.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What singles actually demands from a racket",
    body: "In singles you cover the whole court alone. That means <strong>recovery speed matters as much as smash mass</strong>, and shaft stiffness has to match your contact quality — a frame you cannot load cleanly becomes a liability by the third game. Most competitive singles players sit on <strong>4U even or slight head-heavy</strong> platforms with medium-stiff to stiff shafts. Head-light speed frames can work if your game is placement-first, but rear-court winners usually need more swing weight than a pure Nanoflare template provides.",
  },
  picks: [
    {
      rank: 1,
      name: "Arcsaber 11 Pro",
      brand: "Yonex",
      priceUsd: 240,
      productId: "yy-arcsaber-11-pro",
      bestFor: "All-court singles control",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "The reference even-balance singles frame — enough hold for tight net work without the head-heavy lag that punishes late recovery. Consistent choice for club players stepping up from beginner even-balance frames.",
      tradeoff: "Less raw smash mass than Astrox 99 Pro — pick attack lines if power is the primary weapon.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Astrox 99 Pro",
      brand: "Yonex",
      priceUsd: 280,
      productId: "yy-astrox-99-pro",
      bestFor: "Singles rear-court attack",
      specs: [
        { label: "Weight", value: "4U / 3U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Head-heavy smash platform for singles players who reliably play from the back and want maximum shuttle speed on winners. The stiff shaft rewards clean timing.",
      tradeoff: "Punishes late contact and slow recovery — not a frame for rebuilding shoulder load.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Halbertec 9000 Power",
      brand: "Li-Ning",
      priceUsd: 220,
      productId: "ln-halbertec-9000-power",
      bestFor: "Value singles power",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Thunder-platform power at a lower price tier than Yonex flagships. Strong singles option when you want head-heavy mass without flagship pricing.",
      tradeoff: "Resale and demo availability weaker than Yonex — verify grip size before buying online.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Nanoflare 700 Pro (2024)",
      brand: "Yonex",
      priceUsd: 240,
      productId: "yy-nanoflare-700-pro-2024",
      bestFor: "Speed-first singles / women's singles",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "When your singles game is built on pace and flat exchanges rather than rear-court burying. Head-light recovery helps in long deuce games.",
      tradeoff: "Rear-court winners need more active loading — not the lazy smash frame.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Auraspeed 90K II",
      brand: "Victor",
      priceUsd: 200,
      productId: "vic-auraspeed-90k-ii",
      bestFor: "Singles all-court Victor option",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Victor's stiff even-balance singles workhorse — fast flat exchanges with enough stability for full-court coverage at club level.",
      tradeoff: "Stiff shaft entry threshold — hi-flex players should demo before committing.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Axforce 100 (Gen 2)",
      brand: "Li-Ning",
      priceUsd: 235,
      productId: "ln-axforce-100-gen-2",
      bestFor: "Budget singles attack",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Scaled-down flagship attack geometry for singles players who want head-heavy bite without Astrox 99 Pro pricing.",
      tradeoff: "Build quality and warranty channels vary by region — buy from authorised dealers.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Is 3U or 4U better for singles?",
      a: "Most adults use 4U for singles — enough mass for rear-court power without slowing recovery. 3U suits strong rear-court specialists who rarely lose timing. Run the finder with your body and comfort flags.",
    },
    {
      q: "Should singles players use head-heavy rackets?",
      a: "Only if you play predominantly from the back and your shoulder tolerates the load. All-court singles players often prefer even balance; placement-first players may choose head-light speed frames.",
    },
    {
      q: "How is this list different from smash-heavy best-of?",
      a: "Smash-heavy picks optimise for maximum attack mass. This page balances full-court recovery, control options, and power — including even and head-light frames smash guides skip.",
    },
  ],
  ctaHeading: "Score every singles frame against your body and timing",
  ctaBody:
    "The finder ranks the full catalogue for singles discipline, level, style tags, and budget — with named reason codes for each match.",
};

export default function SinglesRacketsPage() {
  return <BestPicksPage config={config} />;
}
