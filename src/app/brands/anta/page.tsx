import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BrandPage, type BrandPageConfig } from "@/components/BrandPage";
import { defaultOgImages } from "@/lib/og";
import { reviewPath } from "@/lib/review-pages";

export const metadata: Metadata = {
  title: "Anta Badminton (安踏) — AH600W entry racket decoded",
  description:
    "Anta (安踏) is a major Chinese sportswear group testing badminton rackets. The AH600W is a 5U balanced beginner frame — honest OEM entry-level, worth watching as the line grows.",
  alternates: pageAlternates("/brands/anta/"),
  openGraph: {
    title: "Anta Badminton Rackets Decoded — AH600W Entry Frame",
    description:
      "How Anta's first badminton racket line maps to skill level and budget. AH600W specs, who it suits, and how it compares to specialist-brand entry rackets.",
    url: "/brands/anta/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anta (安踏) Badminton — AH600W Entry Racket Decoded",
    description:
      "Sportswear giant Anta's debut badminton racket: 5U balanced beginner blade, community-sourced specs, and who should actually buy it.",
  },
};

const config: BrandPageConfig = {
  slug: "anta",
  brandName: "Anta",
  brandNameZh: "安踏",
  founded: 1991,
  hqCountry: "China",
  officialUrl: "https://www.anta.com/",
  title: "Anta badminton: a sportswear giant's first racket, honestly assessed",
  dek: "Anta (安踏) is one of China's largest sportswear companies and has recently entered badminton rackets. The early catalogue is entry-level and OEM-built — but the distribution scale makes this a brand to watch, not dismiss.",
  intro:
    "Anta dominates basketball and running footwear in China and sponsors major athletes globally. Its badminton debut is modest: sparse graphics, basic box-section frames, and community-sourced spec sheets rather than detailed English product pages. That honesty matters for buyers — this is not a hidden flagship, but a competent first racket from a company with the budget to iterate quickly if the category gains traction.",
  positioning:
    "Anta's early badminton line targets beginners and casual club players who already buy Anta apparel. The AH600 (4U) and AH600W (5U) are balanced, forgiving frames with mid-low stiffness and 24–26 lb factory stringing. Confirm the model code before buying — AH600 and AH600W differ in weight class.",
  lines: [
    {
      name: "AH600 / AH600W — entry balanced rackets",
      bestFor: "True beginners and casual knock-about play inside the Anta retail ecosystem",
      description:
        "The AH600W tested on IntoBadminton is a 5U/G6 frame (~82 g) with 299 mm balance, mid-low stiffness, a 76-hole box frame, and factory stringing in the 24–26 lb range. Handling is light and drivable rather than explosive. Build quality is honest entry-level — likely OEM-sourced — but edges above 'nothing special' for the price tier. The AH600 is the 4U sibling; weight class is the main buying filter.",
      signatureModels: ["AH600W (5U)", "AH600 (4U)"],
    },
  ],
  topPicks: [
    {
      name: "Anta AH600W",
      line: "AH600W",
      bestFor: "Beginners wanting a light, forgiving first racket from a familiar brand",
      priceUsd: 45,
      href: reviewPath("anta-ah600w"),
    },
  ],
  faqs: [
    {
      q: "Is Anta a serious badminton brand yet?",
      a: "Not in the Yonex / Victor / Li-Ning sense. Anta is testing the category with entry-level OEM frames. The AH600W is respectable for a debut but lacks the spec depth, string support, and upgrade path of specialist brands. Watch the line — Anta's scale means a second wave could arrive quickly if sales justify it.",
    },
    {
      q: "AH600 vs AH600W — which should I buy?",
      a: "AH600W is 5U (lighter, ~82 g set up) and suits juniors, smaller players, and anyone who wants maximum manoeuvrability. AH600 is 4U and carries slightly more head weight for players who can supply their own power. Confirm the model code on the shaft sticker — retailers sometimes list them interchangeably.",
    },
    {
      q: "Who should skip Anta rackets for now?",
      a: "Improving club players chasing a long-term frame should look at Yonex, Victor, Li-Ning, Bonny, or Kumpoo entry-and-mid tiers instead — clearer upgrade paths, better string support, and more independent reviews. Anta makes sense as a spare, a gift inside the Anta store, or a curiosity buy, not as a primary competition racket yet.",
    },
  ],
  relatedLinks: [
    { label: "Anta AH600W review", href: "/review/anta-ah600w-racket-review/" },
    { label: "Beginner rackets best-of", href: "/best/beginner-rackets/" },
    { label: "Equipment finder quiz", href: "/quiz/" },
    { label: "How to choose a racket", href: "/review/how-to-choose-a-badminton-racket/" },
  ],
};

export default function AntaBrandPage() {
  return <BrandPage config={config} />;
}
