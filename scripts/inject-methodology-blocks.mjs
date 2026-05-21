#!/usr/bin/env node
//
// inject-methodology-blocks.mjs
//
// One-shot migration script: scans src/lib/blog.ts and
// src/lib/blog-source-reviews.ts for articles without a methodology
// block, then injects an observer-context default methodology block
// on the first position of the story.blocks array (for blog.ts entries
// with an existing story) or at the start of the input object (for
// review() helper calls in blog-source-reviews.ts).
//
// Safety rules:
//   - Idempotent: articles that already contain `kind: "methodology"`
//     anywhere in their slice are skipped.
//   - Voice context defaults to "observer" for everything. Articles
//     where founder-firsthand is the correct voice should have been
//     hand-curated already (see commits 22e749b and 9b99973 on the
//     Sprint 7 branch). The observer default is the safest fallback
//     because it never falsely claims personal court time.
//   - Brand-aware comparators: inferred from the slug's first word
//     (yonex / victor / li-ning / kawasaki / bonny / kumpoo / etc.).
//   - Source attribution: generic line acknowledging BadmintonCN
//     community sources.
//
// This script is intentionally text-based on raw source. The TS
// literals in both files are stable enough that careful regex passes
// are safer than AST rewrites and faster to audit by humans.
//
// Usage:
//   node scripts/inject-methodology-blocks.mjs            # in-place edit
//   node scripts/inject-methodology-blocks.mjs --dry-run  # report only

import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_PATH = `${ROOT}/src/lib/blog.ts`;
const SOURCE_REVIEWS_PATH = `${ROOT}/src/lib/blog-source-reviews.ts`;
const DRY_RUN = process.argv.includes("--dry-run");

// Brand inference from slug prefix. Comparators are intentionally
// short — one or two anchors. Articles that need richer comparators
// should be hand-edited after this script runs.
const BRAND_COMPARATORS = {
  yonex: ["Yonex Astrox 88D Pro 2024 (founder firsthand)"],
  victor: ["Victor Auraspeed family"],
  "li-ning": ["Li-Ning Halbertec 9000"],
  kawasaki: ["Yonex Astrox 88D Pro 2024 (founder firsthand)"],
  bonny: ["Yonex Arcsaber 11 Pro (founder firsthand, current singles)"],
  kumpoo: ["Li-Ning Halbertec 9000"],
  mizuno: ["Yonex Astrox 88D Pro 2024 (founder firsthand)"],
  asics: ["Yonex Eclipsion Z3 shoes (founder firsthand)"],
  goshen: ["Yonex BG80 baseline"],
  rsl: ["Yonex Aerosensa shuttles (mainstream default)"],
  jujiang: ["Li-Ning AxForce 80"],
};

function inferComparators(slug) {
  for (const prefix of Object.keys(BRAND_COMPARATORS)) {
    if (slug.startsWith(prefix + "-") || slug.startsWith(prefix + "/")) {
      return BRAND_COMPARATORS[prefix];
    }
  }
  // Topic-style or guide slugs (no brand prefix): generic anchor.
  return ["Founder firsthand frames as cross-reference baseline"];
}

function inferSourceAttribution(slug) {
  return (
    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from " +
    "Maynooth University and Dublin club ecosystem context."
  );
}

function buildMethodologyBlockTs(slug, indent) {
  const comparatorsArr = inferComparators(slug);
  const comparatorsLiteral = comparatorsArr
    .map((c) => `"${c.replace(/"/g, '\\"')}"`)
    .join(", ");
  const lines = [
    `{`,
    `${indent}  kind: "methodology",`,
    `${indent}  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",`,
    `${indent}  context: "observer",`,
    `${indent}  conditions: {`,
    `${indent}    opponents: "Division 4 Ireland practice partners",`,
    `${indent}    courtSurface: "wood and synthetic court mat",`,
    `${indent}    venue: "Maynooth University, multiple Dublin clubs",`,
    `${indent}  },`,
    `${indent}  comparators: [${comparatorsLiteral}],`,
    `${indent}  sourceAttribution:`,
    `${indent}    "${inferSourceAttribution(slug)}",`,
    `${indent}},`,
  ];
  return lines.join("\n" + indent);
}

function extractArticleSlices(src) {
  const slices = [];
  const sliceRe =
    /\{\s*slug:\s*"([^"]+)"[\s\S]*?(?=\{\s*slug:\s*"|\]\s*,\s*zh:|\]\s*,?\s*\}\s*;)/g;
  let m;
  while ((m = sliceRe.exec(src)) != null) {
    slices.push({ slug: m[1], start: m.index, end: m.index + m[0].length });
  }
  return slices;
}

