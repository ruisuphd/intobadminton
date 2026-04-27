import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — IntoBadminton",
  description: "Why we built IntoBadminton and how to use the finder.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-2xl space-y-4 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">About</h1>
        <p>
          IntoBadminton helps players shortlist equipment with explainable
          scores—starting with rackets. We combine structured product data and
          editorial notes, and we are explicit about what is a manufacturer
          line vs community signal vs our own summary.
        </p>
        <p>
          Revenue may come from display advertising and, when disclosed,
          affiliate links. Suggestions are informational; always verify specs
          on official sites and try gear in person when you can.
        </p>
      </div>
    </main>
  );
}
