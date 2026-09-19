import type { SiteLocale } from "@/lib/locale";
import blogArticlesData from "@/data/blog-articles.json";

export const blogSlugs = [
  "badminton-bag-loadout",
  "badminton-equipment-for-kids",
  "badminton-glossary-terms-every-player-should-know",
  "badminton-shoe-fit-stability",
  "badminton-string-selector",
  "beginner-racket-mistakes",
  "how-to-choose-a-badminton-racket",
  "how-to-read-badminton-reviews",
  "li-ning-thunder-100-gen-2-vs-gen-1",
  "racket-balance-vs-swing-speed",
  "used-racket-depreciation",
  "victor-drivex-12-vs-astrox-88d-pro",
  "yonex-grip-sizes-explained",
] as const;

export type BlogSlug = (typeof blogSlugs)[number];

export type BlogComparison = {
  caption?: string;
  columns: string[];
  rows: { label: string; values: string[] }[];
};

export type BlogFactCheck = {
  claim: string;
  source: string;
};

export type BlogArticle = {
  slug: BlogSlug;
  updatedAt: string;
  title: string;
  dek: string;
  verdict: string;
  sections: {
    heading: string;
    body: string;
    glossaryLinks?: { term: string; id: string }[];
  }[];
  cta: string;
  methodology?: string;
  factChecks?: BlogFactCheck[];
  comparison?: BlogComparison;
  relatedReviewProductId?: string;
};

export const blogArticles: Record<SiteLocale, BlogArticle[]> = {
  en: blogArticlesData as BlogArticle[],
};

export function readingTimeMinutes(article: BlogArticle): number {
  const words = article.sections
    .flatMap((s) => `${s.heading} ${s.body}`.split(/\s+/))
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

export function articlesByDateDesc(articles: BlogArticle[]): BlogArticle[] {
  return [...articles].sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0
  );
}

function affinityKey(slug: string): { family: string; brand: string } {
  const parts = slug.split("-");
  if (parts.length < 2) return { family: slug, brand: slug };
  const brand =
    parts[0] === "li" && parts[1] === "ning" ? "li-ning" : parts[0];
  const tail = brand === "li-ning" ? parts[2] : parts[1];
  const family = tail ? `${brand}-${tail}` : brand;
  return { family, brand };
}

export function relatedArticles(
  articles: BlogArticle[],
  current: BlogArticle,
  n = 3
): BlogArticle[] {
  const currentKey = affinityKey(current.slug);
  const scored = articles
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const k = affinityKey(a.slug);
      let score = 0;
      if (k.family === currentKey.family) score = 3;
      else if (k.brand === currentKey.brand) score = 1;
      return { a, score };
    })
    .filter((row) => row.score > 0)
    .sort((x, y) => {
      if (y.score !== x.score) return y.score - x.score;
      return x.a.updatedAt < y.a.updatedAt ? 1 : -1;
    })
    .map((row) => row.a);
  return scored.slice(0, n);
}

export function getBlogArticle(locale: SiteLocale, slug: string) {
  return blogArticles[locale].find((article) => article.slug === slug);
}

export function sectionAnchorId(
  heading: string,
  index: number,
  seen: Map<string, number>
): string {
  const base =
    heading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "") || "section";
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}
