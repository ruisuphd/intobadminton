import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Source and copyright policy — IntoBadminton",
  description:
    "How IntoBadminton handles Reddit, BadmintonCN, forum, and review evidence.",
};

export default function SourcePolicyPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Source and copyright policy
        </h1>
        <p>
          IntoBadminton uses official product specs first. Third-party reviews
          and forum discussions are treated as permission-gated evidence, not as
          content to bulk copy or republish.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Reddit and forums
        </h2>
        <p>
          Reddit, BadmintonCN, BadmintonCentral, blogs, and retailers each have
          their own rights and terms. We do not train models on or republish
          user-generated content from those sources without appropriate rights.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Evidence model
        </h2>
        <p>
          The planned ingestion pipeline stores source URLs, language, product
          matches, timestamps, hashes, themes, confidence, and human-reviewed
          summaries. It avoids full copied third-party posts unless expressly
          permitted.
        </p>
      </article>
    </main>
  );
}
