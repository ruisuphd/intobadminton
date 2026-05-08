import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title:
    "About IntoBadminton — Built by a Competitive Player, Editorially Independent | IntoBadminton",
  description:
    "Who runs IntoBadminton, how the gear recommendations work, where the data comes from, and how we stay editorially independent. Built by a Division 4 Ireland player trained under former Malaysian national-team and Chinese provincial-team coaches.",
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
};

export default function AboutRoute() {
  return <AboutPage locale="en" />;
}
