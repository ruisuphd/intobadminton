import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  description:
    "IntoBadminton is offline. Open a cached page or retry when your connection returns.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
