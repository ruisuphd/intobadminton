#!/usr/bin/env node
/**
 * One-shot generator for racket editorial baseline JSON (Sprint 106).
 * Run: node scripts/generate-racket-editorial-baselines.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

// Dynamic import via tsx for review-pages helpers
const { execFileSync } = await import("node:child_process");

const RACKET_SLUGS = [
  "beginner-rackets",
  "doubles-rackets",
  "smash-heavy-rackets",
  "intermediate-rackets",
  "singles-rackets",
  "lightweight-rackets-5u",
  "rackets-for-shoulder-comfort",
  "all-round-rackets",
  "control-rackets",
  "defensive-rackets",
  "head-heavy-rackets-under-150",
  "head-light-rackets",
  "rackets-under-100",
];

const E2E_PRODUCT_IDS = new Set([
  "yy-arcsaber-7-pro",
  "yy-nanoflare-1000z",
  "yy-astrox-100zz",
  "yy-astrox-99-pro",
  "yy-astrox-77-pro",
  "yy-nanoflare-700-pro-2024",
  "yy-arcsaber-11-pro",
  "ln-halbertec-9000-power",
  "vic-auraspeed-90k-ii",
  "vic-thruster-9900",
  "yy-nanoflare-1000-play",
  "bonny-leisu-800",
  "vic-thruster-hwql",
  "kumpoo-shura-2",
  "yy-nanoflare-700-play",
  "yy-astrox-77-play",
]);

function extractPicks() {
  const byProduct = new Map();
  for (const slug of RACKET_SLUGS) {
    const src = readFileSync(
      resolve(ROOT, `src/app/best/${slug}/page.tsx`),
      "utf8"
    );
    const blockRe = /\{\s*rank:\s*\d+,[\s\S]*?productId:\s*"([^"]+)"[\s\S]*?\}/g;
    let m;
    while ((m = blockRe.exec(src))) {
      const block = m[0];
      const productId = m[1];
      const nameMatch = block.match(/name:\s*"([^"]+)"/);
      const name = nameMatch?.[1] ?? productId;
      if (!byProduct.has(productId)) {
        byProduct.set(productId, {
          productId,
          name,
          bestSlug: slug,
          anchor: name.toLowerCase().replace(/\s+/g, "-"),
        });
      }
    }
  }
  return [...byProduct.values()].sort((a, b) =>
    a.productId.localeCompare(b.productId)
  );
}

const picks = extractPicks();
console.log(`Found ${picks.length} unique racket productIds`);

const tsOut = execFileSync(
  "npx",
  ["tsx", "-e", `
import { catalogProductHref } from './src/lib/review-pages';
import { catalogProductById } from './src/lib/catalog-products';
import { editorialReviewHref, editorialReviewKind } from './src/lib/review-pages';
const ids = ${JSON.stringify(picks.map((p) => p.productId))};
const rows = [];
for (const id of ids) {
  const p = catalogProductById(id);
  if (!p) { rows.push({ id, error: 'missing' }); continue; }
  rows.push({
    productId: id,
    expectHref: catalogProductHref(p),
    expectKind: editorialReviewKind(id),
    editorialHref: editorialReviewHref(id),
  });
}
console.log(JSON.stringify(rows));
`],
  { cwd: ROOT, encoding: "utf8" }
);

const exits = JSON.parse(tsOut.trim());
const exitById = new Map(exits.map((r) => [r.productId, r]));

const catalogQueries = [];
const commercialQueries = [];

for (const pick of picks) {
  const exit = exitById.get(pick.productId);
  if (!exit || exit.error) {
    console.error("Missing catalog product:", pick.productId);
    process.exit(1);
  }
  const e2e = E2E_PRODUCT_IDS.has(pick.productId);

  catalogQueries.push({
    id: `catalog-racket-${pick.productId}`,
    productId: pick.productId,
    expectHref: exit.expectHref,
    expectKind: exit.expectKind,
    ...(e2e ? { e2e: true } : {}),
    note: pick.name,
  });

  commercialQueries.push({
    id: `commercial-racket-${pick.productId}`,
    productId: pick.productId,
    expectHref: exit.expectHref,
    expectKind: exit.expectKind,
    expectBestSlug: pick.bestSlug,
    expectAnchor: pick.anchor,
    expectLinkLabel: "Read full review →",
    ...(e2e ? { e2e: true } : {}),
    note: `${pick.name} on /best/${pick.bestSlug}/`,
  });
}

const catalogFile = {
  version: 1,
  updated: "2026-06-09",
  queries: catalogQueries,
};

const commercialFile = {
  version: 1,
  updated: "2026-06-09",
  queries: commercialQueries,
};

writeFileSync(
  resolve(ROOT, "docs/baselines/catalog-racket-queries.json"),
  `${JSON.stringify(catalogFile, null, 2)}\n`
);
writeFileSync(
  resolve(ROOT, "docs/baselines/commercial-racket-queries.json"),
  `${JSON.stringify(commercialFile, null, 2)}\n`
);

console.log(
  `Wrote catalog (${catalogQueries.length}) + commercial (${commercialQueries.length}) baseline JSON`
);
console.log(`E2e-enabled: ${[...E2E_PRODUCT_IDS].filter((id) => exitById.has(id)).length}`);
