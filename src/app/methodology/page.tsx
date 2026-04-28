import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recommendation methodology — IntoBadminton",
  description:
    "How IntoBadminton combines specs, player inputs, and source references for badminton equipment recommendations.",
};

export default function MethodologyPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-6 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Recommendation methodology
        </h1>
        <p>
          IntoBadminton ranks equipment using three layers: official product
          specs, your player profile, and evidence references. The goal is not
          to scrape the web; it is to make recommendations transparent and
          useful.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          1. Player fit
        </h2>
        <p>
          We use level, singles/doubles/mixed, play style, budget, weight, foot
          width, preferred string tension, and comfort flags to score fit across
          rackets, strings, shoes, and bags. These rules are tested with persona
          fixtures and shown through reason codes.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          2. Official specs
        </h2>
        <p>
          Product records include category-specific specs: racket weight and
          balance, string gauge and tension range, shoe width/stability, bag
          capacity, source URLs, and verification dates. Official specs take
          priority over forum opinions.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          3. Evidence references
        </h2>
        <p>
          BadmintonCN and similar platforms can be useful discovery sources.
          When we use search-visible references, we show source name, language,
          theme summary, confidence, and a link. We do not display copied forum
          review text unless rights allow it.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          4. Resale and depreciation
        </h2>
        <p>
          Resale estimates are market signals, not promises. They use visible
          listing and community price metadata to estimate total cost of
          ownership, then clearly show confidence and assumptions.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Why links instead of copied reviews?
        </h2>
        <p>
          Forum and social posts are user-generated content owned by their
          authors/platforms. Metadata summaries and links let players verify
          claims while respecting source rights.
        </p>
        <p>
          See also <Link href="/source-policy/" className="text-[var(--color-accent)] underline">Source policy</Link> and{" "}
          <Link href="/privacy/" className="text-[var(--color-accent)] underline">Privacy policy</Link>.
        </p>
      </article>
    </main>
  );
}
