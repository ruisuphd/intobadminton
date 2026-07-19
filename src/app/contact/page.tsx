import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Email Rui at IntoBadminton — corrections, finder questions, sample reviews, or privacy requests.",
  alternates: pageAlternates("/contact/"),
};

export default function ContactPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">Contact</h1>
        <p>
          I read every message. Wrong spec, a racket I should try next, help
          reading a finder result, or a partnership note — email me using the
          channels below. I aim to reply within three to five working days.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          About the operator
        </h2>
        <p>
          IntoBadminton is operated by {companyInfo.operatorLegalName}, an
          independent company registered in{" "}
          {companyInfo.registrationJurisdiction}. It is not affiliated with,
          sponsored by, or endorsed by Yonex, Victor, Li-Ning, or any other
          manufacturer mentioned on the Site. The operator&apos;s parent
          business website is available at{" "}
          <a
            href={companyInfo.operatorWebsite}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.operatorWebsite}
          </a>
          . I run the site — {companyInfo.founderName} — and my full background
          is on the{" "}
          <a
            href="/about/"
            className="font-medium text-[var(--color-accent)] underline"
          >
            About
          </a>{" "}
          page.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Reviews, finder, and corrections
        </h2>
        <p>
          For finder questions, product feedback, models I should test, factual
          corrections to specs, prices, or weights, and anything else about the
          reviews or scoring, email{" "}
          <a
            href={`mailto:${companyInfo.supportEmail}`}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.supportEmail}
          </a>
          . The same address handles review-removal requests and source-rights
          questions about third-party material I reference.
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
          discuss coverage can write to{" "}
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
            price — or run the finder for a shortlist matched to how you play.
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
