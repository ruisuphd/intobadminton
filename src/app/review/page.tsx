import type { Metadata } from "next";
import Link from "next/link";
import { EditorialMeta } from "@/components/EditorialMeta";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { defaultOgImages } from "@/lib/og";
import {
  reviewPath,
  reviewableProducts,
} from "@/lib/review-pages";
import { articleJsonLd } from "@/lib/structured-data";
import { humanize } from "@/lib/text";

const PATH = "/review/";
const URL = `${companyInfo.siteUrl}${PATH}`;

export const metadata: Metadata = {
  title: "Badminton equipment reviews — every racket and shoe, sourced",
  description:
    "Per-product badminton reviews — Yonex Astrox, Nanoflare, Arcsaber; Li-Ning Halbertec, AxForce, Bladex; Victor Auraspeed, DriveX; Kawasaki, Bonny, Kumpoo — with verified specs and source-authority labels.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Badminton equipment reviews — every racket and shoe, sourced",
    description:
      "Per-product badminton reviews with verified manufacturer specs, source-authority labels, and editor notes.",
    url: PATH,
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton Equipment Reviews — Sourced & Verified",
    description:
      "Per-product badminton reviews with verified specs and editor notes.",
  },
};

export default function ReviewIndexPage() {
  const products = reviewableProducts();
  const racketCount = products.filter((p) => p.category === "racket").length;
  const shoeCount = products.filter((p) => p.category === "shoes").length;

  // Group by brand for readable presentation.
  const grouped = new Map<string, typeof products>();
  for (const product of products) {
    const list = grouped.get(product.brand) ?? [];
    list.push(product);
    grouped.set(product.brand, list);
  }
  // Sort brands by descending count so headline brands appear first.
  const brandGroups = Array.from(grouped.entries()).sort(
    (a, b) => b[1].length - a[1].length
  );

  const article = articleJsonLd({
    path: PATH,
    headline: "Badminton equipment reviews — every racket and shoe, sourced",
    description:
      "Per-product badminton reviews with verified manufacturer specs and source-authority labels.",
    section: "Reviews",
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
        name: "Reviews",
        item: URL,
      },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${URL}#list`,
    name: "IntoBadminton badminton equipment reviews",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${companyInfo.siteUrl}${reviewPath(p.id)}`,
      name: `${p.brand} ${p.name}`,
    })),
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemList} />

      <article className="layout-band max-w-3xl space-y-8">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Reviews</span>
        </nav>

        <header className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
            {racketCount} rackets · {shoeCount} shoes · sourced & verified
          </p>
          <h1 className="text-display text-[var(--text)]">
            Badminton equipment reviews
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            Every per-product review on IntoBadminton, grouped by brand. Each
            page lists manufacturer-verified specifications where available,
            independent measurements where they aren&apos;t, and a clear
            source-authority label so you can judge the confidence yourself.
          </p>
          <EditorialMeta path={PATH} />
        </header>

        <section className="card p-6 text-sm leading-relaxed text-[var(--color-muted)]">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            How we source reviews
          </h2>
          <p className="mt-3">
            We prefer manufacturer product-specific pages (Tier 1) for racket
            specs. Where a brand publishes only a generic landing page, the row
            is downgraded to {"“"}needs verification{"”"} until a Tier-1
            source is located. Independent measurements (BadmintonCN,
            YuanShi) are surfaced with explicit attribution — never repackaged
            as official spec.
          </p>
          <p className="mt-3">
            Want to contribute your own first-party review?{" "}
            <Link
              href="/review/submit/"
              className="text-[var(--color-accent)] underline"
            >
              Submit a structured review →
            </Link>
          </p>
        </section>

        {brandGroups.map(([brand, items]) => (
          <section key={brand} className="space-y-4">
            <h2 className="text-headline text-[var(--text)]">
              {brand}{" "}
              <span className="text-base font-normal text-[var(--color-muted)]">
                · {items.length} review{items.length === 1 ? "" : "s"}
              </span>
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.map((p) => (
                <li key={p.id}>
                  <Link
                    href={reviewPath(p.id)}
                    className="card card-interactive flex h-full flex-col gap-2 p-5"
                  >
                    <p className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                      {humanize(p.category)} · ~${p.priceUsd}
                    </p>
                    <p className="text-base font-semibold text-[var(--text)]">
                      {p.brand} {p.name}
                    </p>
                    <p className="text-xs text-[var(--color-muted)]">
                      {p.verificationStatus === "official_verified"
                        ? "Spec verified against manufacturer page"
                        : p.verificationStatus === "editor_verified"
                          ? "Editor-verified"
                          : "Needs official verification"}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Don&apos;t want to read 40+ reviews?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Run the finder. Five questions, transparent fit-score reasoning,
            ranked picks tailored to your level, role, body, and budget.
          </p>
          <Link href="/quiz/" className="btn-primary mt-5">
            Start the finder
          </Link>
        </section>
      </article>
    </main>
  );
}
