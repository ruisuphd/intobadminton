import fs from "node:fs";
import path from "node:path";
import legacyDestinations from "../src/data/legacy-redirect-destinations.json" with { type: "json" };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

if (basePath) {
  console.log(
    `[legacy-redirects] skipped for non-production basePath ${basePath}`
  );
  process.exit(0);
}

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://intobadminton.com"
).replace(/\/+$/, "");
const outDir = path.join(process.cwd(), "out");
const locales = ["en", "zh"];

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

let written = 0;

for (const locale of locales) {
  for (const rawDestination of legacyDestinations) {
    const destination = normalisePath(rawDestination);
    const source = destination === "/" ? `/${locale}/` : `/${locale}${destination}`;
    const file = exportFileForRoute(source);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, redirectHtml(source, destination));
    written += 1;
  }
}

console.log(`[legacy-redirects] wrote ${written} redirect pages`);
