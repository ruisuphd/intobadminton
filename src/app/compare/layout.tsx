import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Compare badminton gear",
  description:
    "Compare badminton rackets, strings, shoes, and bags side by side on the specs that matter — price, balance, flex, fit width, capacity, gauge.",
  alternates: pageAlternates("/compare/"),
  robots: { index: false, follow: true },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-[color:var(--line)] bg-[var(--surface)] py-16">
        <div className="layout-band max-w-3xl">
          <span className="eyebrow">Side-by-side comparison</span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
            Compare badminton equipment, spec for spec
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            The compare tool puts the badminton gear you have shortlisted next
            to each other on the specs that actually change how a racket,
            string, shoe, or bag performs on court. Add items to your compare
            list from any results screen, brand page, or &quot;best of&quot;
            shortlist, then return here for a side-by-side breakdown.
          </p>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
            For rackets we surface brand, category, balance in millimetres,
            shaft flex, weight class, available grip sizes, and our review
            confidence label. For strings we add gauge in millimetres so you
            can see how a 0.66 mm BG65 stacks up against a 0.65 mm Aerobite at
            the same tension. For shoes we show fit width, and for bags we
            show capacity in racket count plus shoe-compartment notes. Used
            resale price and approximate depreciation appear where we have
            verified market data, so the comparison reflects the real long-run
            cost rather than only the box price.
          </p>
        </div>
      </section>
      {children}
      <section className="border-t border-[color:var(--line)] py-16">
        <div className="layout-band max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--color-muted)]">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            How to use the badminton compare tool
          </h2>
          <p>
            From any results page, brand page, or curated &quot;best of&quot;
            shortlist on IntoBadminton, tap the compare button on a card to
            add it to your list. Two or three items is the sweet spot — beyond
            that the table starts to feel crowded and meaningful differences
            get lost. When you are done with a comparison, clear the list
            from the bottom of the table. The compare list lives in your
            browser&apos;s local storage, so it survives a page reload but
            stays private to your device.
          </p>
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Which specs matter most
          </h2>
          <p>
            For rackets, balance and flex carry more weight than total mass:
            two 4U frames at the same 88 g can feel completely different on
            a clear if one sits at 285 mm and the other at 295 mm. For
            strings, gauge interacts with tension — thinner gauges feel
            crisper but lose tension faster and break sooner. For shoes,
            fit width is the most under-tested spec in the industry; many
            standard-width models simply do not work for E or 2E feet. For
            bags, racket capacity is misleading without context: a thermal
            sleeve with a shoe compartment is a different animal from a
            no-frills 6-racket commute bag.
          </p>
          <h2 className="text-xl font-semibold text-[var(--text)]">
            About the &quot;confidence&quot; column
          </h2>
          <p>
            Each item has a confidence label that tells you how strong the
            evidence is behind our take. &quot;Verified&quot; means we have
            played with the product. &quot;Spec-checked&quot; means we have
            reconciled manufacturer data with at least two community
            references. &quot;Pending&quot; means we are still cross-checking.
            Read the full{" "}
            <a
              href="/methodology/"
              className="text-[var(--color-accent)] underline"
            >
              methodology
            </a>{" "}
            page for the rules behind each label.
          </p>
        </div>
      </section>
    </>
  );
}
