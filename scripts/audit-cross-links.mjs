#!/usr/bin/env node
//
// audit-cross-links.mjs
//
// Reports articles with 0 inbound links (no other article references them
// via factCheck.href or section body) and articles with 0 outbound links
// (no factCheck.href referencing another /blog/ slug).
//
// This is a SOFT audit — it prints the report but does not fail the build.
// Use it during the Sprint 7 cross-link reverse pass to identify which
// articles need a backlink added, and during ongoing maintenance to catch
// orphaned content before it weakens the site's internal-link graph.
//
// Why this matters for the toolkit positioning: cross-links reinforce
// E-E-A-T (Google's helpful-content signals reward dense internal linking
// across a topical cluster) and keep readers in the finder ecosystem
// longer (each blog → finder cta plus blog → blog reference compounds).

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_FILES = [
  "src/lib/blog.ts",
  "src/lib/blog-source-reviews.ts",
];

const SLUG_REGEX = /slug:\s*["']([a-z0-9-]+)["']/g;
// Match either /blog/<slug>/ paths (in factCheck hrefs or cta strings)
// or bare slug references inside body text where another article is named.
const BLOG_PATH_REGEX = /\/blog\/([a-z0-9-]+)\//g;

function readArticleChunks(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const slugRegex = /slug:\s*["']([a-z0-9-]+)["']/g;
  const positions = [];
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    positions.push({ slug: match[1], start: match.index });
  }
  const chunks = [];
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end =
      i + 1 < positions.length ? positions[i + 1].start : content.length;
    chunks.push({
      slug: positions[i].slug,
      body: content.slice(start, end),
      file: filePath,
    });
  }
  return chunks;
}

function extractOutboundLinks(body) {
  const links = new Set();
  let match;
  // Reset regex state by creating a fresh local copy.
  const re = new RegExp(BLOG_PATH_REGEX.source, "g");
  while ((match = re.exec(body)) !== null) {
    links.add(match[1]);
  }
  return links;
}

const allChunks = [];
for (const relPath of TARGET_FILES) {
  const filePath = path.join(ROOT, relPath);
  if (!fs.existsSync(filePath)) continue;
  const chunks = readArticleChunks(filePath);
  allChunks.push(...chunks);
}

const allSlugs = new Set(allChunks.map((c) => c.slug));
const outboundLinksBySlug = new Map();
const inboundLinksBySlug = new Map();

for (const chunk of allChunks) {
  const outbound = extractOutboundLinks(chunk.body);
  // A slug should not be considered to link to itself; remove self-references.
  outbound.delete(chunk.slug);
  // Only count outbound links to slugs that actually exist as articles.
  const realOutbound = [...outbound].filter((s) => allSlugs.has(s));
  outboundLinksBySlug.set(chunk.slug, realOutbound);

  for (const target of realOutbound) {
    if (!inboundLinksBySlug.has(target)) inboundLinksBySlug.set(target, []);
    inboundLinksBySlug.get(target).push(chunk.slug);
  }
}

// Initialise inbound buckets for slugs that received zero links.
for (const slug of allSlugs) {
  if (!inboundLinksBySlug.has(slug)) inboundLinksBySlug.set(slug, []);
}

const noInbound = [];
const noOutbound = [];
for (const slug of allSlugs) {
  if (inboundLinksBySlug.get(slug).length === 0) noInbound.push(slug);
  if ((outboundLinksBySlug.get(slug) ?? []).length === 0) noOutbound.push(slug);
}

const totalArticles = allSlugs.size;

console.log(`[cross-links] scanned ${totalArticles} articles`);
console.log(
  `[cross-links]   ${noInbound.length} articles have ZERO inbound links (no other article references them)`
);
console.log(
  `[cross-links]   ${noOutbound.length} articles have ZERO outbound links to other blog articles`
);
console.log();

if (noInbound.length > 0) {
  console.log("Articles with zero inbound links (need backlinks added):");
  for (const slug of noInbound.sort()) {
    console.log(`  - ${slug}`);
  }
  console.log();
}

if (noOutbound.length > 0) {
  console.log(
    "Articles with zero outbound links (consider cross-linking to ≥1 related article):"
  );
  for (const slug of noOutbound.sort()) {
    console.log(`  - ${slug}`);
  }
  console.log();
}

// Exit cleanly even when there are gaps — this is a soft audit.
process.exit(0);
