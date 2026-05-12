import type { Metadata } from "next";
import { LocalizedHome } from "@/components/LocalizedHome";
import { StructuredData } from "@/components/StructuredData";

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
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <LocalizedHome locale="en" />
    </>
  );
}
