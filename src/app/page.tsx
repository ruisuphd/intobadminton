import type { Metadata } from "next";
import { LocalizedHome } from "@/components/LocalizedHome";

export const metadata: Metadata = {
  title:
    "IntoBadminton — find the badminton racket, string, and shoe that fit your game",
  description:
    "Free badminton equipment finder. Get rackets, strings, shoes, and bags ranked for your level, play style, and budget — with transparent scoring backed by manufacturer specs and on-court testing by a competitive player.",
  keywords: [
    "badminton",
    "badminton racket",
    "best badminton racket",
    "badminton equipment",
    "badminton shoes",
    "badminton string",
    "Yonex Astrox",
    "Yonex Nanoflare",
    "Victor",
    "Li-Ning",
    "racket finder",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <LocalizedHome locale="en" />;
}
