import type { Metadata } from "next";
import { LocalizedHome } from "@/components/LocalizedHome";
import { pageAlternates } from "@/lib/metadata";
import { defaultOgImages } from "@/lib/og";

// Note: `meta keywords` removed (Google has ignored it since 2009; stuffing
// is a soft negative signal for human reviewers — see IMPROVEMENT_PLAN_2026Q2
// §3.1 #5).
export const metadata: Metadata = {
  title: "Badminton Racket, String & Shoe Finder",
  description:
    "Personalised badminton equipment finder — rank rackets, strings, shoes, and bags for your level, style, and budget. Transparent scoring, no signup.",
  alternates: pageAlternates("/"),
  openGraph: {
    title: "IntoBadminton — Badminton Racket, String & Shoe Finder",
    description:
      "Badminton racket, string, shoe, and bag recommendations tuned to your level, style, body, and budget. Transparent fit scoring with source labels.",
    url: "/",
    type: "website",
    siteName: "IntoBadminton",
    locale: "en_US",
    images: [...defaultOgImages],
  },
};

export default function Home() {
  // Organization + WebSite JSON-LD is emitted site-wide from the root layout.
  return <LocalizedHome locale="en" />;
}
