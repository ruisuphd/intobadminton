#!/usr/bin/env node
/**
 * Run all editorial regression guards in one operator command:
 * review→product map, catalogue PDP, best-of, compare-guides, guides, tools, brands, and reviews hub golden profiles.
 *
 * Usage:
 *   node scripts/editorial-baselines.mjs
 *   node scripts/editorial-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  {
    name: "review product map",
    script: "scripts/review-product-map-baseline.mjs",
  },
  {
    name: "PDP golden profiles",
    script: "scripts/pdp-baseline.mjs",
  },
  {
    name: "catalog string editorial exits",
    script: "scripts/catalog-string-baseline.mjs",
  },
  {
    name: "commercial string editorial exits",
    script: "scripts/commercial-string-baseline.mjs",
  },
  {
    name: "string editorial three-way parity",
    script: "scripts/string-editorial-parity.mjs",
  },
  {
    name: "catalog shuttle editorial exits",
    script: "scripts/catalog-shuttle-baseline.mjs",
  },
  {
    name: "commercial shuttle editorial exits",
    script: "scripts/commercial-shuttle-baseline.mjs",
  },
  {
    name: "shuttle editorial three-way parity",
    script: "scripts/shuttle-editorial-parity.mjs",
  },
  {
    name: "catalog shoe editorial exits",
    script: "scripts/catalog-shoe-baseline.mjs",
  },
  {
    name: "commercial shoe editorial exits",
    script: "scripts/commercial-shoe-baseline.mjs",
  },
  {
    name: "shoe editorial three-way parity",
    script: "scripts/shoe-editorial-parity.mjs",
  },
  {
    name: "catalog racket editorial exits",
    script: "scripts/catalog-racket-baseline.mjs",
  },
  {
    name: "commercial racket editorial exits",
    script: "scripts/commercial-racket-baseline.mjs",
  },
  {
    name: "racket editorial three-way parity",
    script: "scripts/racket-editorial-parity.mjs",
  },
  {
    name: "catalog grip editorial exits",
    script: "scripts/catalog-grip-baseline.mjs",
  },
  {
    name: "commercial grip editorial exits",
    script: "scripts/commercial-grip-baseline.mjs",
  },
  {
    name: "grip editorial three-way parity",
    script: "scripts/grip-editorial-parity.mjs",
  },
  {
    name: "catalog bag editorial exits",
    script: "scripts/catalog-bag-baseline.mjs",
  },
  {
    name: "commercial bag editorial exits",
    script: "scripts/commercial-bag-baseline.mjs",
  },
  {
    name: "bag editorial three-way parity",
    script: "scripts/bag-editorial-parity.mjs",
  },
  {
    name: "best-of golden profiles",
    script: "scripts/best-baseline.mjs",
  },
  {
    name: "best-of image coverage",
    script: "scripts/best-image-coverage.mjs",
  },
  {
    name: "tier-4 budget image baseline",
    script: "scripts/tier4-image-baseline.mjs",
  },
  {
    name: "best-of productId coverage",
    script: "scripts/best-product-id-coverage.mjs",
  },
  {
    name: "compare-guides golden profiles",
    script: "scripts/compare-guides-baseline.mjs",
  },
  {
    name: "guides golden profiles",
    script: "scripts/guides-baseline.mjs",
  },
  {
    name: "tools golden profiles",
    script: "scripts/tools-baseline.mjs",
  },
  {
    name: "brands golden profiles",
    script: "scripts/brands-baseline.mjs",
  },
  {
    name: "reviews hub golden profiles",
    script: "scripts/reviews-baseline.mjs",
  },
];

function usage() {
  console.log(`Usage:
  node scripts/editorial-baselines.mjs   Run editorial golden-profile guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[editorial-baselines] → ${guard.name}`);
  execFileSync("node", [guard.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[editorial-baselines] all guards passed");
