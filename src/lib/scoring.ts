import products from "@/data/products.json";
import { REASON_LABELS, type ReasonCode } from "@/lib/reason-codes";
import type { RacketProduct, ScoredRacket, SourceChip } from "@/lib/types/product";
import type { Discipline, PlayStyle, SkillLevel, UserProfile } from "@/lib/taxonomy";

const LEVEL_ORDER: SkillLevel[] = [
  "recreational",
  "club",
  "competitive",
  "pro_oriented",
];

function levelIndex(l: SkillLevel): number {
  return LEVEL_ORDER.indexOf(l);
}

function pushReason(
  out: { code: ReasonCode; label: string; weight: number }[],
  code: ReasonCode,
  weight: number
) {
  if (weight <= 0) return;
  out.push({ code, label: REASON_LABELS[code], weight });
}

function styleHeadPreference(styles: PlayStyle[]): "heavy" | "light" | "even" {
  if (styles.some((s) => ["offensive", "smash_heavy", "front_court"].includes(s)))
    return "heavy";
  if (styles.includes("defensive") && !styles.some((s) => s === "offensive")) {
    return "light";
  }
  if (styles.includes("balanced") || styles.length === 0) return "even";
  if (styles.includes("defensive")) return "light";
  return "even";
}

function scoreStyle(
  p: RacketProduct,
  styles: PlayStyle[],
  reasons: { code: ReasonCode; label: string; weight: number }[]
): number {
  if (styles.length === 0) return 0.4;
  const want = styleHeadPreference(styles);
  if (want === "heavy") {
    if (p.headWeight === "head_heavy") {
      if (styles.some((x) => ["offensive", "smash_heavy"].includes(x)))
        pushReason(reasons, "MATCH_STYLE_OFFENSE_HEAD_HEAVY", 1);
      else pushReason(reasons, "MATCH_STYLE_OFFENSE_HEAD_HEAVY", 0.5);
      return 0.9;
    }
    if (p.headWeight === "even") return 0.32;
    return 0.12;
  }
  if (want === "light") {
    if (p.headWeight === "head_light") {
      pushReason(reasons, "MATCH_STYLE_DEFENSE_HEAD_LIGHT", 0.9);
      return 0.88;
    }
    if (p.headWeight === "even") return 0.35;
    return 0.12;
  }
  if (p.headWeight === "even") {
    pushReason(reasons, "MATCH_STYLE_BALANCED_EVEN", 0.7);
    return 0.85;
  }
  return 0.4;
}

function scoreDiscipline(
  p: RacketProduct,
  discipline: Discipline | null,
  reasons: { code: ReasonCode; label: string; weight: number }[]
): number {
  if (!discipline) return 0.38;
  if (discipline === "doubles" || discipline === "mixed") {
    if (
      p.weightClass === "5U" ||
      p.weightClass === "6U" ||
      p.weightClass === "F" ||
      p.headWeight === "head_light"
    ) {
      pushReason(reasons, "MATCH_DISCIPLINE_DOUBLES_LIGHTER", 0.85);
      return 0.85;
    }
    pushReason(reasons, "MATCH_DISCIPLINE_DOUBLES_LIGHTER", 0.45);
    return 0.55;
  }
  pushReason(reasons, "MATCH_DISCIPLINE_SINGLES_STAMINA", 0.4);
  return 0.62;
}

function flexForLevel(level: SkillLevel): { min: ShaftCat; max: ShaftCat } {
  const s: Record<SkillLevel, { min: ShaftCat; max: ShaftCat }> = {
    recreational: { min: "flexible", max: "medium" },
    club: { min: "flexible", max: "stiff" },
    competitive: { min: "medium", max: "extra_stiff" },
    pro_oriented: { min: "stiff", max: "extra_stiff" },
  };
  return s[level];
}

type ShaftCat = "flexible" | "medium" | "stiff" | "extra_stiff";

const SHAFT_I: Record<ShaftCat, number> = {
  flexible: 0,
  medium: 1,
  stiff: 2,
  extra_stiff: 3,
};

function scoreLevel(
  p: RacketProduct,
  userLevel: SkillLevel,
  reasons: { code: ReasonCode; label: string; weight: number }[]
): number {
  const band = flexForLevel(userLevel);
  const uMin = SHAFT_I[band.min];
  const uMax = SHAFT_I[band.max];
  const v = SHAFT_I[p.shaftFlex];
  const inBand = v >= uMin - 0.5 && v <= uMax + 0.5;
  if (v < uMin) {
    pushReason(reasons, "MATCH_LEVEL_FLEX", 0.5);
    return 0.45;
  }
  if (v > uMax) {
    pushReason(reasons, "MATCH_LEVEL_STIFF", 0.4);
    return userLevel === "pro_oriented" || userLevel === "competitive"
      ? 0.55
      : 0.25;
  }
  if (inBand) {
    if (p.shaftFlex === "stiff" || p.shaftFlex === "extra_stiff")
      pushReason(reasons, "MATCH_LEVEL_STIFF", 0.6);
    else pushReason(reasons, "MATCH_LEVEL_FLEX", 0.6);
    return 0.82;
  }
  return 0.55;
}

function productAllowedForUserLevel(
  p: RacketProduct,
  userLevel: SkillLevel
): boolean {
  const u = levelIndex(userLevel);
  return (
    u >= levelIndex(p.minRecommendedLevel) &&
    u <= levelIndex(p.maxRecommendedLevel)
  );
}

