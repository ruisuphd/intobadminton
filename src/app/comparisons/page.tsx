import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { ComparisonsIndex } from "@/components/ComparisonsIndex";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Badminton comparisons and buying guides",
  description:
    "Head-to-head badminton gear comparisons, buying guides, and editorial notes.",
  alternates: pageAlternates("/comparisons/"),
  openGraph: {
    title: "Badminton comparisons and buying guides",
    description:
      "Head-to-head badminton gear comparisons, buying guides, and editorial notes.",
    url: "/comparisons/",
    type: "website",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton comparisons and buying guides",
    description:
      "Head-to-head badminton gear comparisons, buying guides, and editorial notes.",
  },
};

export default function ComparisonsPage() {
  return <ComparisonsIndex locale="en" />;
}
