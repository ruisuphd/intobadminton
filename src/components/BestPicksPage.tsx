import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { EditorialNotice } from "@/components/EditorialNotice";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import { companyInfo } from "@/lib/company";
import type { ProductImage } from "@/lib/types/product";

export type Pick = {
  rank: number;
  name: string;
  brand: string;
  priceUsd: number;
  bestFor: string;
  specs: { label: string; value: string }[];
  why: string;
  tradeoff: string;
  image?: ProductImage;
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
    itemListElement: config.picks.map((p) => ({
      "@type": "ListItem",
      position: p.rank,
      item: {
        "@type": "Product",
        name: `${p.brand} ${p.name}`,
        brand: { "@type": "Brand", name: p.brand },
        category: config.productSchemaCategory,
        ...(canShowProductImage(p.image) && p.image
          ? { image: p.image.url }
          : {}),
        additionalProperty: p.specs.map((spec) => ({
          "@type": "PropertyValue",
          name: spec.label,
          value: spec.value,
        })),
      },
    })),
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

  return (
    <main className="flex-1 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
          <p className="text-sm text-[var(--color-muted)]">
            By {companyInfo.authorBylineEn}.
          </p>
        </header>

        <EditorialNotice />

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {config.intro.heading}
          </h2>
          <p
            className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]"
            dangerouslySetInnerHTML={{ __html: config.intro.body }}
          />
        </section>

        <ol className="space-y-6">
          {config.picks.map((p) => (
            <li key={p.name} className="card p-7">
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
                      {p.name}
                    </h3>
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
      </article>
    </main>
  );
}
