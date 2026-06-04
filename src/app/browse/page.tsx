import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { pageAlternates } from "@/lib/metadata";
import { productCatalog } from "@/lib/product-facets";
import { CatalogBrowseClient } from "./CatalogBrowseClient";

export const metadata: Metadata = {
  title: "Browse badminton rackets by spec",
  description:
    "Filter the IntoBadminton catalogue by weight class, balance, shaft flex, price band, and brand — then jump to reviews or the fit-score finder.",
  alternates: pageAlternates("/browse/"),
};

export default function BrowsePage() {
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
        name: "Browse catalogue",
        item: `${companyInfo.siteUrl}/browse/`,
      },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="layout-band max-w-4xl">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Browse catalogue</span>
        </nav>

        <header className="mt-6 max-w-2xl">
          <h1 className="text-display text-[var(--text)]">
            Browse rackets by spec
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Retailer-style filters over our verified catalogue — {productCatalog.length}{" "}
            products indexed. Combine weight, balance, flex, and price, then open a
            review or run the finder for a personalised fit score.
          </p>
        </header>

        <div className="mt-10">
          <Suspense fallback={<p className="text-sm text-[var(--color-muted)]">Loading filters…</p>}>
            <CatalogBrowseClient />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
