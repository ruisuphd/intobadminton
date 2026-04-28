import Link from "next/link";
import { ThemeToggle } from "@/context/ThemeContext";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[var(--background)]/90 backdrop-blur-md dark:border-zinc-700/80">
      <div className="layout-band flex h-16 max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--text)]"
        >
          IntoBadminton
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/quiz/"
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            Finder
          </Link>
          <Link
            href="/guides/"
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            Guides
          </Link>
          <Link
            href="/compare/"
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            Compare
          </Link>
          <Link
            href="/review/"
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            Review
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
