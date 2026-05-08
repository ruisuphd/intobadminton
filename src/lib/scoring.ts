import products from "@/data/products.json";
import { getEvidenceSummary } from "@/lib/review-evidence";
import { REASON_LABELS, type ReasonCode } from "@/lib/reason-codes";
import type {
  BagProduct,
  ProductRecord,
  RacketProduct,
  ScoredProduct,
  ScoredRacket,
  ShoeProduct,
  SourceChip,
  StringProduct,
} from "@/lib/types/product";
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
  out: { code: string; label: string; weight: number }[],
  code: ReasonCode,
  weight: number
) {
  if (weight <= 0) return;
  out.push({ code, label: REASON_LABELS[code], weight });
}

function isRacket(p: ProductRecord): p is RacketProduct {
  return p.category === "racket";
}

function isString(p: ProductRecord): p is StringProduct {
  return p.category === "string";
}

function isShoe(p: ProductRecord): p is ShoeProduct {
  return p.category === "shoes";
}

function isBag(p: ProductRecord): p is BagProduct {
  return p.category === "bag";
}

function styleHeadPreference(styles: PlayStyle[]): "heavy" | "light" | "even" {
  if (styles.includes("front_court") && !styles.includes("smash_heavy")) {
    return "light";
  }
  if (styles.some((s) => ["offensive", "smash_heavy"].includes(s)))
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
  reasons: { code: string; label: string; weight: number }[]
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
  reasons: { code: string; label: string; weight: number }[]
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
  reasons: { code: string; label: string; weight: number }[]
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
  p: ProductRecord,
  userLevel: SkillLevel
): boolean {
  const u = levelIndex(userLevel);
  return (
    u >= levelIndex(p.minRecommendedLevel) &&
    u <= levelIndex(p.maxRecommendedLevel)
  );
}

function scoreBudget(
  p: ProductRecord,
  budgetMax: number | undefined,
  reasons: { code: string; label: string; weight: number }[]
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
  reasons: { code: string; label: string; weight: number }[]
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
  } else if (inj.length > 0 && p.shaftFlex === "stiff") {
    // Stiff (not extra-stiff) shafts still ask more of joints than medium/flex.
    // Smaller penalty so the racket can still surface, but reflected in score.
    pushReason(reasons, "INJURY_AVOID_ULTRA_STIFF", 0.25);
    s -= 0.1;
  }
  if (userLevel === "recreational" && p.shaftFlex === "extra_stiff") s -= 0.1;
  return Math.max(0, Math.min(1, s));
}

