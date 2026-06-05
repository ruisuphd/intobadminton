import { JsonLd } from "@/components/JsonLd";
import { ReviewsIndexClient } from "@/components/ReviewsIndexClient";
import { articlesByDateDesc, blogArticles } from "@/lib/blog";
import type { SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";

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

        <ReviewsIndexClient articles={articles} locale={locale} />
      </div>
    </main>
  );
}