function scoreBudget(
  p: RacketProduct,
  budgetMax: number | undefined,
  reasons: { code: ReasonCode; label: string; weight: number }[]
): number {
  if (budgetMax == null || !Number.isFinite(budgetMax)) return 0.5;
  if (p.priceUsd <= budgetMax) {
    pushReason(reasons, "BUDGET_FIT", 0.4);
    return 0.9;
  }
  if (p.priceUsd <= budgetMax * 1.12) {
    pushReason(reasons, "BUDGET_STRETCH", 0.3);
    return 0.55;
  }
  return 0.15;
}

function scoreBody(
  p: RacketProduct,
  userLevel: SkillLevel,
  body: UserProfile["body"],
  reasons: { code: ReasonCode; label: string; weight: number }[]
): number {
  let s = 0.5;
  const w = body.weightKg;
  if (w != null) {
    if (w < 60 && p.weightClass === "5U") s += 0.15;
    else if (w > 85 && p.weightClass === "3U") s += 0.12;
    else if (w >= 60 && w <= 85) s += 0.1;
    pushReason(reasons, "WEIGHT_CLASS_BUILD", 0.25);
  } else s += 0.05;
  const inj = body.injuryFlags?.filter((i) => i !== "none") ?? [];
  if (inj.length > 0 && p.shaftFlex === "extra_stiff") {
    pushReason(reasons, "INJURY_AVOID_ULTRA_STIFF", 0.4);
    s -= 0.25;
  }
  if (userLevel === "recreational" && p.shaftFlex === "extra_stiff") s -= 0.1;
  return Math.max(0, Math.min(1, s));
}

function buildSourceChips(p: RacketProduct): { type: SourceChip; label: string; href?: string }[] {
  const chips: { type: SourceChip; label: string; href?: string }[] = [
    { type: "manufacturer_spec", label: "Manufacturer / catalog basis" },
  ];
  if (p.reviewCount && p.reviewCount > 0) {
    chips.push({
      type: "review_summary",
      label: `Review signal (${p.reviewCount} sources, demo)`,
    });
  }
  if (p.editorNote) {
    chips.push({ type: "editor_note", label: "Editor note" });
  }
  if (p.sourceUrls[0]) {
    chips[0] = { ...chips[0], href: p.sourceUrls[0] };
  }
  return chips;
}

function buildProsCons(p: RacketProduct): { pros: string[]; cons: string[] } {
  const pros: string[] = [
    `${p.brand} ${p.name}: ${p.headWeight.replace("_", " ")} head, ${p.shaftFlex} shaft (${p.weightClass}).`,
  ];
  if (p.balanceMm) pros.push(`Balance ~${p.balanceMm} mm (as listed).`);
  const cons: string[] = [
    "Feel is personal—demo when possible; specs vary by production batch and region.",
  ];
  if (p.shaftFlex === "extra_stiff") {
    cons.push("Stiff setup demands clean timing; may feel harsh for developing technique.");
  }
  return { pros, cons };
}

function scoreRacket(
  p: RacketProduct,
  profile: UserProfile
): ScoredRacket {
  const reasons: { code: ReasonCode; label: string; weight: number }[] = [];
  if (!profile.level || !profile.discipline) {
    const { pros, cons } = buildProsCons(p);
    return {
      ...p,
      subscores: { style: 0, discipline: 0, level: 0, budget: 0, body: 0 },
      fitScore: 0,
      reasons: [],
      pros,
      cons,
      sourceChips: buildSourceChips(p),
    };
  }
  if (!productAllowedForUserLevel(p, profile.level)) {
    const { pros, cons } = buildProsCons(p);
    return {
      ...p,
      subscores: { style: 0, discipline: 0, level: 0, budget: 0, body: 0 },
      fitScore: 0.05,
      reasons: [],
      pros,
      cons,
      sourceChips: buildSourceChips(p),
    };
  }
  const sub = {
    style: scoreStyle(p, profile.styles, reasons),
    discipline: scoreDiscipline(p, profile.discipline, reasons),
    level: scoreLevel(p, profile.level, reasons),
    budget: scoreBudget(
      p,
      profile.body.budgetMaxUsd,
      reasons
    ),
    body: scoreBody(p, profile.level, profile.body, reasons),
  };
  const fitScore =
    sub.style * 0.24 +
    sub.discipline * 0.12 +
    sub.level * 0.26 +
    sub.budget * 0.2 +
    sub.body * 0.18;
  const { pros, cons } = buildProsCons(p);
  return {
    ...p,
    subscores: sub,
    fitScore: Math.round(fitScore * 1000) / 1000,
    reasons: reasons
      .sort((a, b) => b.weight - a.weight)
      .filter(
        (r, i, arr) => arr.findIndex((x) => x.code === r.code) === i
      )
      .slice(0, 5),
    pros,
    cons,
    sourceChips: buildSourceChips(p),
  };
}

export { CATEGORIES } from "@/lib/taxonomy";

const RACKETS = products as RacketProduct[];

export function getAllRackets(): RacketProduct[] {
  return RACKETS;
}

export function scoreProductCatalog(profile: UserProfile): ScoredRacket[] {
  if (profile.category !== "racket") return [];
  if (!profile.level || !profile.discipline) return [];
  return getAllRackets()
    .map((p) => {
      const r = scoreRacket(p, profile);
      return r as ScoredRacket;
    })
    .filter((r) => r.fitScore > 0.1)
    .sort((a, b) => b.fitScore - a.fitScore);
}

export function byId(id: string): RacketProduct | undefined {
  return RACKETS.find((p) => p.id === id);
}