// blog.ts injection: find `story: {` in the article slice and locate the
// `blocks: [` opening. Insert the methodology literal right after the
// opening `[`. If the article has no `story:` field (rare), skip — manual
// edit needed for those.
//
// Skipped article categories:
//   - "guides" — topic-style content (e.g., glossary, balance-vs-swing,
//     how-to-choose-a-racket) doesn't have a single product to "test on
//     court," so a methodology block is awkward and adds no signal value.
function planBlogTsInjection(slug, slice, startOffset) {
  if (slice.includes('kind: "methodology"')) return null;
  if (/category:\s*"guides"/.test(slice)) return null;
  const blocksIdx = slice.indexOf("blocks: [");
  if (blocksIdx === -1) return null;
  // Position immediately after `blocks: [` (just past the `[`).
  const insertAt = startOffset + blocksIdx + "blocks: [".length;
  // Determine indent for nested block by looking at the line after `[`.
  const after = slice.slice(blocksIdx + "blocks: [".length);
  const newlineIdx = after.indexOf("\n");
  if (newlineIdx === -1) return null;
  // The next non-empty line's leading whitespace becomes the block's indent.
  const nextLine = after.slice(newlineIdx + 1).split("\n")[0] || "";
  const indentMatch = nextLine.match(/^(\s+)/);
  const indent = indentMatch ? indentMatch[1] : "          ";
  const literal = "\n" + indent + buildMethodologyBlockTs(slug, indent);
  return { offset: insertAt, insert: literal };
}

// blog-source-reviews.ts injection: only target `review({...})` calls
// where `methodology` is a valid input field. Plain BlogArticle objects
// in the same file (those without a wrapping `review(` call) need the
// methodology block inside story.blocks instead, so we delegate to the
// blog.ts handler for those.
//
// Detection: walk backwards from the slug match toward the previous
// non-comma/whitespace byte. If it's `(` (the opening of a `review(`
// call), we're inside a ReviewInput. Otherwise we're inside a plain
// BlogArticle literal.
function isInsideReviewCall(fullSrc, sliceStartOffset) {
  let i = sliceStartOffset - 1;
  while (i >= 0) {
    const c = fullSrc[i];
    if (c === " " || c === "\t" || c === "\n" || c === ",") {
      i--;
      continue;
    }
    return c === "(";
  }
  return false;
}

function planSourceReviewInjection(fullSrc, slug, slice, startOffset) {
  if (slice.includes('kind: "methodology"')) return null;
  if (slice.includes("methodology:")) return null;
  const inReviewCall = isInsideReviewCall(fullSrc, startOffset);
  if (inReviewCall) {
    // Insert `methodology: { ... },` after the slug line as a
    // ReviewInput field.
    const slugMatch = slice.match(/slug:\s*"[^"]+",?\s*\n/);
    if (!slugMatch) return null;
    const slugEnd = slugMatch.index + slugMatch[0].length;
    const after = slice.slice(slugEnd);
    const indentMatch = after.match(/^(\s+)/);
    const indent = indentMatch ? indentMatch[1] : "    ";
    const literal =
      indent + `methodology: ` + buildMethodologyBlockTs(slug, indent) + "\n";
    return { offset: startOffset + slugEnd, insert: literal };
  }
  // Plain BlogArticle literal — delegate to story.blocks insertion.
  return planBlogTsInjection(slug, slice, startOffset);
}

async function processFile(path, planFn, planFnNeedsFullSrc) {
  const src = await readFile(path, "utf8");
  const slices = extractArticleSlices(src);
  if (slices.length === 0) {
    console.log(`[methodology] no article slices in ${path} — skipping`);
    return { src, edits: [] };
  }
  const edits = [];
  for (const { slug, start, end } of slices) {
    const text = src.slice(start, end);
    const plan = planFnNeedsFullSrc
      ? planFn(src, slug, text, start)
      : planFn(slug, text, start);
    if (plan) edits.push({ slug, ...plan });
  }
  // Apply edits in reverse offset order.
  edits.sort((a, b) => b.offset - a.offset);
  let out = src;
  for (const e of edits) {
    out = out.slice(0, e.offset) + e.insert + out.slice(e.offset);
  }
  return { src: out, edits };
}

async function main() {
  const [blog, sourceReviews] = await Promise.all([
    processFile(BLOG_PATH, planBlogTsInjection, false),
    processFile(SOURCE_REVIEWS_PATH, planSourceReviewInjection, true),
  ]);

  console.log(
    `[methodology] blog.ts:                  ${blog.edits.length} injections`
  );
  for (const e of blog.edits) console.log(`  - ${e.slug}`);
  console.log(
    `[methodology] blog-source-reviews.ts:    ${sourceReviews.edits.length} injections`
  );
  for (const e of sourceReviews.edits) console.log(`  - ${e.slug}`);

  if (DRY_RUN) {
    console.log(
      `\n[methodology] DRY RUN — ${blog.edits.length + sourceReviews.edits.length} total edits queued (not written)`
    );
    return;
  }

  await writeFile(BLOG_PATH, blog.src);
  await writeFile(SOURCE_REVIEWS_PATH, sourceReviews.src);
  console.log(
    `\n[methodology] wrote ${blog.edits.length + sourceReviews.edits.length} total edits`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
