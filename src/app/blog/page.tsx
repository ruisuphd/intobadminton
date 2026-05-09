import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Badminton Equipment Blog — Reviews, Comparisons & Buying Guides | IntoBadminton",
  description:
    "Original badminton equipment writing — racket reviews, head-to-head comparisons, string deep-dives, shoe-fit guides, and authenticity advice. Built on official specs, player profiles, and rights-safe review signals.",
  keywords: [
    "badminton blog",
    "badminton racket review",
    "badminton equipment guide",
    "badminton string review",
    "badminton shoe review",
    "Yonex Astrox review",
    "Victor Auraspeed review",
    "Li-Ning AxForce review",
  ],
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Badminton Equipment Blog — Reviews, Comparisons & Guides",
    description:
      "Original badminton equipment writing — racket reviews, comparisons, string deep-dives, and shoe-fit guides.",
    url: "/blog/",
    type: "website",
    siteName: "IntoBadminton",
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton Equipment Blog — Reviews & Guides",
    description:
      "Racket reviews, comparisons, string deep-dives, shoe-fit guides — based on official specs and rights-safe review signals.",
  },
};

export default function BlogPage() {
  return <BlogIndex locale="en" />;
}
