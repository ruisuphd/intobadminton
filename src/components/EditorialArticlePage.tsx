import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSenseScript } from "@/components/AdSenseScript";
import { AdSlot } from "@/components/AdSlot";
import { GlossaryLinkedText } from "@/components/GlossaryLinkedText";
import { ArticleToc } from "@/components/ArticleToc";
import { HelpfulReaction } from "@/components/HelpfulReaction";
import { InArticleAffiliateDisclosure } from "@/components/InArticleAffiliateDisclosure";
import { JsonLd } from "@/components/JsonLd";
import { LastArticleTracker } from "@/components/LastArticleTracker";
import { ReadingProgress } from "@/components/ReadingProgress";
import { RelatedPostsGrid } from "@/components/RelatedPostsGrid";
import { RelatedReadingShelf } from "@/components/RelatedReadingShelf";
import { ReviewProductPanel } from "@/components/ReviewProductPanel";
import { SocialShare } from "@/components/SocialShare";
import {
  blogArticles,
  getBlogArticle,
  readingTimeMinutes,
  relatedArticles,
  sectionAnchorId,
} from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { adsAllowedOnReview } from "@/lib/thin-content";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";
import { enrichmentForReviewArticle } from "@/lib/review-article-enrichment";
import { relatedReadingForReviewSlug } from "@/lib/related-content";
import { datasetJsonLd } from "@/lib/structured-data";

function isSpecLikeHeading(heading: string) {
  return /\bspec(?:s|ifications?)?\b/i.test(heading);
}

