import type { Metadata } from "next";
import { LocalizedHome } from "@/components/LocalizedHome";
import { StructuredData } from "@/components/StructuredData";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Badminton Racket, String & Shoe Finder",
  description:
    "Personalised badminton equipment finder — rank rackets, strings, shoes, and bags for your level, style, and budget. Transparent scoring, no signup.",
  keywords: [
    "badminton",
    "badminton racket",
    "best badminton racket",
    "badminton equipment",
    "badminton equipment finder",
    "badminton racket finder",
    "badminton shoes",
    "badminton string",
    "Yonex Astrox",
    "Yonex Nanoflare",
    "Victor Auraspeed",
    "Li-Ning AxForce",
    "racket finder",
    "badminton gear",
    "best badminton shoes",
    "best badminton string",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IntoBadminton — Badminton Racket, String & Shoe Finder",
    description:
      "Badminton racket, string, shoe, and bag recommendations tuned to your level, style, body, and budget. Transparent fit scoring with source labels.",
    url: "/",
    type: "website",
    siteName: "IntoBadminton",
    locale: "en_US",
    images: [...defaultOgImages],
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <LocalizedHome locale="en" />
    </>
  );
}
