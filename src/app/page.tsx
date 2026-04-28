import type { Metadata } from "next";
import { LocalizedHome } from "@/components/LocalizedHome";

export const metadata: Metadata = {
  title: "IntoBadminton — equipment that fits your game",
  description:
    "Personalized badminton equipment recommendations for rackets, strings, shoes, and bags.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en/",
      "zh-Hans": "/zh/",
    },
  },
};

export default function Home() {
  return <LocalizedHome locale="en" />;
}
