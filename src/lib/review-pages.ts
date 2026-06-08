import productsCatalog from "@/data/products.json";
import blogReviewMap from "@/data/blog-review-product-map.json";
import { blogArticles, type BlogSlug } from "@/lib/blog";
import { companyInfo } from "@/lib/company";
import { productPath } from "@/lib/catalog-products";
import type { ProductRecord } from "@/lib/types/product";

const CATALOG = productsCatalog as ProductRecord[];

/**
 * Commercial catalogue rows that share an editorial review with a sibling SKU.
 * Used when `/best/*` picks reference a series or play-tier id but the mapped
 * hands-on article covers the nearest reviewed variant.
 */
export const PRODUCT_REVIEW_ALIASES: Record<string, string> = {
  "vic-p9200": "vic-p9200-iii",
  "yy-power-cushion-65z-wide": "yy-power-cushion-65-z4",
  "yy-astrox-77-play": "yy-astrox-77-pro",
  "vic-drivex-8s": "vic-drivex-10-metallic",
  "yy-astrox-100-game": "yy-astrox-nextage",
  "yy-aerus-z2": "yy-eclipsion-z3",
  "vic-brave-sword-12": "vic-jetspeed-12",
  "vic-auraspeed-100x-se": "vic-auraspeed-90k-ii",
  "yy-voltric-8dg": "yy-voltric-z-force-ltd",
  "yy-nanoray-light-70i": "yy-nanoflare-1000-play",
  "yy-nanoflare-700-play": "yy-nanoflare-700-pro-2024",
  "mizuno-altius-01-feel": "mizuno-carbo-pro-823",
  "vic-thruster-ryuga-ii": "vic-thruster-9900",
};

/**
 * Catalogue rows without a dedicated product review that exit to an intentional
 * explainer article (multi-SKU guides kept unmapped in blog-review-product-map).
 */
export const PRODUCT_REVIEW_EXPLAINER_ALIASES: Record<string, BlogSlug> = {
  "yy-bg65": "badminton-string-selector",
  "yy-bg80": "badminton-string-selector",
  "yy-exbolt-63": "badminton-string-selector",
  "yy-aerobite": "badminton-string-selector",
  "yy-bg80-power": "badminton-string-selector",
  "yy-ac102c": "yonex-grip-sizes-explained",
  "yy-ac102ex": "yonex-grip-sizes-explained",
  "yy-ac108ex": "yonex-grip-sizes-explained",
  "yy-ac104ex": "yonex-grip-sizes-explained",
  "yy-ac125ex": "yonex-grip-sizes-explained",
  "yy-ac130ex": "yonex-grip-sizes-explained",
  "yy-pro-racket-bag-92429": "badminton-bag-loadout",
  "vic-compact-backpack": "badminton-bag-loadout",
};

const EXPLAINER_GUIDE_LABELS: Partial<Record<BlogSlug, string>> = {
  "badminton-string-selector": "Read string guide →",
  "yonex-grip-sizes-explained": "Read grip guide →",
  "badminton-bag-loadout": "Read bag guide →",
};

export type EditorialReviewKind = "review" | "guide";

/**
 * Categories that get a dedicated `/review/[slug]/` page. Grips stay excluded
 * until standalone editorial depth exists. Strings join once a mapped review
 * article exists (e.g. L69).
 */
const REVIEW_ELIGIBLE_CATEGORIES = new Set<ProductRecord["category"]>([
  "racket",
  "shoes",
  "shuttle",
  "string",
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
  const explainerSlug = PRODUCT_REVIEW_EXPLAINER_ALIASES[productId];
  if (explainerSlug) return explainerSlug;

  const resolvedId = PRODUCT_REVIEW_ALIASES[productId] ?? productId;
  const candidates = (Object.entries(blogReviewMap) as [BlogSlug, string][])
    .filter(([, id]) => id === resolvedId)
    .map(([slug]) => slug);
  if (!candidates.length) return undefined;

  return candidates
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

export function editorialReviewKind(productId: string): EditorialReviewKind | null {
  if (!editorialReviewHref(productId)) return null;
  return PRODUCT_REVIEW_EXPLAINER_ALIASES[productId] ? "guide" : "review";
}

export function editorialReviewLinkLabel(
  productId: string,
  options?: { pdp?: boolean }
): string | null {
  const kind = editorialReviewKind(productId);
  if (!kind) return null;
  if (kind === "guide") {
    const explainerSlug = PRODUCT_REVIEW_EXPLAINER_ALIASES[productId];
    return (
      (explainerSlug && EXPLAINER_GUIDE_LABELS[explainerSlug]) ??
      "Read guide →"
    );
  }
  return options?.pdp ? "Read the full review →" : "Read full review →";
}

export function reviewUrl(id: string): string {
  return `${companyInfo.siteUrl}${reviewPath(id)}`;
}
