import type { BlogArticle } from "@/lib/blog";
import { reviewProductIdForBlog } from "@/lib/content-links";

export type ReviewHubFilter = "all" | "catalog" | "guides";
export type ReviewEquipmentFilter =
  | "all"
  | "racket"
  | "shoes"
  | "string"
  | "other";

export function reviewHubKind(slug: string): ReviewHubFilter {
  return reviewProductIdForBlog(slug) ? "catalog" : "guides";
}

export function reviewEquipmentType(
  slug: string,
  title: string
): ReviewEquipmentFilter {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();
  if (s.includes("shoe") || t.includes("shoe") || t.includes("footwear")) {
    return "shoes";
  }
  if (
    s.includes("string") ||
    t.includes(" string") ||
    t.includes("strings") ||
    s.includes("bg") ||
    s.includes("aerobite")
  ) {
    return "string";
  }
  if (
    s.includes("shuttle") ||
    s.includes("grip") ||
    s.includes("bag") ||
    t.includes("shuttle")
  ) {
    return "other";
  }
  if (reviewProductIdForBlog(slug)) {
    const productId = reviewProductIdForBlog(slug)!;
    if (productId.includes("shoe")) return "shoes";
    if (productId.includes("string")) return "string";
    if (
      productId.includes("shuttle") ||
      productId.includes("grip") ||
      productId.includes("bag")
    ) {
      return "other";
    }
    return "racket";
  }
  if (
    s.includes("racket") ||
    t.includes("racket") ||
    t.includes("frame") ||
    t.includes("astrox") ||
    t.includes("nanoflare") ||
    t.includes("halbertec")
  ) {
    return "racket";
  }
  return "other";
}

export function filterReviewArticles(
  articles: BlogArticle[],
  options: {
    query: string;
    kind: ReviewHubFilter;
    equipment: ReviewEquipmentFilter;
  }
): BlogArticle[] {
  const q = options.query.trim().toLowerCase();
  return articles.filter((article) => {
    if (options.kind !== "all" && reviewHubKind(article.slug) !== options.kind) {
      return false;
    }
    if (
      options.equipment !== "all" &&
      reviewEquipmentType(article.slug, article.title) !== options.equipment
    ) {
      return false;
    }
    if (!q) return true;
    const haystack = `${article.title} ${article.dek ?? ""}`.toLowerCase();
    return haystack.includes(q);
  });
}
