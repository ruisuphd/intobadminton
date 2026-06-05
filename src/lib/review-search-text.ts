import type { BlogArticle } from "@/lib/blog";

const MAX_SECTION_SNIPPET = 120;

/**
 * Build extra search tokens from a review article without importing the full
 * body into the summary field (keeps result cards concise).
 */
export function reviewSearchTokens(article: BlogArticle): string[] {
  const parts: string[] = [];
  if (article.verdict) parts.push(article.verdict);
  if (article.dek) parts.push(article.dek);

  for (const section of article.sections) {
    if (section.heading) parts.push(section.heading);
    const snippet = section.body
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, MAX_SECTION_SNIPPET);
    if (snippet) parts.push(snippet);
  }

  return parts;
}
