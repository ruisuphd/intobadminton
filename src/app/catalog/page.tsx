import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogClient } from "@/app/catalog/CatalogClient";
import { JsonLd } from "@/components/JsonLd";
import { RelatedReadingShelf } from "@/components/RelatedReadingShelf";
import { pageAlternates } from "@/lib/metadata";
import { companyInfo } from "@/lib/company";
import { relatedReadingForPath } from "@/lib/related-content";

export const metadata: Metadata = {
  title: "Badminton equipment catalog — browse by spec",
  description:
    "Browse 148+ badminton rackets, shoes, strings, shuttles, grips, and bags. Search by model or filter by brand, weight, balance, and price — then run the finder for a scored shortlist.",
  alternates: pageAlternates("/catalog/"),
};

export default function CatalogPage() {
  const related = relatedReadingForPath("/catalog/");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "IntoBadminton equipment catalog",
    url: `${companyInfo.siteUrl}/catalog/`,
    description:
      "Filterable catalog of badminton equipment with official specs and editorial notes.",
    isPartOf: {
      "@type": "WebSite",
      name: companyInfo.siteName,
      url: companyInfo.siteUrl,
    },
  };

  return (
    <main className="layout-band max-w-6xl py-10">
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-muted)]">
        <Link href="/" className="hover:text-[var(--text)]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text)]">Catalog</span>
      </nav>

      <header className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Equipment catalog
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
          Filter the full catalogue by category, brand, price, weight, and
          balance — the same spec fields retailers use. For a ranked shortlist
          matched to your level and style, use the{" "}
          <Link href="/quiz/" className="text-[var(--color-accent)] underline">
            five-step finder
          </Link>
          .
        </p>
      </header>

      <div className="mt-8">
        <Suspense
          fallback={
            <div
              className="min-h-[480px] rounded-2xl border border-[color:var(--line)] bg-white"
              aria-hidden
            />
          }
        >
          <CatalogClient />
        </Suspense>
      </div>

      <RelatedReadingShelf items={related} />
    </main>
  );
}
