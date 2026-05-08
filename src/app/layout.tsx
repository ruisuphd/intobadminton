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
    title: "IntoBadminton — Badminton Racket, String & Shoe Finder",
    description:
      "Personalized badminton equipment recommendations tuned to your level, playing style, body, and budget. Transparent fit scoring backed by manufacturer specs and on-court testing.",
    type: "website",
    siteName: "IntoBadminton",
    locale: "en_US",
    images: [
      {
        url: "/intobadminton-logo.png",
        width: 1024,
        height: 1024,
        alt: "IntoBadminton — badminton equipment recommendations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IntoBadminton — Badminton Equipment Finder",
    description:
      "Personalized badminton racket, string, shoe, and bag recommendations. Transparent fit scoring by a competitive player.",
    images: ["/intobadminton-logo.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
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
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to main content
          </a>
          <StructuredData />
          <ConsentModeDefaults />
          <FundingChoicesScript />
          <Analytics />
          <AdSenseScript />
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
          <CookieBanner />
          <CookieSettings />
        </Providers>
      </body>
    </html>
  );
}
