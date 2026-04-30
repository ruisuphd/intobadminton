import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-white/85 backdrop-blur-md">
      <div className="layout-band flex h-16 max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-[var(--text)]"
        >
          IntoBadminton
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/quiz/"
            className="text-[var(--color-muted)] transition-colors hover:text-[var(--text)]"
          >
            Finder
          </Link>
          <Link
            href="/blog/"
            className="hidden text-[var(--color-muted)] transition-colors hover:text-[var(--text)] sm:inline-flex"
          >
            Blog
          </Link>
          <Link
            href="/brands/"
            className="hidden text-[var(--color-muted)] transition-colors hover:text-[var(--text)] sm:inline-flex"
          >
            Brands
          </Link>
          <Link
            href="/compare/"
            className="hidden text-[var(--color-muted)] transition-colors hover:text-[var(--text)] sm:inline-flex"
          >
            Compare
          </Link>
        </nav>
      </div>
    </header>
  );
}
