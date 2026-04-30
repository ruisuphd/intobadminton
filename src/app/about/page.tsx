import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About — IntoBadminton",
  description:
    "Built by a competitive player. How IntoBadminton recommends gear, cites reviews, and stays editorially independent.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutRoute() {
  return <AboutPage locale="en" />;
}
