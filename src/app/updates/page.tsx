import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import {
  listEditorialUpdates,
  type EditorialUpdateKind,
} from "@/lib/editorial-updates";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Editorial updates",
  description:
    "Recent IntoBadminton editorial reviews — buying guides, equipment reviews, tools, and verified data refreshes sorted by last review date.",
  alternates: pageAlternates("/updates/"),
};

const KIND_LABEL: Record<EditorialUpdateKind, string> = {
  best: "Best of",
  guide: "Guide",
  tool: "Tool",
  compare: "Compare",
  brand: "Brand",
  review: "Review",
  page: "Page",
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString(
    "en-IE",
    { year: "numeric", month: "short", day: "numeric" }
  );
}

export default function UpdatesPage() {
  const updates = listEditorialUpdates(50);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "IntoBadminton editorial updates",
    description:
      "Chronological feed of editorially reviewed pages and equipment reviews on IntoBadminton.",
    url: `${companyInfo.siteUrl}/updates/`,
    isPartOf: { "@id": `${companyInfo.siteUrl}/#website` },
    publisher: { "@id": `${companyInfo.operatorWebsite}/#organization` },
    dateModified: updates[0]?.lastReviewedAt,
  };

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
        name: "Editorial updates",
        item: `${companyInfo.siteUrl}/updates/`,
      },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={collectionJsonLd} />
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
          <span className="text-[var(--text)]">Editorial updates</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-display text-[var(--text)]">Editorial updates</h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            A dated feed of pages we have reviewed, re-verified, or published
            recently — buying guides, deep-dive reviews, interactive tools, and
            the{" "}
            <Link href="/data/" className="text-[var(--color-accent)] underline">
              claims registry
            </Link>
            . Sorted by last editorial review date, not marketing launch dates.
          </p>
        </header>

        <ol className="mt-12 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {updates.map((row) => (
            <li key={row.path} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Link
                  href={row.path}
                  className="text-base font-medium text-[var(--text)] hover:text-[var(--color-accent)]"
                >
                  {row.title}
                </Link>
                <time
                  dateTime={row.lastReviewedAt}
                  className="text-xs text-[var(--color-subtle)]"
                >
                  {formatDate(row.lastReviewedAt)}
                </time>
              </div>
              <p className="mt-1 text-xs text-[var(--color-muted)]">
                <span className="rounded-full bg-[color:var(--color-accent-soft)] px-2 py-0.5 font-medium text-[var(--color-accent)]">
                  {KIND_LABEL[row.kind]}
                </span>
                <span className="ml-2">{row.path}</span>
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm leading-relaxed text-[var(--color-muted)]">
          Price checks on commercial pages are noted separately on each guide.
          For methodology on how dates are chosen, see{" "}
          <Link
            href="/methodology/"
            className="text-[var(--color-accent)] underline"
          >
            recommendation methodology
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
