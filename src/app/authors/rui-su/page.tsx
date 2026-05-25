import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo, founderSameAs, organizationJsonLd } from "@/lib/company";
import { defaultOgImages } from "@/lib/og";

const PATH = "/authors/rui-su/";
const URL = `${companyInfo.siteUrl}${PATH}`;

export const metadata: Metadata = {
  // The root layout's title template appends " | IntoBadminton" — keep the
  // page title brand-free here so we don't emit the brand twice (the
  // postbuild SEO audit fails on `duplicate-title-brand`).
  title: "Rui Su — Founder & lead reviewer",
  description:
    "Rui Su is the founder of IntoBadminton — a competitive Division 4 Ireland player who has trained under former Malaysia national-team and China provincial-team coaches. Equipment reviews and the finder methodology are signed by Rui.",
  alternates: pageAlternates(PATH),
  openGraph: {
    title: "Rui Su — Founder, IntoBadminton",
    description:
      "Competitive Division 4 Ireland player. Trained under former Malaysia national-team and China provincial-team coaches. Signs every IntoBadminton equipment review.",
    url: PATH,
    type: "profile",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rui Su — Founder, IntoBadminton",
    description:
      "Competitive Division 4 Ireland player. Signs every IntoBadminton equipment review.",
  },
};

export default function RuiSuAuthorPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${URL}#person`,
    name: companyInfo.founderName,
    url: URL,
    sameAs: founderSameAs,
    description: companyInfo.founderDescription,
    jobTitle: "Founder, IntoBadminton",
    worksFor: { "@id": organizationJsonLd["@id"] },
    knowsAbout: [
      "Badminton equipment review",
      "Badminton racket selection",
      "Badminton string tension",
      "Badminton shoe fit",
      "BWF rules of badminton",
    ],
    affiliation: {
      "@type": "Organization",
      name: "Maynooth University",
      url: "https://www.maynoothuniversity.ie/",
    },
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
        name: "Authors",
        item: `${companyInfo.siteUrl}/authors/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: companyInfo.founderName,
        item: URL,
      },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={personJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article className="layout-band max-w-3xl space-y-6">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Rui Su</span>
        </nav>

        <header className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
            Founder · Reviewer · Coach lineage
          </p>
          <h1 className="text-display text-[var(--text)]">
            {companyInfo.founderName}
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            {companyInfo.founderDescription}
          </p>
        </header>

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Playing background
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-muted)]">
            <li>
              <strong className="text-[var(--text)]">Current level.</strong>{" "}
              Division 4 Irish Badminton league. Plays primarily men&apos;s
              doubles with a head-light speed racket (currently Yonex Nanoflare
              1000 Z, 4U/G5, BG80 at 26–28 lb).
            </li>
            <li>
              <strong className="text-[var(--text)]">Club history.</strong>{" "}
              Maynooth University badminton team during a PhD candidacy, plus
              multiple Dublin clubs. Started playing as a child in China.
            </li>
            <li>
              <strong className="text-[var(--text)]">Coaches.</strong>{" "}
              Trained under a former Malaysian national-team player and a former
              Chinese provincial-team player. Coach lineage is disclosed on
              every review where personal preference might influence the
              verdict.
            </li>
          </ul>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            What I sign on this site
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-muted)]">
            <li>
              <strong className="text-[var(--text)]">
                Founder firsthand notes.
              </strong>{" "}
              Where a review or comparison says &quot;Founder firsthand (Rui,
              Div 4 IE)&quot;, that prose is mine and reflects my own racket
              setup, stringbed, and on-court experience. Where the prose
              attributes a measurement to BadmintonCN, YuanShi, or a community
              tester, the source — not me — owns the number.
            </li>
            <li>
              <strong className="text-[var(--text)]">
                Editor notes in `products.json`.
              </strong>{" "}
              Short per-product editor takes that feed the finder&apos;s
              evidence chips. These are my opinions, attached to a verifiable
              spec row.
            </li>
            <li>
              <strong className="text-[var(--text)]">Methodology pages.</strong>{" "}
              The finder&apos;s fit-score logic, source-authority tiers, and
              fact-check policy are written by me and are open to challenge —
              email{" "}
              <a
                href={`mailto:${companyInfo.contactEmail}`}
                className="text-[var(--color-accent)] underline"
              >
                {companyInfo.contactEmail}
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Conflicts of interest
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            IntoBadminton is operated by {companyInfo.operatorLegalName}, the
            company I founded. Display advertising and any future affiliate
            partnerships are clearly labelled and never change the fit-score
            order of recommendations. Where a racket is downgraded for
            source-authority reasons (e.g. Li-Ning rackets without a
            product-specific Li-Ning page), that downgrade is public, and the
            row still appears in shortlists with a {"“needs verification”"}{" "}
            chip rather than being hidden.
          </p>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            More
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/methodology/"
                className="text-[var(--color-accent)] hover:underline"
              >
                Recommendation methodology →
              </Link>
            </li>
            <li>
              <Link
                href="/source-policy/"
                className="text-[var(--color-accent)] hover:underline"
              >
                Source &amp; copyright policy →
              </Link>
            </li>
            <li>
              <Link
                href="/about/"
                className="text-[var(--color-accent)] hover:underline"
              >
                About IntoBadminton →
              </Link>
            </li>
            <li>
              <a
                href={companyInfo.founderWebsite}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[var(--color-accent)] hover:underline"
              >
                Personal website (ruisuphd.com) →
              </a>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Have a question about a review?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Editorial corrections, product data issues, and source-authority
            questions go to{" "}
            <a
              href={`mailto:${companyInfo.contactEmail}`}
              className="text-[var(--color-accent)] underline"
            >
              {companyInfo.contactEmail}
            </a>
            . Include the product, the page URL, and the field you think needs
            review.
          </p>
        </section>
      </article>
    </main>
  );
}
