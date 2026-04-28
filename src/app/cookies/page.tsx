import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie policy — IntoBadminton",
  description: "Cookie and local storage categories used by IntoBadminton.",
};

export default function CookiesPage() {
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
      </article>
    </main>
  );
}
