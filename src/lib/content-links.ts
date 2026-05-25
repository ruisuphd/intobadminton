import blogReviewMap from "@/data/blog-review-product-map.json";
import { blogArticles, type BlogArticle, type BlogSlug } from "@/lib/blog";
import { articlePathForSlug, editorialSlugs } from "@/lib/blog-migrations";
import { reviewPath, reviewProductById } from "@/lib/review-pages";

const blogToProduct = blogReviewMap as Record<string, string>;

const COMPARE_GUIDES: { href: string; keywords: string[] }[] = [
  {
    href: "/compare-guides/yonex-astrox-vs-nanoflare/",
    keywords: ["astrox", "nanoflare", "yonex-nanoflare"],
  },
  {
    href: "/compare-guides/yonex-victor-li-ning/",
    keywords: ["yonex-victor", "li-ning-flagship", "brand"],
  },
  {
    href: "/compare-guides/astrox-77-pro-vs-88s-pro/",
    keywords: ["astrox-77-pro", "88s-pro", "astrox-88s"],
  },
  {
    href: "/compare-guides/astrox-99-pro-vs-astrox-100zz/",
    keywords: ["astrox-99-pro", "astrox-100zz", "100zz"],
  },
  {
    href: "/compare-guides/astrox-99-pro-vs-halbertec-9000-power/",
    keywords: ["astrox-99-pro", "halbertec-9000-power"],
  },
  {
    href: "/compare-guides/astrox-88d-pro-vs-axforce-90-new/",
    keywords: ["astrox-88d-pro", "axforce-90-new"],
  },
  {
    href: "/compare-guides/halbertec-9000-power-vs-axforce-100-gen-2/",
    keywords: ["halbertec-9000", "axforce-100-gen-2", "thunder-100"],
  },
  {
    href: "/compare-guides/bladex-800-speed-vs-nanoflare-1000z/",
    keywords: ["bladex-800", "nanoflare-1000z"],
  },
  {
    href: "/compare-guides/nanoflare-1000z-vs-auraspeed-99/",
    keywords: ["nanoflare-1000z", "auraspeed-99"],
  },
  {
    href: "/compare-guides/nanoflare-800-pro-vs-auraspeed-hs-plus/",
    keywords: ["nanoflare-800-pro", "auraspeed-hs-plus", "hs-plus"],
  },
  {
    href: "/compare-guides/yonex-65z4-vs-eclipsion-z3/",
    keywords: ["65z4", "eclipsion-z3"],
  },
  {
    href: "/compare-guides/badminton-vs-tennis-shoes/",
    keywords: ["tennis-shoes", "shoe-buying"],
  },
];

export function reviewProductIdForBlog(slug: string): string | undefined {
  const id = blogToProduct[slug];
  if (!id || !reviewProductById(id)) return undefined;
  return id;
}

function rankBlogSlugsForProduct(slugs: BlogSlug[]) {
  return slugs
    .map((slug) => {
      const article = blogArticles.en.find((a) => a.slug === slug);
      let score = 0;
      if (slug.includes("review") || slug.includes("deep-dive")) score += 2;
      if (article && article.sections.length >= 3) score += 1;
      return { slug, score, updatedAt: article?.updatedAt ?? "" };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.updatedAt < b.updatedAt ? 1 : -1;
    });
}

export function blogSlugsForReview(productId: string): BlogSlug[] {
  const candidates = (Object.entries(blogToProduct) as [BlogSlug, string][])
    .filter(([, id]) => id === productId)
    .map(([slug]) => slug);
  if (!candidates.length) return [];
  return rankBlogSlugsForProduct(candidates).map((entry) => entry.slug);
}

export function blogArticlesForReview(productId: string): BlogArticle[] {
  return blogSlugsForReview(productId)
    .map((slug) => blogArticles.en.find((article) => article.slug === slug))
    .filter((article): article is BlogArticle => Boolean(article));
}

export function blogSlugForReview(productId: string): BlogSlug | undefined {
  return blogSlugsForReview(productId)[0];
}

export function reviewDescriptionFromArticles(
  editorNote: string | undefined,
  articles: BlogArticle[]
): string {
  if (editorNote) return editorNote;
  const firstBody = articles[0]?.sections[0]?.body;
  if (!firstBody) return "";
  const trimmed = firstBody.replace(/\s+/g, " ").trim();
  return trimmed.length <= 155 ? trimmed : `${trimmed.slice(0, 152)}…`;
}

export function compareGuidesForBlog(slug: string, limit = 2): string[] {
  const haystack = slug.toLowerCase();
  return COMPARE_GUIDES.filter((guide) =>
    guide.keywords.some((kw) => haystack.includes(kw))
  )
    .slice(0, limit)
    .map((g) => g.href);
}

const REVIEW_EDITORIAL_LINKS: Record<string, { href: string; label: string }[]> =
  {
    "yy-nanoflare-1000z": [
      {
        href: "/comparisons/yonex-nanoflare-1000z-play-review/",
        label: "Nanoflare 1000 Z vs 1000 Play",
      },
    ],
    "yy-nanoflare-1000-play": [
      {
        href: "/comparisons/yonex-nanoflare-1000z-play-review/",
        label: "Nanoflare 1000 Z vs 1000 Play",
      },
    ],
  };

export function editorialComparisonsForReview(productId: string) {
  const manual = REVIEW_EDITORIAL_LINKS[productId] ?? [];
  const seen = new Set(manual.map((link) => link.href));
  const editorialSet = new Set(editorialSlugs());
  const auto: { href: string; label: string }[] = [];

  for (const article of blogArticles.en) {
    if (!editorialSet.has(article.slug)) continue;
    if (article.relatedReviewProductId !== productId) continue;
    const href = articlePathForSlug(article.slug);
    if (seen.has(href)) continue;
    seen.add(href);
    auto.push({ href, label: article.title });
  }

  return [...manual, ...auto].slice(0, 6);
}

export function reviewPageLinkForBlog(slug: string): string | undefined {
  const productId = reviewProductIdForBlog(slug);
  if (!productId) return undefined;
  return reviewPath(productId);
}

export function relatedContentForBlog(article: BlogArticle) {
  const reviewId = reviewProductIdForBlog(article.slug);
  const compareGuides = compareGuidesForBlog(article.slug);
  return { reviewId, compareGuides };
}
