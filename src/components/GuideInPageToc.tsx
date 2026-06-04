"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { ArticleToc, type TocItem } from "@/components/ArticleToc";

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePathname(pathname: string | null): string {
  if (!pathname) return "";
  return pathname.replace(/\/index\.html$/i, "").replace(/\/$/, "") || "/";
}

const SKIP_TOC_PATHS = new Set(["/guides", "/guides/glossary"]);

/**
 * Builds a table of contents from `<article> h2` headings on guide pages.
 * Assigns `id` attributes when missing, then renders a fixed desktop sidebar
 * so the ToC does not shift page layout (Lighthouse CLS).
 */
export function GuideInPageToc() {
  const pathname = usePathname();
  const guidePath = normalizePathname(pathname);
  const skipToc = SKIP_TOC_PATHS.has(guidePath);

  const [items, setItems] = useState<TocItem[]>([]);

  useLayoutEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- DOM scan before paint */
    if (skipToc) {
      setItems([]);
      return;
    }

    const article = document.querySelector("main article");
    if (!article) {
      setItems([]);
      return;
    }

    const headings = Array.from(article.querySelectorAll("h2"));
    const seen = new Map<string, number>();
    const next: TocItem[] = [];

    for (const heading of headings) {
      const label = heading.textContent?.trim() ?? "";
      if (!label || /^disclaimer$/i.test(label)) continue;

      let id = heading.id;
      if (!id) {
        const base = slugifyHeading(label) || "section";
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        id = count === 0 ? base : `${base}-${count + 1}`;
        heading.id = id;
      }
      heading.classList.add("scroll-mt-24");
      next.push({ id, label });
    }

    setItems(next);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [skipToc]);

  if (skipToc || items.length < 3) return null;

  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-20 hidden w-56 lg:block">
      <div className="pointer-events-auto sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto px-4 py-16">
        <ArticleToc items={items} desktopOnly />
      </div>
    </div>
  );
}
