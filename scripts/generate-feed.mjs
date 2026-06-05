/**
 * Writes out/feed.xml after static export (RSS 2.0).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = "https://intobadminton.com";
const root = join(import.meta.dirname, "..");
const articles = JSON.parse(
  readFileSync(join(root, "src/data/blog-articles.json"), "utf8")
);

const GUIDE_ENTRIES = [
  {
    path: "/guides/string-tension/",
    title: "Badminton string tension guide",
    description:
      "How tension changes feel, power, and control by skill level.",
    updatedAt: "2026-05-24",
  },
  {
    path: "/guides/badminton-shoes-vs-running-shoes/",
    title: "Badminton shoes vs running shoes",
    description:
      "Why court shoes matter for lateral stability and gum-rubber grip.",
    updatedAt: "2026-06-01",
  },
  {
    path: "/guides/doubles-positioning-and-rackets/",
    title: "Doubles positioning and rackets",
    description:
      "Front vs rear court roles and how racket balance maps to each job.",
    updatedAt: "2026-06-01",
  },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(iso) {
  return new Date(iso).toUTCString();
}

const items = [
  ...articles.map((article) => ({
    title: article.title,
    link: `${SITE_URL}/review/${article.slug}/`,
    description: article.dek || article.verdict || article.title,
    pubDate: toRfc822(article.updatedAt || "2026-01-01"),
  })),
  ...GUIDE_ENTRIES.map((g) => ({
    title: g.title,
    link: `${SITE_URL}${g.path}`,
    description: g.description,
    pubDate: toRfc822(g.updatedAt),
  })),
]
  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
  .slice(0, 40);

const itemXml = items
  .map(
    (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
  )
  .join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>IntoBadminton</title>
    <link>${SITE_URL}/</link>
    <description>Evidence-led badminton equipment reviews, guides, and finder updates.</description>
    <language>en-us</language>
    <lastBuildDate>${items[0]?.pubDate ?? new Date().toUTCString()}</lastBuildDate>${itemXml}
  </channel>
</rss>`;

const outDir = join(root, "out");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "feed.xml"), xml, "utf8");
console.log("Wrote out/feed.xml");
