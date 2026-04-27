import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and disclaimer — IntoBadminton",
  description: "Terms, affiliate disclosure, and equipment advice disclaimer.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Terms and disclaimer
        </h1>
        <p>
          IntoBadminton provides informational equipment suggestions. It is not
          medical advice, professional coaching, or a substitute for testing
          equipment in person.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Recommendation integrity
        </h2>
        <p>
          Paid placement, affiliate relationships, or sponsored content must be
          clearly labelled and must not be silently blended into the fit score.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Health and injury flags
        </h2>
        <p>
          Joint, foot, and comfort flags are used only to avoid overly harsh
          equipment suggestions. Persistent pain should be assessed by a
          qualified medical professional.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Accuracy
        </h2>
        <p>
          Product specs, prices, and availability change. Verify official specs
          and seller information before buying.
        </p>
      </article>
    </main>
  );
}
