#!/usr/bin/env node
/**
 * One-shot sync: new review slugs, source maps, product catalog entries.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE_MAP_PATH = `${ROOT}/scripts/blog-slug-source-map.json`;
const SLUGS_LIST_PATH = `${ROOT}/scripts/blog-slugs-list.json`;
const BLOG_TS_PATH = `${ROOT}/src/lib/blog.ts`;
const PRODUCTS_PATH = `${ROOT}/src/data/products.json`;
const REVIEW_MAP_DATA = `${ROOT}/src/data/blog-review-product-map.json`;

const SOURCE_UPDATES = {
  "li-ning-lt66-power-string-review":
    "review-li-ning-lt66-power-string.md",
  "mizuno-carbo-pro-823-review":
    "review-mizuno-carbo-pro-823-825-rackets-quirky.md",
  "victor-fz-100xx-budget-attack-review": "review-victor-fz-100xx-racket.md",
  "anta-ah600w-racket-review": "review-anta-ah600w-racket-quirky.md",
  "bonny-leisu-800-lt-review": "review-bonny-leisu-800lt-racket.md",
  "gosen-ryoga-shiden-review":
    "review-gosen-ryoga-shiden-first-gen-racket.md",
  "yonex-nanospeed-9900-ltg-green-sword-review":
    "review-yonex-nanospeed-9900-limited-lt-green-racket.md",
  "yonex-voltric-z-force-ltd-2012-review":
    "review-yonex-voltric-z-force-limited-racket.md",
  "mizuno-carbo-pro-825-review":
    "review-mizuno-carbo-pro-825-racket-quirky.md",
  "anta-dingyin-1000-racket-review": "review-anta-dingyin-1000-racket.md",
  "gosen-kyokugen-racket-review": "review-gosen-kyokugen-racket.md",
  "li-ning-bladex-880-shida-racket-review":
    "review-li-ning-bladex-880-shida-racket.md",
  "victor-yinbao-a-boom-shoes-review": "review-victor-yinbao-a-boom-shoes.md",
  "chengong-feng-racket-review": "review-chengong-feng-racket.md",
  "bonny-baidi-800lt-racket-review": "review-bonny-baidi-800lt-racket.md",
  "kumpoo-js-65-string-review": "review-kumpoo-js-65-string.md",
};

const REVIEW_PRODUCT_UPDATES = {
  "victor-fz-100xx-budget-attack-review": "vic-fz-100xx",
  "anta-ah600w-racket-review": "anta-ah600w",
  "bonny-leisu-800-lt-review": "bonny-leisu-800-lt",
  "gosen-ryoga-shiden-review": "gosen-ryoga-shiden",
  "yonex-nanospeed-9900-ltg-green-sword-review": "yy-nanospeed-9900-ltg",
  "yonex-voltric-z-force-ltd-2012-review": "yy-voltric-z-force-ltd",
  "mizuno-carbo-pro-825-review": "mizuno-carbo-pro-825",
  "anta-dingyin-1000-racket-review": "anta-dingyin-1000",
  "gosen-kyokugen-racket-review": "gosen-kyokugen",
  "li-ning-bladex-880-shida-racket-review": "ln-bladex-880-shida",
  "victor-yinbao-a-boom-shoes-review": "vic-yinbao-a-boom",
  "chengong-feng-racket-review": "chengong-feng",
  "bonny-baidi-800lt-racket-review": "bonny-baidi-800lt",
  "kumpoo-js-65-string-review": "kumpoo-js-65-string",
  "li-ning-lt66-power-string-review": "ln-lt66-power-string",
};

const NEW_PRODUCTS = [
  {
    id: "vic-fz-100xx",
    category: "racket",
    name: "FZ 100XX",
    brand: "Victor",
    priceUsd: 78,
    headWeight: "head_heavy",
    shaftFlex: "medium",
    weightClass: "4U",
    weightVariants: ["4U"],
    gripSizes: ["G5"],
    balanceMm: 295,
    balanceCategory: "head_heavy",
    swingWeightEstimate: "medium",
    commonStringTensionLbs: { min: 20, max: 30 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2026,
    regionAvailability: ["cn", "sg"],
    officialSourceUrl: "https://www.victorsport.com/badminton-racket",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "club",
    maxRecommendedLevel: "competitive",
    bestFor: ["attack", "doubles_rear", "value_flagship_aesthetic"],
    sourceUrls: ["https://www.victorsport.com/badminton-racket"],
    editorNote:
      "Victor FZ sub-brand Astrox 100ZZ-aesthetic attack frame with WES 3.0 and suspended handle. Strong mid-market whip offence.",
    reviewCount: 0,
  },
  {
    id: "anta-ah600w",
    category: "racket",
    name: "AH600W",
    brand: "Anta",
    priceUsd: 45,
    headWeight: "even",
    shaftFlex: "medium",
    weightClass: "5U",
    weightVariants: ["5U"],
    gripSizes: ["G6"],
    balanceMm: 299,
    balanceCategory: "even",
    swingWeightEstimate: "fast",
    commonStringTensionLbs: { min: 20, max: 30 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2025,
    regionAvailability: ["cn"],
    officialSourceUrl: "https://www.anta.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "recreational",
    maxRecommendedLevel: "club",
    bestFor: ["beginner", "ultralight", "slump_racket"],
    sourceUrls: ["https://www.anta.com/"],
    editorNote:
      "Anta AH600W — 5U white entry frame, 76-hole box, medium-low flex. Competent beginner sugar water; Dingyin is the real Anta flagship story.",
    reviewCount: 0,
  },
  {
    id: "bonny-leisu-800-lt",
    category: "racket",
    name: "Leisu 800LT",
    brand: "Bonny",
    priceUsd: 95,
    headWeight: "head_heavy",
    shaftFlex: "medium_stiff",
    weightClass: "5U",
    weightVariants: ["5U"],
    gripSizes: ["G5"],
    balanceMm: 305,
    balanceCategory: "head_heavy",
    swingWeightEstimate: "fast",
    commonStringTensionLbs: { min: 20, max: 30 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2026,
    regionAvailability: ["cn", "sg"],
    officialSourceUrl: "https://www.bonny-sports.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "club",
    maxRecommendedLevel: "competitive",
    bestFor: ["speed_attack", "nf800lt_homage", "continuous_offence"],
    sourceUrls: ["https://www.bonny-sports.com/"],
    editorNote:
      "Bonny Leisu 800LT — Nanoflare 800 LT homage with nickel-titanium shaft option. Crisp 5U speed attack with concentrated sweet spot.",
    reviewCount: 0,
  },
  {
    id: "gosen-ryoga-shiden",
    category: "racket",
    name: "Ryoga Shiden (1st gen)",
    brand: "Gosen",
    priceUsd: 120,
    headWeight: "even",
    shaftFlex: "medium",
    weightClass: "4U",
    weightVariants: ["4U"],
    gripSizes: ["G5"],
    balanceMm: 290,
    balanceCategory: "even",
    swingWeightEstimate: "medium",
    commonStringTensionLbs: { min: 20, max: 28 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2018,
    regionAvailability: ["jp", "cn"],
    officialSourceUrl: "https://www.gosen.jp/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "source_only",
    minRecommendedLevel: "club",
    maxRecommendedLevel: "competitive",
    bestFor: ["vintage_collectible", "all_round"],
    sourceUrls: ["https://www.gosen.jp/"],
    editorNote:
      "First-generation Gosen Ryoga Shiden — vintage Gosen flagship with distinctive head shape. Collector and nostalgia interest.",
    reviewCount: 0,
  },
  {
    id: "yy-nanospeed-9900-ltg",
    category: "racket",
    name: "Nanoscpeed 9900 Limited (LT Green)",
    brand: "Yonex",
    priceUsd: 350,
    headWeight: "head_light",
    shaftFlex: "stiff",
    weightClass: "3U",
    weightVariants: ["3U"],
    gripSizes: ["G4", "G5"],
    balanceMm: 285,
    balanceCategory: "head_light",
    swingWeightEstimate: "fast",
    commonStringTensionLbs: { min: 20, max: 28 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2011,
    regionAvailability: ["global"],
    officialSourceUrl: "https://www.yonex.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "source_only",
    minRecommendedLevel: "competitive",
    maxRecommendedLevel: "pro",
    bestFor: ["vintage_collectible", "speed", "singles"],
    sourceUrls: ["https://www.yonex.com/"],
    editorNote:
      "Yonex Nanospeed 9900 limited LT green — legendary speed frame, scarce collector piece.",
    reviewCount: 0,
  },
  {
    id: "yy-voltric-z-force-ltd-2012",
    category: "racket",
    name: "Voltric Z-Force Limited (2012)",
    brand: "Yonex",
    priceUsd: 400,
    headWeight: "head_heavy",
    shaftFlex: "extra_stiff",
    weightClass: "3U",
    weightVariants: ["3U"],
    gripSizes: ["G4", "G5"],
    balanceMm: 305,
    balanceCategory: "head_heavy",
    swingWeightEstimate: "heavy",
    commonStringTensionLbs: { min: 20, max: 28 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2012,
    regionAvailability: ["global"],
    officialSourceUrl: "https://www.yonex.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "source_only",
    minRecommendedLevel: "competitive",
    maxRecommendedLevel: "pro",
    bestFor: ["vintage_collectible", "smash_power"],
    sourceUrls: ["https://www.yonex.com/"],
    editorNote:
      "Yonex Voltric Z-Force 2012 limited — iconic head-heavy smash cannon, collector market.",
    reviewCount: 0,
  },
  {
    id: "mizuno-carbo-pro-825",
    category: "racket",
    name: "Carbo Pro 825",
    brand: "Mizuno",
    priceUsd: 95,
    headWeight: "even",
    shaftFlex: "medium",
    weightClass: "4U",
    weightVariants: ["4U"],
    gripSizes: ["G5"],
    balanceMm: 300,
    balanceCategory: "even",
    swingWeightEstimate: "medium",
    commonStringTensionLbs: { min: 20, max: 28 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2026,
    regionAvailability: ["asia", "cn"],
    officialSourceUrl: "https://www.mizunobadminton-asia.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "recreational",
    maxRecommendedLevel: "club",
    bestFor: ["balanced_attack", "mizuno_brand_fans", "value_paint"],
    sourceUrls: ["https://www.mizunobadminton-asia.com/"],
    editorNote:
      "Mizuno Carbo Pro 825 — less extreme than 823, fluid box 72-hole balanced attack. Persimmon paint, club-friendly after restring.",
    reviewCount: 0,
  },
  {
    id: "anta-dingyin-1000",
    category: "racket",
    name: "Dingyin 1000",
    brand: "Anta",
    priceUsd: 180,
    headWeight: "head_heavy",
    shaftFlex: "medium_stiff",
    weightClass: "4U",
    weightVariants: ["4U"],
    gripSizes: ["G5"],
    balanceMm: 298,
    balanceCategory: "head_heavy",
    swingWeightEstimate: "medium",
    commonStringTensionLbs: { min: 20, max: 30 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2026,
    regionAvailability: ["cn"],
    officialSourceUrl: "https://www.anta.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "club",
    maxRecommendedLevel: "competitive",
    bestFor: ["flagship_attack", "anta_brand"],
    sourceUrls: ["https://www.anta.com/"],
    editorNote:
      "Anta Dingyin 1000 — Anta badminton flagship attack frame.",
    reviewCount: 0,
  },
  {
    id: "gosen-kyokugen",
    category: "racket",
    name: "Kyokugen",
    brand: "Gosen",
    priceUsd: 160,
    headWeight: "even",
    shaftFlex: "medium",
    weightClass: "4U",
    weightVariants: ["4U"],
    gripSizes: ["G5"],
    balanceMm: 290,
    balanceCategory: "even",
    swingWeightEstimate: "fast",
    commonStringTensionLbs: { min: 20, max: 28 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2026,
    regionAvailability: ["jp", "cn"],
    officialSourceUrl: "https://www.gosen.jp/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "club",
    maxRecommendedLevel: "competitive",
    bestFor: ["continuity", "all_round", "gosen_flagship"],
    sourceUrls: ["https://www.gosen.jp/"],
    editorNote:
      "Gosen Kyokugen (极炫) — Gosen flagship with Ya-wen shaft tuning, strong continuity and defence.",
    reviewCount: 0,
  },
  {
    id: "ln-bladex-880-shida",
    category: "racket",
    name: "Bladex 880 Shida",
    brand: "Li-Ning",
    priceUsd: 200,
    headWeight: "even",
    shaftFlex: "medium_stiff",
    weightClass: "4U",
    weightVariants: ["4U"],
    gripSizes: ["G5"],
    balanceMm: 292,
    balanceCategory: "even",
    swingWeightEstimate: "medium",
    commonStringTensionLbs: { min: 20, max: 30 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2026,
    regionAvailability: ["cn", "sg"],
    officialSourceUrl: "https://www.lining.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "club",
    maxRecommendedLevel: "competitive",
    bestFor: ["pro_signature", "speed_control"],
    sourceUrls: ["https://www.lining.com/"],
    editorNote:
      "Li-Ning Bladex 880 Shida — pro signature speed-control frame.",
    reviewCount: 0,
  },
  {
    id: "vic-yinbao-a-boom",
    category: "shoe",
    name: "A-BOOM",
    brand: "Victor",
    priceUsd: 85,
    courtType: "indoor",
    stability: "medium",
    cushioning: "medium",
    weightClass: "standard",
    launchYear: 2026,
    regionAvailability: ["cn", "sg"],
    officialSourceUrl: "https://www.victorsport.com/badminton-shoes",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "recreational",
    maxRecommendedLevel: "club",
    bestFor: ["value", "attack_movement"],
    sourceUrls: ["https://www.victorsport.com/badminton-shoes"],
    editorNote:
      "Victor A-BOOM (音爆) badminton shoes — budget attack movement shoe.",
    reviewCount: 0,
  },
  {
    id: "chengong-feng",
    category: "racket",
    name: "Feng",
    brand: "Chengong",
    priceUsd: 55,
    headWeight: "head_heavy",
    shaftFlex: "medium",
    weightClass: "4U",
    weightVariants: ["4U"],
    gripSizes: ["G5"],
    balanceMm: 300,
    balanceCategory: "head_heavy",
    swingWeightEstimate: "medium",
    commonStringTensionLbs: { min: 20, max: 28 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2025,
    regionAvailability: ["cn"],
    officialSourceUrl: "https://www.badmintoncn.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "source_only",
    minRecommendedLevel: "recreational",
    maxRecommendedLevel: "club",
    bestFor: ["budget_attack", "oem_value"],
    sourceUrls: ["https://www.badmintoncn.com/"],
    editorNote:
      "Chengong Feng — budget head-heavy attack racket from niche OEM brand.",
    reviewCount: 0,
  },
  {
    id: "bonny-baidi-800lt",
    category: "racket",
    name: "Baidi 800LT",
    brand: "Bonny",
    priceUsd: 90,
    headWeight: "head_light",
    shaftFlex: "medium",
    weightClass: "5U",
    weightVariants: ["5U"],
    gripSizes: ["G5"],
    balanceMm: 290,
    balanceCategory: "head_light",
    swingWeightEstimate: "fast",
    commonStringTensionLbs: { min: 20, max: 30 },
    shaftFlexSource: "editor_estimate",
    launchYear: 2026,
    regionAvailability: ["cn"],
    officialSourceUrl: "https://www.bonny-sports.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "club",
    maxRecommendedLevel: "competitive",
    bestFor: ["speed", "doubles_front"],
    sourceUrls: ["https://www.bonny-sports.com/"],
    editorNote:
      "Bonny Baidi 800LT — lightweight speed frame in Bonny line.",
    reviewCount: 0,
  },
  {
    id: "kumpoo-js-65-string",
    category: "string",
    name: "JS-65 String",
    brand: "Kumpoo",
    priceUsd: 11,
    gaugeMm: 0.65,
    feel: "medium",
    repulsion: "high",
    control: "medium",
    durability: "medium",
    tensionRangeLbs: { min: 22, max: 28 },
    launchYear: 2025,
    regionAvailability: ["cn", "asia"],
    officialSourceUrl: "https://www.kumpoo.com/",
    lastVerifiedAt: "2026-06-28",
    verificationStatus: "source_only",
    minRecommendedLevel: "recreational",
    maxRecommendedLevel: "club",
    bestFor: ["thin_gauge", "repulsion", "value"],
    sourceUrls: ["https://www.kumpoo.com/"],
    editorNote:
      "Kumpoo JS-65 — thin repulsion string, sibling tier to JS-63/67 line.",
    reviewCount: 0,
  },
];

function sortObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).sort(([a], [b]) => a.localeCompare(b))
  );
}

const sourceMap = JSON.parse(readFileSync(SOURCE_MAP_PATH, "utf8"));
Object.assign(sourceMap, SOURCE_UPDATES);
writeFileSync(SOURCE_MAP_PATH, `${JSON.stringify(sortObject(sourceMap), null, 2)}\n`);

const slugs = JSON.parse(readFileSync(SLUGS_LIST_PATH, "utf8"));
const slugSet = new Set(slugs);
for (const slug of Object.keys(SOURCE_UPDATES)) {
  if (!slugSet.has(slug)) {
    slugs.push(slug);
    slugSet.add(slug);
  }
}
slugs.sort();
writeFileSync(SLUGS_LIST_PATH, `${JSON.stringify(slugs, null, 2)}\n`);

let blogTs = readFileSync(BLOG_TS_PATH, "utf8");
for (const slug of Object.keys(SOURCE_UPDATES)) {
  if (!blogTs.includes(`"${slug}"`)) {
    blogTs = blogTs.replace(
      /(\n] as const;)/,
      `,\n  "${slug}"$1`
    );
  }
}
writeFileSync(BLOG_TS_PATH, blogTs);

const products = JSON.parse(readFileSync(PRODUCTS_PATH, "utf8"));
const productIds = new Set(products.map((p) => p.id));
let added = 0;
for (const product of NEW_PRODUCTS) {
  if (!productIds.has(product.id)) {
    products.push(product);
    productIds.add(product.id);
    added++;
  }
}
writeFileSync(PRODUCTS_PATH, `${JSON.stringify(products, null, 2)}\n`);

for (const mapPath of [REVIEW_MAP_DATA]) {
  const map = JSON.parse(readFileSync(mapPath, "utf8"));
  Object.assign(map, REVIEW_PRODUCT_UPDATES);
  writeFileSync(mapPath, `${JSON.stringify(sortObject(map), null, 2)}\n`);
}

console.log(
  `Synced ${Object.keys(SOURCE_UPDATES).length} slug mappings, ${added} new products.`
);
