"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogArticle } from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import {
  filterReviewArticles,
  type ReviewEquipmentFilter,
  type ReviewHubFilter,
} from "@/lib/review-hub-filters";

function ArticleCard({
  article,
  locale,
}: {
  article: BlogArticle;
  locale: SiteLocale;
}) {
  return (
    <Link
      href={buildLocalizedPath(locale, articlePathForSlug(article.slug))}
      className="group block border-b border-[color:var(--line)] py-5"
    >
      <div className="flex items-center gap-2 text-xs text-[var(--color-subtle)]">
        <time dateTime={article.updatedAt}>{article.updatedAt}</time>
      </div>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-[var(--text)] group-hover:text-[var(--color-accent)]">
        {article.title}
      </h2>
    </Link>
  );
}

const KIND_OPTIONS: { value: ReviewHubFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "catalog", label: "In catalog" },
  { value: "guides", label: "Guides" },
];

const EQUIPMENT_OPTIONS: { value: ReviewEquipmentFilter; label: string }[] = [
  { value: "all", label: "All gear" },
  { value: "racket", label: "Rackets" },
  { value: "shoes", label: "Shoes" },
  { value: "string", label: "Strings" },
  { value: "other", label: "Other" },
];

export function ReviewsIndexClient({
  articles,
  locale,
}: {
  articles: BlogArticle[];
  locale: SiteLocale;
}) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ReviewHubFilter>("all");
  const [equipment, setEquipment] = useState<ReviewEquipmentFilter>("all");

  const filtered = useMemo(
    () =>
      filterReviewArticles(articles, {
        query,
        kind,
        equipment,
      }),
    [articles, query, kind, equipment]
  );

  return (
    <>
      <div className="space-y-4">
        <label className="block">
          <span className="sr-only">Search reviews</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles…"
            className="w-full rounded-xl border border-[color:var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {KIND_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setKind(option.value)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                kind === option.value
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[color:var(--line)] text-[var(--color-muted)] hover:border-[var(--color-accent)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {EQUIPMENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setEquipment(option.value)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                equipment === option.value
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[color:var(--line)] text-[var(--color-muted)] hover:border-[var(--color-accent)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-[var(--color-subtle)]">
          Showing {filtered.length} of {articles.length}
        </p>
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)]">
            No reviews match these filters.{" "}
            <button
              type="button"
              className="text-[var(--color-accent)] underline"
              onClick={() => {
                setQuery("");
                setKind("all");
                setEquipment("all");
              }}
            >
              Clear filters
            </button>
          </p>
        ) : (
          filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={locale} />
          ))
        )}
      </div>
    </>
  );
}
