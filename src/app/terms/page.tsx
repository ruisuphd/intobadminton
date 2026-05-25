import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service and Conditions of Use for IntoBadminton: affiliate disclosure, equipment advice disclaimer, content rights, and acceptable use.",
  alternates: pageAlternates("/terms/"),
};

export default function TermsPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Terms of Service
        </h1>
        <p className="text-sm uppercase tracking-wide text-[var(--color-subtle)]">
          Terms &amp; Conditions · Last updated 6 May 2026
        </p>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of IntoBadminton (the &quot;Site&quot;) at intobadminton.com. By
          using the Site, you agree to these Terms. If you do not agree, please
          do not use the Site. IntoBadminton is operated by{" "}
          {companyInfo.operatorLegalName}, a company registered in{" "}
          {companyInfo.registrationJurisdiction}. For questions about these
          Terms, contact us at{" "}
          <a
            href={`mailto:${companyInfo.contactEmail}`}
            className="text-[var(--color-accent)] underline"
          >
            {companyInfo.contactEmail}
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          1. Use of the Site
        </h2>
        <p>
          IntoBadminton provides informational badminton equipment suggestions
          for personal, non-commercial use. The finder, blog articles, guides,
          comparisons, and brand pages are provided &quot;as is&quot; for
          general information only. We do not guarantee accuracy, completeness,
          uptime, or fitness for any particular purpose. Nothing on the Site
          constitutes medical advice, professional coaching, or a substitute
          for testing equipment in person. You agree to use the Site lawfully
          and not to scrape, mirror, or systematically extract content without
          our written permission.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          2. Equipment recommendations and disclaimer
        </h2>
        <p>
          Equipment recommendations are opinions formed from manufacturer
          specifications, on-court testing, and cited third-party community
          evidence. Skill level, body, technique, and personal preference vary,
          so your experience may differ from any prediction the finder makes.
          You are responsible for your own purchasing decisions. Verify
          official specifications, current pricing, warranty, and availability
          with the manufacturer or seller before buying.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          3. Health, injury, and safety
        </h2>
        <p>
          Joint, foot, and comfort flags in the finder are used only to avoid
          suggesting overly harsh equipment. They are not a medical assessment.
          If you have persistent pain, instability, or any concern about your
          ability to play safely, consult a qualified medical professional or
          coach before continuing to play or buying new gear.
        </p>

        <h2 id="affiliate" className="text-xl font-semibold text-[var(--text)]">
          4. Affiliate, advertising, and editorial integrity
        </h2>
        <p>
          IntoBadminton may earn commissions through affiliate links and may
          serve advertisements through Google AdSense or other ad partners.
          Affiliate outbound links carry a visible{" "}
          <span className="font-mono">Aff</span> chip in the page body and
          the standard <span className="font-mono">rel=&quot;sponsored&quot;</span> link
          relationship. The same disclosure is repeated in the site footer of
          every page. Advertising is clearly labelled and must never silently
          change the fit-score order. Sponsored content, paid placements, or
          affiliate relationships are disclosed where they apply. The Site may
          recommend guides, comparisons, and saved-history prompts, but it
          must not use deceptive urgency, hidden paid placement, forced
          consent, or mechanics designed to exploit compulsive use.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          5. Intellectual property and third-party content
        </h2>
        <p>
          All original text, scoring methodology, layouts, graphics, and code
          on IntoBadminton are owned by {companyInfo.operatorLegalName} or its
          licensors and are protected by copyright and other intellectual
          property laws. Brand names, product names, and trademarks are the
          property of their respective owners and are referenced for
          identification only. Third-party reviews, forum posts, and video
          content are cited by link as source references. IntoBadminton does
          not grant any rights to reuse those third-party materials, and we
          do not copy, translate, or republish protected review text without
          permission.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          6. User content and conduct
        </h2>
        <p>
          If you submit feedback, corrections, review notes, or any other
          content, you grant IntoBadminton a non-exclusive, royalty-free
          licence to use it to operate and improve the Site. You confirm the
          content is yours to share and is lawful. We may remove or refuse
          content that is unlawful, infringing, abusive, deceptive, or that
          violates these Terms.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          7. Third-party links and services
        </h2>
        <p>
          The Site links to manufacturer pages, retailers, and community
          discussions. We are not responsible for the content, terms, privacy
          practices, or availability of any third-party site or service.
          Following an external link is at your own risk.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          8. Disclaimer of warranties
        </h2>
        <p>
          The Site is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis without warranties of any kind, whether
          express, implied, or statutory, including warranties of
          merchantability, fitness for a particular purpose, accuracy, or
          non-infringement. We do not warrant that the Site will be
          uninterrupted, error-free, secure, or free from harmful components.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          9. Limitation of liability
        </h2>
        <p>
          To the maximum extent permitted by law, IntoBadminton, its operator,
          and its contributors are not liable for any indirect, incidental,
          special, consequential, or punitive damages, or any loss of profits,
          revenue, data, or goodwill arising out of or relating to your use of
          the Site or any equipment purchased based on Site content.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          10. Changes to these Terms
        </h2>
        <p>
          We may update these Terms from time to time. The &quot;Last
          updated&quot; date at the top reflects the current version.
          Continued use of the Site after changes are posted means you accept
          the updated Terms.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          11. Governing law
        </h2>
        <p>
          These Terms are governed by the laws of{" "}
          {companyInfo.registrationJurisdiction}, without regard to conflict of
          laws principles. Any dispute arising from these Terms or the Site
          will be resolved in the competent courts of that jurisdiction,
          subject to any mandatory consumer protections in your country of
          residence.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          12. Contact
        </h2>
        <p>
          Questions about these Terms, content corrections, source-rights
          issues, or review-removal requests can be sent to{" "}
          <a
            href={`mailto:${companyInfo.contactEmail}`}
            className="text-[var(--color-accent)] underline"
          >
            {companyInfo.contactEmail}
          </a>
          . For privacy questions, see our{" "}
          <a href="/privacy/" className="text-[var(--color-accent)] underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/cookies/" className="text-[var(--color-accent)] underline">
            Cookie Policy
          </a>
          .
        </p>
      </article>
    </main>
  );
}
