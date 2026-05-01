import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare badminton gear — IntoBadminton",
  description: "Compare badminton equipment specs side by side.",
  alternates: { canonical: "/compare/" },
  robots: { index: false, follow: true },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
