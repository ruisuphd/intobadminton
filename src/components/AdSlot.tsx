/**
 * Reserves a layout band for AdSense (plan §2.3.1). Replace the inner placeholder
 * with your ad unit after AdSense approval.
 */
export function AdSlot({
  id,
  label = "Ad",
  className = "",
}: {
  id: string;
  label?: string;
  className?: string;
}) {
  return (
    <aside
      className={`my-8 w-full rounded-2xl border border-dashed border-zinc-300 bg-[var(--surface)] p-6 text-center dark:border-zinc-600 ${className}`}
      data-ad-region={id}
    >
      <p className="text-xs font-medium tracking-wide text-[var(--color-muted)] uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Reserved for Google AdSense — slot <code className="text-xs">{id}</code>
      </p>
    </aside>
  );
}

export function AdSidebar() {
  return (
    <div className="hidden w-[300px] shrink-0 lg:block">
      <div className="sticky top-24">
        <AdSlot id="sidebar-lg" label="Sponsored" />
      </div>
    </div>
  );
}
