import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  articlesByDateDesc,
  blogArticles,
  editorialContentLabel,
  readingTimeMinutes,
  type BlogArticle,
} from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";
import { articlePathForSlug, editorialSlugs } from "@/lib/blog-migrations";

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
  return (
    <Link
      href={buildLocalizedPath(locale, articlePathForSlug(article.slug))}
      className={`card card-interactive block ${featured ? "p-8" : "p-6"}`}
    >
      <div className="flex items-center gap-2">
        <span className="chip">{editorialContentLabel(article.slug)}</span>
        <span className="text-xs text-[var(--color-subtle)]">
          {minutes} min read
        </span>
        <span className="text-xs text-[var(--color-subtle)]">·</span>
        <time
          className="text-xs text-[var(--color-subtle)]"
          dateTime={article.updatedAt}
        >
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
      {article.verdict && (
        <p className="mt-3 text-xs font-medium leading-relaxed text-[var(--text-secondary)]">
          {article.verdict}
        </p>
      )}
    </Link>
  );
}

export function ComparisonsIndex({ locale }: { locale: SiteLocale }) {
  const editorialSet = new Set(editorialSlugs());
  const articles = articlesByDateDesc(
    blogArticles[locale].filter((article) => editorialSet.has(article.slug))
  );
  const featured = articles[0];
  const rest = articles.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${companyInfo.siteUrl}/comparisons/#comparisons`,
    name: "Badminton comparisons and buying guides",
    description:
      "Head-to-head comparisons, buying guides, and editorial notes from club play.",
    inLanguage: "en",
    publisher: organizationJsonLd,
    url: `${companyInfo.siteUrl}/comparisons/`,
  };

  return (
    <main className="flex-1">
      <JsonLd data={jsonLd} />

      <section className="border-b border-[color:var(--line)] bg-[color:var(--surface-muted)] py-12 lg:py-16">
        <div className="layout-band max-w-3xl">
          <Link
            href={buildLocalizedPath(locale, "/review/")}
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Reviews
          </Link>
          <h1 className="text-headline mt-4 text-[var(--text)]">
            Comparisons &amp; buying guides
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Head-to-head racket and shoe comparisons, buying guides, and
            editorial notes — linked from the main review catalogue.
          </p>
        </div>
      </section>

      <div className="layout-band max-w-6xl py-12 lg:py-16">
        {featured && (
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
              Latest
            </p>
            <div className="mt-4">
              <ArticleCard article={featured} locale={locale} featured />
            </div>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={locale} />
          ))}
        </div>
      </div>
    </main>
  );
}
