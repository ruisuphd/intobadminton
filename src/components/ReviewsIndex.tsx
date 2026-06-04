import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  articlesByDateDesc,
  blogArticles,
  type BlogArticle,
} from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";

function ArticleCard({
  article,
  locale,
}: {
  article: BlogArticle;
  locale: SiteLocale;
}) {
  return (
    <Link
      href={buildLocalizedPath(locale, articlePathForSlug(article.slug))}
      className="group block border-b border-[color:var(--line)] py-5"
    >
      <div className="flex items-center gap-2 text-xs text-[var(--color-subtle)]">
        <time dateTime={article.updatedAt}>{article.updatedAt}</time>
      </div>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-[var(--text)] group-hover:text-[var(--color-accent)]">
        {article.title}
      </h2>
    </Link>
  );
}

export function ReviewsIndex({ locale }: { locale: SiteLocale }) {
  const articles = articlesByDateDesc(blogArticles[locale]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${companyInfo.siteUrl}/review/#reviews`,
    name: "IntoBadminton reviews",
    description: "Equipment notes from club play.",
    inLanguage: "en",
    publisher: organizationJsonLd,
    url: `${companyInfo.siteUrl}/review/`,
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={jsonLd} />

      <div className="layout-band max-w-2xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-display text-[var(--text)]">Reviews</h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            Equipment notes from club play.{" "}
            <span className="text-[var(--color-subtle)]">
              {articles.length} articles, newest first.
            </span>
          </p>
        </header>

        <div>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={locale} />
          ))}
        </div>
      </div>
    </main>
  );
}
