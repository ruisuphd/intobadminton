"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/components/Analytics";
import {
  DISCIPLINES,
  FOOT_WIDTH,
  INJURY_FLAGS,
  PLAY_STYLES,
  type Discipline,
  type EquipmentCategory,
  type PlayStyle,
  type SkillLevel,
} from "@/lib/taxonomy";
import {
  COUNTRY_LIST,
  getCountrySystem,
  getInternalLevel,
  type CountryCode,
} from "@/lib/skill-levels";
import { useProfile } from "@/context/ProfileContext";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import {
  BUDGET_HARD_CAP_USD,
  clampBudgetUsd,
  profileToSearchParams,
} from "@/lib/profile-url";

const STEPS = 5;
const LIVE_CATEGORIES: EquipmentCategory[] = [
  "racket",
  "shoes",
  "string",
  "grip",
  "bag",
  "shuttle",
];

const levelLabel: Record<SkillLevel, string> = {
  recreational: "Recreational",
  club: "Club",
  competitive: "Competitive",
  pro_oriented: "Pro-oriented",
};

const discLabel: Record<Discipline, string> = {
  singles: "Singles",
  doubles: "Doubles",
  mixed: "Mixed",
};

const styleLabel: Record<PlayStyle, string> = {
  offensive: "Offensive",
  balanced: "Balanced",
  defensive: "Defensive",
  front_court: "Front court",
  smash_heavy: "Smash-heavy",
};

