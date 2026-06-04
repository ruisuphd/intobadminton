import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ArticleEngagementFooter } from "@/components/ArticleEngagementFooter";
import { EditorialMeta } from "@/components/EditorialMeta";
import { BestPicksComparisonTable } from "@/components/BestPicksComparisonTable";
import { EditorialNotice } from "@/components/EditorialNotice";
import { EvidenceBadge, type EvidenceLevel } from "@/components/EvidenceBadge";
import { InArticleAffiliateDisclosure } from "@/components/InArticleAffiliateDisclosure";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import { ProductBuyLink } from "@/components/ProductBuyLink";
import { companyInfo } from "@/lib/company";
import productsCatalog from "@/data/products.json";
import {
  computeEditorialRating,
  lookupCatalogProduct,
  ratingDatePublished,
} from "@/lib/editorial-rating";
import { articleJsonLd } from "@/lib/structured-data";
import { productHref } from "@/lib/review-pages";
import type { ProductImage, ProductRecord } from "@/lib/types/product";

const CATALOG = productsCatalog as ProductRecord[];

export type Pick = {
  rank: number;
  name: string;
  brand: string;
  priceUsd: number;
  bestFor: string;
  specs: { label: string; value: string }[];
  why: string;
  tradeoff: string;
  /** When set, links to the canonical blog review for this product. */
  productId?: string;
  image?: ProductImage;
  /**
   * Editorial signal of how this pick was vetted. Omit to skip the badge.
   * - "owned" → Rui Su currently plays it in competition.
   * - "tested" → played hands-on, but not a current main.
   * - "specs"  → built from manufacturer + community evidence only.
   */
  evidenceLevel?: EvidenceLevel;
};

export type FaqItem = { q: string; a: string };

export type BestPicksConfig = {
  slug: string;
  title: string;
  dek: string;
  intro: { heading: string; body: string };
  picks: Pick[];
  faqs: FaqItem[];
  ctaHeading: string;
  ctaBody: string;
  breadcrumbLabel: string;
  productSchemaCategory: string;
};

