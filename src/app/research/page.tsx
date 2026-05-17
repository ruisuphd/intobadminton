import type { Metadata } from "next";
import { MarketResearchPage } from "@/components/MarketResearchPage";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Market research",
  description:
    "Rights-safe badminton market research signals used to improve equipment recommendations.",
  alternates: { canonical: "/research/" },

  openGraph: {
    url: "/research/",
    images: [...defaultOgImages],
  },
};

export default function ResearchPage() {
  return <MarketResearchPage locale="en" />;
}
