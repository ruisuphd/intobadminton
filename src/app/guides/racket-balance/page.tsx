import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Racket balance and flex — IntoBadminton",
  description: "How head weight and shaft stiffness interact in play.",
};

export default function RacketBalanceGuide() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-2xl space-y-4">
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
        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">Flex</h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Stiff shafts demand cleaner timing. Extra-stiff, head-heavy, high
          tension, and 3U can stack into a very small timing window. If you are
          building technique, a touch more flex can be kinder to learning.
        </p>
      </article>
    </main>
  );
}
