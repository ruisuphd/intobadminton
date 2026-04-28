import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/AdSenseScript";
import { Analytics, ConsentModeDefaults } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { CookieSettings } from "@/components/CookieSettings";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "IntoBadminton — equipment that fits your game",
    template: "%s | IntoBadminton",
  },
  description:
    "Level, style, and discipline-matched badminton racket and gear suggestions with transparent scoring.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "IntoBadminton",
    description: "Equipment suggestions tuned to how you play.",
    type: "website",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en/",
      "zh-Hans": "/zh/",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <ConsentModeDefaults />
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
