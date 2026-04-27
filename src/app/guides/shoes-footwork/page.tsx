import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoes and footwork — IntoBadminton",
  description: "Cushioning, fit, and indoor court shoes for badminton players.",
};

export default function ShoesGuide() {
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
          Shoes and footwork
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Badminton happens in sharp lateral bursts. Look for a stable heel
          cup, enough toe room, and a sole pattern for indoor wood or
          mat—running shoes and outdoor tread are poor substitutes.
        </p>
        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Width and comfort
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          A shoe that is too narrow will drive compensation in your knees and
          ankles. If you have a history of plantar or patellar issues, favor
          honest cushioning and a fit check over marginal weight savings. This
          site does not provide medical advice—see a clinician for persistent
          pain.
        </p>
      </article>
    </main>
  );
}
