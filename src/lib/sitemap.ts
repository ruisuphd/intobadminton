import { blogSlugs } from "@/lib/blog";

export type SitemapEntry = {
  url: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

const canonicalRoutes = [
  "/",
  "/guides/",
  "/compare-guides/",
  "/methodology/",
  "/source-policy/",
  "/security/",
  "/privacy/",
  "/cookies/",
  "/terms/",
  "/contact/",
  "/blog/",
  "/research/",
  "/sources/",
  "/about/",
  "/brands/",
  "/faq/",
  "/best/",
  ...blogSlugs.map((slug) => `/blog/${slug}/`),
  "/best/beginner-rackets/",
  "/best/intermediate-rackets/",
  "/best/doubles-rackets/",
  "/best/smash-heavy-rackets/",
  "/best/shoes/",
  "/best/strings/",
  "/compare-guides/yonex-astrox-vs-nanoflare/",
  "/compare-guides/yonex-victor-li-ning/",
  "/compare-guides/astrox-77-pro-vs-88s-pro/",
  "/compare-guides/badminton-vs-tennis-shoes/",
  "/guides/doubles-roles/",
  "/guides/equipment-authenticity/",
  "/guides/racket-balance/",
  "/guides/season-refresh/",
  "/guides/shoes-footwork/",
  "/guides/string-tension/",
  "/guides/wide-feet-badminton-shoes/",
] as const;

function routePriority(path: string): number {
  if (path === "/") return 1;
  if (path === "/quiz/") return 0.9;
  if (path.startsWith("/best/") || path.startsWith("/compare-guides/")) return 0.8;
  if (path.startsWith("/blog/") && path !== "/blog/") return 0.7;
  if (path === "/blog/" || path === "/guides/" || path.startsWith("/guides/"))
    return 0.7;
  if (path === "/faq/") return 0.7;
  if (path === "/privacy/" || path === "/terms/" || path === "/cookies/")
    return 0.3;
  return 0.5;
}

function routeFrequency(path: string): "weekly" | "monthly" {
  if (path === "/") return "weekly";
  if (path.startsWith("/blog/") && path !== "/blog/") return "monthly";
  if (path.startsWith("/best/") || path.startsWith("/guides/")) return "weekly";
  if (path.startsWith("/compare-guides/")) return "monthly";
  return "monthly";
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
  const paths = [...canonicalRoutes];
  return Array.from(new Set(paths)).map((path) => entry(origin, path));
}
