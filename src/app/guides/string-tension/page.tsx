import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "String tension basics — IntoBadminton",
  description:
    "How badminton string tension changes feel, power, and control — practical overview.",
};

export default function StringTensionGuide() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--text)]">
        <p>
          <Link
            href="/guides/"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Guides
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          String tension basics
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Higher tension often trades repulsion for sharper control; lower
          tension can feel livelier off the stringbed with a margin for
          off-center contact. The same tension can feel different across
          rackets, strings, and players—your timing matters as much as the
          number on the machine.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["18-22 lb", "Beginner / comfort", "Easy length and larger sweet spot."],
            ["23-26 lb", "Club all-round", "Sharper response without an extreme timing window."],
            ["27+ lb", "Advanced control", "Only useful when contact timing is repeatable."],
          ].map(([range, fit, note]) => (
            <div
              key={range}
              className="rounded-2xl border border-zinc-200 bg-[var(--surface)] p-4 dark:border-zinc-700"
            >
              <p className="font-semibold text-[var(--text)]">{range}</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{fit}</p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{note}</p>
            </div>
          ))}
        </div>
        <h2 className="pt-2 text-xl font-semibold">What to test</h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          If you are unsure, small steps (0.5–1 lb or ~0.5 kg blocks) between
          restrings are easier to interpret than big jumps. Log how your clears
          and net shots feel on week one versus week three as strings
          relax—especially with nylon vs multifilament vs BG-type blends.
        </p>
        <h2 className="pt-2 text-xl font-semibold">Disclaimer</h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          This is general education, not pro stringing advice for your
          specific frame or warranty. A certified stringer who inspects grommets
          and your racket model should have the last word.
        </p>
        <AdSlot id="guide-string-tension-mid" />
        <p className="text-[var(--color-muted)] leading-relaxed">
          The finder can use preferred tension later, but v1 keeps tension as
          advice rather than a hard filter because string gauge, shuttle speed,
          local machines, and climate all change feel.
        </p>
      </article>
    </main>
  );
}
