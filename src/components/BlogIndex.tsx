import Link from "next/link";
import { blogArticles } from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

export function BlogIndex({ locale }: { locale: SiteLocale }) {
  const articles = blogArticles[locale];

  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          {locale === "zh" ? "羽毛球装备博客" : "Badminton equipment blog"}
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          {locale === "zh"
            ? "原创、可复查、以打法适配为核心的装备内容。我们不会复制第三方评价原文。"
            : "Original, checkable equipment content focused on player fit. We do not copy third-party review text."}
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={buildLocalizedPath(locale, `/blog/${article.slug}/`)}
              className="rounded-2xl border border-zinc-200 bg-[var(--surface)] p-5 transition hover:border-[var(--color-accent)] dark:border-zinc-700"
            >
              <p className="text-xs text-[var(--color-muted)]">
                {article.updatedAt}
              </p>
              <h2 className="mt-2 font-semibold text-[var(--text)]">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {article.dek}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

