#!/usr/bin/env node
/**
 * Pass 9 helper: inventory official_verified / flagship rows for manual spec sweep.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(
  readFileSync(`${ROOT}/src/data/products.json`, "utf8")
);

const now = new Date();
const staleDays = 180;

function isGenericOfficialUrl(url) {
  if (!url) return true;
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/+$/, "") || "/";
    if (path === "/") return true;
    if (/\/product\/[^/]+/i.test(path) || /\/products\/[^/]+/i.test(path)) {
      return false;
    }
    const genericPaths = new Set([
      "/badminton",
      "/badminton/racquets",
      "/badminton-racket",
      "/badminton-shoes",
      "/badminton/strings",
      "/badminton/accessories",
      "/nanoflare",
      "/arcsaber",
      "/astrox",
    ]);
    if (genericPaths.has(path.toLowerCase())) return true;
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 1) return false;
    return segments.length <= 2 && !path.includes("-");
  } catch {
    return true;
  }
}

const rows = products.map((p) => {
  const verified = new Date(p.lastVerifiedAt);
  const ageDays = (now - verified) / (1000 * 60 * 60 * 24);
  return {
    id: p.id,
    brand: p.brand,
    name: p.name,
    category: p.category,
    verificationStatus: p.verificationStatus,
    officialSourceUrl: p.officialSourceUrl,
    lastVerifiedAt: p.lastVerifiedAt,
    ageDays: Math.floor(ageDays),
    genericOfficialUrl: isGenericOfficialUrl(p.officialSourceUrl),
    needsSweep:
      p.verificationStatus !== "official_verified" || ageDays > staleDays,
  };
});

const needsSweep = rows.filter((r) => r.needsSweep);
const genericUrls = needsSweep.filter((r) => r.genericOfficialUrl);
const out = {
  generatedAt: now.toISOString().slice(0, 10),
  total: rows.length,
  officialVerified: rows.filter((r) => r.verificationStatus === "official_verified")
    .length,
  needsSweep: needsSweep.length,
  genericOfficialUrlCount: genericUrls.length,
  rows: needsSweep,
  genericOfficialUrlRows: genericUrls,
};
writeFileSync(
  `${ROOT}/scripts/official-spec-sweep-queue.json`,
  JSON.stringify(out, null, 2) + "\n"
);
console.log(
  `official-spec-sweep: ${out.officialVerified} verified, ${out.needsSweep} queued (${out.genericOfficialUrlCount} generic URLs) → scripts/official-spec-sweep-queue.json`
);
