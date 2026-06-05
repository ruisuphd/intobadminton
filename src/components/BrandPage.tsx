import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { EditorialMeta } from "@/components/EditorialMeta";
import { EditorialNotice } from "@/components/EditorialNotice";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { articleJsonLd } from "@/lib/structured-data";

export type BrandLine = {
  name: string;
  bestFor: string;
  description: string;
  signatureModels?: string[];
};

export type BrandFaqItem = { q: string; a: string };

export type BrandPageConfig = {
  slug: "yonex" | "victor" | "li-ning" | "bonny" | "kawasaki" | "kumpoo" | "anta";
  brandName: string;
  brandNameZh: string;
  founded: number;
  hqCountry: string;
  officialUrl: string;
  title: string;
  dek: string;
  intro: string;
  positioning: string;
  lines: BrandLine[];
  topPicks: {
    name: string;
    line: string;
    bestFor: string;
    priceUsd: number;
    href: string;
  }[];
  faqs: BrandFaqItem[];
  relatedLinks: { label: string; href: string }[];
};

export function BrandPage({ config }: { config: BrandPageConfig }) {
  const path = `/brands/${config.slug}/`;
  const articleSchema = articleJsonLd({
    path,
    headline: config.title,
    description: config.dek,
    section: "Brand Profile",
  });
  const brandJsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${companyInfo.siteUrl}/brands/${config.slug}/#brand`,
    name: config.brandName,
    alternateName: config.brandNameZh,
    foundingDate: String(config.founded),
    foundingLocation: { "@type": "Place", name: config.hqCountry },
    url: config.officialUrl,
    description: config.dek,
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
        name: "Brands",
        item: `${companyInfo.siteUrl}/brands/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.brandName,
        item: `${companyInfo.siteUrl}/brands/${config.slug}/`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${companyInfo.siteUrl}/brands/${config.slug}/#faq`,
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={articleSchema} />
      <JsonLd data={brandJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <article className="layout-band max-w-3xl space-y-8">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/brands/" className="hover:text-[var(--text)]">
            Brands
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">{config.brandName}</span>
        </nav>

        <header className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
            Founded {config.founded} · {config.hqCountry}
          </p>
          <h1 className="text-display text-[var(--text)]">{config.title}</h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            {config.dek}
          </p>
          <EditorialMeta path={`/brands/${config.slug}/`} />
        </header>

        <EditorialNotice />

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            About {config.brandName} ({config.brandNameZh})
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            {config.intro}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            {config.positioning}
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-headline text-[var(--text)]">
            {config.brandName} racket lines, decoded
          </h2>
          <div className="space-y-4">
            {config.lines.map((line) => (
              <article key={line.name} className="card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-[var(--text)]">
                    {line.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                    Best for: {line.bestFor}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {line.description}
                </p>
                {line.signatureModels && line.signatureModels.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {line.signatureModels.map((m) => (
                      <span
                        key={m}
                        className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-xs text-[var(--text)]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <AdSlot id={`brand-${config.slug}-mid`} />

        {config.topPicks.length > 0 && (
          <section className="card p-7">
            <h2 className="text-headline text-[var(--text)]">
              Our top {config.brandName} picks right now
            </h2>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              These are pulled from our scored lists — links go to the relevant
              best-of guide so you can see the full reasoning.
            </p>
            <ul className="mt-5 space-y-3">
              {config.topPicks.map((p) => (
                <li
                  key={p.name}
                  className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--line)] pt-3 first:border-t-0 first:pt-0"
                >
                  <div>
                    <Link
                      href={p.href}
                      className="text-base font-semibold text-[var(--text)] hover:text-[var(--color-accent)]"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-[var(--color-muted)]">
                      {p.line} · {p.bestFor}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--color-accent)]">
                    ~${p.priceUsd}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

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
            Not sure which {config.brandName} model is right for you?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Run our finder. Five questions, transparent fit-score reasoning,
            ranked picks across {config.brandName} and other brands so you can
            pick by fit, not loyalty.
          </p>
          <Link href="/quiz/" className="btn-primary mt-5">
            Start the finder
          </Link>
        </section>
      </article>
    </main>
  );
}
