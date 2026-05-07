import type { Metadata } from "next";
import { LocalizedHome } from "@/components/LocalizedHome";

export const metadata: Metadata = {
  title:
    "Badminton Racket, String & Shoe Finder — Match Gear to Your Game | IntoBadminton",
  description:
    "Personalized badminton equipment finder. Rank rackets, strings, shoes, and bags for your level, playing style, and budget — transparent scoring drawn from manufacturer specs, cited community reviews, and on-court testing by a competitive player. No signup, no email gate.",
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
