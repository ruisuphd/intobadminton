import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { MarketResearchPage } from "@/components/MarketResearchPage";

export const metadata: Metadata = {
  title: "Market research",
  description:
    "Rights-safe badminton market research signals used to improve equipment recommendations.",
  alternates: pageAlternates("/research/"),
};

export default function ResearchPage() {
  return <MarketResearchPage locale="en" />;
}
