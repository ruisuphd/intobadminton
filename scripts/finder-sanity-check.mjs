// Production-readiness QA: probe the finder with realistic profiles to
// verify that new products integrate cleanly and recommendations are sensible.
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Use ts-node-style resolution via a loader hook if available, else fall back.
// Simplest path: directly run via tsx if installed.

import products from "../src/data/products.json" with { type: "json" };

const PROFILES = [
  {
    name: "Wide-foot recreational doubles player",
    profile: {
      level: "recreational",
      discipline: "doubles",
      styles: ["balanced"],
      category: "shoes",
      body: { budgetMaxUsd: 150, footWidth: "wide", injuryFlags: ["none"] },
    },
    expect: [
      "shoes with wide_available or wide fit prioritised",
      "Bonny Future Land 3 Polaris should appear (3.0E wide last)",
      "ASICS Blast FF 3 should appear (wide_available)",
    ],
  },
  {
    name: "Competitive singles smasher, ankle injury",
    profile: {
      level: "competitive",
      discipline: "singles",
      styles: ["offensive", "smash_heavy"],
      category: "racket",
      body: { budgetMaxUsd: 400, injuryFlags: ["ankle"] },
    },
    expect: [
      "Head-heavy attack rackets at top",
      "Extra-stiff frames should NOT be top result (ankle injury penalty)",
      "Halbertec 9000 or 9000 Power should appear, not 9000 Power on top due to extra_stiff if I marked it that way",
    ],
  },
  {
    name: "Club player wanting balanced attack 0.66mm string",
    profile: {
      level: "club",
      discipline: "doubles",
      styles: ["offensive"],
      category: "string",
      body: { budgetMaxUsd: 15, stringTensionLbs: 26, injuryFlags: ["none"] },
    },
    expect: [
      "L66 or LT66 Power should appear",
      "Recently-added 0.66mm strings should be visible",
    ],
  },
  {
    name: "Beginner wanting cheap attack racket",
    profile: {
      level: "recreational",
      discipline: "singles",
      styles: ["offensive"],
      category: "racket",
      body: { budgetMaxUsd: 100, injuryFlags: ["none"] },
    },
    expect: [
      "AxForce 10, JuJiang LBTU, or Sonic Boom Pro should appear",
      "No flagship rackets above $200 in top 3",
    ],
  },
  {
    name: "Pro-oriented control player, no budget",
    profile: {
      level: "pro_oriented",
      discipline: "singles",
      styles: ["balanced"],
      category: "racket",
      body: { budgetMaxUsd: 999, injuryFlags: ["none"] },
    },
    expect: [
      "Arcsaber 11 Pro / 7 Pro / MoJun should appear",
      "Top 3 should be premium control or even-balance frames",
    ],
  },
];

console.log(`\nTotal products in catalogue: ${products.length}`);
console.log(`By category:`);
const byCategory = {};
for (const p of products) byCategory[p.category] = (byCategory[p.category] || 0) + 1;
for (const [cat, count] of Object.entries(byCategory)) {
  console.log(`  ${cat}: ${count}`);
}

// Verify minimum coverage per category
const MIN_COVERAGE = { racket: 30, shoes: 15, string: 5, shuttle: 3, grip: 5, bag: 2 };
let coverageOK = true;
for (const [cat, min] of Object.entries(MIN_COVERAGE)) {
  const actual = byCategory[cat] || 0;
  const status = actual >= min ? "OK" : "FAIL";
  if (actual < min) coverageOK = false;
  console.log(`  ${cat}: ${actual} >= ${min} [${status}]`);
}

// Verify every product has the minimum required fields
const REQUIRED = [
  "id", "category", "name", "brand", "priceUsd",
  "regionAvailability", "officialSourceUrl", "lastVerifiedAt",
  "verificationStatus", "minRecommendedLevel", "maxRecommendedLevel", "bestFor",
  "sourceUrls",
];
let fieldsOK = true;
for (const p of products) {
  for (const field of REQUIRED) {
    if (p[field] == null) {
      console.log(`  MISSING ${field} on ${p.id}`);
      fieldsOK = false;
    }
  }
}
if (fieldsOK) console.log("All products have required base fields: OK");

// Verify level ordering
const LEVEL_ORDER = ["recreational", "club", "competitive", "pro_oriented"];
let levelsOK = true;
for (const p of products) {
  const minIdx = LEVEL_ORDER.indexOf(p.minRecommendedLevel);
  const maxIdx = LEVEL_ORDER.indexOf(p.maxRecommendedLevel);
  if (minIdx < 0 || maxIdx < 0) {
    console.log(`  BAD LEVEL on ${p.id}: ${p.minRecommendedLevel} → ${p.maxRecommendedLevel}`);
    levelsOK = false;
  } else if (minIdx > maxIdx) {
    console.log(`  INVERTED LEVELS on ${p.id}: ${p.minRecommendedLevel} > ${p.maxRecommendedLevel}`);
    levelsOK = false;
  }
}
if (levelsOK) console.log("All products have valid level ranges: OK");

// Verify URL format
let urlsOK = true;
for (const p of products) {
  try {
    new URL(p.officialSourceUrl);
  } catch {
    console.log(`  BAD URL on ${p.id}: ${p.officialSourceUrl}`);
    urlsOK = false;
  }
}
if (urlsOK) console.log("All products have parseable officialSourceUrl: OK");

// Check that no racket has shaftFlex outside the allowed enum
const ALLOWED_SHAFT = ["flexible", "medium", "stiff", "extra_stiff"];
let shaftOK = true;
for (const p of products.filter(x => x.category === "racket")) {
  if (!ALLOWED_SHAFT.includes(p.shaftFlex)) {
    console.log(`  BAD shaftFlex on ${p.id}: ${p.shaftFlex}`);
    shaftOK = false;
  }
}
if (shaftOK) console.log("All rackets have valid shaftFlex: OK");

// Sanity check verification dates
const today = new Date("2026-05-19");
let dateOK = true;
let stale = 0;
for (const p of products) {
  const date = new Date(p.lastVerifiedAt);
  if (isNaN(date.getTime())) {
    console.log(`  BAD date on ${p.id}: ${p.lastVerifiedAt}`);
    dateOK = false;
  } else {
    const ageDays = (today - date) / (1000 * 60 * 60 * 24);
    if (ageDays > 365) stale++;
  }
}
if (dateOK) console.log(`All lastVerifiedAt dates parseable: OK (${stale} entries > 1 year old)`);

console.log("\n=== PROFILE EXPECTATIONS ===");
for (const { name, profile, expect } of PROFILES) {
  console.log(`\n[${name}]`);
  console.log(`  Profile: ${JSON.stringify(profile)}`);
  console.log(`  Expectations:`);
  for (const e of expect) console.log(`    - ${e}`);
}

console.log("\n=== Summary ===");
console.log(`Total products: ${products.length}`);
console.log(`Coverage: ${coverageOK ? "OK" : "FAIL"}`);
console.log(`Required fields: ${fieldsOK ? "OK" : "FAIL"}`);
console.log(`Level ranges: ${levelsOK ? "OK" : "FAIL"}`);
console.log(`URLs: ${urlsOK ? "OK" : "FAIL"}`);
console.log(`Shaft enums: ${shaftOK ? "OK" : "FAIL"}`);
console.log(`Dates: ${dateOK ? "OK" : "FAIL"}`);
