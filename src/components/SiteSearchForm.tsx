"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useId } from "react";

export function SiteSearchForm({
  defaultQuery = "",
  compact = false,
}: {
  defaultQuery?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const inputId = useId();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = String(data.get("q") ?? "").trim();
    if (!q) {
      router.push("/search/");
      return;
    }
    router.push(`/search/?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={compact ? "flex w-full max-w-xs items-center gap-2" : "flex w-full max-w-xl items-stretch gap-2"}
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
