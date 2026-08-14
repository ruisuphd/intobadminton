import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RelatedReadingShelf } from "@/components/RelatedReadingShelf";
import { ReviewsIndexClient } from "@/components/ReviewsIndexClient";
import { articlesByDateDesc, blogArticles } from "@/lib/blog";
import { isThinContentNoindex } from "@/lib/thin-content";
import type { SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";
import { relatedReadingForPath } from "@/lib/related-content";

export function ReviewsIndex({ locale }: { locale: SiteLocale }) {
  const articles = articlesByDateDesc(blogArticles[locale]);
  const publication = articles.filter(
    (article) => !isThinContentNoindex(article.slug)
  );
  const related = relatedReadingForPath("/review/");

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
            Original guides and founder-tested pieces first. Short court notes
            stay off the default list.
          </p>
        </header>

        <ReviewsIndexClient
          articles={articles}
          publicationSlugs={publication.map((article) => article.slug)}
          locale={locale}
        />

        <RelatedReadingShelf items={related} />

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Want to browse the full catalogue?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Filter by brand, weight, balance, and price — or run the finder for a
            personalised shortlist.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/quiz/" className="btn-primary">
              Start the finder
            </Link>
            <Link href="/catalog/" className="btn-secondary">
              Browse full catalog
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