export function EditorialArticlePage({
  locale,
  slug,
}: {
  locale: SiteLocale;
  slug: string;
}) {
  const article = getBlogArticle(locale, slug);

  if (!article) {
    notFound();
  }

  const path = articlePathForSlug(article.slug);
  const canonicalUrl = `${companyInfo.siteUrl}${path}`;
  const minutes = readingTimeMinutes(article);
  const sections = article.sections.filter(
    (section) => !isSpecLikeHeading(section.heading)
  );
  const anchorSeen = new Map<string, number>();
  const sectionIds = sections.map((section, index) =>
    sectionAnchorId(section.heading, index, anchorSeen)
  );
  const decisionPath = relatedReadingForReviewSlug(article.slug);
  const enrichment = enrichmentForReviewArticle(slug, article);
  const tocItems = sections.map((section, index) => ({
    id: sectionIds[index] ?? sectionAnchorId(section.heading, index, new Map()),
    label: section.heading,
  }));

  /*
   * In-article ad position.
   *
   * Reviews carry ~75% of the site's search traffic but had no ad inventory at
   * all, so the two slots here are the ones that matter commercially. Placement
   * rules: never above the fold (the consent banner already dominates the first
   * mobile viewport), and never inside a short article — sandwiching a
   * three-section review between two ad units reads as a made-for-ads page,
   * which is the thing AdSense reviewers reject.
   *
   * -1 disables the in-article slot; the end-of-article slot always renders
   * on indexable publication reviews. Both are no-ops until
   * NEXT_PUBLIC_ADSENSE_MODE flips off "disabled", and both stay off
   * noindexed court notes.
   */
  const allowAds = adsAllowedOnReview(article.slug);
  const related = allowAds
    ? relatedArticles(blogArticles[locale], article, 3).filter((entry) =>
        adsAllowedOnReview(entry.slug)
      )
    : [];
  const inArticleAdAfterIndex =
    allowAds && sections.length >= 5 ? 2 : -1;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.dek,
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: companyInfo.founderName,
      url: `${companyInfo.siteUrl}${companyInfo.authorPagePath}`,
    },
    publisher: organizationJsonLd,
    mainEntityOfPage: canonicalUrl,
    inLanguage: "en",
  };

  const comparisonDatasetJsonLd =
    article.comparison && article.comparison.rows.length > 0
      ? datasetJsonLd({
          path,
          name: `${article.title} — structured data`,
          description:
            article.comparison.caption?.trim() ||
            `Editorial specification and measurement data from ${article.title}.`,
          comparison: article.comparison,
        })
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: companyInfo.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reviews",
        item: `${companyInfo.siteUrl}/review/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="flex-1">
      {allowAds ? <AdSenseScript /> : null}
      <LastArticleTracker href={path} title={article.title} />
      <ReadingProgress />
      <JsonLd data={blogPostingJsonLd} />
      {enrichment && <JsonLd data={enrichment.productSchema} />}
      {comparisonDatasetJsonLd ? (
        <JsonLd data={comparisonDatasetJsonLd} />
      ) : null}
      <JsonLd data={breadcrumbJsonLd} />

      <article className="layout-band max-w-3xl py-16">
        <Link
          href={buildLocalizedPath(locale, "/review/")}
          className="text-sm text-[var(--color-accent)] hover:underline"
        >
          ← Reviews
        </Link>

        <header className="mt-6 space-y-4 border-b border-[color:var(--line)] pb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-subtle)]">
            <span>{minutes} min read</span>
            <span>·</span>
            <time dateTime={article.updatedAt}>{article.updatedAt}</time>
          </div>
          <h1 className="text-headline text-[var(--text)]">{article.title}</h1>
          {article.dek && (
            <p className="text-lg leading-relaxed text-[var(--color-muted)] text-balance">
              {article.dek}
            </p>
          )}
          <div className="mt-6">
            <InArticleAffiliateDisclosure />
          </div>
        </header>

        <div className="mt-10 space-y-8">
            {enrichment?.product && (
              <ReviewProductPanel
                product={enrichment.product}
                quizPath={buildLocalizedPath(locale, "/quiz/")}
              />
            )}
            {tocItems.length > 0 && <ArticleToc items={tocItems} />}
            {article.comparison && article.comparison.rows.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-[color:var(--line)]">
                {article.comparison.caption && (
                  <p className="border-b border-[color:var(--line)] bg-[color:var(--surface-muted)] px-4 py-3 text-sm font-medium text-[var(--text)]">
                    {article.comparison.caption}
                  </p>
                )}
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-[color:var(--line)] bg-[color:var(--surface-muted)]">
                      {article.comparison.columns.map((col) => (
                        <th
                          key={col}
                          scope="col"
                          className="px-4 py-3 text-left font-semibold text-[var(--text)]"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {article.comparison.rows.map((row, rowIndex) => (
                      <tr
                        key={`${row.label}-${rowIndex}`}
                        className="border-b border-[color:var(--line)] last:border-0"
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-[var(--text)]"
                        >
                          {row.label}
                        </th>
                        {row.values.map((value, colIndex) => (
                          <td
                            key={`${rowIndex}-${colIndex}`}
                            className="px-4 py-3 text-[var(--color-muted)]"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {sections.map((section, index) => {
              const anchorId =
                sectionIds[index] ??
                sectionAnchorId(section.heading, index, new Map());
              return (
                <Fragment key={`${section.heading}-${index}`}>
                  <section
                    id={anchorId}
                    className="scroll-mt-24 space-y-3"
                  >
                    <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)] text-balance">
                      {section.heading}
                    </h2>
                    <p className="whitespace-pre-line text-base leading-[1.75] text-[var(--text-secondary)]">
                      <GlossaryLinkedText
                        body={section.body}
                        glossaryLinks={section.glossaryLinks}
                      />
                    </p>
                  </section>
                  {index === inArticleAdAfterIndex && (
                    <AdSlot id={`review-inarticle-${article.slug}`} />
                  )}
                </Fragment>
              );
            })}

            <SocialShare url={canonicalUrl} title={article.title} />
            <HelpfulReaction key={article.slug} contentId={`review:${article.slug}`} />
        </div>

        {allowAds ? <AdSlot id={`review-end-${article.slug}`} /> : null}
        <RelatedPostsGrid locale={locale} articles={related} />
        <RelatedReadingShelf items={decisionPath} />
      </article>
    </main>
  );
}
