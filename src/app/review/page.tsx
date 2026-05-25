import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { ReviewsIndex } from "@/components/ReviewsIndex";
import { defaultOgImages } from "@/lib/og";

const PATH = "/review/";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Equipment notes from club play.",
  alternates: pageAlternates(PATH),
  openGraph: {
    title: "Reviews — IntoBadminton",
    description: "Equipment notes from club play.",
    url: PATH,
    type: "website",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews — IntoBadminton",
    description: "Equipment notes from club play.",
  },
};

export default function ReviewIndexPage() {
  return <ReviewsIndex locale="en" />;
}
