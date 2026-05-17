import type { Metadata } from "next";
import { SourcesPage } from "@/components/SourcesPage";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Sources & Editorial Process",
  description:
    "How IntoBadminton sources data: manufacturer spec sheets first, BadmintonCN and BadmintonCentral as cited summaries, video reviews as checks, plus on-court testing.",
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

  openGraph: {
    url: "/sources/",
    images: [...defaultOgImages],
  },
};

export default function SourcesRoute() {
  return <SourcesPage locale="en" />;
}
