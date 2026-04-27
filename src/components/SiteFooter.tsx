import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 py-12 dark:border-zinc-700/80">
      <div className="layout-band max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="font-semibold text-[var(--text)]">IntoBadminton</p>
            <p className="mt-2 max-w-sm text-sm text-[var(--color-muted)]">
              Curated equipment suggestions for badminton players. Not medical
              advice; always try before you buy when possible.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link
              href="/about/"
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              About
            </Link>
            <Link
              href="/contact/"
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              Contact
            </Link>
            <Link
              href="/privacy/"
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              Privacy
            </Link>
          </div>
        </div>
        <p className="mt-10 text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} IntoBadminton. Equipment is personal;
          results are informational.
        </p>
      </div>
    </footer>
  );
}
