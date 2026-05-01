import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Badminton equipment blog — IntoBadminton",
  description:
    "Original badminton equipment guides based on official specs, player profiles, and rights-safe review signals.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  return <BlogIndex locale="en" />;
}
