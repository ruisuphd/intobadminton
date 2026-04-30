"use client";

import { useState } from "react";
import { trackEvent } from "@/components/Analytics";
import type { SiteLocale } from "@/lib/locale";

const BUTTONDOWN_USERNAME = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;

type Copy = {
  heading: string;
  blurb: string;
  placeholder: string;
  submit: string;
  privacy: string;
  thanks: string;
  notConfigured: string;
};

const copyEn: Copy = {
  heading: "Monthly equipment + BWF brief",
  blurb:
    "One short email per month: new racket releases, restring deals, and the BWF events worth watching. No spam, unsubscribe in one click.",
  placeholder: "you@example.com",
  submit: "Subscribe",
  privacy:
    "We send via Buttondown. Your email address is only used to deliver the brief. See the privacy page for details.",
  thanks: "Thanks — check your inbox to confirm.",
  notConfigured:
    "Newsletter is not yet wired up. Configure NEXT_PUBLIC_BUTTONDOWN_USERNAME to enable.",
};

export function NewsletterSignup({ locale = "en" }: { locale?: SiteLocale }) {
  const [submitted, setSubmitted] = useState(false);
  const c = copyEn;
  const configured = Boolean(BUTTONDOWN_USERNAME);

  if (!configured) {
    return (
      <section className="rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface)] p-6">
        <p className="text-sm text-[var(--color-muted)]">{c.notConfigured}</p>
      </section>
    );
  }

  const action = `https://buttondown.email/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`;

  return (
    <section className="card p-6">
      <h2 className="text-xl font-semibold text-[var(--text)]">{c.heading}</h2>
      <p className="mt-2 text-sm text-[var(--color-muted)]">{c.blurb}</p>
      {submitted ? (
        <p className="mt-4 text-sm font-medium text-[var(--color-accent)]">
          {c.thanks}
        </p>
      ) : (
        <form
          action={action}
          method="post"
          target="popupwindow"
          onSubmit={() => {
            trackEvent("newsletter_subscribe_attempt", { locale });
            setSubmitted(true);
          }}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <label className="sr-only" htmlFor="bd-email">
            {c.placeholder}
          </label>
          <input
            id="bd-email"
            type="email"
            name="email"
            required
            placeholder={c.placeholder}
            className="flex-1 rounded-2xl border border-[color:var(--line-strong)] bg-transparent px-4 py-3 text-sm text-[var(--text)]"
          />
          <input type="hidden" name="tag" value={`locale-${locale}`} />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-[var(--color-accent)] px-5 text-sm font-medium text-white"
          >
            {c.submit}
          </button>
        </form>
      )}
      <p className="mt-3 text-xs text-[var(--color-muted)]">{c.privacy}</p>
    </section>
  );
}
