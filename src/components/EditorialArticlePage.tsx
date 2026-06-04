import Link from "next/link";
import { notFound } from "next/navigation";
import { GlossaryLinkedText } from "@/components/GlossaryLinkedText";
import { ArticleToc } from "@/components/ArticleToc";
import { HelpfulReaction } from "@/components/HelpfulReaction";
import { InArticleAffiliateDisclosure } from "@/components/InArticleAffiliateDisclosure";
import { JsonLd } from "@/components/JsonLd";
import { LastArticleTracker } from "@/components/LastArticleTracker";
import { ReadingProgress } from "@/components/ReadingProgress";
import { RelatedPostsGrid } from "@/components/RelatedPostsGrid";
import { ReviewMethodologyBox } from "@/components/ReviewMethodologyBox";
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
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";
import { enrichmentForReviewArticle } from "@/lib/review-article-enrichment";

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
  const related = relatedArticles(blogArticles[locale], article, 3);
  const enrichment = enrichmentForReviewArticle(slug, article);
  const tocItems = sections.map((section, index) => ({
    id: sectionIds[index] ?? sectionAnchorId(section.heading, index, new Map()),
    label: section.heading,
  }));

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.dek,
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: "Rui Su",
    },
    publisher: organizationJsonLd,
    mainEntityOfPage: canonicalUrl,
    inLanguage: "en",
  };

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
      <LastArticleTracker href={path} title={article.title} />
      <ReadingProgress />
      <JsonLd data={blogPostingJsonLd} />
      {enrichment && <JsonLd data={enrichment.productSchema} />}
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
            {enrichment?.scored && (
              <ReviewProductPanel
                scored={enrichment.scored}
                quizPath={buildLocalizedPath(locale, "/quiz/")}
              />
            )}
            <ReviewMethodologyBox updatedAt={article.updatedAt} />
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
                <section
                  key={`${section.heading}-${index}`}
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
              );
            })}

            <SocialShare url={canonicalUrl} title={article.title} />
            <HelpfulReaction contentId={`review:${article.slug}`} />
        </div>

        <RelatedPostsGrid locale={locale} articles={related} />
      </article>
    </main>
  );
}