function buildSourceChips(p: ProductRecord): { type: SourceChip; label: string; href?: string }[] {
  const chips: { type: SourceChip; label: string; href?: string }[] = [
    {
      type: "manufacturer_spec",
      label: `${p.verificationStatus.replace("_", " ")} · ${p.lastVerifiedAt}`,
      href: p.officialSourceUrl,
    },
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
  if (p.resale) {
    chips.push({
      type: "market_signal",
      label: `${p.resale.depreciationPct}% depreciation est. · ${p.resale.confidence}`,
    });
  }
  return chips;
}

function buildProsCons(p: ProductRecord): { pros: string[]; cons: string[] } {
  const pros: string[] = [];
  if (isRacket(p)) {
    pros.push(
      `${p.brand} ${p.name}: ${p.headWeight.replace("_", " ")} head, ${p.shaftFlex} shaft (${p.weightClass}).`
    );
    if (p.balanceMm) pros.push(`Balance ~${p.balanceMm} mm (as listed).`);
    pros.push(
      `Common variants: ${p.weightVariants.join("/")} · grip ${p.gripSizes.join("/")}.`
    );
  } else if (isString(p)) {
    pros.push(
      `${p.brand} ${p.name}: ${p.gaugeMm.toFixed(2)} mm, ${p.feel} feel, ${p.repulsion.replace("_", " ")} repulsion.`
    );
    pros.push(`Practical tension range: ${p.tensionRangeLbs.min}-${p.tensionRangeLbs.max} lbs.`);
  } else if (isShoe(p)) {
    pros.push(
      `${p.brand} ${p.name}: ${p.fitWidth.replace("_", " ")} fit, ${p.stability.replace("_", " ")} stability, ${p.cushioning} cushioning.`
    );
    pros.push(`Court feel: ${p.weightFeel}; wide option: ${p.hasWideOption ? "yes" : "not listed"}.`);
  } else if (isBag(p)) {
    pros.push(
      `${p.brand} ${p.name}: ${p.sizeClass} ${p.carryStyle.replace("_", " ")} for up to ${p.capacityRackets} rackets.`
    );
    pros.push(
      `${p.hasShoeCompartment ? "Has" : "No"} shoe compartment · ${p.hasWetCompartment ? "has" : "no"} wet compartment.`
    );
  }
  const cons: string[] = [
    "Fit is personal; verify regional specs, seller authenticity, and current availability before purchase.",
  ];
  if (p.verificationStatus === "needs_review") {
    cons.push("This row still needs final official page-level verification.");
  }
  if (isRacket(p) && p.shaftFlex === "extra_stiff") {
    cons.push("Stiff setup demands clean timing; may feel harsh for developing technique.");
  }
  if (isString(p) && p.gaugeMm <= 0.63) {
    cons.push("Thin strings can feel lively but may punish off-center hits or poor grommet condition.");
  }
  if (isShoe(p)) {
    cons.push("Shoes should be tried with badminton socks and lateral movement, not just standing still.");
  }
  if (isBag(p)) {
    cons.push("Capacity depends on towel, shoe size, shuttle tube, and wet-clothes habits.");
  }
  return { pros, cons };
}

function editorSource(p: ProductRecord): ScoredProduct["evidenceProfile"]["editorSignal"]["source"] {
  if (isRacket(p)) return p.shaftFlexSource;
  if (p.verificationStatus === "official_verified") return "official";
  if (p.marketSignals && p.marketSignals.length > 0) return "community_signal";
  return "editor_estimate";
}

function buildEvidenceProfile(p: ProductRecord): ScoredProduct["evidenceProfile"] {
  const reviewEvidence = getEvidenceSummary(p.id);
  return {
    officialSpec: {
      status: p.verificationStatus,
      lastVerifiedAt: p.lastVerifiedAt,
      href: p.officialSourceUrl,
    },
    editorSignal: {
      note: p.editorNote,
      source: editorSource(p),
    },
    reviewEvidence: {
      ...reviewEvidence,
      displayPolicy: "metadata_summary_link_only",
    },
  };
}

function buildConfidence(
  p: ProductRecord,
  fitScore: number,
  evidenceProfile: ScoredProduct["evidenceProfile"]
): ScoredProduct["confidence"] {
  if (p.verificationStatus === "needs_review") {
    return {
      level: "needs_verification",
      score: 0.25,
      label: "Needs official verification",
    };
  }
  const officialBase = p.verificationStatus === "official_verified" ? 0.62 : 0.5;
  const reviewBoost =
    evidenceProfile.reviewEvidence.confidence === "medium"
      ? 0.18
      : evidenceProfile.reviewEvidence.confidence === "low"
        ? 0.08
        : 0;
  const fitBoost = fitScore >= 0.78 ? 0.16 : fitScore >= 0.62 ? 0.1 : 0.04;
  const score = Math.min(1, officialBase + reviewBoost + fitBoost);
  if (score >= 0.78) return { level: "high", score, label: "High confidence" };
  if (score >= 0.58)
    return { level: "medium", score, label: "Medium confidence" };
  return { level: "low", score, label: "Low confidence" };
}

function resaleBonus(p: ProductRecord): number {
  // Liquid resale lowers real cost of ownership. Tiny multiplier so it never
  // dominates style / level / budget signals.
  if (!p.resale) return 1;
  if (p.resale.confidence === "high") return 1.02;
  if (p.resale.confidence === "medium") return 1.01;
  return 1;
}

function verificationMultiplier(p: RacketProduct, profile: UserProfile): number {
  const budgetMax = profile.body.budgetMaxUsd;
  let base: number;
  if (
    p.verificationStatus === "needs_review" &&
    profile.level === "recreational" &&
    budgetMax != null &&
    p.priceUsd <= budgetMax
  ) {
    base = 0.96;
  } else if (p.verificationStatus === "needs_review") {
    base = 0.86;
  } else if (p.verificationStatus === "official_verified") {
    base = 1.03;
  } else {
    base = 1;
  }
  return base * resaleBonus(p);
}

function scoreRacket(
  p: RacketProduct,
  profile: UserProfile
): ScoredRacket {
  const reasons: { code: string; label: string; weight: number }[] = [];
  if (!profile.level || !profile.discipline) {
    const { pros, cons } = buildProsCons(p);
    const evidenceProfile = buildEvidenceProfile(p);
    return {
      ...p,
      subscores: { style: 0, discipline: 0, level: 0, budget: 0, body: 0 },
      fitScore: 0,
      confidence: buildConfidence(p, 0, evidenceProfile),
      evidenceProfile,
      reasons: [],
      pros,
      cons,
      sourceChips: buildSourceChips(p),
    };
  }
  if (!productAllowedForUserLevel(p, profile.level)) {
    const { pros, cons } = buildProsCons(p);
    const evidenceProfile = buildEvidenceProfile(p);
    return {
      ...p,
      subscores: { style: 0, discipline: 0, level: 0, budget: 0, body: 0 },
      fitScore: 0.05,
      confidence: buildConfidence(p, 0.05, evidenceProfile),
      evidenceProfile,
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
  const rawFitScore =
    sub.style * 0.24 +
    sub.discipline * 0.12 +
    sub.level * 0.26 +
    sub.budget * 0.2 +
    sub.body * 0.18;
  const fitScore = Math.min(1, rawFitScore * verificationMultiplier(p, profile));
  const { pros, cons } = buildProsCons(p);
  const evidenceProfile = buildEvidenceProfile(p);
  return {
    ...p,
    subscores: sub,
    fitScore: Math.round(fitScore * 1000) / 1000,
    confidence: buildConfidence(p, fitScore, evidenceProfile),
    evidenceProfile,
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

function scoreString(
  p: StringProduct,
  profile: UserProfile
): ScoredProduct {
  const reasons: { code: string; label: string; weight: number }[] = [];
  const wantsControl =
    profile.styles.includes("defensive") ||
    profile.styles.includes("front_court") ||
    profile.styles.includes("balanced");
  const wantsRepulsion =
    profile.styles.includes("offensive") ||
    profile.styles.includes("smash_heavy") ||
    profile.level === "recreational";
  let style = 0.45;
  if (wantsControl && (p.control === "high" || p.control === "very_high")) {
    style += 0.28;
    pushReason(reasons, "STRING_PATTERN_CONTROL", 0.65);
  }
  if (
    wantsRepulsion &&
    (p.repulsion === "high" || p.repulsion === "very_high")
  ) {
    style += 0.24;
    pushReason(reasons, "STRING_REPULSION_HELP", 0.62);
  }
  if (
    (profile.discipline === "doubles" || profile.discipline === "mixed") &&
    (p.durability === "high" || p.durability === "very_high")
  ) {
    style += 0.12;
    pushReason(reasons, "STRING_DURABILITY_VALUE", 0.52);
  }
  const tension = profile.body.stringTensionLbs;
  const tensionScore =
    tension == null
      ? 0.55
      : tension >= p.tensionRangeLbs.min && tension <= p.tensionRangeLbs.max
        ? 0.92
        : 0.35;
  if (tensionScore > 0.8) pushReason(reasons, "STRING_TENSION_MATCH", 0.5);
  const levelScore = productAllowedForUserLevel(p, profile.level ?? "club")
    ? 0.82
    : 0.25;
  const sub = {
    style: Math.min(1, style),
    discipline:
      profile.discipline === "doubles" || profile.discipline === "mixed"
        ? 0.72
        : 0.62,
    level: levelScore,
    budget: scoreBudget(p, profile.body.budgetMaxUsd, reasons),
    body: tensionScore,
  };
  const rawFitScore =
    sub.style * 0.28 +
    sub.discipline * 0.1 +
    sub.level * 0.16 +
    sub.budget * 0.18 +
    sub.body * 0.28;
  return finalizeScore(p, rawFitScore, sub, reasons);
}

function scoreShoe(p: ShoeProduct, profile: UserProfile): ScoredProduct {
  const reasons: { code: string; label: string; weight: number }[] = [];
  const footWidth = profile.body.footWidth;
  const widthMatch =
    footWidth == null
      ? 0.58
      : p.fitWidth === footWidth ||
          (footWidth === "wide" &&
            (p.fitWidth === "wide_available" || p.hasWideOption))
        ? 0.94
        : p.fitWidth === "normal" && footWidth !== "wide"
          ? 0.72
          : 0.28;
  if (widthMatch >= 0.72) pushReason(reasons, "SHOE_WIDTH_MATCH", 0.8);

  const injuryFlags = profile.body.injuryFlags.filter((x) => x !== "none");
  let comfort = 0.55;
  if (
    injuryFlags.some((x) => x === "ankle" || x === "knee") &&
    (p.stability === "high" || p.stability === "very_high")
  ) {
    comfort += 0.24;
    pushReason(reasons, "SHOE_STABILITY_SUPPORT", 0.72);
  }
  if (
    injuryFlags.some((x) => x === "knee" || x === "heel") &&
    p.cushioning === "high"
  ) {
    comfort += 0.2;
    pushReason(reasons, "SHOE_CUSHION_COMFORT", 0.65);
  }
  if (injuryFlags.length === 0 && p.weightFeel === "fast") comfort += 0.12;
  const discipline =
    profile.discipline === "doubles" || profile.discipline === "mixed"
      ? p.stability === "very_high" || p.weightFeel !== "protective"
        ? 0.82
        : 0.65
      : 0.68;
  const sub = {
    style: widthMatch,
    discipline,
    level: productAllowedForUserLevel(p, profile.level ?? "club") ? 0.82 : 0.3,
    budget: scoreBudget(p, profile.body.budgetMaxUsd, reasons),
    body: Math.min(1, comfort),
  };
  const rawFitScore =
    sub.style * 0.3 +
    sub.discipline * 0.14 +
    sub.level * 0.12 +
    sub.budget * 0.16 +
    sub.body * 0.28;
  return finalizeScore(p, rawFitScore, sub, reasons);
}

function scoreBag(p: BagProduct, profile: UserProfile): ScoredProduct {
  const reasons: { code: string; label: string; weight: number }[] = [];
  const clubLoad =
    profile.discipline === "mixed" ||
    profile.discipline === "doubles" ||
    profile.level === "club" ||
    profile.level === "competitive";
  const capacity = clubLoad
    ? p.capacityRackets >= 4
      ? 0.9
      : 0.45
    : p.sizeClass === "compact"
      ? 0.82
      : 0.66;
  if (capacity > 0.75) pushReason(reasons, "BAG_CAPACITY_MATCH", 0.58);
  const compartments =
    p.hasShoeCompartment && p.hasWetCompartment
      ? 0.92
      : p.hasShoeCompartment || p.hasWetCompartment
        ? 0.72
        : 0.42;
  if (compartments > 0.7) {
    pushReason(reasons, "BAG_SHOE_WET_COMPARTMENTS", 0.7);
  }
  const style = profile.styles.includes("front_court") ? 0.62 : 0.7;
  const sub = {
    style,
    discipline: capacity,
    level: productAllowedForUserLevel(p, profile.level ?? "club") ? 0.8 : 0.3,
    budget: scoreBudget(p, profile.body.budgetMaxUsd, reasons),
    body: compartments,
  };
  const rawFitScore =
    sub.style * 0.1 +
    sub.discipline * 0.28 +
    sub.level * 0.12 +
    sub.budget * 0.2 +
    sub.body * 0.3;
  return finalizeScore(p, rawFitScore, sub, reasons);
}

function finalizeScore(
  p: ProductRecord,
  rawFitScore: number,
  sub: ScoredProduct["subscores"],
  reasons: { code: string; label: string; weight: number }[]
): ScoredProduct {
  const verification =
    p.verificationStatus === "needs_review"
      ? 0.9
      : p.verificationStatus === "official_verified"
        ? 1.04
        : 1;
  const fitScore = Math.min(1, rawFitScore * verification * resaleBonus(p));
  const { pros, cons } = buildProsCons(p);
  const evidenceProfile = buildEvidenceProfile(p);
  return {
    ...p,
    subscores: sub,
    fitScore: Math.round(fitScore * 1000) / 1000,
    confidence: buildConfidence(p, fitScore, evidenceProfile),
    evidenceProfile,
    reasons: reasons
      .sort((a, b) => b.weight - a.weight)
      .filter((r, i, arr) => arr.findIndex((x) => x.code === r.code) === i)
      .slice(0, 5),
    pros,
    cons,
    sourceChips: buildSourceChips(p),
  };
}

export { CATEGORIES } from "@/lib/taxonomy";

const PRODUCT_CATALOG = products as ProductRecord[];
const RACKETS = PRODUCT_CATALOG.filter(isRacket);

export function getAllRackets(): RacketProduct[] {
  return RACKETS;
}

export function getAllProducts(): ProductRecord[] {
  return PRODUCT_CATALOG;
}

export function scoreProductCatalog(profile: UserProfile): ScoredProduct[] {
  if (!profile.level || !profile.discipline) return [];
  return PRODUCT_CATALOG.filter((p) => p.category === profile.category)
    .map((p) => {
      if (isRacket(p)) return scoreRacket(p, profile);
      if (isString(p)) return scoreString(p, profile);
      if (isShoe(p)) return scoreShoe(p, profile);
      if (isBag(p)) return scoreBag(p, profile);
      return null;
    })
    .filter((r): r is ScoredProduct => r != null)
    .filter((r) => r.fitScore > 0.1)
    .sort((a, b) => b.fitScore - a.fitScore);
}

export function byId(id: string): ProductRecord | undefined {
  return PRODUCT_CATALOG.find((p) => p.id === id);
}
