"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SavedHeaderLink } from "@/components/SavedHeaderLink";
import { SiteSearchForm } from "@/components/SiteSearchForm";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const NAV_LINKS = [
  { href: "/quiz/", label: "Finder" },
  { href: "/catalog/", label: "Catalog" },
  { href: "/best/", label: "Best Of" },
  { href: "/review/", label: "Reviews" },
  { href: "/tools/", label: "Tools" },
  { href: "/guides/", label: "Guides" },
  { href: "/brands/", label: "Brands" },
  { href: "/faq/", label: "FAQ" },
  { href: "/search/", label: "Search" },
] as const;

function isActive(pathname: string, href: string): boolean {
  // Treat section hubs as active for their nested pages too.
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !mobileNavRef.current) return;
      const nodes = [
        ...mobileNavRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      const first = mobileNavRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    }, 0);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="layout-band flex h-16 max-w-6xl items-center justify-between">
        <Link
          href="/"
          aria-label="IntoBadminton — go to home"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-md"
        >
          <Image
            src={`${basePath}/intobadminton-mark.png`}
            alt=""
            width={28}
            height={28}
            priority
            className="h-7 w-7"
          />
          <span>IntoBadminton</span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm sm:flex" aria-label="Primary">
          <div className="mr-1 hidden min-[1200px]:block">
            <SiteSearchForm compact />
          </div>
          {NAV_LINKS.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors ${
                  active
                    ? "font-medium text-[var(--text)]"
                    : "text-[var(--color-muted)] hover:text-[var(--text)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <SavedHeaderLink variant="desktop" />
          <Link
            href="/quiz/"
            className="inline-flex h-9 items-center justify-center rounded-full bg-[var(--color-accent)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            Start finder
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
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
          ref={mobileNavRef}
          id="mobile-nav"
          aria-label="Primary"
          aria-modal="true"
          role="dialog"
          className="border-t border-[color:var(--line)] bg-white sm:hidden"
        >
          <ul className="layout-band max-w-6xl py-3">
            {NAV_LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    onClick={close}
                    className={`block py-3 text-base font-medium ${
                      active
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--text)]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <SavedHeaderLink variant="mobile" onNavigate={close} />
            </li>
            <li className="py-2">
              <SiteSearchForm compact />
            </li>
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
