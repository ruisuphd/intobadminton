/**
 * Build-time search index for client-side site search at /search/.
 * Keeps the static export fast: one JSON file, no server.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const articles = JSON.parse(
  readFileSync(join(root, "src/data/blog-articles.json"), "utf8")
);
const products = JSON.parse(
  readFileSync(join(root, "src/data/products.json"), "utf8")
);
const blogReviewMap = JSON.parse(
  readFileSync(join(root, "src/data/blog-review-product-map.json"), "utf8")
);

/** @param {string} productId */
function reviewPathForProduct(productId) {
  const slugs = Object.entries(blogReviewMap)
    .filter(([, id]) => id === productId)
    .map(([slug]) => slug);
  const slug =
    slugs.find((s) => s.includes("review") || s.includes("deep-dive")) ??
    slugs[0];
  if (slug) return `/review/${slug}/`;
  return `/review/${productId}/`;
}

/** @typedef {{ id: string; title: string; href: string; kind: string; excerpt: string; tokens: string }} SearchRecord */

/** @param {string} s */
function norm(s) {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {string} title @param {string} body */
function tokensFor(title, body) {
  return norm(`${title} ${body}`);
}

/** @type {SearchRecord[]} */
const records = [];

for (const article of articles) {
  const excerpt = article.dek || article.verdict || "";
  records.push({
    id: `review:${article.slug}`,
    title: article.title,
    href: `/review/${article.slug}/`,
    kind: "Review",
    excerpt: excerpt.slice(0, 160),
    tokens: tokensFor(
      article.title,
      `${excerpt} ${article.sections?.map((s) => s.heading).join(" ") ?? ""}`
    ),
  });
}

for (const product of products) {
  records.push({
    id: `product:${product.id}`,
    title: `${product.brand} ${product.name}`,
    href: reviewPathForProduct(product.id),
    kind: "Product",
    excerpt: (product.editorNote || product.category || "").slice(0, 160),
    tokens: tokensFor(
      `${product.brand} ${product.name}`,
      `${product.category} ${product.editorNote ?? ""}`
    ),
  });
}

const staticPages = [
  ["/quiz/", "Equipment finder", "Quiz", "Rank rackets strings shoes bags for your level and style"],
  ["/best/", "Best-of guides", "Best", "Curated lists by player intent"],
  ["/guides/", "Guides hub", "Guide", "Evergreen badminton equipment guides"],
  ["/tools/", "Toolkit", "Tool", "Calculators converters diagrams authenticity checker"],
  ["/brands/", "Brands", "Brand", "Yonex Victor Li-Ning decoded"],
  ["/compare-guides/", "Compare guides", "Compare", "Head to head equipment decisions"],
  ["/methodology/", "Methodology", "About", "How fit scores and source authority work"],
  ["/faq/", "FAQ", "About", "Common badminton equipment questions"],
];

for (const [href, title, kind, excerpt] of staticPages) {
  records.push({
    id: `page:${href}`,
    title,
    href,
    kind,
    excerpt,
    tokens: tokensFor(title, excerpt),
  });
}

const outDir = join(root, "public");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "search-index.json");
writeFileSync(
  outPath,
  JSON.stringify({ generatedAt: new Date().toISOString(), records }),
  "utf8"
);
console.log(`[search-index] wrote ${records.length} records → ${outPath}`);
