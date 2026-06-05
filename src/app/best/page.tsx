import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Best Badminton Rackets, Shoes & Strings (2026)",
  description:
    "Curated 2026 badminton buying guides — rackets for beginners, intermediates, doubles, smash; shoes by fit width; strings by feel and durability.",
  alternates: pageAlternates("/best/"),
  openGraph: {
    title: "Best Badminton Rackets, Shoes & Strings (2026)",
    description:
      "Curated badminton buying guides — every pick scored on transparent fit factors with source authority labelled.",
    url: "/best/",
    type: "website",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Badminton Rackets, Shoes & Strings — 2026 Buying Guides",
    description:
      "Best badminton rackets, shoes, and strings — by level, role, and fit width. Transparent scoring, source labels, no email gate.",
  },
};

const SECTIONS: { heading: string; items: { href: string; title: string; dek: string }[] }[] = [
  {
    heading: "Rackets",
    items: [
      {
        href: "/best/beginner-rackets/",
        title: "Best beginner rackets",
        dek: "Six forgiving frames for new and recreational players, picked by shaft flex and balance.",
      },
      {
        href: "/best/rackets-under-100/",
        title: "Best rackets under $100",
        dek: "Hard budget cap — six verified frames from Yonex Play, Victor, and Li-Ning with trade-offs named.",
      },
      {
        href: "/best/lightweight-rackets-5u/",
        title: "Best lightweight & 5U rackets",
        dek: "Ultralight and 5U frames for fast recovery, juniors, and front-court doubles.",
      },
      {
        href: "/best/rackets-for-shoulder-comfort/",
        title: "Best rackets for shoulder comfort",
        dek: "Head-light and medium-flex picks for players managing arm load.",
      },
      {
        href: "/best/control-rackets/",
        title: "Best control rackets",
        dek: "Placement-first frames for doubles net play and singles rally craft.",
      },
      {
        href: "/best/intermediate-rackets/",
        title: "Best intermediate rackets",
        dek: "Six rackets for players who have outgrown beginner frames but are not ready for pro flagships.",
      },
      {
        href: "/best/doubles-rackets/",
        title: "Best doubles rackets",
        dek: "Front-court speed, defensive recovery, and rear-court continuity — picks for men's, women's, and mixed.",
      },
      {
        href: "/best/smash-heavy-rackets/",
        title: "Best smash rackets",
        dek: "Head-heavy attack frames ranked by smash mass, continuity, and the shaft hardness you can actually drive.",
      },
      {
        href: "/best/rackets-under-150/",
        title: "Rackets under $150",
        dek: "Club-budget frames at $150 or less — catalogue discovery with comparison table.",
      },
      {
        href: "/best/rackets-under-200/",
        title: "Rackets under $200",
        dek: "Upper club-budget frames at $200 or less — programmatic catalogue with comparison table.",
      },
    ],
  },
  {
    heading: "Shoes & strings",
    items: [
      {
        href: "/best/shoes/",
        title: "Best badminton shoes",
        dek: "Picks by fit width, stability, and cushioning — the shoe matters more than the racket for most amateurs.",
      },
      {
        href: "/best/strings/",
        title: "Best badminton strings",
        dek: "Strings ranked by feel, repulsion, control, and durability with tension recommendations.",
      },
    ],
  },
];

export default function BestIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Best of", item: `${companyInfo.siteUrl}/best/` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${companyInfo.siteUrl}/best/#itemlist`,
    name: "IntoBadminton best-of buying guides",
    description:
      "Hand-curated badminton buying guides covering rackets, shoes, and strings — each shortlist is scored on transparent fit factors.",
    numberOfItems: SECTIONS.flatMap((s) => s.items).length,
    itemListElement: SECTIONS.flatMap((section) =>
      section.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${companyInfo.siteUrl}${item.href}`,
        description: item.dek,
      }))
    ),
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <div className="layout-band max-w-6xl">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Best of</span>
        </nav>

        <header className="mt-6 max-w-2xl">
          <h1 className="text-display text-[var(--text)]">
            Best of badminton — curated buying guides
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Hand-picked shortlists for rackets, shoes, and strings. Each guide names the player a pick suits, lists the tradeoff, and links to deeper deep-dive reviews.
          </p>
        </header>

        {SECTIONS.map((section) => (
          <section key={section.heading} className="mt-14">
            <h2 className="text-headline text-[var(--text)]">{section.heading}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card card-interactive p-6 block"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.dek}
                  </p>
                  <p className="mt-4 text-sm font-medium text-[var(--color-accent)]">
                    Read picks →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-16 rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Prefer a personalised pick?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            The IntoBadminton finder takes 60 seconds and ranks the catalogue against your level, role, and body — with reasons.
          </p>
          <Link href="/quiz/" className="btn-primary mt-5">
            Start the finder
          </Link>
        </section>
      </div>
    </main>
  );
}
