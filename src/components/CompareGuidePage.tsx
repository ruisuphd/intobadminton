import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ArticleEngagementFooter } from "@/components/ArticleEngagementFooter";
import { InArticleAffiliateDisclosure } from "@/components/InArticleAffiliateDisclosure";
import { EditorialMeta } from "@/components/EditorialMeta";
import { ReadingProgress } from "@/components/ReadingProgress";
import { RelatedReadingShelf } from "@/components/RelatedReadingShelf";
import { EditorialNotice } from "@/components/EditorialNotice";
import { JsonLd } from "@/components/JsonLd";
import { catalogHrefFromCompareSlug } from "@/lib/catalog-url";
import { companyInfo } from "@/lib/company";
import { reviewPath } from "@/lib/review-pages";
import { relatedReadingForPath } from "@/lib/related-content";
import { articleJsonLd } from "@/lib/structured-data";

export type CompareSide = {
  /** Display name, e.g. "Astrox 99 Pro 2". */
  name: string;
  /** Brand, e.g. "Yonex". */
  brand: string;
  /** Optional `products.json` id; if set, name links to the blog review. */
  productId?: string;
  /** One-line description of who the racket is built for. */
  bestFor: string;
  /** Indicative price band, e.g. "~$240" or "$240–$300 depending on variant". */
  pricePoint: string;
  /** Three to six spec bullets — keep tight, no marketing prose. */
  specBullets: string[];
};

export type CompareRow = {
  factor: string;
  /** Plain value (or short phrase) for product A on this dimension. */
  a: string;
  /** Plain value for product B. */
  b: string;
  /**
   * Optional indicator of which side wins on this dimension. Used as a tag
   * in the table cell; never substitute for the reader's own judgement.
   */
  winner?: "a" | "b" | "tie";
};

export type CompareGuideConfig = {
  /** Slug of the page under `/compare-guides/`, no trailing slash. */
  slug: string;
  /** Page H1. */
  title: string;
  /** One-paragraph dek under the H1. */
  dek: string;
  /** Crumb label for the breadcrumb trail. */
  breadcrumbLabel: string;
  /** Optional one-paragraph editorial intro after the EditorialNotice. */
  intro?: string;
  productA: CompareSide;
  productB: CompareSide;
  /** 4–8 rows of side-by-side comparison. Render order is preserved. */
  rows: CompareRow[];
  /** Who should buy product A (3–6 sentences). */
  whoBuysA: string;
  /** Who should buy product B (3–6 sentences). */
  whoBuysB: string;
  /** Optional paragraph between the table and the who-buys sections. */
  middleParagraph?: string;
  /** Optional founder firsthand callout. */
  founderNote?: string;
  /** Related internal links. Keep to ~6. */
  relatedLinks: { label: string; href: string }[];
};

function sideAnchor(side: CompareSide) {
  if (!side.productId) return null;
  return (
    <Link
      href={reviewPath(side.productId)}
      className="text-[var(--color-accent)] hover:underline"
    >
      Read the full {side.brand} {side.name} review →
    </Link>
  );
}

function winnerChip(value: NonNullable<CompareRow["winner"]>) {
  const label =
    value === "a" ? "Edge: A" : value === "b" ? "Edge: B" : "Tie";
  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--text)]">
      {label}
    </span>
  );
}

export function CompareGuidePage({ config }: { config: CompareGuideConfig }) {
  const path = `/compare-guides/${config.slug}/`;
  const url = `${companyInfo.siteUrl}${path}`;
  const related = relatedReadingForPath(path);

  const article = articleJsonLd({
    path,
    headline: config.title,
    description: config.dek,
    section: "Comparison",
  });

  const breadcrumb = {
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
        name: "Comparison guides",
        item: `${companyInfo.siteUrl}/compare-guides/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.breadcrumbLabel,
        item: url,
      },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <ReadingProgress />
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />

      <article className="layout-band max-w-3xl space-y-6">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/compare-guides/"
            className="hover:text-[var(--text)]"
          >
            Comparison guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">{config.breadcrumbLabel}</span>
        </nav>

        <header className="space-y-3">
          <h1 className="text-display text-[var(--text)]">{config.title}</h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            {config.dek}
          </p>
          <EditorialMeta path={path} />
        </header>

        <EditorialNotice />
        <InArticleAffiliateDisclosure />

        {config.intro && (
          <p className="text-base leading-relaxed text-[var(--color-muted)]">
            {config.intro}
          </p>
        )}

        <section className="grid gap-4 sm:grid-cols-2">
          {[config.productA, config.productB].map((side, idx) => (
            <div key={side.name} className="card p-6">
              <p className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                {idx === 0 ? "Product A" : "Product B"} · {side.brand}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--text)]">
                {side.name}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {side.bestFor}
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--color-accent)]">
                {side.pricePoint}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-[var(--color-muted)]">
                {side.specBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="text-[var(--color-accent)]">·</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-xs">{sideAnchor(side)}</div>
            </div>
          ))}
        </section>

        <div className="overflow-x-auto card">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-[color:var(--line-strong)] text-[var(--text)]">
              <tr>
                <th className="p-4">Factor</th>
                <th className="p-4">
                  {config.productA.brand} {config.productA.name}
                </th>
                <th className="p-4">
                  {config.productB.brand} {config.productB.name}
                </th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-muted)]">
              {config.rows.map((row) => (
                <tr key={row.factor} className="border-b border-[color:var(--line)] last:border-b-0">
                  <td className="p-4 font-medium text-[var(--text)]">
                    {row.factor}
                    {row.winner === "tie" && winnerChip("tie")}
                  </td>
                  <td className="p-4">
                    {row.a}
                    {row.winner === "a" && winnerChip("a")}
                  </td>
                  <td className="p-4">
                    {row.b}
                    {row.winner === "b" && winnerChip("b")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {config.middleParagraph && (
          <p className="text-base leading-relaxed text-[var(--color-muted)]">
            {config.middleParagraph}
          </p>
        )}

        <AdSlot id={`compare-${config.slug}-mid`} />

        <section className="space-y-5">
          <article className="card p-6">
            <h2 className="text-headline text-[var(--text)]">
              When the {config.productA.name} is the right answer
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              {config.whoBuysA}
            </p>
          </article>
          <article className="card p-6">
            <h2 className="text-headline text-[var(--text)]">
              When the {config.productB.name} is the right answer
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              {config.whoBuysB}
            </p>
          </article>
        </section>

        {config.founderNote && (
          <blockquote className="border-l-2 border-[var(--color-accent)] pl-4 text-sm italic leading-relaxed text-[var(--color-muted)]">
            {config.founderNote}
            <p className="mt-2 not-italic text-xs text-[var(--color-subtle)]">
              — {companyInfo.authorByline}.
            </p>
          </blockquote>
        )}

        {config.relatedLinks.length > 0 && (
          <section className="card p-6">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Related guides
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {config.relatedLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Compare them through your profile
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Run the finder. Five questions; we&apos;ll rank both rackets — and
            everything else in the catalogue — against your level, role, body,
            and budget.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/quiz/" className="btn-primary">
              Start the finder
            </Link>
            <Link
              href={catalogHrefFromCompareSlug(config.slug)}
              className="btn-secondary"
            >
              Browse matching catalog
            </Link>
          </div>
        </section>

        <RelatedReadingShelf items={related} />

        <ArticleEngagementFooter
          url={url}
          title={config.title}
          contentId={`compare:${config.slug}`}
        />
      </article>
    </main>
  );
}
