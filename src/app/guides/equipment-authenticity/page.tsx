import Link from "next/link";
import type { Metadata } from "next";
import {
  authenticityBrands,
  authenticityGuide,
} from "@/lib/authenticity";

export const metadata: Metadata = {
  title: "Badminton equipment authenticity checks — IntoBadminton",
  description:
    "Official-source guidance for checking Yonex, VICTOR, and Li-Ning badminton equipment authenticity without treating IntoBadminton as a certifier.",
  alternates: { canonical: "/guides/equipment-authenticity/" },
};

export default function EquipmentAuthenticityGuide() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-5xl">
        <nav className="text-sm text-[var(--color-muted)]">
          <Link href="/guides/" className="hover:text-[var(--text)]">
            Guides
          </Link>
          <span className="px-2">/</span>
          <span className="text-[var(--text)]">Authenticity checks</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <span className="chip">Buyer protection</span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
            {authenticityGuide.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
            {authenticityGuide.dek}
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--surface-muted)] p-5">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            What this page can and cannot do
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {authenticityGuide.disclaimer}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {authenticityGuide.buyerRule}
          </p>
        </section>

        <div className="mt-10 grid gap-5">
          {authenticityBrands.map((brand) => (
            <article
              key={brand.name}
              className="rounded-2xl border border-[color:var(--line)] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
                    {brand.checkLabel}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)]">
                    {brand.name}
                  </h2>
                </div>
                <Link
                  href={brand.officialSourceUrl}
                  className="text-sm font-medium text-[var(--color-accent)] underline"
                >
                  Official source
                </Link>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[var(--color-muted)]">
                Source: {brand.officialSourceName},{" "}
                <cite>{brand.officialSourceTitle}</cite>, accessed{" "}
                {brand.accessedAt}. Official wording: “{brand.officialQuote}”.
              </p>

              <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {brand.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <p className="mt-5 rounded-xl bg-[color:var(--surface-muted)] p-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {brand.limitation}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-12 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--color-muted)]">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Practical buyer checklist
          </h2>
          <p>
            Before buying, ask for clear photos of the shaft, cone, QR or
            anti-counterfeit label, receipt, store name, and original packaging.
            Compare the seller&apos;s claimed region with the code or warranty
            details where the brand publishes that guidance.
          </p>
          <p>
            After buying, keep all evidence until you have played and inspected
            the product. If the code result, shaft number, hologram, packaging,
            weight, or feel looks inconsistent, stop resale plans and contact
            the seller, local distributor, or brand support.
          </p>
        </section>
      </div>
    </main>
  );
}
