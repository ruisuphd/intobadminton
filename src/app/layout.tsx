import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/AdSenseScript";
import { Analytics, ConsentModeDefaults } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { CookieSettings } from "@/components/CookieSettings";
import { FundingChoicesScript } from "@/components/FundingChoicesScript";
import { PwaRegistration } from "@/components/PwaRegistration";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  // Limit weights to what we actually use to keep the font payload tight.
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "IntoBadminton — evidence-led badminton equipment finder",
    template: "%s | IntoBadminton",
  },
  description:
    "Badminton racket, string, shoe, and bag recommendations matched to your level, style, body, and budget — with source authority labels and transparent scoring.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://intobadminton.com"
  ),
  openGraph: {
    title: "IntoBadminton — Badminton Racket, String & Shoe Finder",
    description:
      "Badminton racket, string, shoe, and bag recommendations tuned to your level, style, body, and budget. Transparent fit scoring with source labels.",
    type: "website",
    siteName: "IntoBadminton",
    locale: "en_US",
    images: [
      {
        url: "/intobadminton-og.jpg",
        width: 512,
        height: 512,
        alt: "IntoBadminton — badminton equipment recommendations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IntoBadminton — Badminton Equipment Finder",
    description:
      "Badminton racket, string, shoe, and bag recommendations with transparent scoring and source authority labels.",
    images: ["/intobadminton-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  other: process.env.NEXT_PUBLIC_ADSENSE_CLIENT
    ? {
        "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT,
      }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light",
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
          <ConsentModeDefaults />
          <FundingChoicesScript />
          <Analytics />
          <AdSenseScript />
          {/*
           * Site-wide Organization + WebSite JSON-LD. Emitting these from the
           * root layout means every page (not just the homepage) advertises the
           * organization entity Google uses for E-E-A-T / knowledge-graph
           * resolution. SearchAction is declared on WebSite JSON-LD and
           * backed by the client-side `/search/` page.
           */}
          <StructuredData />
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
          <CookieBanner />
          <CookieSettings />
          <PwaRegistration />
        </Providers>
      </body>
    </html>
  );
}
