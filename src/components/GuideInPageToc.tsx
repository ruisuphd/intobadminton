"use client";

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArticleToc, type TocItem } from "@/components/ArticleToc";

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Builds a table of contents from `<article> h2` headings on guide pages.
 * Portals the ToC immediately after the article `<h1>` once headings are
 * indexed. Assigns `id` attributes when missing.
 */
export function GuideInPageToc() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- DOM scan before paint */
    if (
      typeof window !== "undefined" &&
      window.location.pathname.replace(/\/$/, "") === "/guides/glossary"
    ) {
      setItems([]);
      setMountNode(null);
      return;
    }

    const article = document.querySelector("main article");
    if (!article) {
      setItems([]);
      setMountNode(null);
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

    if (next.length < 3) {
      setMountNode(null);
      return;
    }

    const h1 = article.querySelector("h1");
    if (!h1) {
      setMountNode(null);
      return;
    }

    let host = article.querySelector<HTMLElement>("#guide-toc-anchor");
    if (!host) {
      host = document.createElement("div");
      host.id = "guide-toc-anchor";
      host.className = "mb-8 min-h-[11rem]";
      h1.insertAdjacentElement("afterend", host);
    } else {
      host.classList.add("min-h-[11rem]");
      host.removeAttribute("aria-hidden");
    }
    setMountNode(host);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  if (!mountNode || items.length < 3) return null;

  return createPortal(<ArticleToc items={items} />, mountNode);
}
