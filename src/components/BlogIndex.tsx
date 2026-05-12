import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  CATEGORY_LABELS,
  articlesByDateDesc,
  articlesGroupedByCategory,
  blogArticles,
  readingTimeMinutes,
  type BlogArticle,
} from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";

const CATEGORY_DESCRIPTION: Record<string, string> = {
  reviews: "Single-product deep-dives — what the racket / shoe / string is, who it's for, and whether it's worth the money.",
  comparisons: "Head-to-head pickups across brands and tiers, framed by player role and skill level.",
  guides: "Evergreen explainers — how to read shaft hardness, when to retire strings, why your shoes matter more than your racket.",
};

function ArticleCard({
  article,
  locale,
  featured = false,
}: {
  article: BlogArticle;
  locale: SiteLocale;
  featured?: boolean;
}) {
  const minutes = readingTimeMinutes(article);
  const reviewTeaser = article.reviewSummary?.bestFor.slice(0, 2).join(" · ");
  return (
    <Link
      href={buildLocalizedPath(locale, `/blog/${article.slug}/`)}
      className={`card card-interactive block ${featured ? "p-8" : "p-6"}`}
    >
      <div className="flex items-center gap-2">
        <span className="chip">{CATEGORY_LABELS[article.category]}</span>
        <span className="text-xs text-[var(--color-subtle)]">
          {minutes} min read
        </span>
        <span className="text-xs text-[var(--color-subtle)]">·</span>
        <time className="text-xs text-[var(--color-subtle)]" dateTime={article.updatedAt}>
          {article.updatedAt}
        </time>
      </div>
      <h2
        className={`mt-3 font-semibold tracking-tight text-[var(--text)] ${
          featured ? "text-2xl" : "text-lg"
        }`}
      >
        {article.title}
      </h2>
      <p
        className={`mt-2 text-[var(--color-muted)] leading-relaxed ${
          featured ? "text-base" : "text-sm"
        }`}
      >
        {article.dek}
      </p>
      {reviewTeaser && (
        <p className="mt-3 text-xs font-medium leading-relaxed text-[var(--text-secondary)]">
          Best for: {reviewTeaser}
        </p>
      )}
    </Link>
  );
}

export function BlogIndex({ locale }: { locale: SiteLocale }) {
  const articles = articlesByDateDesc(blogArticles[locale]);
  const featured = articles[0];
  const rest = articles.slice(1);
  const grouped = articlesGroupedByCategory(rest);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${companyInfo.siteUrl}/blog/#blog`,
    name: "Badminton equipment blog",
    inLanguage: "en",
    publisher: organizationJsonLd,
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      "@id": `${companyInfo.siteUrl}/blog/${article.slug}/#article`,
      headline: article.title,
      description: article.dek,
      datePublished: article.updatedAt,
      dateModified: article.updatedAt,
      url: `${companyInfo.siteUrl}/blog/${article.slug}/`,
      author: {
        "@type": "Person",
        name: companyInfo.founderName,
        url: companyInfo.founderWebsite,
      },
    })),
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={blogJsonLd} />
      <div className="layout-band max-w-6xl">
        <header className="max-w-2xl">
          <h1 className="text-display text-[var(--text)]">
            Badminton equipment notes
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Original equipment writing informed by product-page specs,
            community sources, and on-court testing where available. No copied
            review text — see the{" "}
            <Link
              href="/sources/"
              className="text-[var(--color-accent)] hover:underline"
            >
              editorial process
            </Link>{" "}
            for how we cite.
          </p>
        </header>

        {featured && (
          <section className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
              Latest
            </p>
            <div className="mt-3">
              <ArticleCard article={featured} locale={locale} featured />
            </div>
          </section>
        )}

        {grouped.map((group) => (
          <section key={group.category} className="mt-16">
            <header className="flex flex-wrap items-end justify-between gap-3 border-b border-[color:var(--line)] pb-4">
              <div>
                <h2 className="text-headline text-[var(--text)]">
                  {CATEGORY_LABELS[group.category]}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)]">
                  {CATEGORY_DESCRIPTION[group.category]}
                </p>
              </div>
              <span className="text-sm text-[var(--color-subtle)]">
                {group.articles.length}{" "}
                {group.articles.length === 1 ? "article" : "articles"}
              </span>
            </header>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {group.articles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
