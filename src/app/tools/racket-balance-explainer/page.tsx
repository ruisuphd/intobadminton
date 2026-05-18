import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { RacketBalanceExplainer } from "./RacketBalanceExplainer";

export const metadata: Metadata = {
  title: "Racket balance explainer — head-light, even, head-heavy bands",
  description:
    "Drag the badminton racket balance-point slider and see which playing style each band suits, with example frames at each balance number.",
  alternates: { canonical: "/tools/racket-balance-explainer/" },
};

export default function RacketBalanceExplainerPage() {
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
        name: "Tools",
        item: `${companyInfo.siteUrl}/tools/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Racket balance explainer",
        item: `${companyInfo.siteUrl}/tools/racket-balance-explainer/`,
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
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools/" className="hover:text-[var(--text)]">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Racket balance explainer</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-display text-[var(--text)]">
            Racket balance explainer
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Drag the slider to see which player style each balance band
            suits. Bands and example frames are anchored to manufacturer
            balance-point specs where available, and to our editorial review
            base where not.
          </p>
        </header>

        <div className="mt-10">
          <RacketBalanceExplainer />
        </div>

        <section className="mt-12 card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            The full balance-vs-swing-speed model
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Balance is one of three frame variables that determine swing
            feel — the other two are weight class (3U/4U/5U) and shaft
            flex. A 4U head-heavy frame can swing faster than a 3U
            head-light one if the mass is closer to your hand. See{" "}
            <Link
              href="/guides/racket-balance/"
              className="text-[var(--color-accent)] underline"
            >
              the full racket-balance guide
            </Link>{" "}
            for the rest of the model.
          </p>
        </section>
      </div>
    </main>
  );
}
