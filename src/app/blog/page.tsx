import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Badminton Equipment Blog — Reviews & Guides",
  description:
    "Original badminton writing — racket reviews, comparisons, string deep-dives, shoe-fit guides. Built on official specs and rights-safe review signals.",
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
    title: "Badminton Equipment Blog — Reviews & Guides",
    description:
      "Racket reviews, comparisons, string deep-dives, shoe-fit guides — built on official specs.",
    url: "/blog/",
    type: "website",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
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
