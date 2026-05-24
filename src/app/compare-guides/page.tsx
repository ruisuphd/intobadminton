import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Badminton equipment comparison guides",
  description:
    "Side-by-side badminton comparisons — Astrox vs Nanoflare, Yonex vs Victor vs Li-Ning, Astrox 77 Pro vs 88S Pro, and more. Picks framed by player role.",
  alternates: { canonical: "/compare-guides/" },
  openGraph: {
    title: "Badminton equipment comparison guides",
    description:
      "Side-by-side badminton comparisons framed by player role and skill level.",
    url: "/compare-guides/",
    type: "website",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

const GUIDES = [
  {
    href: "/compare-guides/yonex-astrox-vs-nanoflare/",
    title: "Yonex Astrox vs Nanoflare",
    dek: "Power-oriented Astrox vs speed-oriented Nanoflare — which family fits which role.",
  },
  {
    href: "/compare-guides/yonex-victor-li-ning/",
    title: "Yonex vs Victor vs Li-Ning",
    dek: "How the three flagship badminton brands actually differ — distribution, design philosophy, value, and roster.",
  },
  {
    href: "/compare-guides/astrox-77-pro-vs-88s-pro/",
    title: "Astrox 77 Pro vs 88S Pro 2024",
    dek: "Both are even-balance Yonex frames. One is the friendliest pro-tier upgrade. The other is the doubles control benchmark.",
  },
  {
    href: "/compare-guides/badminton-vs-tennis-shoes/",
    title: "Badminton vs tennis shoes",
    dek: "Why one is built for forward gait and the other for lateral movement — and why mixing them hurts.",
  },
  {
    href: "/compare-guides/astrox-99-pro-vs-astrox-100zz/",
    title: "Astrox 99 Pro vs Astrox 100ZZ",
    dek: "Both Yonex flagship attack frames with very different timing windows — head balance, shaft hardness, and who should buy which.",
  },
  {
    href: "/compare-guides/astrox-99-pro-vs-halbertec-9000-power/",
    title: "Astrox 99 Pro vs Halbertec 9000 Power",
    dek: "Two rival singles attack flagships compared on shaft tier, build feel, source authority, and resale.",
  },
  {
    href: "/compare-guides/astrox-88d-pro-vs-axforce-90-new/",
    title: "Astrox 88D Pro vs AxForce 90 New",
    dek: "Doubles rear-court attack compared — Yonex vs Li-Ning balance, shaft hardness, and mixed vs men's doubles fit.",
  },
  {
    href: "/compare-guides/halbertec-9000-power-vs-axforce-100-gen-2/",
    title: "Halbertec 9000 Power vs AxForce 100 Gen 2",
    dek: "Two Li-Ning attack flagships compared — which is the right upgrade for singles smash specialists.",
  },
  {
    href: "/compare-guides/bladex-800-speed-vs-nanoflare-1000z/",
    title: "Bladex 800 Speed vs Nanoflare 1000Z",
    dek: "Li-Ning's speed flagship against Yonex's hexagonal speed weapon — specs, drive feel, and source authority.",
  },
  {
    href: "/compare-guides/nanoflare-1000z-vs-auraspeed-99/",
    title: "Nanoflare 1000Z vs Auraspeed 99",
    dek: "Speed-series flagships compared — head-light feel, drive speed, and doubles-role fit.",
  },
  {
    href: "/compare-guides/nanoflare-800-pro-vs-auraspeed-hs-plus/",
    title: "Nanoflare 800 Pro vs Auraspeed HS Plus",
    dek: "Mid-flagship speed rackets compared on drive speed, swing weight, and source-authority confidence.",
  },
  {
    href: "/compare-guides/yonex-65z4-vs-eclipsion-z3/",
    title: "Yonex 65 Z4 vs Eclipsion Z3",
    dek: "Yonex's speed-oriented Z series against the premium Eclipsion stability shoe — fit, stability, and who buys which.",
  },
];

export default function CompareGuidesIndex() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Comparison guides", item: `${companyInfo.siteUrl}/compare-guides/` },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="layout-band max-w-6xl">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Comparison guides</span>
        </nav>

        <header className="mt-6 max-w-2xl">
          <h1 className="text-display text-[var(--text)]">
            Badminton comparison guides
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Head-to-head guides framed by player role and skill level — not by spec sheet.
          </p>
        </header>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="card card-interactive p-6 block"
            >
              <h2 className="text-lg font-semibold tracking-tight text-[var(--text)]">
                {g.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {g.dek}
              </p>
              <p className="mt-4 text-sm font-medium text-[var(--color-accent)]">
                Read comparison →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
