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
  title: "Yonex Astrox vs Nanoflare — Which Fits You?",
  description:
    "Astrox is the power line, Nanoflare is the speed line. Comparison of head balance, swing speed, and which family fits singles, doubles, and front-court players.",
  alternates: pageAlternates("/compare-guides/yonex-astrox-vs-nanoflare/"),
  openGraph: {
    title: "Yonex Astrox vs Nanoflare — Which Fits You?",
    description:
      "Power vs speed: Yonex's two flagship racket families compared by balance, swing speed, and role fit.",
    url: "/compare-guides/yonex-astrox-vs-nanoflare/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

export default function AstroxVsNanoflarePage() {
  const path = "/compare-guides/yonex-astrox-vs-nanoflare/";
  const articleSchema = articleJsonLd({
    path,
    headline: "Yonex Astrox vs Nanoflare: which family fits?",
    description:
      "Yonex Astrox is the power line; Nanoflare is the speed line. Honest comparison of head balance, swing speed, and which family fits singles, doubles, and front-court players.",
    section: "Comparison",
  });
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Comparison guides", item: `${companyInfo.siteUrl}/compare-guides/` },
      { "@type": "ListItem", position: 3, name: "Astrox vs Nanoflare", item: `${companyInfo.siteUrl}/compare-guides/yonex-astrox-vs-nanoflare/` },
    ],
  };

  return (
    <CompareConceptChrome
      contentId="compare:yonex-astrox-vs-nanoflare"
      url={`${companyInfo.siteUrl}/compare-guides/yonex-astrox-vs-nanoflare/`}
      title="Yonex Astrox vs Nanoflare: which family fits?"
    >
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="layout-band max-w-3xl space-y-6">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/compare-guides/" className="hover:text-[var(--text)]">Comparison guides</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Astrox vs Nanoflare</span>
        </nav>

        <header className="space-y-3">
          <h1 className="text-display text-[var(--text)]">
            Yonex Astrox vs Nanoflare: which family fits?
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            Astrox is the power-oriented Yonex line — head-heavy frames that reward technique with smash mass. Nanoflare is the speed-oriented line — head-light frames that win on flat drives, defense, and front-court interception.
          </p>
          <EditorialMeta path="/compare-guides/yonex-astrox-vs-nanoflare/" />
        </header>

        <EditorialNotice />
        <InArticleAffiliateDisclosure />

        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          The right answer is not brand hierarchy — it is whether your matches are won by first attack from the rear court or by speed through defense and mid-court exchanges. Most players guess wrong because they buy the racket their favourite pro uses, instead of the racket that matches their actual style.
        </p>

        <div className="overflow-x-auto card">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-[color:var(--line-strong)] text-[var(--text)]">
              <tr>
                <th className="p-4">Family</th>
                <th className="p-4">Best signal</th>
                <th className="p-4">Profile fit</th>
                <th className="p-4">Risk</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-muted)]">
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Astrox</td>
                <td className="p-4">Head-heavy attack, rear-court load</td>
                <td className="p-4">Singles, smash-heavy, back-court doubles</td>
                <td className="p-4">Slow defense if your role is not attack</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--text)]">Nanoflare</td>
                <td className="p-4">Head-light speed, fast recovery</td>
                <td className="p-4">Doubles defense, flat drives, front court</td>
                <td className="p-4">Less rear-court power on continuous attack</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-headline text-[var(--text)]">
          When Astrox is the right answer
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          You play singles or rear-court doubles, your match-winning shot is the smash, and your shoulder, core, and timing are conditioned for stiff-shaft frames. Astrox 88D Pro 2024, 99 Pro, 100ZZ, and 100ZZ VA all sit on this side of the line. Even within Astrox, the 88S Pro is the more universal answer for amateurs — it keeps the head-heavy DNA but tolerates imperfect timing.
        </p>

        <h2 className="text-headline text-[var(--text)]">
          When Nanoflare is the right answer
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          You play doubles and your job is to organise the rally — block, drive, intercept — rather than to bury the shuttle. Nanoflare 1000Z, 700 Pro 2024, and 800 Pro 2024 are the right tier picks. Women&rsquo;s doubles and mixed doubles players default here more often than men&rsquo;s doubles, because rally speed exceeds smash payoff at most amateur levels.
        </p>

        <AdSlot id="compare-astrox-nanoflare-mid" />

        <h2 className="text-headline text-[var(--text)]">
          The middle answer most players actually want
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          If you play both disciplines or your doubles role rotates, the Astrox 88S Pro 2024 or Astrox 77 Pro is usually the right pick — both sit close to even balance with enough head weight to attack and enough speed to recover. The Arcsaber 11 Pro is a third option for control players who hate stiff frames.
        </p>

        <h2 className="text-headline text-[var(--text)]">
          What about Voltric and Arcsaber?
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          Voltric was Yonex&rsquo;s previous heavy-attack line — most models are now discontinued or repositioned as value-tier options like the Voltric 8DG. Arcsaber survives as the control-oriented family, with the 11 Pro and 7 Pro as the modern flagships. If you grew up on Arcsaber 10, the 11 Pro is the closest spiritual successor.
        </p>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Decide by profile, not by family
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Run the finder with your level, role, and budget. I will rank Astrox, Nanoflare, and the rest of the catalogue against your actual play pattern.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/quiz/" className="btn-primary">
              Compare them through my profile
            </Link>
            <Link
              href={catalogHrefFromCompareSlug("yonex-astrox-vs-nanoflare")}
              className="btn-secondary"
            >
              Browse Yonex in catalog
            </Link>
          </div>
        </div>
      </article>
    </CompareConceptChrome>
  );
}
