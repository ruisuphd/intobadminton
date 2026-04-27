import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — IntoBadminton",
  description: "Privacy policy for IntoBadminton.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-2xl space-y-4 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Privacy policy
        </h1>
        <p>
          <strong className="text-[var(--text)]">Placeholder.</strong> Replace
          with counsel-reviewed text before production. Summarize: what you
          collect (e.g. local profile data, optional analytics, ad cookies with
          consent), retention, third parties (Google AdSense, hosting), and
          contact for data requests. If you process EU/UK traffic, address the
          lawful basis and consent banner requirements your lawyer recommends.
        </p>
        <p>
          This MVP stores quiz profiles in <code>localStorage</code> on your
          device only unless you add accounts or a backend later.
        </p>
      </div>
    </main>
  );
}
