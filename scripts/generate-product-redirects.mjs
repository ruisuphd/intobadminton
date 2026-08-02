import fs from "node:fs";
import path from "node:path";
import {
  productRedirectIssues,
  productRedirectRoutes,
} from "./product-redirect-helpers.mjs";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

if (basePath) {
  console.log(
    `[product-redirects] skipped for non-production basePath ${basePath}`
  );
  process.exit(0);
}

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://intobadminton.com"
).replace(/\/+$/, "");
const outDir = path.join(process.cwd(), "out");

function normalisePath(value) {
  const withLeading = value.startsWith("/") ? value : `/${value}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function redirectHtml(source, destination) {
  const canonical = `${siteUrl}${destination}`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, follow">
    <meta http-equiv="refresh" content="0; url=${escapeHtml(destination)}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <title>Page moved | IntoBadminton</title>
  </head>
  <body>
    <main>
      <h1>Page moved</h1>
      <p>The old address <code>${escapeHtml(source)}</code> now points to <a href="${escapeHtml(destination)}">${escapeHtml(destination)}</a>.</p>
    </main>
  </body>
</html>
`;
}

function exportFileForRoute(route) {
  const normalised = normalisePath(route);
  if (normalised === "/") return path.join(outDir, "index.html");
  return path.join(outDir, normalised.slice(1), "index.html");
}

const issues = productRedirectIssues();
if (issues.length > 0) {
  console.error(`[product-redirects] ${issues.length} invalid entr(ies)`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

const routes = productRedirectRoutes();

let written = 0;

for (const { source, destination } of routes) {
  const file = exportFileForRoute(source);
  // A retired id must not still own a rendered page. If Next emitted something
  // here the redirect data is stale, and silently overwriting it would delete
  // a live page from the export.
  if (fs.existsSync(file)) {
    const existing = fs.readFileSync(file, "utf8");
    if (!existing.includes('http-equiv="refresh"')) {
      console.error(
        `[product-redirects] refusing to overwrite rendered page at ${source}`
      );
      process.exit(1);
    }
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, redirectHtml(source, destination));
  written += 1;
}

console.log(`[product-redirects] wrote ${written} redirect pages`);
