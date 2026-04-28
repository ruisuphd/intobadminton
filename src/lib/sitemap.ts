import {
  localizedRoutesFor,
  siteLocales,
  type SiteLocale,
} from "@/lib/locale";
import { blogSlugs } from "@/lib/blog";

export type SitemapEntry = {
  url: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

const canonicalRoutes = [
  "/",
  "/quiz/",
  "/results/",
  "/guides/",
  "/compare/",
  "/review/",
  "/methodology/",
  "/source-policy/",
  "/security/",
  "/privacy/",
  "/cookies/",
  "/terms/",
  "/contact/",
  "/setup/",
  "/blog/",
  "/research/",
  "/sources/",
  "/about/",
  ...blogSlugs.map((slug) => `/blog/${slug}/`),
  "/best/beginner-rackets/",
  "/best/doubles-rackets/",
  "/best/smash-heavy-rackets/",
  "/compare-guides/yonex-astrox-vs-nanoflare/",
  "/guides/doubles-roles/",
  "/guides/racket-balance/",
  "/guides/season-refresh/",
  "/guides/shoes-footwork/",
  "/guides/string-tension/",
  "/guides/wide-feet-badminton-shoes/",
] as const;

function routePriority(path: string): number {
  if (path === "/" || path === "/en/" || path === "/zh/") return 1;
  if (path.includes("/quiz/") || path.includes("/guides/")) return 0.8;
  if (path.includes("/privacy/") || path.includes("/terms/")) return 0.3;
  return 0.6;
}

function routeFrequency(path: string): "weekly" | "monthly" {
  return path.includes("/guides/") || path.includes("/best/")
    ? "weekly"
    : "monthly";
}

function cleanOrigin(origin: string): string {
  return origin.replace(/\/+$/, "");
}

function entry(origin: string, path: string): SitemapEntry {
  return {
    url: `${cleanOrigin(origin)}${path}`,
    changeFrequency: routeFrequency(path),
    priority: routePriority(path),
  };
}

export function sitemapEntries(
  origin = process.env.NEXT_PUBLIC_SITE_URL || "https://intobadminton.com"
): SitemapEntry[] {
  const localized = siteLocales.flatMap((locale: SiteLocale) => [
    ...localizedRoutesFor(locale),
    ...blogSlugs.map((slug) => `/${locale}/blog/${slug}/`),
  ]);
  const paths = [...canonicalRoutes, ...localized];
  return Array.from(new Set(paths)).map((path) => entry(origin, path));
}
