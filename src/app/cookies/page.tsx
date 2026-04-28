import type { Metadata } from "next";
import { consentAuditSummary } from "@/lib/consent";

export const metadata: Metadata = {
  title: "Cookie policy — IntoBadminton",
  description: "Cookie and local storage categories used by IntoBadminton.",
};

export default function CookiesPage() {
  const rows = consentAuditSummary();

  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Cookie policy
        </h1>
        <p>
          We use a strict global baseline: non-essential analytics and
          advertising storage are off until you choose otherwise.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-[var(--surface)]">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="border-b border-zinc-200 text-[var(--text)]">
              <tr>
                <th className="p-4">Category</th>
                <th className="p-4">Default</th>
                <th className="p-4">Storage/access</th>
                <th className="p-4">Third parties</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.category}
                  className="border-b border-zinc-100 last:border-0"
                >
                  <td className="p-4 font-medium text-[var(--text)]">
                    {row.category}
                  </td>
                  <td className="p-4">{row.defaultState}</td>
                  <td className="p-4">{row.storage}</td>
                  <td className="p-4">{row.thirdParties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Necessary local storage
        </h2>
        <p>
          Used for quiz profile, compare list, recent shortlists, theme, consent
          preferences, and local review drafts. These features do not require
          third-party scripts.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">Analytics</h2>
        <p>
          If enabled, Google Analytics 4 measures usage and Web Vitals to
          improve the site. Analytics can be disabled from Cookie settings.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">Advertising</h2>
        <p>
          If enabled and configured, Google AdSense may load ads and ad
          measurement. Personalized ads in EEA/UK/Switzerland require a
          Google-certified CMP integrated with IAB TCF before production.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Withdrawal
        </h2>
        <p>
          You can reopen Cookie settings from the footer at any time and reject
          non-essential storage. Rejecting does not delete local finder data; use
          browser storage controls or the review export/delete tools for local
          drafts.
        </p>
      </article>
    </main>
  );
}
