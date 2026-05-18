import { companyInfo, organizationJsonLd } from "@/lib/company";
import { getEditorialMeta } from "@/lib/editorial-meta";

type ArticleSection = "Reviews" | "Guides" | "Brand Profile" | "Comparison";

export type ArticleJsonLdInput = {
  /** Route path with trailing slash, e.g. "/best/beginner-rackets/". */
  path: string;
  /** Visible headline used in the page H1. */
  headline: string;
  /** Short summary, typically the page dek. */
  description: string;
  /** Editorial section/category for `articleSection`. */
  section: ArticleSection;
  /**
   * Optional explicit date override (YYYY-MM-DD). Falls back to the
   * editorial-meta registry so editors only touch one source of truth.
   */
  datePublished?: string;
  /** Optional dateModified override. Defaults to `lastReviewedAt`. */
  dateModified?: string;
};

const PERSON_ID = `${companyInfo.siteUrl}/about/#person`;

/**
 * Self-contained publisher object embedded into every Article JSON-LD.
 *
 * Google's Article rich-result eligibility requires `publisher.name` and
 * `publisher.logo` on the SAME node — not just an `@id` reference to a
 * separate Organization node defined on the homepage. We therefore inline
 * the publisher here so each page can be validated standalone.
 */
const ARTICLE_PUBLISHER = {
  "@type": "Organization",
  name: companyInfo.siteName,
  url: companyInfo.siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${companyInfo.siteUrl}/intobadminton-og.jpg`,
    width: 512,
    height: 512,
  },
} as const;

/**
 * Self-contained author Person. Inlined for the same reason as the
 * publisher above — Google validators can't resolve `@id` references that
 * point to a node defined on a different page.
 */
const ARTICLE_AUTHOR = {
  "@type": "Person",
  name: companyInfo.founderName,
  url: companyInfo.founderWebsite,
  description: companyInfo.founderDescription,
  jobTitle: "Founder, IntoBadminton",
} as const;

export const founderPersonJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: companyInfo.founderName,
  url: companyInfo.founderWebsite,
  description: companyInfo.founderDescription,
  jobTitle: "Founder, IntoBadminton",
  worksFor: { "@id": organizationJsonLd["@id"] },
} as const;

/**
 * Builds an `Article` JSON-LD payload with a self-contained `author` Person
 * and `publisher` Organization (no dangling `@id` references). Reads
 * `publishedAt` / `lastReviewedAt` from the editorial-meta registry so
 * visible dates and rich-result dates can't drift apart.
 */
export function articleJsonLd(input: ArticleJsonLdInput) {
  const meta = getEditorialMeta(input.path);
  const datePublished =
    input.datePublished ?? meta?.publishedAt ?? meta?.lastReviewedAt;
  const dateModified =
    input.dateModified ?? meta?.lastReviewedAt ?? datePublished;

  if (!datePublished || !dateModified) {
    throw new Error(
      `articleJsonLd called for ${input.path} but no editorial-meta dates exist. ` +
        `Add an entry to editorialMetaByPath in src/lib/editorial-meta.ts.`
    );
  }

  const url = `${companyInfo.siteUrl}${input.path}`;

  // `mainEntityOfPage` deliberately uses an inline WebPage node (not an
  // `@id` reference) so a validator can resolve the entire Article tree
  // from this single script block. We intentionally do NOT emit an
  // `isPartOf` pointer to a global WebSite node — that node lives only on
  // the homepage, so a per-page reference would be dangling for crawlers
  // that only fetch this URL.
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url, url },
    headline: input.headline,
    description: input.description,
    inLanguage: "en",
    datePublished,
    dateModified,
    articleSection: input.section,
    author: ARTICLE_AUTHOR,
    publisher: ARTICLE_PUBLISHER,
  };
}
