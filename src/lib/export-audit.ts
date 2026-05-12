import type { LegacyRedirect } from "@/lib/legacy-redirects";

export type ExportFile = {
  path: string;
  html: string;
};

export type ExportAuditIssue = {
  code:
    | "bad-404-canonical"
    | "broken-internal-link"
    | "duplicate-title-brand"
    | "exported-route-missing-from-sitemap"
    | "invalid-json-ld"
    | "legacy-redirect-missing"
    | "legacy-redirect-target-mismatch"
    | "legacy-url-in-sitemap"
    | "missing-affiliate-disclosure"
    | "missing-article-schema"
    | "sitemap-target-missing";
  path: string;
  detail: string;
};

const ARTICLE_SCHEMA_REQUIRED = /^\/(?:best|brands|compare-guides)\/[^/]+\/$/;
const SPONSORED_REL = /\brel=["'][^"']*\bsponsored\b[^"']*["']/i;
const AFFILIATE_DISCLOSURE_MARKER = /\bdata-affiliate-disclosure=["']/i;
const META_REFRESH = /<meta[^>]+http-equiv=["']refresh["']/i;

/**
 * Routes that legitimately stay out of the sitemap (utility pages, settings,
 * privacy-tooling pages, etc.). The audit gate uses this allow-list so that
 * adding a new content route fails the build until it is sitemapped.
 */
const SITEMAP_EXEMPT_ROUTES = new Set<string>([
  "/404.html",
  "/results/",
  "/setup/",
  "/quiz/",
  "/compare/",
  "/review/",
  "/privacy-choices/",
  "/blogs/", // legacy alias, redirects to /blog/
]);

const PAGE_EXTENSIONS = new Set(["", ".html"]);
const SKIPPED_INTERNAL_EXTENSIONS = new Set([
  ".css",
  ".ico",
  ".js",
  ".json",
  ".png",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml",
]);

function extension(path: string) {
  const lastSegment = path.split("/").pop() ?? "";
  const dot = lastSegment.lastIndexOf(".");
  return dot === -1 ? "" : lastSegment.slice(dot);
}

function normaliseUrlPath(path: string) {
  const clean = path.split(/[?#]/, 1)[0] || "/";
  const withLeading = clean.startsWith("/") ? clean : `/${clean}`;
  if (withLeading === "/") return "/";
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function routePathForFile(filePath: string) {
  const path = filePath.replace(/^\/+/, "");
  if (path === "index.html") return "/";
  if (path === "404.html") return "/404.html";
  if (path.endsWith("/index.html")) {
    return `/${path.slice(0, -"index.html".length)}`;
  }
  if (path.endsWith(".html")) return `/${path}`;
  return `/${path}`;
}

function exportFileForRoute(path: string) {
  const normalised = normaliseUrlPath(path);
  if (normalised === "/") return "index.html";
  return `${normalised.slice(1)}index.html`;
}

function titleText(html: string) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
}

function hasNoindex(html: string) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(
    html
  );
}

function hasCanonical(html: string) {
  return /<link[^>]+rel=["']canonical["']/i.test(html);
}

function jsonLdScripts(html: string) {
  return Array.from(
    html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
    (match) => match[1].trim()
  );
}

function valuesForType(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return typeof value === "string" ? [value] : [];
}

function walkJsonLd(value: unknown, visit: (node: Record<string, unknown>) => void) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) walkJsonLd(item, visit);
    return;
  }

  const node = value as Record<string, unknown>;
  visit(node);

  for (const child of Object.values(node)) {
    walkJsonLd(child, visit);
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasValidArticleSchema(parsed: unknown) {
  let found = false;
  walkJsonLd(parsed, (node) => {
    if (found) return;
    const types = valuesForType(node["@type"]);
    if (!types.includes("Article")) return;
    const author = node.author;
    const datePublished = node.datePublished;
    const publisher = node.publisher;

    // Author + datePublished are non-negotiable for Article rich results.
    if (
      !author ||
      typeof datePublished !== "string" ||
      datePublished.length === 0
    ) {
      return;
    }

    // Publisher must be a self-contained Organization with name + logo —
    // a bare {"@id": "..."} reference fails Google's Rich Results test.
    if (!isObject(publisher)) return;
    if (typeof publisher.name !== "string" || publisher.name.length === 0) {
      return;
    }
    if (!isObject(publisher.logo)) return;
    const logoUrl = (publisher.logo as Record<string, unknown>).url;
    if (typeof logoUrl !== "string" || logoUrl.length === 0) return;

    found = true;
  });
  return found;
}

function auditJsonLd(file: ExportFile, issues: ExportAuditIssue[]) {
  const scripts = jsonLdScripts(file.html);
  const routePath = routePathForFile(file.path);
  const noindex = hasNoindex(file.html);
  const requiresArticle = ARTICLE_SCHEMA_REQUIRED.test(routePath) && !noindex;
  let hasArticle = false;

  // Three previously-strict rules were intentionally relaxed in #35:
  //   - `rating-markup-on-list-page`: Google does support Review +
  //     aggregateRating on Product items inside an ItemList when the
  //     ratings are authentic. src/lib/editorial-rating.ts enforces
  //     authenticity at source (suppresses aggregate when fewer than 2
  //     review sources back the score).
  //   - `invalid-review-item-reviewed`: blog reviews that compare
  //     multiple products correctly use itemReviewed: Thing rather than
  //     overclaiming a single Product subject. The downside is reduced
  //     rich-result eligibility, not a validator failure.
  //   - `json-ld-on-noindex-page`: noindex tells Google not to index the
  //     URL, which also means it will never surface the structured data
  //     in SERPs. Emitting JSON-LD on /results/ is therefore wasted but
  //     not harmful, and keeps the schema shape consistent with /best/*
  //     for QA tooling.

  for (const script of scripts) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(script);
    } catch (error) {
      issues.push({
        code: "invalid-json-ld",
        path: file.path,
        detail: error instanceof Error ? error.message : "JSON parse failed",
      });
      continue;
    }

    if (!hasArticle && hasValidArticleSchema(parsed)) {
      hasArticle = true;
    }
  }

  if (requiresArticle && !hasArticle) {
    issues.push({
      code: "missing-article-schema",
      path: file.path,
      detail: `${routePath} must emit Article JSON-LD with author and datePublished.`,
    });
  }
}

function auditLinks(
  file: ExportFile,
  exportedRoutes: Set<string>,
  issues: ExportAuditIssue[],
  siteOrigin: string
) {
  const routePath = routePathForFile(file.path);

  for (const match of file.html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const raw = match[1];
    if (
      raw.startsWith("#") ||
      raw.startsWith("data:") ||
      raw.startsWith("mailto:") ||
      raw.startsWith("tel:")
    ) {
      continue;
    }

    let url: URL;
    try {
      url = new URL(raw, siteOrigin);
    } catch {
      continue;
    }

    if (url.origin !== siteOrigin) continue;
    if (url.pathname.startsWith("/_next/")) continue;
    if (SKIPPED_INTERNAL_EXTENSIONS.has(extension(url.pathname))) continue;

    const normalised = normaliseUrlPath(url.pathname);
    if (!PAGE_EXTENSIONS.has(extension(normalised))) continue;
    if (!exportedRoutes.has(normalised)) {
      issues.push({
        code: "broken-internal-link",
        path: file.path,
        detail: `${routePath} links to missing ${normalised}`,
      });
    }
  }
}

export function auditExportSnapshot({
  files,
  legacyRedirects,
  sitemapUrls,
  siteOrigin = "https://example.com",
}: {
  files: ExportFile[];
  legacyRedirects: LegacyRedirect[];
  sitemapUrls: string[];
  siteOrigin?: string;
}) {
  const issues: ExportAuditIssue[] = [];
  const filePaths = new Set(files.map((file) => file.path.replace(/^\/+/, "")));
  const exportedRoutes = new Set(files.map((file) => routePathForFile(file.path)));
  const legacySources = new Set(legacyRedirects.map((entry) => entry.source));
  const sitemapRoutes = new Set(
    sitemapUrls.map((url) => normaliseUrlPath(new URL(url).pathname))
  );

  for (const file of files) {
    const title = titleText(file.html);
    const brandCount = (title.match(/IntoBadminton/g) ?? []).length;

    if (brandCount > 1) {
      issues.push({
        code: "duplicate-title-brand",
        path: file.path,
        detail: title,
      });
    }

    if (
      (file.path === "404.html" || file.path === "404/index.html") &&
      hasCanonical(file.html)
    ) {
      issues.push({
        code: "bad-404-canonical",
        path: file.path,
        detail: "404 pages must not emit a canonical link.",
      });
    }

    auditJsonLd(file, issues);
    auditLinks(file, exportedRoutes, issues, siteOrigin);

    if (
      SPONSORED_REL.test(file.html) &&
      !AFFILIATE_DISCLOSURE_MARKER.test(file.html)
    ) {
      issues.push({
        code: "missing-affiliate-disclosure",
        path: file.path,
        detail:
          "Pages with sponsored outbound links must render <AffiliateDisclosure>.",
      });
    }

    const routePath = routePathForFile(file.path);
    const exemptOrSpecial =
      SITEMAP_EXEMPT_ROUTES.has(routePath) ||
      routePath === "/404.html" ||
      routePath.startsWith("/_next/") ||
      legacySources.has(routePath);
    if (
      !exemptOrSpecial &&
      !hasNoindex(file.html) &&
      !META_REFRESH.test(file.html) &&
      !sitemapRoutes.has(routePath)
    ) {
      issues.push({
        code: "exported-route-missing-from-sitemap",
        path: file.path,
        detail: `${routePath} is exported but not listed in sitemap.xml`,
      });
    }
  }

  for (const sitemapUrl of sitemapUrls) {
    const path = normaliseUrlPath(new URL(sitemapUrl).pathname);
    if (legacySources.has(path)) {
      issues.push({
        code: "legacy-url-in-sitemap",
        path,
        detail: `${path} must stay out of sitemap.xml.`,
      });
    }

    const expectedFile = exportFileForRoute(path);
    if (!filePaths.has(expectedFile)) {
      issues.push({
        code: "sitemap-target-missing",
        path,
        detail: `${expectedFile} is missing from export output.`,
      });
    }
  }

  for (const redirect of legacyRedirects) {
    const expectedFile = exportFileForRoute(redirect.source);
    const file = files.find((entry) => entry.path === expectedFile);
    if (!file) {
      issues.push({
        code: "legacy-redirect-missing",
        path: redirect.source,
        detail: `${expectedFile} is missing from export output.`,
      });
      continue;
    }

    if (
      !file.html.includes(`http-equiv="refresh"`) ||
      !file.html.includes(`url=${redirect.destination}`)
    ) {
      issues.push({
        code: "legacy-redirect-target-mismatch",
        path: redirect.source,
        detail: `${redirect.source} does not refresh to ${redirect.destination}.`,
      });
    }
  }

  return issues;
}
