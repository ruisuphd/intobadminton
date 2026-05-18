import type { Metadata } from "next";
import { SourcesPage } from "@/components/SourcesPage";

export const metadata: Metadata = {
  title: "Sources & Editorial Process",
  description:
    "How IntoBadminton sources data: manufacturer spec sheets first, BadmintonCN and BadmintonCentral as cited summaries, video reviews as checks, plus on-court testing.",
  alternates: {
    canonical: "/sources/",
  },
};

export default function SourcesRoute() {
  return <SourcesPage locale="en" />;
}
