import type { Metadata } from "next";
import Link from "next/link";
import { QuizFunnel } from "./QuizFunnel";

export const metadata: Metadata = {
  title: "Badminton Equipment Finder — Personalised Picks",
  description:
    "Answer five questions about your level, style, body, and budget. Get racket, string, shoe, and bag picks with transparent fit scoring. No signup.",
  keywords: [
    "badminton equipment finder",
    "badminton racket finder",
    "personalized badminton recommendation",
    "badminton gear quiz",
    "which badminton racket",
    "racket selector",
    "shoe fit quiz",
    "string recommendation",
  ],
  alternates: { canonical: "/quiz/" },
};

export function QuizShell() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <header className="max-w-3xl">
          <span className="chip">Badminton equipment finder · 5 minutes · No signup</span>
          <h1 className="text-display mt-5 text-[var(--text)]">
            Find the badminton equipment that fits how you actually play
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
            The IntoBadminton finder is a guided quiz that asks about your
            level, playing role, swing style, body, and budget, then ranks
            rackets, strings, shoes, bags, shuttles, and grips against your
            specific profile. Every result breaks down into five named factors
            — style fit, discipline fit, level fit, budget fit, and body or
            comfort fit — so you can see exactly why each pick is suggested.
            The whole quiz takes about five minutes, your answers stay on your
            device, and there is no email gate, no account, and no paywall.
          </p>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Skill and role",
              body: "Beginner to advanced, singles or doubles, front-court or rear-court — these set the baseline weight, balance, and shaft profile we recommend.",
            },
            {
              title: "Swing and timing",
              body: "Smash-heavy, fast-flat, control-first, or all-court? We use this to bias toward head-heavy power frames or head-light defensive frames.",
            },
            {
              title: "Body and budget",
              body: "Wrist comfort, grip size, foot width, and what you actually want to spend — used to filter out gear that will hurt or break the bank.",
            },
          ].map((row) => (
            <div key={row.title} className="card p-5">
              <p className="text-sm font-semibold text-[var(--text)]">
                {row.title}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
                {row.body}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-12">
          <QuizFunnel />
        </div>

        <section className="mt-16 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--color-muted)]">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            How the recommendations are scored
          </h2>
          <p>
            Product-specific official pages are treated as the strongest spec
            source. Editor interpretation and community references can explain
            how a product may feel on court, but they are labelled separately
            from manufacturer verification. Confidence labels show what is
            verified and what still needs cross-checking, so you can judge how
            strong each recommendation actually is.
          </p>
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Privacy and data
          </h2>
          <p>
            Quiz answers are saved in your browser&apos;s local storage so you
            can resume later or rerun results from a different angle. Nothing
            is sent to a server unless you explicitly opt in to analytics from
            the cookie banner. You can clear your finder profile from the
            footer Cookie settings link or by clearing site data in your
            browser. See our{" "}
            <Link
              href="/privacy/"
              className="text-[var(--color-accent)] underline"
            >
              Privacy Policy
            </Link>{" "}
            for full details.
          </p>
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Prefer to read first?
          </h2>
          <p>
            If you want a sense of the catalogue before answering, browse the
            curated{" "}
            <Link
              href="/best/beginner-rackets/"
              className="text-[var(--color-accent)] underline"
            >
              best beginner rackets
            </Link>
            ,{" "}
            <Link
              href="/best/intermediate-rackets/"
              className="text-[var(--color-accent)] underline"
            >
              intermediate rackets
            </Link>
            ,{" "}
            <Link
              href="/best/doubles-rackets/"
              className="text-[var(--color-accent)] underline"
            >
              doubles rackets
            </Link>
            , or{" "}
            <Link
              href="/best/smash-heavy-rackets/"
              className="text-[var(--color-accent)] underline"
            >
              smash-heavy rackets
            </Link>{" "}
            lists, or read full deep-dives on the{" "}
            <Link href="/blog/" className="text-[var(--color-accent)] underline">
              blog
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

export default function QuizPage() {
  return <QuizShell />;
}
