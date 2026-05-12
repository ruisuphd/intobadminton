import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "About — Built by a Div 4 Ireland Player",
  description:
    "Who runs IntoBadminton, how the gear recommendations work, where the data comes from. Built by a Division 4 Ireland player with Malaysia and China coaching.",
  keywords: [
    "about IntoBadminton",
    "Rui Su badminton",
    "Intonation Labs",
    "badminton equipment reviewer",
    "editorial independence",
    "badminton recommendation methodology",
    "competitive badminton player",
  ],
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: "About IntoBadminton — Built by a Div 4 Player",
    description:
      "Founded by Rui Su (Division 4 Ireland) — trained under former Malaysian national-team and Chinese provincial-team coaches. Editorial independence and source policy.",
    url: "/about/",
    type: "profile",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "About IntoBadminton — Built by a Div 4 Player",
    description:
      "Founded by Rui Su (Division 4 Ireland) — trained under former Malaysian national-team and Chinese provincial-team coaches.",
  },
};

export default function AboutRoute() {
  return <AboutPage locale="en" />;
}
