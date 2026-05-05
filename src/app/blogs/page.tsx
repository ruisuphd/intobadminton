import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Badminton equipment blog - IntoBadminton",
  description:
    "Original badminton equipment reviews, comparisons, and buying guides from IntoBadminton.",
  alternates: {
    canonical: "/blog/",
  },
};

export default function BlogsAliasPage() {
  return <BlogIndex locale="en" />;
}
