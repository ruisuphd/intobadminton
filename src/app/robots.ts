import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://intobadminton.com";

// AdsBot-Google ignores wildcard `User-agent: *` directives by Google's design,
// so the AdSense landing-page quality crawlers must be listed explicitly.
const GOOGLE_CRAWLERS = [
  "Mediapartners-Google",
  "Google-Display-Ads-Bot",
  "AdsBot-Google",
  "AdsBot-Google-Mobile",
  "Googlebot",
] as const;

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...GOOGLE_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
