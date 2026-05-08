"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const NAV_LINKS = [
  { href: "/quiz/", label: "Finder" },
  { href: "/best/", label: "Best Of" },
  { href: "/blog/", label: "Blog" },
  { href: "/guides/", label: "Guides" },
  { href: "/brands/", label: "Brands" },
  { href: "/faq/", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-white/85 backdrop-blur-md">
      <div className="layout-band flex h-16 max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-[var(--text)]"
        >
          <Image
            src={`${basePath}/intobadminton-mark.png`}
            alt=""
            width={28}
            height={28}
            priority
            className="h-7 w-7"
          />
          IntoBadminton
        </Link>

        <nav className="hidden items-center gap-6 text-sm sm:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--text)]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quiz/"
            className="inline-flex h-9 items-center justify-center rounded-full bg-[var(--color-accent)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            Start finder
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line-strong)] sm:hidden"
        >
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-[color:var(--line)] bg-white sm:hidden"
        >
          <ul className="layout-band max-w-6xl py-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="block py-3 text-base font-medium text-[var(--text)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/quiz/"
                onClick={close}
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-4 text-sm font-medium text-white"
              >
                Start finder
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
