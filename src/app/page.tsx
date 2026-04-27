import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ShuttleMotif } from "@/components/ShuttleMotif";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="border-b border-zinc-200/80 py-20 dark:border-zinc-700/80">
        <div className="layout-band max-w-6xl">
          <div className="max-w-2xl">
            <ShuttleMotif className="mb-4 h-12 w-48" />
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
              Equipment that fits how you play.
            </h1>
            <p className="mt-5 text-lg text-[var(--color-muted)]">
              Tell us your level, discipline, and style — we rank rackets with
              transparent, tunable scores. Built for badminton players who want
              signal, not noise.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/quiz/"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-[var(--color-accent)] px-8 text-sm font-medium text-white transition hover:opacity-90"
              >
                Start finder
              </Link>
              <Link
                href="/guides/"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-zinc-300 px-8 text-sm dark:border-zinc-600"
              >
                Read guides
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="layout-band max-w-6xl py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Transparent scores",
              d: "Subscores for style, level, and budget so you can see the “why.”",
            },
            {
              t: "Discipline-aware",
              d: "Singles, doubles, and mixed shape how we weight maneuverability.",
            },
            {
              t: "Your data, locally first",
              d: "Profiles and history can stay on device until you add an account later.",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-zinc-200/90 bg-[var(--surface)] p-6 dark:border-zinc-700/90"
            >
              <h2 className="font-semibold text-[var(--text)]">{x.t}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{x.d}</p>
            </div>
          ))}
        </div>
        <AdSlot id="home-mid" />
      </div>
    </main>
  );
}