export function QuizFunnel({ locale = "en" }: { locale?: SiteLocale }) {
  const router = useRouter();
  const { profile, setProfile } = useProfile();
  const [step, setStep] = useState(0);
  const copy = t(locale).quiz;
  const levels = levelLabel;
  const disciplines = discLabel;
  const styles = styleLabel;

  const progress = useMemo(
    () => Math.round(((step + 1) / STEPS) * 100),
    [step]
  );

  useEffect(() => {
    if (step === 0) trackEvent("quiz_start", { category: "racket" });
  }, [step]);

  const next = () => {
    trackEvent("quiz_step_complete", { step: step + 1 });
    if (step < STEPS - 1) setStep((s) => s + 1);
    else {
      trackEvent("quiz_complete", {
        level: profile.level ?? "unknown",
        discipline: profile.discipline ?? "unknown",
        category: profile.category ?? "unknown",
      });
      // Append the profile as URL parameters so `/results/` deep-links and
      // can be bookmarked or shared. `ResultsClient` reads these first and
      // falls back to localStorage / context if the URL is empty.
      //
      // Build the localized path FIRST (it normalises trailing slashes), then
      // append the query string. Passing a `path?query` shape through
      // `buildLocalizedPath` would route the trailing-slash normaliser at the
      // end of the query and corrupt the last param's value.
      const localizedPath = buildLocalizedPath(locale, "/results/");
      const params = profileToSearchParams(profile).toString();
      const target = params ? `${localizedPath}?${params}` : localizedPath;
      router.push(target);
    }
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <div className="mx-auto max-w-lg">
      <div
        className="mb-8 h-1.5 overflow-hidden rounded-full bg-[color:var(--surface-muted)]"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-[var(--color-muted)]">
        {`${copy.step} ${step + 1} ${copy.of} ${STEPS}`}
      </p>

      {step === 0 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.levelTitle}
          </h1>
          <p className="text-[var(--color-muted)]">{copy.levelHelp}</p>

          <label className="block text-sm">
            <span className="text-[var(--color-muted)]">
              {"Your country / rating system"}
            </span>
            <select
              className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-transparent px-3 py-2 text-[var(--text)]"
              value={profile.countryCode ?? "GENERIC"}
              onChange={(e) => {
                const code = e.target.value as CountryCode;
                setProfile((p) => ({
                  ...p,
                  countryCode: code,
                  countryLevel: undefined,
                  level: code === "GENERIC" ? p.level : null,
                }));
              }}
            >
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.nameEn}
                </option>
              ))}
            </select>
          </label>

          {(() => {
            const code = (profile.countryCode ?? "GENERIC") as CountryCode;
            const system = getCountrySystem(code);
            return (
              <>
                <p className="text-xs text-[var(--color-muted)]">
                  {system.systemEn}
                </p>
                <div className="flex flex-col gap-2">
                  {system.options.map((opt) => {
                    const selected =
                      code === "GENERIC"
                        ? profile.level === opt.internal
                        : profile.countryLevel === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => {
                          const internal =
                            code === "GENERIC"
                              ? (opt.internal as SkillLevel)
                              : (getInternalLevel(code, opt.value) as SkillLevel);
                          setProfile((p) => ({
                            ...p,
                            countryCode: code,
                            countryLevel:
                              code === "GENERIC" ? undefined : opt.value,
                            level: internal,
                          }));
                          next();
                        }}
                        className={`rounded-2xl px-5 py-4 text-left text-sm transition-all ${
                          selected
                            ? "bg-[var(--color-accent-soft)] ring-2 ring-[var(--color-accent)]"
                            : "card card-interactive"
                        }`}
                      >
                        <span className="font-medium">
                          {opt.labelEn}
                        </span>
                        {code !== "GENERIC" && (
                          <span className="ml-2 text-xs text-[var(--color-muted)]">
                            ≈ {levels[opt.internal]}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[var(--color-muted)]">
                  {system.noteEn}
                </p>
              </>
            );
          })()}
        </section>
      )}

      {step === 1 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.disciplineTitle}
          </h1>
          <div className="flex flex-col gap-2">
            {DISCIPLINES.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => {
                  setProfile((p) => ({ ...p, discipline: d }));
                  next();
                }}
                className={`rounded-2xl px-5 py-4 text-left text-sm transition-all ${
                  profile.discipline === d
                    ? "bg-[var(--color-accent-soft)] ring-2 ring-[var(--color-accent)]"
                    : "card card-interactive"
                }`}
              >
                {disciplines[d]}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.styleTitle}
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            {copy.styleHelp}
          </p>
          <p
            className="text-xs text-[var(--color-subtle)]"
            aria-live="polite"
          >
            Pick 1 or 2 tags. {profile.styles.length}/2 selected
            {profile.styles.length >= 2
              ? " — choosing a third replaces the oldest."
              : "."}
          </p>
          <div className="flex flex-wrap gap-2">
            {PLAY_STYLES.map((s) => {
              const on = profile.styles.includes(s);
              return (
                <button
                  type="button"
                  key={s}
                  aria-pressed={on}
                  onClick={() => {
                    setProfile((p) => {
                      const has = p.styles.includes(s);
                      if (has) {
                        return {
                          ...p,
                          styles: p.styles.filter((x) => x !== s),
                        };
                      }
                      if (p.styles.length >= 2) {
                        return { ...p, styles: [...p.styles.slice(1), s] };
                      }
                      return { ...p, styles: [...p.styles, s] };
                    });
                  }}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    on
                      ? "bg-[var(--color-accent)] text-white"
                      : "border border-[color:var(--line-strong)] hover:border-[var(--text)]"
                  }`}
                >
                  {styles[s]}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={next}
            className="btn-primary mt-4 w-full"
          >
            {copy.continue}
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.categoryTitle}
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            {copy.categoryHelp}
          </p>
          {(
            [
              ["racket", "Racket"],
              ["shoes", "Shoes"],
              ["string", "String"],
              ["grip", "Grip"],
              ["bag", "Bag"],
              ["shuttle", "Shuttle"],
            ] as [EquipmentCategory, string][]
          ).map(([id, label]) => {
            const live = LIVE_CATEGORIES.includes(id);
            return (
              <button
                type="button"
                key={id}
                disabled={!live}
                onClick={() => {
                  setProfile((p) => ({ ...p, category: id }));
                  next();
                }}
                className={`flex w-full rounded-2xl px-5 py-4 text-left text-sm transition-all ${
                  live
                    ? "card card-interactive"
                    : "cursor-not-allowed opacity-50 bg-[color:var(--surface-muted)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </section>
      )}

      {step === 4 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.bodyTitle}
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            {copy.bodyHelp}
          </p>
          <label className="block text-sm">
            <span className="text-[var(--color-muted)]">Budget max (USD)</span>
            <input
              type="number"
              min={0}
              max={BUDGET_HARD_CAP_USD}
              step={5}
              className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-transparent px-3 py-2"
              value={profile.body.budgetMaxUsd ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setProfile((p) => ({
                  ...p,
                  body: {
                    ...p.body,
                    budgetMaxUsd:
                      v === "" ? undefined : clampBudgetUsd(Number(v)),
                  },
                }));
              }}
            />
            <span className="mt-1 block text-xs text-[var(--color-subtle)]">
              Most badminton rackets are $50–$350 street; shoes $80–$200; bags
              $40–$150. Capped at ${BUDGET_HARD_CAP_USD} to filter outlier
              values.
            </span>
          </label>
          {(profile.category === "shoes" || profile.category === "racket") && (
            <label className="block text-sm">
              <span className="text-[var(--color-muted)]">Body weight (kg)</span>
              <input
                type="number"
                min={30}
                max={150}
                className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-transparent px-3 py-2"
                value={profile.body.weightKg ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setProfile((p) => ({
                    ...p,
                    body: {
                      ...p.body,
                      weightKg: v === "" ? undefined : Number(v),
                    },
                  }));
                }}
              />
              <span className="mt-1 block text-xs text-[var(--color-subtle)]">
                {profile.category === "shoes"
                  ? "Heavier players benefit from more cushioning and stability."
                  : "Lighter players can usually swing 4U/5U faster; heavier hitters often prefer 3U head weight. Optional."}
              </span>
            </label>
          )}
          {profile.category === "shoes" && (
            <div>
              <p className="text-sm text-[var(--color-muted)]">Foot width</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {FOOT_WIDTH.map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() =>
                      setProfile((p) => ({
                        ...p,
                        body: { ...p.body, footWidth: f },
                      }))
                    }
                    className={`rounded-full px-3 py-1 text-xs ${
                      profile.body.footWidth === f
                        ? "bg-[var(--color-accent)] text-white"
                        : "border border-[color:var(--line-strong)]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-sm text-[var(--color-muted)]">
              Joint comfort flags
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {INJURY_FLAGS.map((f) => {
                const has = profile.body.injuryFlags.includes(f);
                return (
                  <button
                    type="button"
                    key={f}
                    onClick={() => {
                      setProfile((p) => {
                        let next = [...p.body.injuryFlags];
                        if (f === "none") {
                          next = ["none"];
                        } else {
                          next = next.filter((x) => x !== "none");
                          if (has) next = next.filter((x) => x !== f);
                          else next.push(f);
                          if (next.length === 0) next = ["none"];
                        }
                        return {
                          ...p,
                          body: { ...p.body, injuryFlags: next },
                        };
                      });
                    }}
                    className={`rounded-full px-3 py-1 text-xs ${
                      has
                        ? "bg-[var(--color-accent)] text-white"
                        : "border border-[color:var(--line-strong)]"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
          <details className="rounded-2xl bg-[color:var(--surface-muted)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--text)]">
              Optional: tell us what you currently use
            </summary>
            <p className="mt-2 text-xs text-[var(--color-subtle)]">
              We use this to flag upgrades and avoid recommending something
              you already own. Skip any field — none are required.
            </p>
            <div className="mt-4 grid gap-3">
              <label className="block text-sm">
                <span className="text-[var(--color-muted)]">Current racket</span>
                <input
                  type="text"
                  placeholder="e.g. Yonex Astrox 77 Pro"
                  className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2"
                  value={profile.context?.currentRacket ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      context: {
                        ...(p.context ?? {}),
                        currentRacket: e.target.value || undefined,
                      },
                    }))
                  }
                />
              </label>
              <label className="block text-sm">
                <span className="text-[var(--color-muted)]">Current strings</span>
                <input
                  type="text"
                  placeholder="e.g. BG80 / Aerobite / Li-Ning No.5"
                  className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2"
                  value={profile.context?.currentStrings ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      context: {
                        ...(p.context ?? {}),
                        currentStrings: e.target.value || undefined,
                      },
                    }))
                  }
                />
              </label>
              <label className="block text-sm">
                <span className="text-[var(--color-muted)]">Current tension (lb)</span>
                <input
                  type="number"
                  min={18}
                  max={35}
                  step={0.5}
                  placeholder="e.g. 26"
                  className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2"
                  value={profile.context?.currentTensionLbs ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setProfile((p) => ({
                      ...p,
                      context: {
                        ...(p.context ?? {}),
                        currentTensionLbs:
                          v === "" ? undefined : Number(v),
                      },
                    }));
                  }}
                />
              </label>
              <label className="block text-sm">
                <span className="text-[var(--color-muted)]">Current shoes</span>
                <input
                  type="text"
                  placeholder="e.g. Yonex Comfort Z3"
                  className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2"
                  value={profile.context?.currentShoes ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      context: {
                        ...(p.context ?? {}),
                        currentShoes: e.target.value || undefined,
                      },
                    }))
                  }
                />
              </label>
            </div>
          </details>
          <button
            type="button"
            onClick={next}
            className="btn-primary mt-2 w-full"
          >
            {copy.see}
          </button>
        </section>
      )}

      {step > 0 && step < 4 && (
        <button
          type="button"
          onClick={back}
          className="mt-8 text-sm text-[var(--color-muted)] hover:text-[var(--text)]"
        >
          ← {copy.back}
        </button>
      )}
    </div>
  );
}
