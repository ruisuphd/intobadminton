import type { Metadata } from "next";
import { SourcesPage } from "@/components/SourcesPage";

export const metadata: Metadata = {
  title:
    "Sources & Editorial Process — How We Cite Yonex Specs, BadmintonCN, and Reddit | IntoBadminton",
  description:
    "Where IntoBadminton sources its data and how we triangulate evidence: manufacturer spec sheets first, BadmintonCN and BadmintonCentral threads as cited summaries, BWF tour video reviews for confidence checks, and on-court testing by a competitive player.",
  keywords: [
    "badminton equipment sources",
    "badminton review methodology",
    "BadmintonCN reviews",
    "BadmintonCentral",
    "Yonex specs",
    "Victor specs",
    "Li-Ning specs",
    "editorial process",
  ],
  alternates: {
    canonical: "/sources/",
  },
};

export default function SourcesRoute() {
  return <SourcesPage locale="en" />;
}
