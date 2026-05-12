import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Source and copyright policy",
  description:
    "How IntoBadminton handles Reddit, BadmintonCN, forum, and review evidence.",
  alternates: { canonical: "/source-policy/" },
};

export default function SourcePolicyPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Source and copyright policy
        </h1>
        <p>
          IntoBadminton treats a product-specific official page as the strongest
          source for product specs. Third-party reviews, retailer listings, and
          forum discussions are labelled separately and are not presented as
          manufacturer verification.
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
          BadmintonCN search references
        </h2>
        <p>
          BadmintonCN is valuable for Chinese-language equipment sentiment. Our
          safe starting point is source discovery through search-visible
          metadata: source name, link, language, theme summary, and confidence.
          We do not bypass verification prompts, log in with automated tools,
          or display copied review excerpts.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Evidence model
        </h2>
        <p>
          The planned ingestion pipeline stores source URLs, language, product
          matches, timestamps, hashes, themes, confidence, and human-reviewed
          summaries. It avoids copied third-party posts unless expressly
          permitted, and any row without an official product-page source is
          marked for review.
        </p>
      </article>
    </main>
  );
}
