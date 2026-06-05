import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";
import { EditorialMeta } from "@/components/EditorialMeta";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { defaultOgImages } from "@/lib/og";
import { articleJsonLd } from "@/lib/structured-data";

const PATH = "/authors/";
const URL = `${companyInfo.siteUrl}${PATH}`;

export const metadata: Metadata = {
  // Title template in `src/app/layout.tsx` appends " | IntoBadminton" — keep
  // this page's title brand-free so the audit's `duplicate-title-brand` rule
  // doesn't flag it.
  title: "Authors — who writes for the site",
  description:
    "Editorial bylines on IntoBadminton. Every review, comparison, and guide is signed by a named author with disclosed playing background and coach lineage.",
  alternates: pageAlternates(PATH),
  openGraph: {
    title: "Authors — who writes for IntoBadminton",
    description:
      "Editorial bylines on IntoBadminton — named authors with disclosed playing background.",
    url: PATH,
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Authors — who writes for IntoBadminton",
    description:
      "Editorial bylines on IntoBadminton — named authors with disclosed playing background.",
  },
};

const AUTHORS = [
  {
    slug: "rui-su",
    name: companyInfo.founderName,
    role: "Founder, lead reviewer",
    summary:
      "Competitive Division 4 Ireland player. Trained under former Malaysia national-team and China provincial-team coaches. Signs every IntoBadminton review and the finder methodology.",
  },
] as const;

export default function AuthorsIndexPage() {
  const article = articleJsonLd({
    path: PATH,
    headline: "Authors — who writes for IntoBadminton",
    description:
      "Editorial bylines on IntoBadminton — named authors with disclosed playing background.",
    section: "Guides",
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
        name: "Authors",
        item: URL,
      },
    ],
  };

  return (
    <main className="flex-1 py-16">
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
          <span className="text-[var(--text)]">Authors</span>
        </nav>

        <header className="space-y-3">
          <h1 className="text-display text-[var(--text)]">
            Editorial authors
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            Every review, comparison, and guide on IntoBadminton is signed by a
            named author with disclosed playing background, coach lineage, and
            potential conflicts of interest. The list is small today and stays
            small on purpose — depth over volume.
          </p>
          <EditorialMeta path={PATH} />
        </header>

        <ul className="space-y-4">
          {AUTHORS.map((author) => (
            <li key={author.slug}>
              <Link
                href={`/authors/${author.slug}/`}
                className="card card-interactive flex flex-col gap-2 p-6"
              >
                <p className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                  {author.role}
                </p>
                <p className="text-xl font-semibold text-[var(--text)]">
                  {author.name}
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  {author.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Explore the equipment we review
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Every review ties back to a catalog row with source labels and fit
            scoring. Browse the full index or run the finder.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/catalog/" className="btn-primary">
              Browse full catalog
            </Link>
            <Link href="/quiz/" className="btn-secondary">
              Run the finder
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
