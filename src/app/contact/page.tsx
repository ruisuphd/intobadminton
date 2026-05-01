import type { Metadata } from "next";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact — IntoBadminton",
  description: "Contact IntoBadminton.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-2xl space-y-4 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">Contact</h1>
        <p>
          IntoBadminton is operated by {companyInfo.operatorLegalName}, a
          Singapore-registered company. The site is an independent badminton
          equipment research and recommendation project.
        </p>
        <p>
          Support email:{" "}
          <a
            href={`mailto:${companyInfo.supportEmail}`}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.supportEmail}
          </a>
        </p>
        <p>
          Product data corrections, source-rights questions, and review removal
          requests should be sent to the same address until a dedicated support
          workflow exists.
        </p>
        <p>
          Privacy/DPO contact:{" "}
          <a
            href={`mailto:${companyInfo.privacyEmail}`}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.privacyEmail}
          </a>
          .
        </p>
        <p>
          Operator website:{" "}
          <a
            href={companyInfo.operatorWebsite}
            className="font-medium text-[var(--color-accent)] underline"
          >
            {companyInfo.operatorWebsite}
          </a>
        </p>
      </div>
    </main>
  );
}
