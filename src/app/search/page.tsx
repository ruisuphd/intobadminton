import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { SiteSearch } from "@/components/SiteSearch";
import { companyInfo } from "@/lib/company";
import { pageAlternates } from "@/lib/metadata";
import { searchIndexSize } from "@/lib/site-search";
import { SearchPageClient } from "./SearchPageClient";

export const metadata: Metadata = {
  title: "Search reviews, guides, and tools",
  description:
    "Search IntoBadminton reviews, best-of guides, brand decoders, and interactive badminton tools. No signup.",
  alternates: pageAlternates("/search/"),
};

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
            {searchIndexSize} indexed pages — reviews, guides, best-of lists,
            brand decoders, and tools. Results are computed in your browser; no
            query is sent to a server.
          </p>
        </header>

        <div className="mt-10">
          <Suspense
            fallback={
              <SiteSearch initialQuery="" />
            }
          >
            <SearchPageClient />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
