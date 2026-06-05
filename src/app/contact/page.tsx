import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact IntoBadminton. Reach the editorial, support, and privacy teams behind our badminton equipment recommendations.",
  alternates: pageAlternates("/contact/"),
};

export default function ContactPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Contact Us
        </h1>
        <p>
          Welcome to the IntoBadminton contact page. We are a small, player-led
          editorial team and we read every message. Whether you found a wrong
          spec, want to suggest a racket, string, shoe, or bag we should
          review, need help interpreting a finder result, or have a partnership
          question, please get in touch using the channels below. We aim to
          reply within three to five working days.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          About the operator
        </h2>
        <p>
          IntoBadminton is operated by {companyInfo.operatorLegalName}, an
          independent company registered in{" "}
          {companyInfo.registrationJurisdiction}. We are not affiliated with,
          sponsored by, or endorsed by Yonex, Victor, Li-Ning, or any other
          manufacturer mentioned on the Site. The operator&apos;s parent
          business website is available at{" "}
          <a
            href={companyInfo.operatorWebsite}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.operatorWebsite}
          </a>
          . The site is led by founder {companyInfo.founderName}, a competitive
          player whose full background is on the{" "}
          <a
            href="/about/"
            className="font-medium text-[var(--color-accent)] underline"
          >
            About Us
          </a>{" "}
          page.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          General support and editorial
        </h2>
        <p>
          For finder questions, product feedback, recommendations for new
          models we should test, factual corrections to specs, prices, or
          weights, and any other editorial topic, email{" "}
          <a
            href={`mailto:${companyInfo.supportEmail}`}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.supportEmail}
          </a>
          . The same address handles review-removal requests and source-rights
          questions about third-party material we reference.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Privacy and data protection
        </h2>
        <p>
          For privacy questions, data subject requests under GDPR or other
          applicable laws, or to update consent for analytics and advertising
          cookies, email{" "}
          <a
            href={`mailto:${companyInfo.privacyEmail}`}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.privacyEmail}
          </a>
          . You can also re-open the Cookie settings dialog from the link in
          the site footer at any time. See our{" "}
          <a
            href="/privacy/"
            className="font-medium text-[var(--color-accent)] underline"
          >
            Privacy Policy
          </a>{" "}
          for the full description of what we collect and how we use it.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Security disclosures
        </h2>
        <p>
          If you believe you have found a security vulnerability in
          IntoBadminton or any of our infrastructure, please report it
          responsibly to{" "}
          <a
            href={`mailto:${companyInfo.securityEmail}`}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.securityEmail}
          </a>
          . Do not exploit the issue, do not access data that is not yours,
          and please give us a reasonable time to investigate before public
          disclosure.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Press, partnerships, and brand contact
        </h2>
        <p>
          Manufacturers, retailers, coaches, clubs, and badminton media who
          would like to collaborate on reviews, supply samples for testing, or
          discuss editorial partnerships can write to{" "}
          <a
            href={`mailto:${companyInfo.contactEmail}`}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.contactEmail}
          </a>
          . All commercial relationships are disclosed and never change the
          fit-score order. Read our{" "}
          <a
            href="/terms/"
            className="font-medium text-[var(--color-accent)] underline"
          >
            Terms of Service
          </a>{" "}
          for the full editorial-integrity policy.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Postal address
        </h2>
        <p>
          Postal correspondence can be sent care of {companyInfo.operatorLegalName},{" "}
          {companyInfo.registrationJurisdiction}. For most enquiries email is
          considerably faster; please use postal mail only for legal notices
          that require it.
        </p>

        <section className="mt-16 rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Looking for equipment instead?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Browse the full catalog with filters for brand, weight, balance, and
            price — or run the finder for a personalised shortlist.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/catalog/" className="btn-primary">
              Browse full catalog
            </Link>
            <Link href="/quiz/" className="btn-secondary">
              Start the finder
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
