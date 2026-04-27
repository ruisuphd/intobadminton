import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — IntoBadminton",
  description: "Contact IntoBadminton.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-2xl space-y-4 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">Contact</h1>
        <p>
          Add your company support email and social links here. For launch,
          replace this placeholder with real contact details in your production
          deployment.
        </p>
      </div>
    </main>
  );
}
