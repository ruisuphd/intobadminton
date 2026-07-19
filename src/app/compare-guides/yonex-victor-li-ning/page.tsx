import Link from "next/link";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { EditorialMeta } from "@/components/EditorialMeta";
import { EditorialNotice } from "@/components/EditorialNotice";
import { AdSlot } from "@/components/AdSlot";
import { CompareConceptChrome } from "@/components/CompareConceptChrome";
import { InArticleAffiliateDisclosure } from "@/components/InArticleAffiliateDisclosure";
import { JsonLd } from "@/components/JsonLd";
import { catalogHrefFromCompareSlug } from "@/lib/catalog-url";
import { companyInfo } from "@/lib/company";
import { defaultOgImages } from "@/lib/og";
import { articleJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Yonex vs Victor vs Li-Ning — Best Brand?",
  description:
    "Comparison of Yonex, Victor, and Li-Ning badminton gear by model fit, source status, region, role, and budget — pick by your game, not by the badge.",
  alternates: pageAlternates("/compare-guides/yonex-victor-li-ning/"),
  openGraph: {
    title: "Yonex vs Victor vs Li-Ning — Best Brand?",
    description:
      "The three flagship badminton brands compared by strength, region, role fit, and price tier.",
    url: "/compare-guides/yonex-victor-li-ning/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

export default function YonexVictorLiningPage() {
  const path = "/compare-guides/yonex-victor-li-ning/";
  const articleSchema = articleJsonLd({
    path,
    headline: "Yonex vs Victor vs Li-Ning: which is best?",
    description:
      "Comparison of Yonex, Victor, and Li-Ning badminton gear by model fit, source status, region, role, and budget.",
    section: "Comparison",
  });
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Comparison guides", item: `${companyInfo.siteUrl}/compare-guides/` },
      { "@type": "ListItem", position: 3, name: "Yonex vs Victor vs Li-Ning", item: `${companyInfo.siteUrl}/compare-guides/yonex-victor-li-ning/` },
    ],
  };

  return (
    <CompareConceptChrome
      contentId="compare:yonex-victor-li-ning"
      url={`${companyInfo.siteUrl}/compare-guides/yonex-victor-li-ning/`}
      title="Yonex vs Victor vs Li-Ning: which is best?"
    >
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="layout-band max-w-3xl space-y-6">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/compare-guides/" className="hover:text-[var(--text)]">Comparison guides</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Yonex vs Victor vs Li-Ning</span>
        </nav>

        <header className="space-y-3">
          <h1 className="text-display text-[var(--text)]">
            Yonex vs Victor vs Li-Ning: which is best?
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            There is no single best badminton brand. Each of the three flagships has a clear personality — and your right pick depends more on your region, your role, and your budget than on brand hierarchy.
          </p>
          <EditorialMeta path="/compare-guides/yonex-victor-li-ning/" />
        </header>

        <EditorialNotice />
        <InArticleAffiliateDisclosure />

        <h2 className="text-headline text-[var(--text)]">
          The one-line summary
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          Do not choose by brand hierarchy alone. Compare the official product
          page, weight / grip variant, shaft flex, balance profile, warranty
          channel, and whether the IntoBadminton row is already verified.
        </p>

        <div className="overflow-x-auto card">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="border-b border-[color:var(--line-strong)] text-[var(--text)]">
              <tr>
                <th className="p-4">Brand</th>
                <th className="p-4">Strength</th>
                <th className="p-4">Where to buy</th>
                <th className="p-4">Flagship lines</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-muted)]">
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Yonex</td>
                <td className="p-4">Broad official product-page coverage</td>
                <td className="p-4">Global — easy in NA, EU, JP, SG, AU</td>
                <td className="p-4">Astrox, Nanoflare, Arcsaber, Aerus / 65 Z shoes</td>
              </tr>
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Victor</td>
                <td className="p-4">Detailed official spec pages for many models</td>
                <td className="p-4">Strong in Asia, growing in NA / EU</td>
                <td className="p-4">Auraspeed, DriveX, Thruster, P9200 shoes</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--text)]">Li-Ning</td>
                <td className="p-4">Strong line breadth; rows need product-page verification here</td>
                <td className="p-4">Strong in CN/SEA; specialty stores in NA/EU</td>
                <td className="p-4">AxForce, BladeX, Halbertec, Aeronaut</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-headline text-[var(--text)]">
          When Yonex is the right pick
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          You live in North America, Europe, or Australia and you want predictable distribution, restring availability, and resale liquidity. You play mixed disciplines and want one frame (Astrox 88S Pro 2024 or 77 Pro) that handles everything. You restring frequently and need access to multiple stringers who all stock Yonex strings as default.
        </p>

        <h2 className="text-headline text-[var(--text)]">
          When Victor is the right pick
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          You play primarily doubles and value speed and recovery over smash mass. You have an Asian foot last and Yonex shoes never quite fit (Victor P9200 lasts run snugger and longer in the toe box). You follow the Korean tour and want frames the Lee/Seo and Ahsan-tier players use as their primary stick.
        </p>

        <h2 className="text-headline text-[var(--text)]">
          When Li-Ning is the right pick
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          You want the most smash mass per dollar — Halbertec 9000 Power and AxForce 100 Gen 2 deliver flagship-tier attack at meaningfully lower prices than 100ZZ-class Yonex frames. You live in Asia where Li-Ning distribution is excellent. You watch Chinese national-team play and want their kit. Build quality has caught up with Yonex over the last three years.
        </p>

        <AdSlot id="compare-three-brands-mid" />

        <h2 className="text-headline text-[var(--text)]">
          What about other brands?
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          Mizuno is sleeper-tier — gentle on the arm, smooth swing, limited Western availability. Kumpoo, Apacs, and FZ Forza dominate specific regional markets and represent strong value. Babolat and Wilson have re-entered badminton recently with mixed results. None of these brands need to be your default, but each has at least one model worth knowing about.
        </p>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Pick by your role, not the badge
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            The finder ranks rackets across all three brands against your level, discipline, style, body, and budget. The fit score is the score — brand loyalty is irrelevant.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/quiz/" className="btn-primary">
              Run the cross-brand finder
            </Link>
            <Link
              href={catalogHrefFromCompareSlug("yonex-victor-li-ning")}
              className="btn-secondary"
            >
              Browse matching catalog
            </Link>
          </div>
        </div>
      </article>
    </CompareConceptChrome>
  );
}
