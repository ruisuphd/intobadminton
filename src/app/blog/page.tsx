import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Badminton Equipment Blog",
  description:
    "First-person badminton gear writing — racket, shoe, string, shuttle, comparison, and buying-guide notes from club play.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Badminton Equipment Blog",
    description:
      "First-person badminton gear writing from club play.",
    url: "/blog/",
    type: "website",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton Equipment Blog",
    description:
      "First-person badminton gear writing from club play.",
  },
};

export default function BlogPage() {
  return <BlogIndex locale="en" />;
}
