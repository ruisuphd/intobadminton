/**
 * URL <-> UserProfile serialization for sharable / deep-linked finder results.
 *
 * Shape: `/results/?level=club&disc=doubles&styles=offensive,smash_heavy&cat=racket&budget=250&weight=78&foot=normal&tension=26&inj=knee,ankle&n=8`
 *
 * Why a separate module: the parsing is shared by `/results/` and any future
 * sharable surfaces (compare page, email outputs). Keeping it pure makes it
 * easy to test and keeps the React components thin.
 */

import {
  DISCIPLINES,
  FOOT_WIDTH,
  INJURY_FLAGS,
  PLAY_STYLES,
  SKILL_LEVELS,
  CATEGORIES,
  defaultUserProfile,
  type Discipline,
  type EquipmentCategory,
  type FootWidth,
  type InjuryFlag,
  type PlayStyle,
  type SkillLevel,
  type UserProfile,
} from "@/lib/taxonomy";

const BUDGET_MAX_HARD_CAP_USD = 2000;
const BUDGET_MIN_USD = 0;
const WEIGHT_MIN_KG = 20;
const WEIGHT_MAX_KG = 200;
const TENSION_MIN_LB = 14;
const TENSION_MAX_LB = 40;

const ALLOWED_TOP_N = new Set([4, 8, 12, 20]);
const DEFAULT_TOP_N = 8;

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function parseEnum<T extends string>(
  raw: string | null | undefined,
  allowed: readonly T[]
): T | undefined {
  if (!raw) return undefined;
  return (allowed as readonly string[]).includes(raw) ? (raw as T) : undefined;
}

function parseEnumList<T extends string>(
  raw: string | null | undefined,
  allowed: readonly T[]
): T[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter((v): v is T => (allowed as readonly string[]).includes(v));
}

function parsePositiveNumber(
  raw: string | null | undefined,
  min: number,
  max: number
): number | undefined {
  if (raw == null || raw === "") return undefined;
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed)) return undefined;
  return clamp(parsed, min, max);
}

export function parseTopN(raw: string | null | undefined): number {
  if (!raw) return DEFAULT_TOP_N;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return DEFAULT_TOP_N;
  return ALLOWED_TOP_N.has(parsed) ? parsed : DEFAULT_TOP_N;
}

/**
 * Deserialise a UserProfile-shaped object from URL search params. Returns
 * `null` if `level` and `discipline` are both missing — the caller should
 * fall back to localStorage / context state in that case.
 */
export function profileFromSearchParams(
  params: URLSearchParams
): UserProfile | null {
  const level = parseEnum<SkillLevel>(params.get("level"), SKILL_LEVELS);
  const discipline = parseEnum<Discipline>(params.get("disc"), DISCIPLINES);
  if (!level && !discipline) return null;

  const category =
    parseEnum<EquipmentCategory>(params.get("cat"), CATEGORIES) ?? "racket";
  const styles = parseEnumList<PlayStyle>(params.get("styles"), PLAY_STYLES);
  const footWidth = parseEnum<FootWidth>(params.get("foot"), FOOT_WIDTH);
  const injuryFlags = parseEnumList<InjuryFlag>(params.get("inj"), INJURY_FLAGS);

  const budget = parsePositiveNumber(
    params.get("budget"),
    BUDGET_MIN_USD,
    BUDGET_MAX_HARD_CAP_USD
  );
  const weight = parsePositiveNumber(
    params.get("weight"),
    WEIGHT_MIN_KG,
    WEIGHT_MAX_KG
  );
  const tension = parsePositiveNumber(
    params.get("tension"),
    TENSION_MIN_LB,
    TENSION_MAX_LB
  );

  const base = defaultUserProfile();
  return {
    ...base,
    level: level ?? base.level,
    discipline: discipline ?? base.discipline,
    styles: styles.length > 0 ? styles.slice(0, 2) : base.styles,
    category,
    body: {
      ...base.body,
      ...(budget != null ? { budgetMaxUsd: budget } : {}),
      ...(weight != null ? { weightKg: weight } : {}),
      ...(footWidth ? { footWidth } : {}),
      ...(tension != null ? { stringTensionLbs: tension } : {}),
      injuryFlags:
        injuryFlags.length > 0 ? injuryFlags : ["none"],
    },
  };
}

/**
 * Serialise a UserProfile into a URLSearchParams instance. Only fields with
 * concrete user-supplied values are included so the URL stays compact and
 * doesn't carry "default" noise.
 */
/** Build a shareable `/results/` path for a stored profile snapshot. */
export function profileToResultsPath(profile: UserProfile): string {
  const qs = profileToSearchParams(profile).toString();
  return qs.length > 0 ? `/results/?${qs}` : "/results/";
}

export function profileToSearchParams(profile: UserProfile): URLSearchParams {
  const out = new URLSearchParams();
  if (profile.level) out.set("level", profile.level);
  if (profile.discipline) out.set("disc", profile.discipline);
  if (profile.category) out.set("cat", profile.category);
  if (profile.styles.length > 0) {
    out.set("styles", profile.styles.slice(0, 2).join(","));
  }
  const { body } = profile;
  if (body.budgetMaxUsd != null) {
    out.set("budget", String(body.budgetMaxUsd));
  }
  if (body.weightKg != null) out.set("weight", String(body.weightKg));
  if (body.footWidth) out.set("foot", body.footWidth);
  if (body.stringTensionLbs != null) {
    out.set("tension", String(body.stringTensionLbs));
  }
  const flags = body.injuryFlags.filter((f) => f !== "none");
  if (flags.length > 0) out.set("inj", flags.join(","));
  return out;
}

/** Hard cap a user-supplied budget value (handles unbounded form input). */
export function clampBudgetUsd(value: number): number {
  return clamp(value, BUDGET_MIN_USD, BUDGET_MAX_HARD_CAP_USD);
}

export const BUDGET_HARD_CAP_USD = BUDGET_MAX_HARD_CAP_USD;
export const TOP_N_OPTIONS = [4, 8, 12, 20] as const;
export const DEFAULT_TOP_N_VALUE = DEFAULT_TOP_N;

/**
 * Sharable `/results/` URL for a stored finder profile. Used by homepage
 * shortlist recall and any future history surfaces.
 */
export function resultsPathForProfile(
  profile: UserProfile,
  topN: number = DEFAULT_TOP_N
): string {
  const params = profileToSearchParams(profile);
  const n = ALLOWED_TOP_N.has(topN) ? topN : DEFAULT_TOP_N;
  params.set("n", String(n));
  const qs = params.toString();
  return qs ? `/results/?${qs}` : "/results/";
}
