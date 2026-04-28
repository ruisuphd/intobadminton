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
          IntoBadminton should be operated under the company entity that
          receives advertising or affiliate income. Before launch, replace this
          section with the company legal name, registration number if
          applicable, business address or service address, and support email.
        </p>
        <p>
          Support email: <strong className="text-[var(--text)]">support@YOUR_DOMAIN</strong>
        </p>
        <p>
          Product data corrections, source-rights questions, and review removal
          requests should be sent to the same address until a dedicated support
          workflow exists.
        </p>
        <p>
          Privacy/DPO contact:{" "}
          <strong className="text-[var(--text)]">privacy@YOUR_DOMAIN</strong>.
          Replace before launch with the appointed company privacy contact.
        </p>
      </div>
    </main>
  );
}
