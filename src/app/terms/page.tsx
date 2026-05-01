import type { Metadata } from "next";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms and disclaimer — IntoBadminton",
  description: "Terms, affiliate disclosure, and equipment advice disclaimer.",
  alternates: { canonical: "/terms/" },
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
        <p>
          IntoBadminton is operated by {companyInfo.operatorLegalName}, a
          company registered in {companyInfo.registrationJurisdiction}. Contact{" "}
          <a
            href={`mailto:${companyInfo.contactEmail}`}
            className="text-[var(--color-accent)] underline"
          >
            {companyInfo.contactEmail}
          </a>{" "}
          for support, product data corrections, privacy questions, source-rights
          issues, or review-removal requests.
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
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Review and community evidence
        </h2>
        <p>
          Third-party reviews and forum posts are treated as source references.
          IntoBadminton does not grant rights to reuse those third-party
          materials, and it should not copy, translate, or republish protected
          review text without permission.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Responsible engagement
        </h2>
        <p>
          The site may recommend guides, comparisons, and saved-history prompts,
          but it should not use deceptive urgency, hidden paid placement,
          forced consent, or mechanics designed to exploit compulsive use.
        </p>
      </article>
    </main>
  );
}
