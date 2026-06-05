import { readdirSync, type Dirent } from "node:fs";
import { join } from "node:path";
import { blogSlugs } from "@/lib/blog";
import { allCatalogProductIds } from "@/lib/catalog-products";
import { lastModifiedForRoute } from "@/lib/editorial-meta";

export type SitemapEntry = {
  url: string;
  lastModified?: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

/**
 * Routes that exist as `page.tsx` files but should NOT appear in the sitemap.
 *
 * These are either noindex (results, setup, privacy-choices, compare, review,
 * blogs legacy redirect) or operational pages that exist to support flows but
 * aren't intended landing pages for crawlers. Kept here as the SINGLE source
 * of truth — the postbuild SEO audit at `scripts/postbuild-seo-audit.mjs`
 * has its own mirrored exemption list (`SITEMAP_EXEMPT_ROUTES`) for symmetry.
 * If you add or remove an entry here, update that script too.
 */
const SITEMAP_EXCLUDED_ROUTES = new Set([
  "/results/",
  "/setup/",
  "/compare/",
  "/review/submit/",
  "/privacy-choices/",
  "/blogs/",
  "/blog/",
  "/comparisons/",
  "/saved/",
]);

/**
 * Dynamic route segments that the filesystem walker should expand into
 * concrete URLs rather than emit as `[slug]/` placeholders. Each entry maps
 * the dynamic segment path to the list of slugs to expand it into.
 */
const DYNAMIC_ROUTE_EXPANSIONS: Record<string, readonly string[]> = {
  get "/review/[slug]/"() {
    return blogSlugs;
  },
  get "/product/[id]/"() {
    return allCatalogProductIds();
  },
};

const APP_DIR = join(process.cwd(), "src", "app");

const PAGE_FILES = new Set(["page.tsx", "page.ts", "page.mdx"]);

/**
 * Walks `src/app/` and returns every route path that has a `page.*` file.
 *
 * Path conventions:
 * - Each directory becomes one URL segment.
 * - `[slug]` dynamic segments are preserved as `[slug]` in the returned
 *   path; callers expand them via `DYNAMIC_ROUTE_EXPANSIONS`.
 * - Route groups `(group)` and parallel segments `@slot` are skipped — they
 *   don't change the public URL.
 * - The root page (`src/app/page.tsx`) returns `/`.
 * - All other paths end with a trailing slash to match `trailingSlash: true`
 *   in `next.config.ts`.
 */
function walkPageRoutes(dir: string = APP_DIR, basePath = ""): string[] {
  const out: string[] = [];
  let entries: Dirent[] = [];
  try {
    entries = readdirSync(dir, { withFileTypes: true, encoding: "utf8" });
  } catch {
    return out;
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip route groups `(name)` and parallel slots `@name` — they don't
      // create a URL segment, but their children might. Recurse without
      // appending to the basePath.
      if (entry.name.startsWith("(") || entry.name.startsWith("@")) {
        out.push(...walkPageRoutes(fullPath, basePath));
        continue;
      }
      out.push(...walkPageRoutes(fullPath, `${basePath}/${entry.name}`));
      continue;
    }

    if (entry.isFile() && PAGE_FILES.has(entry.name)) {
      const route = basePath === "" ? "/" : `${basePath}/`;
      out.push(route);
    }
  }
  return out;
}

function expandDynamicRoutes(routes: string[]): string[] {
  const out: string[] = [];
  for (const route of routes) {
    const expansion = DYNAMIC_ROUTE_EXPANSIONS[route];
    if (expansion) {
      for (const slug of expansion) {
        out.push(route.replace(/\[[^\]]+\]\/$/, `${slug}/`));
      }
      continue;
    }
    // Drop any unexpanded dynamic segment — emitting `/foo/[slug]/` as a URL
    // would be a build bug. If a new dynamic route appears that isn't in
    // `DYNAMIC_ROUTE_EXPANSIONS`, add it explicitly.
    if (route.includes("[")) continue;
    out.push(route);
  }
  return out;
}

function routePriority(path: string): number {
  if (path === "/") return 1;
  if (path === "/quiz/") return 0.9;
  if (path.startsWith("/best/") || path.startsWith("/compare-guides/")) return 0.8;
  if (path.startsWith("/product/")) return 0.7;
  if (path.startsWith("/review/") && path !== "/review/") return 0.8;
  if (path.startsWith("/brands/") && path !== "/brands/") return 0.8;
  if (path === "/brands/") return 0.7;
  if (path === "/guides/" || path.startsWith("/guides/"))
    return 0.7;
  if (path === "/faq/") return 0.7;
  if (path === "/privacy/" || path === "/terms/" || path === "/cookies/")
    return 0.3;
  return 0.5;
}

function routeFrequency(path: string): "weekly" | "monthly" {
  if (path === "/") return "weekly";
  if (path.startsWith("/best/") || path.startsWith("/guides/")) return "weekly";
  if (path.startsWith("/compare-guides/")) return "monthly";
  if (path.startsWith("/review/") && path !== "/review/") return "monthly";
  return "monthly";
}

function cleanOrigin(origin: string): string {
  return origin.replace(/\/+$/, "");
}

function entry(origin: string, path: string): SitemapEntry {
  return {
    url: `${cleanOrigin(origin)}${path}`,
    lastModified: lastModifiedForRoute(path),
    changeFrequency: routeFrequency(path),
    priority: routePriority(path),
  };
}

/**
 * Lists every route path that should appear in the sitemap, derived by
 * walking `src/app/` rather than maintained as a hand-curated list. New
 * `page.tsx` files are picked up automatically; routes listed in
 * `SITEMAP_EXCLUDED_ROUTES` are skipped.
 */
export function sitemapPaths(): string[] {
  const walked = expandDynamicRoutes(walkPageRoutes());
  return Array.from(new Set(walked))
    .filter((path) => !SITEMAP_EXCLUDED_ROUTES.has(path))
    .sort();
}

export function sitemapEntries(
  origin = process.env.NEXT_PUBLIC_SITE_URL || "https://intobadminton.com"
): SitemapEntry[] {
  return sitemapPaths().map((path) => entry(origin, path));
}
