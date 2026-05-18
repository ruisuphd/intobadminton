"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  COUNTRY_LIST,
  COUNTRY_SYSTEMS,
  getCountrySystem,
  type CountryCode,
  type LevelOption,
} from "@/lib/skill-levels";
import type { SkillLevel } from "@/lib/taxonomy";

const INTERNAL_LABEL: Record<SkillLevel, string> = {
  recreational: "Recreational",
  club: "Club",
  competitive: "Competitive",
  pro_oriented: "Pro-oriented",
};

/**
 * Convert a level from any supported country system to every other system
 * via the shared `internal` SkillLevel pivot.
 */
function targetOptions(country: CountryCode, internal: SkillLevel): LevelOption[] {
  return COUNTRY_SYSTEMS[country].options.filter(
    (opt) => opt.internal === internal
  );
}

export function SkillLevelConverter() {
  const [sourceCountry, setSourceCountry] = useState<CountryCode>("GENERIC");
  const sourceSystem = getCountrySystem(sourceCountry);
  const [sourceValue, setSourceValue] = useState<string>(
    sourceSystem.options[0]?.value ?? ""
  );

  const sourceOption = useMemo(
    () =>
      sourceSystem.options.find((opt) => opt.value === sourceValue) ??
      sourceSystem.options[0],
    [sourceSystem, sourceValue]
  );

  const internal: SkillLevel | undefined = sourceOption?.internal;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Your current level
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-[var(--color-muted)]">Rating system</span>
            <select
              className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2 text-[var(--text)]"
              value={sourceCountry}
              onChange={(e) => {
                const next = e.target.value as CountryCode;
                setSourceCountry(next);
                setSourceValue(COUNTRY_SYSTEMS[next].options[0]?.value ?? "");
              }}
            >
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.nameEn}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-[var(--color-muted)]">Level / tier</span>
            <select
              className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2 text-[var(--text)]"
              value={sourceValue}
              onChange={(e) => setSourceValue(e.target.value)}
            >
              {sourceSystem.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.labelEn}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs text-[var(--color-subtle)]">
          {sourceSystem.systemEn} — {sourceSystem.noteEn}
        </p>
      </div>

      {internal && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Equivalent in other systems
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            IntoBadminton internal tier:{" "}
            <span className="chip chip-success ml-1">
              {INTERNAL_LABEL[internal]}
            </span>
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {COUNTRY_LIST.filter((c) => c.code !== sourceCountry).map((c) => {
              const matches = targetOptions(c.code, internal);
              return (
                <div
                  key={c.code}
                  className="rounded-xl bg-[color:var(--surface-muted)] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
                    {c.nameEn}
                  </p>
                  {matches.length === 0 ? (
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      No close equivalent
                    </p>
                  ) : (
                    <ul className="mt-2 space-y-1 text-sm text-[var(--text)]">
                      {matches.map((m) => (
                        <li key={m.value}>{m.labelEn}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </dl>
          <p className="mt-5 text-xs text-[var(--color-subtle)]">
            Multiple entries per system mean the source tier spans more than
            one local rank.
          </p>
        </div>
      )}

      <div className="card p-6 bg-[color:var(--color-accent-soft)]">
        <p className="text-sm font-semibold text-[var(--text)]">
          Use this in the finder
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          Once you know your IntoBadminton internal tier, run the finder and
          the catalogue will rank gear against your level band.
        </p>
        <Link href="/quiz/" className="btn-primary mt-4">
          Open the finder
        </Link>
      </div>
    </div>
  );
}
