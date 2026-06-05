import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { ToolCatalogCta } from "@/components/ToolCatalogCta";
import { CourtDiagram } from "./CourtDiagram";

export const metadata: Metadata = {
  title: "Badminton court dimensions diagram — singles vs doubles (BWF)",
  description:
    "Interactive BWF-sourced badminton court diagram with hover hotspots for singles vs doubles widths, service lines, and net heights.",
  alternates: pageAlternates("/tools/court-diagram/"),
};

export default function CourtDiagramPage() {
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
        name: "Court dimensions diagram",
        item: `${companyInfo.siteUrl}/tools/court-diagram/`,
      },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="layout-band max-w-4xl">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools/" className="hover:text-[var(--text)]">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Court diagram</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-display text-[var(--text)]">
            Badminton court dimensions
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            All measurements sourced from the{" "}
            <a
              href="https://bwfbadminton.com/laws-of-the-game/"
              target="_blank"
              rel="noreferrer noopener nofollow"
              className="text-[var(--color-accent)] underline"
            >
              BWF Laws of Badminton
            </a>
            . Hover or tap a region to see what it means.
          </p>
        </header>

        <div className="mt-10">
          <CourtDiagram />
        </div>

        <section className="mt-12 card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Quick reference
          </h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <Row label="Court length (both)" value="13.40 m" />
            <Row label="Doubles width" value="6.10 m" />
            <Row label="Singles width" value="5.18 m" />
            <Row label="Net height — posts" value="1.55 m" />
            <Row label="Net height — centre" value="1.524 m" />
            <Row label="Service line — short" value="1.98 m from net" />
            <Row label="Service line — long (doubles)" value="0.76 m inside back" />
            <Row label="Doubles tramlines" value="0.46 m strip each side" />
          </dl>
        </section>

        <ToolCatalogCta slug="court-diagram" />
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[color:var(--surface-muted)] p-3">
      <dt className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
        {label}
      </dt>
      <dd className="mt-1 text-[var(--text)]">{value}</dd>
    </div>
  );
}
