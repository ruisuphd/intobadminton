/**
 * Server-rendered site search — no client JS. Used on the homepage hero to
 * keep Lighthouse performance within budget; interactive variant lives in
 * {@link SiteSearchForm}.
 */
export function SiteSearchFormStatic({
  defaultQuery = "",
  compact = false,
}: {
  defaultQuery?: string;
  compact?: boolean;
}) {
  const inputId = compact ? "site-search-compact" : "site-search-hero";

  return (
    <form
      role="search"
      action="/search/"
      method="get"
      className={
        compact
          ? "flex w-full max-w-xs items-center gap-2"
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
        placeholder="Search rackets, reviews, guides…"
        autoComplete="off"
        className={
          compact
            ? "h-9 min-w-0 flex-1 rounded-full border border-[color:var(--line-strong)] bg-white px-3 text-sm text-[var(--text)] placeholder:text-[var(--color-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            : "h-12 min-w-0 flex-1 rounded-2xl border border-[color:var(--line-strong)] bg-white px-4 text-base text-[var(--text)] placeholder:text-[var(--color-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        }
      />
      <button
        type="submit"
        className={
          compact
            ? "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] px-4 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]"
            : "inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)] px-6 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]"
        }
      >
        Search
      </button>
    </form>
  );
}
