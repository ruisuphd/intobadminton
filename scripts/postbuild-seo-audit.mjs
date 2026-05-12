import fs from "node:fs";
import path from "node:path";
import legacyDestinations from "../src/data/legacy-redirect-destinations.json" with { type: "json" };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

if (basePath) {
  console.log(`[seo-audit] skipped for non-production basePath ${basePath}`);
  process.exit(0);
}

const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://intobadminton.com"
).replace(/\/+$/, "");
const outDir = path.join(process.cwd(), "out");
const locales = ["en", "zh"];
const skippedInternalExtensions = new Set([
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

function normalisePath(value) {
  const pathOnly = value.split(/[?#]/, 1)[0] || "/";
  const withLeading = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  if (withLeading === "/") return "/";
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function routePathForFile(filePath) {
  const clean = filePath.replace(/^\/+/, "");
  if (clean === "index.html") return "/";
  if (clean === "404.html") return "/404.html";
  if (clean.endsWith("/index.html")) {
    return `/${clean.slice(0, -"index.html".length)}`;
  }
  if (clean.endsWith(".html")) return `/${clean}`;
  return `/${clean}`;
}

function exportFileForRoute(route) {
  const normalised = normalisePath(route);
  if (normalised === "/") return "index.html";
  return `${normalised.slice(1)}index.html`;
}

function extension(urlPath) {
  const segment = urlPath.split("/").pop() || "";
  const dot = segment.lastIndexOf(".");
  return dot === -1 ? "" : segment.slice(dot);
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function titleText(html) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
}

function hasNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(
    html
  );
}

function hasCanonical(html) {
  return /<link[^>]+rel=["']canonical["']/i.test(html);
}

function jsonLdScripts(html) {
  return Array.from(
    html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
    (match) => match[1].trim()
  );
}

function valuesForType(value) {
  if (Array.isArray(value)) return value.filter((item) => typeof item === "string");
  return typeof value === "string" ? [value] : [];
}

function walkJsonLd(value, visit) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) walkJsonLd(item, visit);
    return;
  }

  visit(value);

  for (const child of Object.values(value)) {
    walkJsonLd(child, visit);
  }
}

function nodeHasPublicStructuredData(value) {
  let result = false;
  walkJsonLd(value, (node) => {
    const types = valuesForType(node["@type"]);
    if (types.some((type) => type !== "Organization" && type !== "WebSite")) {
      result = true;
    }
  });
  return result;
}

const ARTICLE_SCHEMA_REQUIRED = /^\/(?:best|brands|compare-guides)\/[^/]+\/$/;
const SPONSORED_REL = /\brel=["'][^"']*\bsponsored\b[^"']*["']/i;
const AFFILIATE_DISCLOSURE_MARKER = /\bdata-affiliate-disclosure=["']/i;
const META_REFRESH = /<meta[^>]+http-equiv=["']refresh["']/i;
const SITEMAP_EXEMPT_ROUTES = new Set([
  "/404.html",
  "/results/",
  "/setup/",
  "/quiz/",
  "/compare/",
  "/review/",
  "/privacy-choices/",
  "/blogs/",
]);

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasValidArticleSchema(value) {
  let found = false;
  walkJsonLd(value, (node) => {
    if (found) return;
    const types = valuesForType(node["@type"]);
    if (!types.includes("Article")) return;
    if (
      !node.author ||
      typeof node.datePublished !== "string" ||
      node.datePublished.length === 0
    ) {
      return;
    }
    const publisher = node.publisher;
    if (!isPlainObject(publisher)) return;
    if (typeof publisher.name !== "string" || publisher.name.length === 0) {
      return;
    }
    if (!isPlainObject(publisher.logo)) return;
    if (typeof publisher.logo.url !== "string" || publisher.logo.url.length === 0) {
      return;
    }
    found = true;
  });
  return found;
}

function readHtmlFiles() {
  return walk(outDir)
    .filter((file) => file.endsWith(".html"))
    .map((file) => ({
      path: path.relative(outDir, file),
      html: fs.readFileSync(file, "utf8"),
    }));
}

function readSitemapUrls() {
  const sitemapPath = path.join(outDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) return [];
  const xml = fs.readFileSync(sitemapPath, "utf8");
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1]);
}

function legacyRedirects() {
  return locales.flatMap((locale) =>
    legacyDestinations.map((rawDestination) => {
      const destination = normalisePath(rawDestination);
      return {
        source: destination === "/" ? `/${locale}/` : `/${locale}${destination}`,
        destination,
      };
    })
  );
}

const files = readHtmlFiles();
const sitemapUrls = readSitemapUrls();
const redirects = legacyRedirects();
const issues = [];
const filePaths = new Set(files.map((file) => file.path));
const exportedRoutes = new Set(files.map((file) => routePathForFile(file.path)));
const legacySources = new Set(redirects.map((entry) => entry.source));
const sitemapRoutes = new Set(
  sitemapUrls.map((url) => normalisePath(new URL(url).pathname))
);

for (const file of files) {
  const title = titleText(file.html);
  const brandCount = (title.match(/IntoBadminton/g) || []).length;

  if (brandCount > 1) {
    issues.push([file.path, "duplicate-title-brand", title]);
  }

  if ((file.path === "404.html" || file.path === "404/index.html") && hasCanonical(file.html)) {
    issues.push([file.path, "bad-404-canonical", "404 page emits canonical"]);
  }

  const routePath = routePathForFile(file.path);
  const noindex = hasNoindex(file.html);
  const requiresArticle = ARTICLE_SCHEMA_REQUIRED.test(routePath) && !noindex;
  let hasArticle = false;

  for (const script of jsonLdScripts(file.html)) {
    let parsed;
    try {
      parsed = JSON.parse(script);
    } catch (error) {
      issues.push([file.path, "invalid-json-ld", error.message]);
      continue;
    }

    if (noindex && nodeHasPublicStructuredData(parsed)) {
      issues.push([file.path, "json-ld-on-noindex-page", "public JSON-LD on noindex page"]);
    }

    if (!hasArticle && hasValidArticleSchema(parsed)) {
      hasArticle = true;
    }

    walkJsonLd(parsed, (node) => {
      const types = valuesForType(node["@type"]);
      if (
        types.includes("Review") &&
        node.itemReviewed &&
        typeof node.itemReviewed === "object" &&
        !Array.isArray(node.itemReviewed) &&
        valuesForType(node.itemReviewed["@type"]).includes("Thing")
      ) {
        issues.push([file.path, "invalid-review-item-reviewed", "Review itemReviewed uses Thing"]);
      }

      if (
        routePath.startsWith("/best/") &&
        ("review" in node || "reviewRating" in node || "aggregateRating" in node)
      ) {
        issues.push([file.path, "rating-markup-on-list-page", "Review/rating markup on best list"]);
      }
    });
  }

  if (requiresArticle && !hasArticle) {
    issues.push([
      file.path,
      "missing-article-schema",
      `${routePath} missing Article JSON-LD with author + datePublished`,
    ]);
  }

  if (SPONSORED_REL.test(file.html) && !AFFILIATE_DISCLOSURE_MARKER.test(file.html)) {
    issues.push([
      file.path,
      "missing-affiliate-disclosure",
      "page with sponsored links has no <AffiliateDisclosure>",
    ]);
  }

  const exemptOrSpecial =
    SITEMAP_EXEMPT_ROUTES.has(routePath) ||
    routePath === "/404.html" ||
    routePath.startsWith("/_next/") ||
    legacySources.has(routePath);
  if (
    !exemptOrSpecial &&
    !noindex &&
    !META_REFRESH.test(file.html) &&
    !sitemapRoutes.has(routePath)
  ) {
    issues.push([
      file.path,
      "exported-route-missing-from-sitemap",
      `${routePath} not in sitemap.xml`,
    ]);
  }

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

    let url;
    try {
      url = new URL(raw, siteOrigin);
    } catch {
      continue;
    }

    if (url.origin !== siteOrigin) continue;
    if (url.pathname.startsWith("/_next/")) continue;
    if (skippedInternalExtensions.has(extension(url.pathname))) continue;

    const normalised = normalisePath(url.pathname);
    if (!exportedRoutes.has(normalised)) {
      issues.push([file.path, "broken-internal-link", `${routePathForFile(file.path)} -> ${normalised}`]);
    }
  }
}

for (const sitemapUrl of sitemapUrls) {
  const route = normalisePath(new URL(sitemapUrl).pathname);
  if (legacySources.has(route)) {
    issues.push([route, "legacy-url-in-sitemap", route]);
  }

  const expectedFile = exportFileForRoute(route);
  if (!filePaths.has(expectedFile)) {
    issues.push([route, "sitemap-target-missing", expectedFile]);
  }
}

for (const redirect of redirects) {
  const expectedFile = exportFileForRoute(redirect.source);
  const file = files.find((entry) => entry.path === expectedFile);
  if (!file) {
    issues.push([redirect.source, "legacy-redirect-missing", expectedFile]);
  } else if (
    !file.html.includes(`http-equiv="refresh"`) ||
    !file.html.includes(`url=${redirect.destination}`)
  ) {
    issues.push([
      redirect.source,
      "legacy-redirect-target-mismatch",
      redirect.destination,
    ]);
  }
}

if (issues.length > 0) {
  console.error(`[seo-audit] ${issues.length} issue(s) found`);
  for (const [file, code, detail] of issues.slice(0, 80)) {
    console.error(`- ${code}: ${file} (${detail})`);
  }
  if (issues.length > 80) {
    console.error(`... ${issues.length - 80} more issue(s)`);
  }
  process.exit(1);
}

console.log(
  `[seo-audit] passed (${files.length} HTML files, ${sitemapUrls.length} sitemap URLs)`
);
