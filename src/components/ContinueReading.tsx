"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { productDisplayName } from "@/lib/product-display-names";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

const LAST_ARTICLE_KEY = "intobadminton.last-article.v1";

export type LastArticleView = {
  href: string;
  title: string;
  viewedAt: string;
};

export function recordLastArticleView(view: LastArticleView) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LAST_ARTICLE_KEY, JSON.stringify(view));
  } catch {
    /* ignore */
  }
}

function loadLastArticle(): LastArticleView | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_ARTICLE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LastArticleView;
    if (
      typeof parsed.href === "string" &&
      typeof parsed.title === "string" &&
      typeof parsed.viewedAt === "string"
    ) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Surfaces return-visit hooks on the homepage: last-read article and the
 * most recent finder shortlist. Stored locally; nothing leaves the device.
 */
export function ContinueReading({ locale }: { locale: SiteLocale }) {
  const { history } = useProfile();
  const [lastArticle, setLastArticle] = useState<LastArticleView | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- single-shot hydration */
    setLastArticle(loadLastArticle());
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const latestShortlist = history[0];
  const hasShortlist = latestShortlist != null && latestShortlist.topIds.length > 0;
  const hasArticle = lastArticle != null;

  if (!hydrated || (!hasShortlist && !hasArticle)) return null;

  const localized = (path: string) => buildLocalizedPath(locale, path);

  return (
    <section className="border-t border-[color:var(--line)] py-16 lg:py-20">
      <div className="layout-band max-w-6xl">
        <h2 className="text-headline text-[var(--text)]">Continue where you left off</h2>
        <p className="mt-3 text-base text-[var(--color-muted)]">
          Picked up on this device only — clear browser storage to reset.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {hasArticle && lastArticle && (
            <Link
              href={localized(lastArticle.href)}
              className="card card-interactive block p-6"
            >
              <span className="chip chip-secondary">Last read</span>
              <p className="mt-3 text-lg font-semibold text-[var(--text)]">
                {lastArticle.title}
              </p>
              <p className="mt-2 text-xs text-[var(--color-subtle)]">
                Opened{" "}
                <time dateTime={lastArticle.viewedAt}>
                  {new Date(lastArticle.viewedAt).toLocaleString()}
                </time>
              </p>
            </Link>
          )}
          {hasShortlist && latestShortlist && (
            <div className="card p-6">
              <span className="chip chip-secondary">Latest shortlist</span>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                {new Date(latestShortlist.at).toLocaleString()}
              </p>
              <ul className="mt-3 space-y-1 text-sm font-medium text-[var(--text)]">
                {latestShortlist.topIds.slice(0, 3).map((id) => (
                  <li key={id}>{productDisplayName(id) ?? id}</li>
                ))}
              </ul>
              <Link
                href={localized("/results/")}
                className="mt-4 inline-block text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                View results →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
