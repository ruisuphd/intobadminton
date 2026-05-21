import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Badminton tools — calculators, converters, diagrams",
  description:
    "Free badminton toolkit — skill-level converter, string-tension calculator, racket-balance explainer, court diagram, authenticity checker. No signup.",
  alternates: { canonical: "/tools/" },
};

type Tool = {
  href: string;
  title: string;
  dek: string;
  tag: string;
};

const TOOLS: Tool[] = [
  {
    href: "/tools/skill-level-converter/",
    title: "Skill-level converter",
    dek: "Convert your badminton level between common rating systems — China 中羽 1–10, BadmintonEngland tiers, USA Badminton, BAM, SBA, and IntoBadminton's 4-tier internal scale.",
    tag: "Converter",
  },
  {
    href: "/tools/string-tension-calculator/",
    title: "String tension calculator",
    dek: "Get a tension range starting point based on your level, frame, and arm-comfort signals. Optimised to anchor a stringer conversation, not replace one.",
    tag: "Calculator",
  },
  {
    href: "/tools/racket-balance-explainer/",
    title: "Racket balance explainer",
    dek: "Drag the balance-point slider and see which player style each band suits. Built on top of our balance-vs-swing-speed guide.",
    tag: "Explainer",
  },
  {
    href: "/tools/court-diagram/",
    title: "Court dimensions diagram",
    dek: "BWF singles vs doubles court diagram with hover hotspots. Cited from the BWF Laws of Badminton.",
    tag: "Reference",
  },
  {
    href: "/tools/authenticity-checker/",
    title: "Authenticity checker",
    dek: "Interactive 5-step counterfeit triage for Yonex / Victor / Li-Ning rackets. Score the seller, barcode, cone cap, grommets, and warranty path; get a verdict band.",
    tag: "Triage",
  },
];

export default function ToolsIndexPage() {
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
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${companyInfo.siteUrl}/tools/#itemlist`,
    name: "IntoBadminton toolkit",
    numberOfItems: TOOLS.length,
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.title,
      url: `${companyInfo.siteUrl}${t.href}`,
      description: t.dek,
    })),
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <div className="layout-band max-w-6xl">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Tools</span>
        </nav>

        <header className="mt-6 max-w-2xl">
          <h1 className="text-display text-[var(--text)]">
            Badminton toolkit
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Original interactive tools that answer one question at a time —
            built to be linked from the finder and from any deep-dive that
            references them. No signup; nothing leaves your device.
          </p>
        </header>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="card card-interactive block p-6"
              >
                <span className="chip chip-secondary">{t.tag}</span>
                <h2 className="mt-3 text-lg font-semibold text-[var(--text)]">
                  {t.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {t.dek}
                </p>
                <p className="mt-3 text-sm font-medium text-[var(--color-accent)]">
                  Open tool →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
