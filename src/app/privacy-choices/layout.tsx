import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy choices — IntoBadminton",
  description: "Manage privacy and tracking choices for IntoBadminton.",
  alternates: { canonical: "/privacy-choices/" },
  robots: { index: false, follow: true },
};

export default function PrivacyChoicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
