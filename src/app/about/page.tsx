import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About Us — IntoBadminton",
  description:
    "About Us. Built by a competitive player. How IntoBadminton recommends badminton gear, cites reviews, stays editorially independent, and pays the bills.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutRoute() {
  return <AboutPage locale="en" />;
}
