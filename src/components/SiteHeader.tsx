"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SavedHeaderLink } from "@/components/SavedHeaderLink";
import { SiteSearchForm } from "@/components/SiteSearchForm";
import { SiteSearchFormStatic } from "@/components/SiteSearchFormStatic";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Primary destinations live in the desktop top bar. Secondary destinations are
// surfaced in the mobile menu and remain site-wide linked from the footer, so
// trimming the desktop bar costs no internal links / crawl depth — it just
// calms a previously 9-item row. Search is reachable via the inline form
// (≥1200px), the search icon (smaller screens), and the homepage hero.
const PRIMARY_NAV = [
  { href: "/quiz/", label: "Finder" },
  { href: "/catalog/", label: "Catalog" },
  { href: "/best/", label: "Best Of" },
  { href: "/review/", label: "Reviews" },
  { href: "/guides/", label: "Guides" },
] as const;

const SECONDARY_NAV = [
  { href: "/tools/", label: "Tools" },
  { href: "/brands/", label: "Brands" },
  { href: "/faq/", label: "FAQ" },
] as const;

const MOBILE_NAV = [...PRIMARY_NAV, ...SECONDARY_NAV] as const;

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

        <nav className="hidden items-center gap-5 text-sm sm:flex" aria-label="Primary">
          {PRIMARY_NAV.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-md ${
                  active
                    ? "font-medium text-[var(--text)]"
                    : "text-[var(--color-muted)] hover:text-[var(--text)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="ml-1 hidden min-[1200px]:block">
            <SiteSearchForm compact />
          </div>
          {/* Compact search affordance for the sm–xl range where the inline
              form is hidden. */}
          <Link
            href="/search/"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line-strong)] text-[var(--color-muted)] transition-colors hover:border-[var(--text)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] min-[1200px]:hidden"
          >
            <svg
              aria-hidden
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          <SavedHeaderLink variant="desktop" />
          {pathname !== "/" && (
            <Link
              href="/quiz/"
              className="inline-flex h-9 items-center justify-center rounded-full bg-[var(--color-accent)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              Start finder
            </Link>
          )}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:hidden"
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
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-30 bg-black/20 sm:hidden"
            onClick={close}
          />
          <nav
            ref={mobileNavRef}
            id="mobile-nav"
            aria-label="Primary"
            aria-modal="true"
            role="dialog"
            className="relative z-40 border-t border-[color:var(--line)] bg-white sm:hidden"
          >
          <ul className="layout-band max-w-6xl py-3">
            {MOBILE_NAV.map((l) => {
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
              <SiteSearchFormStatic compact />
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
        </>
      )}
    </header>
  );
}
