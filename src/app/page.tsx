import type { Metadata } from "next";
import { LocalizedHome } from "@/components/LocalizedHome";

export const metadata: Metadata = {
  title:
    "Badminton Racket, String & Shoe Finder — Match Gear to Your Game | IntoBadminton",
  description:
    "Personalised badminton equipment finder. Rank rackets, strings, shoes, and bags for your level, playing style, and budget with transparent scoring and source authority labels. No signup, no email gate.",
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
  return <LocalizedHome locale="en" />;
}
