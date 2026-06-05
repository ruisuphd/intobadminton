import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { ToolCatalogCta } from "@/components/ToolCatalogCta";
import { SkillLevelConverter } from "./SkillLevelConverter";

export const metadata: Metadata = {
  title: "Badminton skill-level converter — China 中羽, England, USA, BAM, SBA",
  description:
    "Convert your badminton level between China 中羽 1–10, BadmintonEngland tiers, USA Badminton, BAM (Malaysia), SBA (Singapore), and IntoBadminton's 4-tier scale.",
  alternates: pageAlternates("/tools/skill-level-converter/"),
};

export default function SkillLevelConverterPage() {
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
        name: "Skill-level converter",
        item: `${companyInfo.siteUrl}/tools/skill-level-converter/`,
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
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tools/" className="hover:text-[var(--text)]">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Skill-level converter</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-display text-[var(--text)]">
            Badminton skill-level converter
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Match your local rating system to IntoBadminton&apos;s 4-tier
            internal scale (and any other supported system) so the finder
            ranks gear against the right level band.
          </p>
        </header>

        <div className="mt-10">
          <SkillLevelConverter />
        </div>

        <section className="mt-12 card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            How these mappings were built
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            The mappings between China 中羽, BadmintonEngland, USA Badminton,
            BAM (Malaysia), SBA (Singapore), and our 4-tier scale are
            approximate community-language equivalents, not federation-issued
            cross-walks. They are built from each federation&apos;s public
            grading materials and reviewed by IntoBadminton&apos;s founder
            against on-court experience in Ireland Division 4. Treat the
            result as a starting band for the finder, not a sanctioned
            promotion or demotion.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            For the underlying mapping table see{" "}
            <Link
              href="/methodology/"
              className="text-[var(--color-accent)] underline"
            >
              the methodology page
            </Link>
            .
          </p>
        </section>

        <ToolCatalogCta slug="skill-level-converter" />
      </div>
    </main>
  );
}
