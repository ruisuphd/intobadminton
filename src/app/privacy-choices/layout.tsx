import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Privacy choices",
  description: "Manage privacy and tracking choices for IntoBadminton.",
  alternates: pageAlternates("/privacy-choices/"),
  robots: { index: false, follow: true },
};

export default function PrivacyChoicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
