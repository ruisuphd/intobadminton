"use client";

import Link from "next/link";
import { OFFLINE_RECOVERY_LINKS } from "@/lib/offline-recovery-paths";

export default function OfflinePage() {
  return (
    <main className="flex-1 py-16 sm:py-20">
      <div className="layout-band max-w-6xl">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <div className="max-w-2xl">
            <span className="chip chip-secondary">Offline</span>
            <h1 className="text-headline mt-5 text-[var(--text)]">
              You&apos;re offline
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
              IntoBadminton can still open precached pages. Individual reviews
              and guides work only if you opened them while online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="btn-primary">
                Try home
              </Link>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-secondary"
              >
                Retry connection
              </button>
            </div>
          </div>

          <aside className="border-t border-[color:var(--line)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
              Cached pages
            </h2>
            <ul className="mt-4 space-y-4">
              {OFFLINE_RECOVERY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group block rounded-lg py-1 transition-colors"
                  >
                    <span className="font-medium text-[var(--text)] group-hover:text-[var(--color-accent)]">
                      {link.label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[var(--color-muted)]">
                      {link.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </div>
    </main>
  );
}
