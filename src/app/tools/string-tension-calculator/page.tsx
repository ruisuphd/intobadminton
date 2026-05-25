import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { StringTensionCalculator } from "./StringTensionCalculator";

export const metadata: Metadata = {
  title: "Badminton string tension calculator — starting point by level + arm",
  description:
    "Pick a starting string tension based on your level, racket frame, and arm-comfort signals. Anchored to BWF and manufacturer stringing-advice ranges.",
  alternates: pageAlternates("/tools/string-tension-calculator/"),
};

export default function StringTensionCalculatorPage() {
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
        name: "String tension calculator",
        item: `${companyInfo.siteUrl}/tools/string-tension-calculator/`,
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
          <span className="text-[var(--text)]">String tension calculator</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-display text-[var(--text)]">
            Badminton string tension calculator
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            A starting point, not a prescription. Tension is one of three
            settings a real stringer balances together — the frame&apos;s
            rated max, your string choice, and your own contact quality. Use
            the calculator output to anchor a conversation, not replace one.
          </p>
        </header>

        <div className="mt-10">
          <StringTensionCalculator />
        </div>

        <section className="mt-12 card p-6 bg-[color:var(--surface-muted)]">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Why we keep this conservative
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Stringing above the frame&apos;s rated maximum voids warranty and
            sharply raises the risk of frame deformation and string snap-back
            injury. We cap the recommendation 1 lb below the conservative
            common upper bound and refuse to suggest above 30 lb for
            recreational players regardless of frame rating.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            For the full stringing-and-tension framework see{" "}
            <Link
              href="/guides/string-tension/"
              className="text-[var(--color-accent)] underline"
            >
              our string-tension guide
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
