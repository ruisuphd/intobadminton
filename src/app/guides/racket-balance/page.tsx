import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Racket balance and flex — IntoBadminton",
  description: "How head weight and shaft stiffness interact in play.",
};

export default function RacketBalanceGuide() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5">
        <p>
          <Link
            href="/guides/"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Guides
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Racket balance and flex
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Head-heavier setups often load power for smashes; head-light
          builds usually recover faster in defense. “Even” is the neutral
          compromise many doubles specialists prefer for flat exchanges.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-[var(--surface)] dark:border-zinc-700">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="border-b border-zinc-200 text-[var(--text)] dark:border-zinc-700">
              <tr>
                <th className="p-4">Spec signal</th>
                <th className="p-4">Usually helps</th>
                <th className="p-4">Watch out for</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-muted)]">
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="p-4 font-medium text-[var(--text)]">Head-heavy</td>
                <td className="p-4">Rear-court pressure, steep smashes, singles attack</td>
                <td className="p-4">Late defense, fast doubles blocks, shoulder fatigue</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="p-4 font-medium text-[var(--text)]">Head-light</td>
                <td className="p-4">Drive exchanges, front-court interception, defense</td>
                <td className="p-4">Players who need the racket to help load power</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--text)]">Extra-stiff</td>
                <td className="p-4">Clean, repeatable timing and direct feedback</td>
                <td className="p-4">Developing technique or joint comfort flags</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">Flex</h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Stiff shafts demand cleaner timing. Extra-stiff, head-heavy, high
          tension, and 3U can stack into a very small timing window. If you are
          building technique, a touch more flex can be kinder to learning.
        </p>
        <AdSlot id="guide-racket-balance-mid" />
        <p className="text-[var(--color-muted)] leading-relaxed">
          IntoBadminton’s finder treats official balance and shaft listings as
          the source of truth, then uses editor notes and rights-safe review
          summaries to explain how those specs tend to feel. When a product
          still needs verification, the result can appear, but confidence is
          lowered until the official page-level source is checked.
        </p>
      </article>
    </main>
  );
}
