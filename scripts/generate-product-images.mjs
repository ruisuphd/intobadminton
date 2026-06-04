#!/usr/bin/env node
/**
 * Generate responsive image variants for any source image dropped into
 * `public/products/<slug>/`.
 *
 * For each source file (`hero.png`, `hero.jpg`, `scale.jpg`, `context.jpg`,
 * etc.) the script writes three sibling files:
 *
 *   <name>-400.webp
 *   <name>-800.webp
 *   <name>-1200.webp
 *
 * Plus a single fallback `<name>-fallback.jpg` for browsers that don't
 * support WebP (vanishingly rare in 2026, but keeps the OG-image / email-
 * client surface defensible).
 *
 * Skipped if the corresponding outputs already exist and are newer than the
 * source — re-running the script is cheap and safe.
 *
 * Uses macOS `sips` so we avoid adding `sharp` as a dependency just for the
 * build pipeline. Falls back gracefully on Linux CI by no-op'ing with a
 * warning — the CI build does not currently regenerate product images.
 *
 * Usage:
 *   node scripts/generate-product-images.mjs
 *   node scripts/generate-product-images.mjs --force
 */
import { readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname, basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PRODUCTS_DIR = join(ROOT, "public", "products");
const WIDTHS = [400, 800, 1200];
const FORCE = process.argv.includes("--force");

function hasSips() {
  try {
    execFileSync("which", ["sips"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function listSourceFiles() {
  if (!existsSync(PRODUCTS_DIR)) {
    await mkdir(PRODUCTS_DIR, { recursive: true });
    return [];
  }
  const out = [];
  const slugDirs = await readdir(PRODUCTS_DIR, { withFileTypes: true });
  for (const slugDir of slugDirs) {
    if (!slugDir.isDirectory()) continue;
    const slugPath = join(PRODUCTS_DIR, slugDir.name);
    const entries = await readdir(slugPath);
    for (const entry of entries) {
      const ext = extname(entry).toLowerCase();
      const name = basename(entry, ext);
      // Skip generated variants.
      if (/-(?:\d+|fallback)$/.test(name)) continue;
      if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
      out.push({
        slug: slugDir.name,
        sourcePath: join(slugPath, entry),
        baseName: name,
      });
    }
  }
  return out;
}

async function needsRegen(sourcePath, outputPath) {
  if (FORCE) return true;
  if (!existsSync(outputPath)) return true;
  const [src, out] = await Promise.all([stat(sourcePath), stat(outputPath)]);
  return src.mtimeMs > out.mtimeMs;
}

async function generateOne(file) {
  const dir = dirname(file.sourcePath);
  for (const width of WIDTHS) {
    const out = join(dir, `${file.baseName}-${width}.webp`);
    if (!(await needsRegen(file.sourcePath, out))) continue;
    execFileSync(
      "sips",
      [
        "-s",
        "format",
        "webp",
        "-s",
        "formatOptions",
        "82",
        "--resampleWidth",
        String(width),
        file.sourcePath,
        "--out",
        out,
      ],
      { stdio: "ignore" }
    );
    console.log(`  wrote ${out.replace(ROOT + "/", "")}`);
  }
  const fallback = join(dir, `${file.baseName}-fallback.jpg`);
  if (await needsRegen(file.sourcePath, fallback)) {
    execFileSync(
      "sips",
      [
        "-s",
        "format",
        "jpeg",
        "-s",
        "formatOptions",
        "85",
        "--resampleWidth",
        "1200",
        file.sourcePath,
        "--out",
        fallback,
      ],
      { stdio: "ignore" }
    );
    console.log(`  wrote ${fallback.replace(ROOT + "/", "")}`);
  }
}

async function generateOneWithSharp(file, sharp) {
  const dir = dirname(file.sourcePath);
  for (const width of WIDTHS) {
    const out = join(dir, `${file.baseName}-${width}.webp`);
    if (!(await needsRegen(file.sourcePath, out))) continue;
    await sharp(file.sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    console.log(`  wrote ${out.replace(ROOT + "/", "")}`);
  }
  const fallback = join(dir, `${file.baseName}-fallback.jpg`);
  if (await needsRegen(file.sourcePath, fallback)) {
    await sharp(file.sourcePath)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(fallback);
    console.log(`  wrote ${fallback.replace(ROOT + "/", "")}`);
  }
}

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    sharp = null;
  }

  if (!hasSips() && !sharp) {
    console.warn(
      "[generate-product-images] Neither `sips` nor `sharp` available — skipping image generation."
    );
    return;
  }
  const files = await listSourceFiles();
  if (files.length === 0) {
    console.log("[generate-product-images] no source images found under public/products/");
    return;
  }
  const useSharp = Boolean(sharp);
  if (useSharp) {
    console.log("[generate-product-images] using sharp");
  } else if (hasSips()) {
    console.log("[generate-product-images] using sips (macOS)");
  }

  console.log(`[generate-product-images] processing ${files.length} source file(s)…`);
  for (const file of files) {
    if (useSharp) {
      await generateOneWithSharp(file, sharp);
    } else {
      await generateOne(file);
    }
  }
  console.log("[generate-product-images] done.");
}

await main();
