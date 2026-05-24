import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticleToc, type TocItem } from "@/components/ArticleToc";
import { HelpfulReaction } from "@/components/HelpfulReaction";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SocialShare } from "@/components/SocialShare";
import {
  blogArticles,
  getBlogArticle,
  readingTimeMinutes,
  relatedArticles,
  sectionAnchorId,
} from "@/lib/blog";
import { relatedContentForBlog } from "@/lib/content-links";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { reviewPath } from "@/lib/review-pages";
import { companyInfo, organizationJsonLd } from "@/lib/company";

function VerdictPanel({ verdict }: { verdict: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-[color:var(--line-strong)] bg-white/80 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
        Verdict
      </p>
      <p className="mt-2 text-lg font-semibold leading-snug text-[var(--text)]">
        {verdict}
      </p>
    </div>
  );
}

export function BlogArticlePage({
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

  const canonicalUrl = `${companyInfo.siteUrl}/blog/${article.slug}/`;
  const minutes = readingTimeMinutes(article);
  const anchorSeen = new Map<string, number>();
  const tocItems: TocItem[] = article.sections.map((section, index) => ({
    id: sectionAnchorId(section.heading, index, anchorSeen),
    label: section.heading,
  }));
  const showToc = tocItems.length >= 3;
  const articleWordCount = article.sections.reduce(
    (sum, section) =>
      sum +
      section.body.split(/\s+/).filter((word) => word.length > 0).length,
    0
  );
  const canShowArticleAd = articleWordCount >= 600;
  const related = relatedArticles(blogArticles[locale], article, 3);
  const { reviewId, compareGuides } = relatedContentForBlog(article);

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
        name: "Blog",
        item: `${companyInfo.siteUrl}/blog/`,
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
      <ReadingProgress />
      <JsonLd data={blogPostingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="border-b border-[color:var(--line)] bg-[color:var(--surface-muted)] py-12 lg:py-16">
        <div className="layout-band max-w-3xl">
          <Link
            href={buildLocalizedPath(locale, "/blog/")}
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Blog
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="chip">Blog</span>
            <span className="text-xs text-[var(--color-subtle)]">
              {minutes} min read
            </span>
            <span className="text-xs text-[var(--color-subtle)]">·</span>
            <time
              className="text-xs text-[var(--color-subtle)]"
              dateTime={article.updatedAt}
            >
              Updated {article.updatedAt}
            </time>
          </div>
          <h1 className="text-headline mt-5 text-[var(--text)]">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)] text-balance">
            {article.dek}
          </p>
          {article.verdict && <VerdictPanel verdict={article.verdict} />}
          {(reviewId || compareGuides.length > 0) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {reviewId && (
                <Link
                  href={buildLocalizedPath(locale, reviewPath(reviewId))}
                  className="chip chip-secondary hover:underline"
                >
                  See specs &amp; fit score →
                </Link>
              )}
              {compareGuides.map((href) => (
                <Link
                  key={href}
                  href={buildLocalizedPath(locale, href)}
                  className="chip chip-secondary hover:underline"
                >
                  Compare guide →
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="layout-band max-w-6xl py-12 lg:py-16">
        <div
          className={showToc ? "lg:grid lg:grid-cols-[1fr_220px] lg:gap-12" : ""}
        >
          <article className="max-w-3xl">
            {article.comparison && article.comparison.rows.length > 0 && (
              <div className="mb-10 overflow-x-auto rounded-2xl border border-[color:var(--line)]">
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
            <div className="space-y-8">
              {article.sections.map((section, index) => {
                const anchorId = tocItems[index]?.id ?? sectionAnchorId(section.heading, index, new Map());
                return (
                  <section
                    key={`${section.heading}-${index}`}
                    className="space-y-3 scroll-mt-24"
                    id={anchorId}
                  >
                    <h2 className="group text-2xl font-semibold tracking-tight text-[var(--text)] text-balance">
                      <a
                        href={`#${anchorId}`}
                        className="relative inline-block focus-visible:outline-none"
                        aria-label={`Permalink to: ${section.heading}`}
                      >
                        {section.heading}
                        <span
                          aria-hidden="true"
                          className="ml-2 text-[color:var(--color-subtle)] opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          #
                        </span>
                      </a>
                    </h2>
                    <p className="whitespace-pre-line text-base leading-[1.75] text-[var(--text-secondary)]">
                      {section.body}
                    </p>
                    {section.glossaryLinks &&
                      section.glossaryLinks.length > 0 && (
                        <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--color-subtle)]">
                          <span className="font-semibold uppercase tracking-wide">
                            See in glossary:
                          </span>
                          {section.glossaryLinks.map((g, i) => (
                            <a
                              key={`${g.id}-${i}`}
                              href={buildLocalizedPath(
                                locale,
                                `/guides/glossary/#${g.id}`
                              )}
                              className="rounded-full border border-[color:var(--line)] px-2.5 py-0.5 text-[color:var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                            >
                              {g.term}
                            </a>
                          ))}
                        </p>
                      )}
                    {canShowArticleAd &&
                      index === Math.floor(article.sections.length / 2) && (
                        <AdSlot id={`blog-${article.slug}-mid`} />
                      )}
                  </section>
                );
              })}
            </div>

            {article.methodology && (
              <aside className="mt-10 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-5 text-sm leading-relaxed text-[var(--color-muted)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
                  How I tested
                </p>
                <p className="mt-2 whitespace-pre-line">{article.methodology}</p>
              </aside>
            )}

            {article.factChecks && article.factChecks.length > 0 && (
              <aside className="mt-6 text-xs text-[var(--color-subtle)]">
                <p className="font-semibold uppercase tracking-wide">Fact checks</p>
                <ul className="mt-2 space-y-1">
                  {article.factChecks.map((row) => (
                    <li key={`${row.claim}-${row.source}`}>
                      {row.claim} — {row.source}
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <div className="mt-12 card p-7">
              <p className="text-lg font-semibold text-[var(--text)]">
                {article.cta}
              </p>
              <Link
                href={buildLocalizedPath(locale, "/quiz/")}
                className="btn-primary mt-5"
              >
                Start the finder
              </Link>
            </div>

            <SocialShare url={canonicalUrl} title={article.title} />

            <HelpfulReaction contentId={`blog:${article.slug}`} />
          </article>

          {showToc && (
            <aside className="hidden lg:block">
              <ArticleToc items={tocItems} />
            </aside>
          )}
        </div>
      </div>

      {showToc && (
        <div className="layout-band max-w-3xl pb-8 lg:hidden">
          <ArticleToc items={tocItems} />
        </div>
      )}

      {related.length > 0 && (
        <section className="border-t border-[color:var(--line)] bg-[color:var(--surface-muted)] py-12">
          <div className="layout-band max-w-6xl">
            <h2 className="text-xl font-semibold text-[var(--text)]">
              Related reading
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={buildLocalizedPath(locale, `/blog/${r.slug}/`)}
                  className="card card-interactive block p-6"
                >
                  <span className="chip">Blog</span>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {r.dek}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
