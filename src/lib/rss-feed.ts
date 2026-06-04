import { blogArticles } from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { companyInfo } from "@/lib/company";
import { lastModifiedForRoute } from "@/lib/editorial-meta";

export type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

const GUIDE_FEED_ENTRIES: { path: string; title: string; description: string }[] =
  [
    {
      path: "/guides/string-tension/",
      title: "Badminton string tension guide",
      description:
        "How tension changes feel, power, and control by skill level.",
    },
    {
      path: "/guides/badminton-shoes-vs-running-shoes/",
      title: "Badminton shoes vs running shoes",
      description:
        "Why court shoes matter for lateral stability and gum-rubber grip.",
    },
    {
      path: "/guides/doubles-positioning-and-rackets/",
      title: "Doubles positioning and rackets",
      description:
        "Front vs rear court roles and how racket balance maps to each job.",
    },
  ];

function toRfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

export function rssItems(limit = 40): RssItem[] {
  const reviewItems: RssItem[] = blogArticles.en.map((article) => {
    const path = articlePathForSlug(article.slug);
    const modified =
      lastModifiedForRoute(path) ?? article.updatedAt ?? "2026-01-01";
    return {
      title: article.title,
      link: `${companyInfo.siteUrl}${path}`,
      description: article.dek ?? article.verdict ?? article.title,
      pubDate: toRfc822(modified),
    };
  });

  const guideItems: RssItem[] = GUIDE_FEED_ENTRIES.map((g) => {
    const modified = lastModifiedForRoute(g.path) ?? "2026-01-01";
    return {
      title: g.title,
      link: `${companyInfo.siteUrl}${g.path}`,
      description: g.description,
      pubDate: toRfc822(modified),
    };
  });

  return [...reviewItems, ...guideItems]
    .sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )
    .slice(0, limit);
}

export function buildRssXml(items: RssItem[]): string {
  const channelUpdated =
    items[0]?.pubDate ?? new Date().toUTCString();

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

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(companyInfo.siteName)}</title>
    <link>${companyInfo.siteUrl}/</link>
    <description>Evidence-led badminton equipment reviews, guides, and finder updates.</description>
    <language>en-us</language>
    <lastBuildDate>${channelUpdated}</lastBuildDate>${itemXml}
  </channel>
</rss>`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
