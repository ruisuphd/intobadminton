import productsCatalog from "@/data/products.json";
import blogReviewMap from "@/data/blog-review-product-map.json";
import { blogArticles, type BlogSlug } from "@/lib/blog";
import { companyInfo } from "@/lib/company";
import { productPath } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const CATALOG = productsCatalog as ProductRecord[];

/**
 * Categories that get a dedicated `/review/[slug]/` page. Strings and grips
 * are intentionally excluded for now — their per-product content is thinner.
 * Shuttles join rackets and shoes once standalone editorial depth exists.
 */
const REVIEW_ELIGIBLE_CATEGORIES = new Set<ProductRecord["category"]>([
  "racket",
  "shoes",
  "shuttle",
]);

export function reviewableProducts(): ProductRecord[] {
  return CATALOG.filter((p) => REVIEW_ELIGIBLE_CATEGORIES.has(p.category));
}

export function reviewSlugs(): string[] {
  return reviewableProducts().map((p) => p.id);
}

export function reviewProductById(id: string): ProductRecord | undefined {
  return reviewableProducts().find((p) => p.id === id);
}

function blogSlugForProduct(productId: string): BlogSlug | undefined {
  const candidates = (Object.entries(blogReviewMap) as [BlogSlug, string][])
    .filter(([, id]) => id === productId)
    .map(([slug]) => slug);
  if (!candidates.length) return undefined;

  const product = CATALOG.find((p) => p.id === productId);
  const withoutPlayVariant =
    product && !/\bplay\b/i.test(product.name)
      ? candidates.filter((slug) => !slug.includes("-play-"))
      : candidates;
  const pool = withoutPlayVariant.length > 0 ? withoutPlayVariant : candidates;

  return pool
    .map((slug) => {
      const article = blogArticles.en.find((entry) => entry.slug === slug);
      let score = 0;
      if (slug.includes("review") || slug.includes("deep-dive")) score += 2;
      if (article && article.sections.length >= 3) score += 1;
      if (slug.includes("-vs-") || slug.includes("-play-")) score -= 2;
      if (slug.endsWith("-review") && !slug.includes("-vs-")) score += 1;
      return {
        slug,
        score,
        sections: article?.sections.length ?? 0,
        updatedAt: article?.updatedAt ?? "",
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.sections !== a.sections) return b.sections - a.sections;
      return a.updatedAt < b.updatedAt ? 1 : -1;
    })[0]?.slug;
}

export function reviewPath(id: string): string {
  const slug = blogSlugForProduct(id);
  if (slug) return `/review/${slug}/`;
  return `/review/${id}/`;
}

/** Link target for catalog rows — only emits URLs that exist in the static export. */
export function catalogProductHref(product: ProductRecord): string {
  const slug = blogSlugForProduct(product.id);
  if (slug) return `/review/${slug}/`;
  return productPath(product.id);
}

export function productHref(productId: string): string {
  const product = CATALOG.find((p) => p.id === productId);
  if (!product) return "/quiz/";
  return catalogProductHref(product);
}

/** Href for a long-form review article, or null when only a brand hub exists. */
export function editorialReviewHref(productId: string): string | null {
  const slug = blogSlugForProduct(productId);
  return slug ? `/review/${slug}/` : null;
}

export function reviewUrl(id: string): string {
  return `${companyInfo.siteUrl}${reviewPath(id)}`;
}
