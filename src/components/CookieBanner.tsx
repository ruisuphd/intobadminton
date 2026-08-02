"use client";

import { useConsent } from "@/context/ConsentContext";

/*
 * Consent bar.
 *
 * Mobile is ~65% of this site's search clicks and most of them land directly on
 * a review, so this bar is the first thing a new reader sees. The previous
 * layout — heading, three-sentence paragraph, three wrapping buttons — measured
 * 260px on a 375x812 viewport, a third of the screen, covering the article they
 * arrived to read.
 *
 * Two constraints shape the rewrite:
 *   - Reject, Customize and Accept must stay equally prominent. Same size, same
 *     row, one accent fill. Burying reject behind a second tap is the dark
 *     pattern docs/COMPLIANCE.md forbids.
 *   - The copy must not describe operational state. It used to end with "Ads
 *     remain operationally disabled until a compliant consent platform is
 *     configured", which was internal detail no reader needed, and which we now
 *     know is not strictly true — Auto Ads bypasses NEXT_PUBLIC_ADSENSE_MODE
 *     entirely (see AdSenseScript.tsx). Better to say what the buttons do and
 *     let /privacy/ carry the detail.
 */
export function CookieBanner() {
  const { hasChoice, acceptAll, rejectNonEssential, openSettings } =
    useConsent();

  if (hasChoice) return null;

  // px-2/13px on mobile so all three labels sit on one line inside a 3-column
  // grid at 375px. Any wider and "Essential only" wraps, which makes the reject
  // option look like the odd one out.
  const btn =
    "rounded-full px-2 py-2.5 text-[13px] font-medium whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:px-4 sm:text-sm";
  const secondary = `${btn} border border-[color:var(--line-strong)] text-[var(--text)]`;

  return (
    <section
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--line)] bg-[var(--surface)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-2px_12px_rgba(15,23,42,0.06)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-snug text-[var(--color-muted)]">
          We use local storage to run the finder. Analytics and ads stay off
          unless you turn them on.{" "}
          <a
            href="/privacy/"
            className="whitespace-nowrap underline underline-offset-2 hover:text-[var(--text)]"
          >
            Privacy policy
          </a>
        </p>
        {/* Equal-weight choices: one row on every width, no wrapping. */}
        <div className="grid shrink-0 grid-cols-3 gap-2 sm:flex sm:gap-2">
          <button type="button" onClick={rejectNonEssential} className={secondary}>
            Essential only
          </button>
          <button type="button" onClick={openSettings} className={secondary}>
            Customize
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className={`${btn} bg-[var(--color-accent)] text-white focus-visible:ring-offset-2`}
          >
            Accept all
          </button>
        </div>
      </div>
    </section>
  );
}
