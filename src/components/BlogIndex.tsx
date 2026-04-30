import Link from "next/link";
import { blogArticles } from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";

export function BlogIndex({ locale }: { locale: SiteLocale }) {
  const articles = blogArticles[locale];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${companyInfo.siteUrl}/${locale}/blog/#blog`,
    name: "Badminton equipment blog",
    inLanguage: "en",
    publisher: organizationJsonLd,
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      "@id": `${companyInfo.siteUrl}/${locale}/blog/${article.slug}/#article`,
      headline: article.title,
      description: article.dek,
      datePublished: article.updatedAt,
      dateModified: article.updatedAt,
      url: `${companyInfo.siteUrl}/${locale}/blog/${article.slug}/`,
      author: {
        "@type": "Person",
        name: companyInfo.founderName,
        url: companyInfo.founderWebsite,
      },
    })),
  };

  return (
    <main className="flex-1 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <div className="layout-band max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          {"Badminton equipment blog"}
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          {"Original, checkable equipment content focused on player fit. We do not copy third-party review text."}
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={buildLocalizedPath(locale, `/blog/${article.slug}/`)}
              className="card card-interactive p-6"
            >
              <p className="text-xs text-[var(--color-muted)]">
                {article.updatedAt}
              </p>
              <h2 className="mt-2 font-semibold text-[var(--text)]">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {article.dek}
              </p>
              <p className="mt-3 text-xs text-[var(--color-muted)]">
                {companyInfo.authorBylineEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

