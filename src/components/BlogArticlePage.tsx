import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import {
  CATEGORY_LABELS,
  blogArticles,
  getBlogArticle,
  readingTimeMinutes,
  relatedArticles,
} from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";

export function BlogArticlePage({
  locale,
  slug,
}: {
  locale: SiteLocale;
  slug: string;
}) {
  const article = getBlogArticle(locale, slug);

  if (!article) {
    return (
      <main className="flex-1 py-16">
        <div className="layout-band max-w-3xl">
          <h1 className="text-3xl font-semibold text-[var(--text)]">
            Article not found
          </h1>
          <Link
            href={buildLocalizedPath(locale, "/blog/")}
            className="mt-4 inline-block text-[var(--color-accent)] underline"
          >
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  const canonicalUrl = `${companyInfo.siteUrl}/blog/${article.slug}/`;
  const byline = companyInfo.authorBylineEn;
  const minutes = readingTimeMinutes(article);
  const related = relatedArticles(blogArticles[locale], article, 3);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: article.title,
    description: article.dek,
    inLanguage: "en",
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    timeRequired: `PT${minutes}M`,
    author: {
      "@type": "Person",
      name: companyInfo.founderName,
      url: companyInfo.founderWebsite,
      description: companyInfo.founderDescription,
    },
    publisher: organizationJsonLd,
    articleSection: CATEGORY_LABELS[article.category],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: companyInfo.siteName,
        item: `${companyInfo.siteUrl}/`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero band — slightly tinted */}
      <section className="border-b border-[color:var(--line)] bg-[color:var(--surface-muted)] py-12 lg:py-16">
        <div className="layout-band max-w-3xl">
          <Link
            href={buildLocalizedPath(locale, "/blog/")}
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Blog
          </Link>
          <div className="mt-4 flex items-center gap-2">
            <span className="chip">{CATEGORY_LABELS[article.category]}</span>
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
          <h1 className="text-display mt-5 text-[var(--text)]">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            {article.dek}
          </p>
          <p className="mt-6 text-sm font-medium text-[var(--text)]">
            {byline}
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="layout-band max-w-3xl py-12 lg:py-16">
        <p className="mb-8 rounded-2xl bg-[color:var(--surface-muted)] p-4 text-sm text-[var(--color-muted)]">
          Findings drawn from manufacturer specs, community sources
          (BadmintonCN, Reddit r/badminton, BadmintonCentral, video reviewers),
          and on-court testing. See our{" "}
          <Link
            href="/sources/"
            className="text-[var(--color-accent)] hover:underline"
          >
            editorial process
          </Link>{" "}
          for the full citation model.
        </p>

        <div className="space-y-8">
          {article.sections.map((section, index) => (
            <section
              key={section.heading}
              className="space-y-3"
              id={section.heading.toLowerCase().replace(/\s+/g, "-")}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
                {section.heading}
              </h2>
              <p className="text-base leading-[1.7] text-[var(--text-secondary)]">
                {section.body}
              </p>
              {index === Math.floor(article.sections.length / 2) && (
                <AdSlot id={`blog-${article.slug}-mid`} />
              )}
            </section>
          ))}
        </div>

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
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[color:var(--line)] py-12 lg:py-16">
          <div className="layout-band max-w-6xl">
            <h2 className="text-headline text-[var(--text)]">
              More {CATEGORY_LABELS[article.category].toLowerCase()}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={buildLocalizedPath(locale, `/blog/${r.slug}/`)}
                  className="card card-interactive p-6 block"
                >
                  <span className="chip">{CATEGORY_LABELS[r.category]}</span>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {r.dek}
                  </p>
                  <p className="mt-3 text-xs text-[var(--color-subtle)]">
                    {readingTimeMinutes(r)} min · {r.updatedAt}
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
