import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "String tension basics — IntoBadminton",
  description:
    "How badminton string tension changes feel, power, and control — practical overview.",
};

export default function StringTensionGuide() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-2xl space-y-4 text-[var(--text)]">
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
      </article>
    </main>
  );
}
