import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  allClaims,
  claimFreshness,
  CLAIM_FRESHNESS_THRESHOLDS,
  type Claim,
  type SourceTier,
} from "@/lib/claims";
import { companyInfo } from "@/lib/company";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Verified claims registry",
  description:
    "Every cited fact on IntoBadminton — verbatim source quotes, verification dates, authority tiers, and the pages that use each claim.",
  alternates: pageAlternates("/data/"),
};

const TIER_LABEL: Record<SourceTier, string> = {
  1: "Manufacturer product page",
  2: "Standards body (BWF)",
  3: "Manufacturer support / brand page",
  4: "Independent measurement or industry convention",
};

function FreshnessBadge({ claim }: { claim: Claim }) {
  const status = claimFreshness(claim);
  const label =
    status === "fresh"
      ? "Fresh"
      : status === "warn"
        ? `Review due (>${CLAIM_FRESHNESS_THRESHOLDS.warnDays}d)`
        : `Stale (>${CLAIM_FRESHNESS_THRESHOLDS.failDays}d)`;
  const className =
    status === "fresh"
      ? "bg-emerald-50 text-emerald-800"
      : status === "warn"
        ? "bg-amber-50 text-amber-900"
        : "bg-red-50 text-red-800";
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}

export default function DataRegistryPage() {
  const claims = allClaims().slice().sort((a, b) => a.label.localeCompare(b.label));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "IntoBadminton verified claims registry",
    description:
      "Structured registry of cited facts used across guides and tools, with source URLs and last-verified dates.",
    url: `${companyInfo.siteUrl}/data/`,
    creator: {
      "@type": "Organization",
      name: companyInfo.siteName,
      url: companyInfo.siteUrl,
    },
    dateModified: "2026-06-05",
    variableMeasured: claims.map((c) => c.label),
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={jsonLd} />
      <article className="layout-band max-w-4xl">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Claims registry</span>
        </nav>

        <header className="mt-6 max-w-2xl">
          <h1 className="text-display text-[var(--text)]">Verified claims registry</h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Every numbered fact we cite in guides and tools lives here with a verbatim
            source quote, verification date, and authority tier. Other writers can link
            back to a stable claim id instead of re-quoting manufacturer pages.
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            CI fails the build when any claim is older than{" "}
            {CLAIM_FRESHNESS_THRESHOLDS.failDays} days; warnings start at{" "}
            {CLAIM_FRESHNESS_THRESHOLDS.warnDays} days. See{" "}
            <Link href="/methodology/" className="text-[var(--color-accent)] underline">
              methodology
            </Link>{" "}
            and{" "}
            <Link href="/source-policy/" className="text-[var(--color-accent)] underline">
              source policy
            </Link>
            .
          </p>
        </header>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-[color:var(--line)]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[color:var(--line)] bg-[color:var(--color-surface-muted)]">
                <th className="px-4 py-3 font-semibold text-[var(--text)]">Claim</th>
                <th className="px-4 py-3 font-semibold text-[var(--text)]">Value</th>
                <th className="px-4 py-3 font-semibold text-[var(--text)]">Source</th>
                <th className="px-4 py-3 font-semibold text-[var(--text)]">Freshness</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr
                  key={claim.id}
                  id={claim.id}
                  className="border-b border-[color:var(--line)] align-top last:border-0"
                >
                  <td className="px-4 py-4">
                    <p className="font-medium text-[var(--text)]">{claim.label}</p>
                    <p className="mt-1 font-mono text-xs text-[var(--color-subtle)]">
                      {claim.id}
                    </p>
                    <p className="mt-2 text-xs text-[var(--color-muted)]">
                      Tier {claim.sourceTier}: {TIER_LABEL[claim.sourceTier]}
                    </p>
                    {claim.usedOn.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1">
                        {claim.usedOn.map((path) => (
                          <li key={path}>
                            <Link
                              href={path}
                              className="text-xs text-[var(--color-accent)] underline"
                            >
                              {path}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="px-4 py-4 text-[var(--text)]">
                    {claim.value}
                    {claim.unit ? ` ${claim.unit}` : ""}
                  </td>
                  <td className="px-4 py-4 text-[var(--color-muted)]">
                    <p>
                      <a
                        href={claim.source.url}
                        className="text-[var(--color-accent)] underline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {claim.source.name}
                      </a>
                    </p>
                    <p className="mt-1 text-xs">Verified {claim.source.accessedAt}</p>
                    <blockquote className="mt-2 border-l-2 border-[color:var(--line-strong)] pl-3 text-xs italic">
                      {claim.source.quote}
                    </blockquote>
                    {claim.source.editorialNote && (
                      <p className="mt-2 text-xs text-[var(--color-subtle)]">
                        Note: {claim.source.editorialNote}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <FreshnessBadge claim={claim} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-sm text-[var(--color-muted)]">
          Machine-readable source:{" "}
          <code className="rounded bg-[color:var(--color-surface-muted)] px-1 py-0.5 text-xs">
            content/claims.json
          </code>{" "}
          in the public repository.
        </p>

        <section className="mt-16 rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            See the products these claims support
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Every cited fact ties back to equipment in our catalog — browse with
            filters to find the models behind the registry.
          </p>
          <Link href="/catalog/" className="btn-secondary mt-5">
            Browse full catalog
          </Link>
        </section>
      </article>
    </main>
  );
}
