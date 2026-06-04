import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { pageAlternates } from "@/lib/metadata";
import { SearchResultsClient } from "./SearchResultsClient";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search IntoBadminton reviews, product notes, best-of guides, and toolkit pages.",
  alternates: pageAlternates("/search/"),
  robots: { index: true, follow: true },
};

function SearchResultsFallback() {
  return <p className="mt-8 text-sm text-[var(--color-muted)]">Loading search…</p>;
}

export default function SearchPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${companyInfo.siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Search",
        item: `${companyInfo.siteUrl}/search/`,
      },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="layout-band max-w-3xl">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Search</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-display text-[var(--text)]">Search</h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            Find reviews, catalogue rows, and key landing pages. Search runs on
            your device — nothing is sent to a server.
          </p>
        </header>

        <div className="mt-8">
          <Suspense fallback={<SearchResultsFallback />}>
            <SearchResultsClient />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
