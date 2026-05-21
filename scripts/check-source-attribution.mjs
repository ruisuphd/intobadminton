#!/usr/bin/env node
//
// check-source-attribution.mjs
//
// Build gate: every blog article that paraphrases content from a named
// third-party reviewer must attribute that source in its factChecks[].
//
// Currently enforced for TiGe XLab (the polished editorial reviews in
// /blogs/ TiGe*.md). The user-confirmed ingestion rule is:
//
//   - TiGe content is paraphrased into Rui Su's observer voice, NOT
//     transcribed verbatim.
//   - Every article that draws on a TiGe source MUST include a factCheck
//     entry with `sourceName: "TiGe XLab"` so the on-page rendering and
//     the JSON-LD chain credit the source honestly.
//
// This script runs in postbuild between generate-legacy-redirects and
// postbuild-seo-audit. It parses src/lib/blog.ts and
// src/lib/blog-source-reviews.ts as text (not AST) and splits each file
// into article chunks delimited by `slug: "<value>"`. A chunk that
// references any TiGe marker but lacks a TiGe XLab factCheck triggers a
// non-zero exit, which fails `npm run build`.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_FILES = [
  "src/lib/blog.ts",
  "src/lib/blog-source-reviews.ts",
];

// Markers that indicate a TiGe XLab source was drawn upon.
//
// `TiGe` is matched case-sensitively because the brand is consistently
// styled with capital T + capital G ("TiGe XLab"); matching case-
// insensitively false-positives on common words like "Tiger", "prestige",
// "advantage". `XLab` is also case-sensitive for the same reason
// ("relaxlab", "axlab" etc. should not trip). The Chinese-character
// marker 泰戈 stays as-is.
const TIGE_MARKERS = [/\bTiGe\b/, /\bXLab\b/, /泰戈/];

// Attribution must be a string-literal factCheck sourceName.
const TIGE_SOURCE_NAME = /sourceName:\s*["']TiGe XLab["']/;

function readArticleChunks(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  // Split on the slug declaration. Each chunk after position 0 starts
  // with the slug value. We attach the slug name as a label for error
  // reporting; the chunk's body extends until the next slug declaration.
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const chunks = [];
  let match;
  const positions = [];
  while ((match = slugRegex.exec(content)) !== null) {
    positions.push({ slug: match[1], start: match.index });
  }
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? positions[i + 1].start : content.length;
    chunks.push({
      slug: positions[i].slug,
      body: content.slice(start, end),
      file: filePath,
    });
  }
  return chunks;
}

function chunkReferencesTige(chunk) {
  return TIGE_MARKERS.some((marker) => marker.test(chunk.body));
}

function chunkAttributesTige(chunk) {
  return TIGE_SOURCE_NAME.test(chunk.body);
}

let violations = [];
let totalArticles = 0;
let totalTigeReferencing = 0;

for (const relPath of TARGET_FILES) {
  const filePath = path.join(ROOT, relPath);
  if (!fs.existsSync(filePath)) {
    // Not a hard error — file may be added or removed across refactors.
    console.log(`[attribution] skipping ${relPath} (not present)`);
    continue;
  }
  const chunks = readArticleChunks(filePath);
  totalArticles += chunks.length;
  for (const chunk of chunks) {
    if (chunkReferencesTige(chunk)) {
      totalTigeReferencing += 1;
      if (!chunkAttributesTige(chunk)) {
        violations.push({
          slug: chunk.slug,
          file: relPath,
          excerpt: chunk.body
            .split(/\r?\n/)
            .find((line) => TIGE_MARKERS.some((m) => m.test(line)))
            ?.trim()
            .slice(0, 140),
        });
      }
    }
  }
}

if (violations.length > 0) {
  console.error(
    `\n[attribution] FAIL — ${violations.length} article(s) reference a TiGe XLab source without an attribution factCheck:\n`
  );
  for (const v of violations) {
    console.error(`  • ${v.slug} (${v.file})`);
    if (v.excerpt) console.error(`      ↳ ${v.excerpt}`);
  }
  console.error(
    `\n  Fix: add a factCheck entry to the article with\n    sourceName: "TiGe XLab"\n    title: <the source review title>\n    section: <which buyer decision the source informed>\n    checkedAt: <ISO date>\n    href: <link to the source post>\n    note: <one-line attribution note>\n`
  );
  process.exit(1);
}

console.log(
  `[attribution] OK — scanned ${totalArticles} article chunk(s); ${totalTigeReferencing} reference TiGe XLab, all attributed.`
);
