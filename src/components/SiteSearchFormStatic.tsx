/**
 * Server-rendered site search — no client JS. Used on the homepage hero to
 * keep Lighthouse performance within budget; interactive variant lives in
 * {@link SiteSearchForm}.
 */
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function SiteSearchFormStatic({
  defaultQuery = "",
  compact = false,
}: {
  defaultQuery?: string;
  compact?: boolean;
}) {
  const inputId = compact ? "site-search-compact" : "site-search-hero";

  const inputClass = compact
    ? "h-9 min-w-0 flex-1 rounded-full border border-[color:var(--line-strong)] bg-white px-3 text-sm text-[var(--text)] placeholder:text-[var(--color-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    : "h-12 min-w-0 flex-1 rounded-2xl border border-[color:var(--line-strong)] bg-white px-4 text-base text-[var(--text)] placeholder:text-[var(--color-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";

  const primaryBtnClass = compact
    ? "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
    : "inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)] px-5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2";

  // Hidden below `sm`. At 375px an input + Search + Catalog left the field
  // about 130px wide, clipping its own placeholder to "Search rack". Catalog is
  // already one tap away in the header nav, so the phone gets the field and one
  // action; wider screens keep both.
  const secondaryBtnClass =
    "hidden sm:inline-flex h-12 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--line-strong)] bg-white px-4 text-sm font-medium text-[var(--text)] hover:bg-[color:var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2";

  return (
    <form
      role="search"
      action="/search/"
      method="get"
      className={
        compact
          ? "flex w-full max-w-md items-center gap-1.5"
          : "flex w-full max-w-xl items-stretch gap-2"
      }
    >
      <label htmlFor={inputId} className="sr-only">
        Search reviews, products, and guides
      </label>
      <input
        id={inputId}
        name="q"
        type="search"
        defaultValue={defaultQuery}
        placeholder={compact ? "Search rackets…" : "Search rackets, reviews…"}
        autoComplete="off"
        className={inputClass}
      />
      <button
        type="submit"
        className={primaryBtnClass}
        aria-label={compact ? "Search" : undefined}
      >
        {compact ? <SearchIcon /> : "Search"}
      </button>
      {!compact && (
        <button
          type="submit"
          formAction="/catalog/"
          formMethod="get"
          className={secondaryBtnClass}
          title="Browse matching products in the catalog"
        >
          Catalog
        </button>
      )}
    </form>
  );
}
