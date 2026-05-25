import fs from "node:fs";
import path from "node:path";
import blogUrlMigrations from "../src/data/blog-url-migrations.json" with { type: "json" };
import legacyDestinations from "../src/data/legacy-redirect-destinations.json" with { type: "json" };
import claimsRegistry from "../content/claims.json" with { type: "json" };

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

const ARTICLE_SCHEMA_REQUIRED =
  /^\/(?:best|brands|compare-guides|comparisons|guides|review)\/[^/]+\/$/;
const ARTICLE_SCHEMA_EXEMPT = new Set(["/guides/glossary/"]);

function requiresArticleSchema(routePath) {
  if (ARTICLE_SCHEMA_EXEMPT.has(routePath)) return false;
  return ARTICLE_SCHEMA_REQUIRED.test(routePath) && routePath !== "/guides/";
}
const SPONSORED_REL = /\brel=["'][^"']*\bsponsored\b[^"']*["']/i;
const AFFILIATE_DISCLOSURE_MARKER = /\bdata-affiliate-disclosure=["']/i;
const META_REFRESH = /<meta[^>]+http-equiv=["']refresh["']/i;
const SITEMAP_EXEMPT_ROUTES = new Set([
  "/404.html",
  "/results/",
  "/setup/",
  "/quiz/",
  "/compare/",
  "/review/submit/",
  "/privacy-choices/",
  "/blogs/",
  "/blog/",
  "/saved/",
]);

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasValidArticleSchema(value) {
  let found = false;
  walkJsonLd(value, (node) => {
    if (found) return;
    const types = valuesForType(node["@type"]);
    if (!types.includes("Article") && !types.includes("BlogPosting")) return;
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

/**
 * Structural validator for emitted JSON-LD nodes. Returns an array of
 * `{ code, detail }` issues, one per violation. Empty array means valid.
 *
 * This is a lightweight runtime check — it asserts the required properties
 * Google rich-results documentation calls out for each supported type. It is
 * intentionally NOT a full schema.org validator; the goal is to catch the
 * obvious shape regressions (missing `name`, malformed item lists, etc.) on
 * every build without adding a heavy dependency.
 */
function isNonEmptyString(value) {
  return typeof value === "string" && value.length > 0;
}

function nodesByType(root) {
  const out = new Map();
  walkJsonLd(root, (node) => {
    for (const type of valuesForType(node["@type"])) {
      const list = out.get(type) ?? [];
      list.push(node);
      out.set(type, list);
    }
  });
  return out;
}

function findJsonLdIssues(root) {
  const issues = [];
  const buckets = nodesByType(root);

  for (const node of buckets.get("FAQPage") ?? []) {
    if (!Array.isArray(node.mainEntity) || node.mainEntity.length === 0) {
      issues.push({ code: "faq-empty", detail: "FAQPage has no mainEntity[]" });
      continue;
    }
    for (const item of node.mainEntity) {
      if (!isPlainObject(item)) continue;
      const itemType = valuesForType(item["@type"]);
      if (!itemType.includes("Question")) {
        issues.push({ code: "faq-bad-item", detail: `FAQPage mainEntity item is not a Question (got ${itemType.join("|") || "no @type"})` });
      }
      if (!isNonEmptyString(item.name)) {
        issues.push({ code: "faq-missing-name", detail: "FAQPage Question missing name" });
      }
      const answer = item.acceptedAnswer;
      if (!isPlainObject(answer) || !isNonEmptyString(answer.text)) {
        issues.push({ code: "faq-missing-answer", detail: `FAQPage Question "${item.name ?? "(unnamed)"}" missing acceptedAnswer.text` });
      }
    }
  }

  for (const node of buckets.get("BreadcrumbList") ?? []) {
    if (!Array.isArray(node.itemListElement) || node.itemListElement.length === 0) {
      issues.push({ code: "breadcrumb-empty", detail: "BreadcrumbList has no itemListElement[]" });
      continue;
    }
    for (const item of node.itemListElement) {
      if (!isPlainObject(item)) continue;
      const itemType = valuesForType(item["@type"]);
      if (!itemType.includes("ListItem")) {
        issues.push({ code: "breadcrumb-bad-item", detail: `BreadcrumbList item is not a ListItem (got ${itemType.join("|") || "no @type"})` });
      }
      if (typeof item.position !== "number") {
        issues.push({ code: "breadcrumb-missing-position", detail: "BreadcrumbList ListItem missing numeric position" });
      }
      if (!isNonEmptyString(item.name)) {
        issues.push({ code: "breadcrumb-missing-name", detail: "BreadcrumbList ListItem missing name" });
      }
      // `item` is recommended on intermediate crumbs; tolerate when missing on
      // the terminal crumb (current page), per Google's BreadcrumbList docs.
    }
  }

  for (const node of buckets.get("HowTo") ?? []) {
    if (!isNonEmptyString(node.name)) {
      issues.push({ code: "howto-missing-name", detail: "HowTo missing name" });
    }
    if (!Array.isArray(node.step) || node.step.length === 0) {
      issues.push({ code: "howto-empty-step", detail: "HowTo has no step[]" });
    }
  }

  for (const node of buckets.get("Brand") ?? []) {
    if (!isNonEmptyString(node.name)) {
      issues.push({ code: "brand-missing-name", detail: "Brand missing name" });
    }
  }

  for (const node of buckets.get("Product") ?? []) {
    if (!isNonEmptyString(node.name)) {
      issues.push({ code: "product-missing-name", detail: "Product missing name" });
    }
    // Google requires at least one of offers, aggregateRating, or review for
    // Product rich result eligibility. We warn (via issue) if none are
    // present so the editor can decide whether to add or remove the schema.
    if (!node.offers && !node.aggregateRating && !node.review) {
      issues.push({ code: "product-no-rich-signal", detail: `Product "${node.name ?? "(unnamed)"}" has no offers, aggregateRating, or review` });
    }
  }

  // NOTE: Review schema is intentionally NOT validated here. PR #35 relaxed
  // the `invalid-review-item-reviewed` rule because reviews embedded in
  // Product schema don't need `itemReviewed` (the parent is the subject),
  // and roundup pages legitimately emit Review with `itemReviewed: Thing`
  // rather than overclaiming a single Product subject. See the rationale in
  // `src/lib/export-audit.ts` `auditJsonLd()`.

  for (const node of buckets.get("Organization") ?? []) {
    if (!isNonEmptyString(node.name)) {
      issues.push({ code: "organization-missing-name", detail: "Organization missing name" });
    }
    if (!isNonEmptyString(node.url)) {
      issues.push({ code: "organization-missing-url", detail: "Organization missing url" });
    }
  }

  for (const node of buckets.get("WebSite") ?? []) {
    if (!isNonEmptyString(node.name)) {
      issues.push({ code: "website-missing-name", detail: "WebSite missing name" });
    }
    if (!isNonEmptyString(node.url)) {
      issues.push({ code: "website-missing-url", detail: "WebSite missing url" });
    }
  }

  for (const node of buckets.get("ItemList") ?? []) {
    if (!Array.isArray(node.itemListElement) || node.itemListElement.length === 0) {
      issues.push({ code: "itemlist-empty", detail: "ItemList has no itemListElement[]" });
    }
  }

  return issues;
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

function blogRedirectsFromMigrations() {
  return [
    { source: "/blog/", destination: "/comparisons/" },
    ...blogUrlMigrations.migrations.map((entry) => ({
      source: `/blog/${entry.slug}/`,
      destination: entry.destination,
    })),
  ];
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
const redirects = [...legacyRedirects(), ...blogRedirectsFromMigrations()];
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
  const requiresArticle = requiresArticleSchema(routePath) && !noindex;
  let hasArticle = false;

  // Relaxed in PR #35: rating-markup-on-list-page, invalid-review-item-
  // reviewed, and json-ld-on-noindex-page were all overly strict. See
  // src/lib/export-audit.ts auditJsonLd() for the rationale.

  for (const script of jsonLdScripts(file.html)) {
    let parsed;
    try {
      parsed = JSON.parse(script);
    } catch (error) {
      issues.push([file.path, "invalid-json-ld", error.message]);
      continue;
    }

    if (!hasArticle && hasValidArticleSchema(parsed)) {
      hasArticle = true;
    }

    for (const issue of findJsonLdIssues(parsed)) {
      issues.push([file.path, `schema:${issue.code}`, issue.detail]);
    }
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

// Claims freshness gate (P3 fact-check framework). Each entry in
// content/claims.json must have an accessedAt within the last 365 days; we
// warn between 180 and 365 to give editors lead time before the build fails.
const CLAIM_WARN_DAYS = 180;
const CLAIM_FAIL_DAYS = 365;
const DAY_MS = 24 * 60 * 60 * 1000;
const now = Date.now();
const claimWarnings = [];

for (const claim of claimsRegistry.claims ?? []) {
  if (typeof claim?.source?.accessedAt !== "string") {
    issues.push(["content/claims.json", "claim-missing-accessed-at", claim?.id ?? "(no id)"]);
    continue;
  }
  const parsed = Date.parse(claim.source.accessedAt);
  if (!Number.isFinite(parsed)) {
    issues.push(["content/claims.json", "claim-bad-accessed-at", `${claim.id}: ${claim.source.accessedAt}`]);
    continue;
  }
  const ageDays = (now - parsed) / DAY_MS;
  if (ageDays >= CLAIM_FAIL_DAYS) {
    issues.push([
      "content/claims.json",
      "claim-stale",
      `${claim.id} accessedAt ${claim.source.accessedAt} (${Math.round(ageDays)} days old, fail threshold ${CLAIM_FAIL_DAYS})`,
    ]);
  } else if (ageDays >= CLAIM_WARN_DAYS) {
    claimWarnings.push(
      `${claim.id} accessedAt ${claim.source.accessedAt} (${Math.round(ageDays)} days old — re-verify before ${CLAIM_FAIL_DAYS} days)`
    );
  }
}

if (claimWarnings.length > 0) {
  console.warn(`[seo-audit] ${claimWarnings.length} claim(s) approaching staleness:`);
  for (const warning of claimWarnings) {
    console.warn(`- ${warning}`);
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
  `[seo-audit] passed (${files.length} HTML files, ${sitemapUrls.length} sitemap URLs, ${(claimsRegistry.claims ?? []).length} claims tracked)`
);
