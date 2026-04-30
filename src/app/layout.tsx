import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/AdSenseScript";
import { Analytics, ConsentModeDefaults } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { CookieSettings } from "@/components/CookieSettings";
import { FundingChoicesScript } from "@/components/FundingChoicesScript";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "IntoBadminton — the most accurate badminton equipment matcher",
    template: "%s | IntoBadminton",
  },
  description:
    "Personalized badminton equipment recommendations matched to your level, playing style, body, and budget. Rackets, strings, shoes, bags, shuttles, and grips ranked with transparent scoring backed by manufacturer specs, cited community reviews, and on-court testing by a competitive player.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://intobadminton.com"
  ),
  openGraph: {
    title: "IntoBadminton",
    description: "Equipment suggestions tuned to how you play.",
    type: "website",
    siteName: "IntoBadminton",
    images: [
      {
        url: "/intobadminton-logo.png",
        width: 1024,
        height: 1024,
        alt: "IntoBadminton",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "IntoBadminton",
    description: "Equipment suggestions tuned to how you play.",
    images: ["/intobadminton-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: process.env.NEXT_PUBLIC_ADSENSE_CLIENT
    ? {
        "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>
          <StructuredData />
          <ConsentModeDefaults />
          <FundingChoicesScript />
          <Analytics />
          <AdSenseScript />
          <SiteHeader />
          {children}
          <SiteFooter />
          <CookieBanner />
          <CookieSettings />
        </Providers>
      </body>
    </html>
  );
}