export function BestPicksPage({ config }: { config: BestPicksConfig }) {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${companyInfo.siteUrl}/best/${config.slug}/#list`,
    name: config.title,
    inLanguage: "en",
    numberOfItems: config.picks.length,
    itemListElement: config.picks.map((p) => {
      const catalogMatch = lookupCatalogProduct(CATALOG, p.brand, p.name);
      const rating = computeEditorialRating(catalogMatch);
      const datePublished = ratingDatePublished(catalogMatch);
      const reviewBody =
        catalogMatch?.editorNote ?? `${p.why} ${p.tradeoff}`.trim();

      const review = {
        "@type": "Review" as const,
        name: `${p.brand} ${p.name} — IntoBadminton editor's review`,
        author: {
          "@type": "Person" as const,
          name: companyInfo.founderName,
          url: companyInfo.founderWebsite,
        },
        publisher: {
          "@type": "Organization" as const,
          name: companyInfo.siteName,
          url: companyInfo.siteUrl,
        },
        datePublished,
        reviewBody,
        ...(rating
          ? {
              reviewRating: {
                "@type": "Rating" as const,
                ratingValue: rating.ratingValue,
                bestRating: rating.bestRating,
                worstRating: rating.worstRating,
              },
            }
          : {}),
      };

      const aggregateRating =
        rating && rating.meetsAggregateThreshold
          ? {
              "@type": "AggregateRating" as const,
              ratingValue: rating.ratingValue,
              reviewCount: rating.reviewCount,
              bestRating: rating.bestRating,
              worstRating: rating.worstRating,
            }
          : undefined;

      return {
        "@type": "ListItem" as const,
        position: p.rank,
        item: {
          "@type": "Product" as const,
          name: `${p.brand} ${p.name}`,
          brand: { "@type": "Brand" as const, name: p.brand },
          category: config.productSchemaCategory,
          description: `${p.bestFor}. ${p.why}`,
          ...(canShowProductImage(p.image) && p.image
            ? { image: p.image.url }
            : {}),
          additionalProperty: p.specs.map((spec) => ({
            "@type": "PropertyValue" as const,
            name: spec.label,
            value: spec.value,
          })),
          review,
          ...(aggregateRating ? { aggregateRating } : {}),
        },
      };
    }),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Best of", item: `${companyInfo.siteUrl}/best/` },
      {
        "@type": "ListItem",
        position: 3,
        name: config.breadcrumbLabel,
        item: `${companyInfo.siteUrl}/best/${config.slug}/`,
      },
    ],
  };

  const path = `/best/${config.slug}/`;
  const articleSchema = articleJsonLd({
    path,
    headline: config.title,
    description: config.dek,
    section: "Reviews",
  });

  return (
    <main className="flex-1 py-16">
      <ReadingProgress />
      <JsonLd data={articleSchema} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article className="layout-band max-w-3xl space-y-6">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/best/" className="hover:text-[var(--text)]">Best of</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">{config.breadcrumbLabel}</span>
        </nav>

        <header className="space-y-4">
          <h1 className="text-display text-[var(--text)]">{config.title}</h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            {config.dek}
          </p>
          <EditorialMeta path={path} />
        </header>

        <EditorialNotice />
        <InArticleAffiliateDisclosure />

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {config.intro.heading}
          </h2>
          <p
            className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]"
            dangerouslySetInnerHTML={{ __html: config.intro.body }}
          />
        </section>

        {/*
         * At-a-glance comparison table. Renders the same picks as the cards
         * below in a sortable grid, with anchor links pointing to the
         * detailed write-up for each pick. This is the structural change that
         * /best/* needed to compete with retailer-style buying guides without
         * adopting their RPM-first layout.
         */}
        <BestPicksComparisonTable picks={config.picks} />

        <ol className="space-y-6">
          {config.picks.map((p) => (
            <li
              key={p.name}
              id={p.name.toLowerCase().replace(/\s+/g, "-")}
              className="card p-7 scroll-mt-24"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  {canShowProductImage(p.image) && (
                    <ProductImageView
                      image={p.image}
                      size={88}
                      className="shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
                      #{p.rank} · {p.brand}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text)]">
                      {p.productId ? (
                        <Link
                          href={productHref(p.productId)}
                          className="hover:text-[var(--color-accent)]"
                        >
                          {p.name}
                        </Link>
                      ) : (
                        p.name
                      )}
                    </h3>
                    {p.evidenceLevel && (
                      <div className="mt-2">
                        <EvidenceBadge level={p.evidenceLevel} />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-right text-sm font-semibold text-[var(--color-accent)]">
                  ~${p.priceUsd}
                  <span className="block text-xs font-normal text-[var(--color-subtle)]">
                    street estimate
                  </span>
                </p>
              </div>
              <p className="mt-2 text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                Best for: {p.bestFor}
              </p>
              {p.specs.length > 0 && (
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                  {p.specs.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-[color:var(--surface-muted)] p-3"
                    >
                      <dt className="text-[var(--color-subtle)]">{s.label}</dt>
                      <dd className="mt-1 font-medium text-[var(--text)]">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                <strong className="text-[var(--text)]">Why this pick:</strong>{" "}
                {p.why}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                <strong className="text-[var(--text)]">Tradeoff:</strong>{" "}
                {p.tradeoff}
              </p>
              {p.productId && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={productHref(p.productId)}
                    className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                  >
                    Read full review →
                  </Link>
                  {(() => {
                    const catalogMatch = lookupCatalogProduct(
                      CATALOG,
                      p.brand,
                      p.name
                    );
                    if (!catalogMatch) return null;
                    return (
                      <ProductBuyLink
                        id={catalogMatch.id}
                        brand={catalogMatch.brand}
                        name={catalogMatch.name}
                        officialSourceUrl={catalogMatch.officialSourceUrl}
                      />
                    );
                  })()}
                </div>
              )}
            </li>
          ))}
        </ol>

        <AdSlot id={`best-${config.slug}-mid`} />

        <section className="card p-7">
          <h2 className="text-headline text-[var(--text)]">Frequently asked</h2>
          <div className="mt-5 divide-y divide-[color:var(--line)]">
            {config.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none text-base font-semibold text-[var(--text)]">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {f.q}
                    <span className="text-[var(--color-accent)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            {config.ctaHeading}
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            {config.ctaBody}
          </p>
          <Link href="/quiz/" className="btn-primary mt-5">
            Start the finder
          </Link>
        </section>

        <ArticleEngagementFooter
          url={`${companyInfo.siteUrl}${path}`}
          title={config.title}
          contentId={`best:${config.slug}`}
        />
      </article>
    </main>
  );
}
