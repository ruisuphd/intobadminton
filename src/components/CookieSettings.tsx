"use client";

import { useEffect, useRef, useState } from "react";
import { useConsent } from "@/context/ConsentContext";
import { consentAuditSummary } from "@/lib/consent";

export function CookieSettings() {
  const { consent, settingsOpen, closeSettings, saveConsent } = useConsent();
  const [draft, setDraft] = useState(consent);
  const closeRef = useRef<HTMLButtonElement>(null);
  const adsMode = process.env.NEXT_PUBLIC_ADSENSE_MODE || "disabled";
  const audit = consentAuditSummary();

  useEffect(() => {
    if (!settingsOpen) return;
    /* eslint-disable react-hooks/set-state-in-effect -- sync draft when dialog opens */
    setDraft(consent);
    /* eslint-enable react-hooks/set-state-in-effect */
    window.setTimeout(() => closeRef.current?.focus(), 0);
  }, [settingsOpen, consent]);

  if (!settingsOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/40 p-4 backdrop-blur-sm sm:items-center sm:justify-center"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[color:var(--line)] bg-[var(--surface)] p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="cookie-settings-title"
              className="text-2xl font-semibold tracking-tight text-[var(--text)]"
            >
              Cookie settings
            </h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Necessary storage keeps the finder, compare list, theme, and local
              review drafts working. Analytics and advertising are optional and
              remain off unless you choose them.
            </p>
            {adsMode !== "cmp_tcf" && (
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Advertising scripts are disabled at deployment level until a
                Google-certified CMP/IAB TCF setup is live for covered regions.
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeSettings}
            className="rounded-full border border-[color:var(--line-strong)] px-3 py-1 text-sm"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <PreferenceRow
            title="Necessary"
            description="Required for local settings, profile, compare, and consent records."
            checked
            disabled
            onChange={() => undefined}
          />
          <PreferenceRow
            title="Analytics"
            description="GA4 usage and Core Web Vitals measurement."
            checked={draft.analytics}
            onChange={(analytics) => setDraft((d) => ({ ...d, analytics }))}
          />
          <PreferenceRow
            title="Advertising"
            description={
              adsMode === "cmp_tcf"
                ? "AdSense ad loading and ad measurement after consent."
                : "Disabled until compliant AdSense consent mode is configured."
            }
            checked={draft.ads && !draft.doNotSellShare}
            disabled={draft.doNotSellShare || adsMode !== "cmp_tcf"}
            onChange={(ads) => setDraft((d) => ({ ...d, ads }))}
          />
          <PreferenceRow
            title="Personalization"
            description="Personalized ads where lawful and supported by a certified CMP."
            checked={draft.personalization && !draft.doNotSellShare}
            disabled={draft.doNotSellShare || !draft.ads}
            onChange={(personalization) =>
              setDraft((d) => ({ ...d, personalization }))
            }
          />
          <PreferenceRow
            title="Do Not Sell or Share"
            description="CCPA/CPRA-style opt-out from sale/share or targeted advertising."
            checked={draft.doNotSellShare}
            onChange={(doNotSellShare) =>
              setDraft((d) => ({
                ...d,
                doNotSellShare,
                ads: doNotSellShare ? false : d.ads,
                personalization: doNotSellShare ? false : d.personalization,
              }))
            }
          />
        </div>
        <div className="mt-6 rounded-2xl border border-[color:var(--line)] p-4">
          <h3 className="font-semibold text-[var(--text)]">
            Storage summary
          </h3>
          <div className="mt-3 space-y-3">
            {audit.map((row) => (
              <div key={row.category} className="text-sm">
                <p className="font-medium text-[var(--text)]">
                  {row.category} · default {row.defaultState}
                </p>
                <p className="text-[var(--color-muted)]">
                  {row.storage}. Legal basis: {row.legalBasis}. Third parties:{" "}
                  {row.thirdParties}.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              saveConsent({
                analytics: draft.analytics,
                ads: draft.ads,
                personalization: draft.personalization,
                doNotSellShare: draft.doNotSellShare,
              })
            }
            className="rounded-2xl bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={() =>
              saveConsent({
                analytics: false,
                ads: false,
                personalization: false,
                doNotSellShare: true,
              })
            }
            className="rounded-2xl border border-[color:var(--line-strong)] px-5 py-3 text-sm"
          >
            Reject non-essential
          </button>
        </div>
      </section>
    </div>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-5 rounded-2xl border border-[color:var(--line)] p-4">
      <span>
        <span className="block font-medium text-[var(--text)]">{title}</span>
        <span className="mt-1 block text-sm text-[var(--color-muted)]">
          {description}
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-5 w-5"
      />
    </label>
  );
}

export function CookieSettingsLink() {
  const { openSettings } = useConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
    >
      Cookie settings
    </button>
  );
}
