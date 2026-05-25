import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { SavedListClient } from "./SavedListClient";

export const metadata: Metadata = {
  title: "Saved equipment",
  description:
    "Your shortlist of saved badminton rackets, shoes, strings, and bags. Stored locally for 30 days; never sent anywhere.",
  alternates: pageAlternates("/saved/"),
  // The shortlist is per-device and only meaningful to the logged-in browser
  // tab — nothing for Google to index here.
  robots: { index: false, follow: true },
};

export default function SavedPage() {
  return <SavedListClient />;
}
