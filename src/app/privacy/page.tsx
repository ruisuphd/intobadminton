import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — IntoBadminton",
  description: "Privacy policy for IntoBadminton.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-6 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Privacy policy
        </h1>
        <p>
          IntoBadminton is operated by the company entity shown on the Contact
          page. Before production, replace the placeholders with your legal
          company name, registered address, support email, and DPO/privacy
          contact. This template is not legal advice.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Data we process
        </h2>
        <p>
          The current static app stores quiz profiles, compare choices,
          shortlist history, consent choices, theme preferences, and review
          drafts in your browser’s <code>localStorage</code>. Optional GA4 and
          AdSense scripts load only after the relevant consent category is
          granted.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Purposes
        </h2>
        <p>
          We use local data to run the finder, compare products, remember
          preferences, and allow users to draft reviews. With consent, analytics
          helps improve the product and advertising supports the site.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Reviews and source data
        </h2>
        <p>
          We do not sell raw personal review submissions. User-submitted reviews
          require consent and moderation before any public display or
          recommendation use. Third-party forum/review evidence is governed by
          the source-rights policy; permission-gated sources are not bulk copied
          or trained on without rights.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Your rights and choices
        </h2>
        <p>
          You can reopen cookie settings from the footer, reject non-essential
          tracking, export or delete local review drafts, and contact the
          company for privacy questions. Where GDPR/UK GDPR, PDPA, CCPA/CPRA, or
          similar laws apply, users may have rights to access, correct, delete,
          object, withdraw consent, or opt out of sale/share.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Children and minors
        </h2>
        <p>
          IntoBadminton is not directed to children under 13. Users under 16
          should not submit reviews or personal information without parental or
          guardian consent.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          International transfers and vendors
        </h2>
        <p>
          Optional vendors include Google Analytics and Google AdSense. If a
          backend is enabled later, update this policy with hosting, database,
          transfer, retention, and subprocessors. For EEA/UK/Switzerland
          personalized ads, use a Google-certified CMP integrated with IAB TCF.
        </p>
        <p className="text-sm">Last reviewed: 2026-04-27.</p>
      </article>
    </main>
  );
}
