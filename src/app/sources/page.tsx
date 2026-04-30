import type { Metadata } from "next";
import { SourcesPage } from "@/components/SourcesPage";

export const metadata: Metadata = {
  title: "Sources & editorial process — IntoBadminton",
  description:
    "Where IntoBadminton sources data, how we triangulate evidence across manufacturer specs, community forums, video reviews, and BWF events.",
  alternates: {
    canonical: "/sources/",
  },
};

export default function SourcesRoute() {
  return <SourcesPage locale="en" />;
}
