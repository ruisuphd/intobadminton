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
    default: "IntoBadminton — evidence-led badminton equipment finder",
    template: "%s | IntoBadminton",
  },
  description:
    "Badminton racket, string, shoe, bag, shuttle, and grip recommendations matched to your level, playing style, body, and budget, with source authority labels and transparent scoring.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://intobadminton.com"
  ),
  openGraph: {
    title: "IntoBadminton — Badminton Racket, String & Shoe Finder",
    description:
      "Badminton equipment recommendations tuned to your level, playing style, body, and budget. Transparent fit scoring with product-source authority labels.",
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
      "Badminton racket, string, shoe, and bag recommendations with transparent scoring and source authority labels.",
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
