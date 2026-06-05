import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RelatedReadingShelf } from "@/components/RelatedReadingShelf";
import { companyInfo } from "@/lib/company";
import { defaultOgImages } from "@/lib/og";
import { COMPARE_GUIDES } from "@/lib/compare-guides";
import { relatedReadingForPath } from "@/lib/related-content";

export const metadata: Metadata = {
  title: "Badminton equipment comparison guides",
  description:
    "Side-by-side badminton comparisons — Astrox vs Nanoflare, Yonex vs Victor vs Li-Ning, Astrox 77 Pro vs 88S Pro, and more. Picks framed by player role.",
  alternates: pageAlternates("/compare-guides/"),
  openGraph: {
    title: "Badminton equipment comparison guides",
    description:
      "Side-by-side badminton comparisons framed by player role and skill level.",
    url: "/compare-guides/",
    type: "website",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

export default function CompareGuidesIndex() {
  const related = relatedReadingForPath("/compare-guides/");
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Comparison guides", item: `${companyInfo.siteUrl}/compare-guides/` },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="layout-band max-w-6xl">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Comparison guides</span>
        </nav>

        <header className="mt-6 max-w-2xl">
          <h1 className="text-display text-[var(--text)]">
            Badminton comparison guides
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Head-to-head guides framed by player role and skill level — not by spec sheet.
          </p>
        </header>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {COMPARE_GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="card card-interactive p-6 block"
            >
              <h2 className="text-lg font-semibold tracking-tight text-[var(--text)]">
                {g.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {g.dek}
              </p>
              <p className="mt-4 text-sm font-medium text-[var(--color-accent)]">
                Read comparison →
              </p>
            </Link>
          ))}
        </div>

        <RelatedReadingShelf items={related} />
      </div>
    </main>
  );
}
