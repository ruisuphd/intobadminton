import products from "@/data/products.json";
import { getEvidenceSummary } from "@/lib/review-evidence";
import { REASON_LABELS, type ReasonCode } from "@/lib/reason-codes";
import { sourceAuthorityForProduct } from "@/lib/source-authority";
import { humanize } from "@/lib/text";
import type {
  BagProduct,
  GripProduct,
  ProductRecord,
  RacketProduct,
  ScoredProduct,
  ScoredRacket,
  ShoeProduct,
  ShuttleProduct,
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

function isShuttle(p: ProductRecord): p is ShuttleProduct {
  return p.category === "shuttle";
}

function isGrip(p: ProductRecord): p is GripProduct {
  return p.category === "grip";
}

export function styleHeadPreference(styles: PlayStyle[]): "heavy" | "light" | "even" {
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
  // When the user skips style selection, treat them as "balanced" rather than
  // returning a uniform low score (0.4 previously) that dampened the whole
  // catalogue. Balanced-by-default surfaces even-balance rackets first, which
  // is the right neutral pick when intent is missing.
  const want = styleHeadPreference(styles.length === 0 ? ["balanced"] : styles);
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
  if (p.shaftFlex === "stiff" || p.shaftFlex === "extra_stiff")
    pushReason(reasons, "MATCH_LEVEL_STIFF", 0.6);
  else pushReason(reasons, "MATCH_LEVEL_FLEX", 0.6);
  return 0.82;
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
  if (budgetMax == null || !Number.isFinite(budgetMax) || budgetMax <= 0) {
    return 0.5;
  }
  if (p.priceUsd <= budgetMax) {
    pushReason(reasons, "BUDGET_FIT", 0.4);
    return 0.9;
  }
  // Smooth exponential decay above budget rather than a step from 0.55 to 0.15
  // at 1.12×. A $295 racket against a $260 budget used to jump from "stretch
  // (0.55)" to "over (0.15)" in a single dollar; the curve now degrades
  // monotonically and keeps the BUDGET_STRETCH reason for moderate overage.
  const overage = (p.priceUsd - budgetMax) / budgetMax;
  if (overage <= 0.12) {
    pushReason(reasons, "BUDGET_STRETCH", 0.3);
  }
  const decayed = Math.max(0.1, Math.min(0.9, 1 - overage ** 1.4));
  return decayed;
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
  const sourceAuthority = sourceAuthorityForProduct(p);
  const chips: { type: SourceChip; label: string; href?: string }[] = [
    {
      type: sourceAuthority.canVerifySpecs
        ? "manufacturer_spec"
        : "source_status",
      label: `${sourceAuthority.label} · ${humanize(p.verificationStatus)} · ${p.lastVerifiedAt}`,
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
      `${p.brand} ${p.name}: ${humanize(p.headWeight)} head, ${humanize(p.shaftFlex)} shaft (${p.weightClass}).`
    );
    if (p.balanceMm) pros.push(`Balance ~${p.balanceMm} mm (as listed).`);
    pros.push(
      `Common variants: ${p.weightVariants.join("/")} · grip ${p.gripSizes.join("/")}.`
    );
  } else if (isString(p)) {
    pros.push(
      `${p.brand} ${p.name}: ${p.gaugeMm.toFixed(2)} mm, ${p.feel} feel, ${humanize(p.repulsion)} repulsion.`
    );
    pros.push(`Practical tension range: ${p.tensionRangeLbs.min}-${p.tensionRangeLbs.max} lbs.`);
  } else if (isShoe(p)) {
    pros.push(
      `${p.brand} ${p.name}: ${humanize(p.fitWidth)} fit, ${humanize(p.stability)} stability, ${p.cushioning} cushioning.`
    );
    pros.push(`Court feel: ${p.weightFeel}; wide option: ${p.hasWideOption ? "yes" : "not listed"}.`);
  } else if (isBag(p)) {
    pros.push(
      `${p.brand} ${p.name}: ${p.sizeClass} ${humanize(p.carryStyle)} for up to ${p.capacityRackets} rackets.`
    );
    pros.push(
      `${p.hasShoeCompartment ? "Has" : "No"} shoe compartment · ${p.hasWetCompartment ? "has" : "no"} wet compartment.`
    );
  } else if (isShuttle(p)) {
    pros.push(
      `${p.brand} ${p.name}: ${p.material.replace(/_/g, " ")}, ${p.durabilityTier} durability tier.`
    );
    pros.push(
      `${p.unitsPerTube} per tube · ${p.bwfApproved ? "BWF approved" : "not listed as BWF approved"}.`
    );
  } else if (isGrip(p)) {
    pros.push(
      `${p.brand} ${p.name}: ${humanize(p.gripType)} grip, ${p.feel} feel, ${p.sweatAbsorption} sweat absorption.`
    );
    pros.push(
      `${p.packCount} per pack${p.thicknessMm ? ` · ${p.thicknessMm} mm listed thickness` : ""}.`
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
    cons.push("Thin strings can feel lively but may punish off-centre hits or poor grommet condition.");
  }
  if (isShoe(p)) {
    cons.push("Shoes should be tried with badminton socks and lateral movement, not just standing still.");
  }
  if (isBag(p)) {
    cons.push("Capacity depends on towel, shoe size, shuttle tube, and wet-clothes habits.");
  }
  if (isShuttle(p)) {
    cons.push("Match shuttle speed to hall temperature, humidity, and local league rules before bulk buying.");
  }
  if (isGrip(p)) {
    cons.push("Grip feel changes with sweat, towel use, overgrip layering, and replacement frequency.");
  }
  return { pros, cons };
}

function editorSource(p: ProductRecord): ScoredProduct["evidenceProfile"]["editorSignal"]["source"] {
  if (isRacket(p)) {
    return sourceAuthorityForProduct(p).canVerifySpecs
      ? p.shaftFlexSource
      : "editor_estimate";
  }
  if (p.verificationStatus === "official_verified") return "official";
  if (p.marketSignals && p.marketSignals.length > 0) return "community_signal";
  return "editor_estimate";
}

function buildEvidenceProfile(p: ProductRecord): ScoredProduct["evidenceProfile"] {
  const reviewEvidence = getEvidenceSummary(p.id);
  const sourceAuthority = sourceAuthorityForProduct(p);
  return {
    officialSpec: {
      status: p.verificationStatus,
      lastVerifiedAt: p.lastVerifiedAt,
      href: p.officialSourceUrl,
      sourceAuthority,
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
  if (!evidenceProfile.officialSpec.sourceAuthority.canVerifySpecs) {
    return {
      level: "needs_verification",
      score: 0.3,
      label: "Needs official product source",
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
  // Narrowed band (P2): verified +4% / official_no_page −4% / needs_review −8%
  // (or −4% for a recreational user whose budget covers it — they're less
  // sensitive to spec confidence). The previous asymmetric −14% / +4% band
  // overpunished the catalogue while source-authority work was in progress.
  let base: number;
  if (
    p.verificationStatus === "needs_review" &&
    profile.level === "recreational" &&
    budgetMax != null &&
    p.priceUsd <= budgetMax
  ) {
    base = 0.96;
  } else if (p.verificationStatus === "needs_review") {
    base = 0.92;
  } else if (!sourceAuthorityForProduct(p).canVerifySpecs) {
    base = 0.96;
  } else if (p.verificationStatus === "official_verified") {
    base = 1.04;
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

  // Width fit is asymmetric: a wide shoe on a normal foot is "mildly loose"
  // (still wearable with thicker socks / better lacing); a normal shoe on a
  // wide foot is a real misfit that hurts. The previous logic collapsed both
  // to 0.28. Split them so the wide-on-normal case stays surfacable.
  const widthMatch = (() => {
    if (footWidth == null) return 0.58;
    if (p.fitWidth === footWidth) return 0.94;
    if (
      footWidth === "wide" &&
      (p.fitWidth === "wide_available" || p.hasWideOption)
    ) {
      return 0.94;
    }
    if (p.fitWidth === "normal" && footWidth !== "wide") return 0.72;
    // Wide shoe on narrow/normal foot: mild looseness, still surfacable.
    if (
      (p.fitWidth === "wide" || p.fitWidth === "wide_available") &&
      footWidth !== "wide"
    ) {
      return 0.55;
    }
    // Normal shoe on wide foot — real misfit.
    return 0.28;
  })();
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

function shuttleTierScore(p: ShuttleProduct, level: SkillLevel): number {
  if (level === "pro_oriented") {
    return p.durabilityTier === "pro" || p.durabilityTier === "tournament"
      ? 0.9
      : 0.45;
  }
  if (level === "competitive") {
    return p.durabilityTier === "tournament" || p.durabilityTier === "club"
      ? 0.86
      : p.durabilityTier === "pro"
        ? 0.72
        : 0.45;
  }
  if (level === "club") {
    return p.durabilityTier === "club" || p.durabilityTier === "practice"
      ? 0.84
      : 0.58;
  }
  return p.durabilityTier === "practice" || !p.feathered ? 0.88 : 0.48;
}

function scoreShuttle(p: ShuttleProduct, profile: UserProfile): ScoredProduct {
  const reasons: { code: string; label: string; weight: number }[] = [];
  const level = profile.level ?? "club";
  const tier = shuttleTierScore(p, level);
  if (tier >= 0.8) pushReason(reasons, "SHUTTLE_LEVEL_MATCH", 0.72);
  const budget = scoreBudget(p, profile.body.budgetMaxUsd, reasons);
  if (budget >= 0.85) pushReason(reasons, "SHUTTLE_BUDGET_FIT", 0.5);
  const discipline =
    profile.discipline === "singles"
      ? p.durabilityTier === "tournament" || p.durabilityTier === "pro"
        ? 0.82
        : 0.64
      : p.durabilityTier === "club" || p.durabilityTier === "practice"
        ? 0.8
        : 0.68;
  const style =
    profile.styles.includes("smash_heavy") && p.feathered
      ? 0.78
      : !p.feathered && level === "recreational"
        ? 0.82
        : 0.64;
  const body = p.bwfApproved ? 0.72 : 0.58;
  const sub = {
    style,
    discipline,
    level: tier,
    budget,
    body,
  };
  const rawFitScore =
    sub.style * 0.14 +
    sub.discipline * 0.18 +
    sub.level * 0.34 +
    sub.budget * 0.24 +
    sub.body * 0.1;
  return finalizeScore(p, rawFitScore, sub, reasons);
}

function scoreGrip(p: GripProduct, profile: UserProfile): ScoredProduct {
  const reasons: { code: string; label: string; weight: number }[] = [];
  const wantsAbsorption =
    profile.styles.includes("front_court") ||
    profile.styles.includes("defensive") ||
    profile.discipline === "doubles" ||
    profile.discipline === "mixed";
  const absorption =
    wantsAbsorption && p.sweatAbsorption === "high"
      ? 0.9
      : wantsAbsorption && p.sweatAbsorption === "medium"
        ? 0.74
        : 0.6;
  if (absorption >= 0.74) pushReason(reasons, "GRIP_SWEAT_ABSORPTION", 0.7);
  const packValue = p.packCount >= 3 ? 0.88 : 0.58;
  if (packValue >= 0.8) pushReason(reasons, "GRIP_PACK_VALUE", 0.5);
  const budget = scoreBudget(p, profile.body.budgetMaxUsd, reasons);
  const style =
    p.feel === "tacky" && profile.styles.includes("offensive")
      ? 0.78
      : p.feel === "towel" && wantsAbsorption
        ? 0.8
        : 0.66;
  const sub = {
    style,
    discipline: absorption,
    level: productAllowedForUserLevel(p, profile.level ?? "club") ? 0.78 : 0.32,
    budget,
    body: packValue,
  };
  const rawFitScore =
    sub.style * 0.22 +
    sub.discipline * 0.24 +
    sub.level * 0.14 +
    sub.budget * 0.2 +
    sub.body * 0.2;
  return finalizeScore(p, rawFitScore, sub, reasons);
}

function finalizeScore(
  p: ProductRecord,
  rawFitScore: number,
  sub: ScoredProduct["subscores"],
  reasons: { code: string; label: string; weight: number }[]
): ScoredProduct {
  // Narrowed verification band (P2) to match `verificationMultiplier` above
  // and stop punishing the catalogue while source-authority work is in flight.
  const verification =
    p.verificationStatus === "needs_review"
      ? 0.92
      : !sourceAuthorityForProduct(p).canVerifySpecs
        ? 0.96
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
      if (isShuttle(p)) return scoreShuttle(p, profile);
      if (isGrip(p)) return scoreGrip(p, profile);
      return null;
    })
    .filter((r): r is ScoredProduct => r != null)
    .filter((r) => r.fitScore > 0.1)
    .sort((a, b) => {
      // Stable, deterministic ordering on ties so the same profile always
      // produces the same shortlist across builds — important for
      // sharable URL deep-linking (P2) and for caching/screenshot tests.
      // Primary: higher fit score.
      // Secondary: higher confidence (verified rows outrank ambiguous ones).
      // Tertiary: lower price (better value when fit and confidence tie).
      // Quaternary: stable lexicographic id.
      if (b.fitScore !== a.fitScore) return b.fitScore - a.fitScore;
      if (b.confidence.score !== a.confidence.score) {
        return b.confidence.score - a.confidence.score;
      }
      if (a.priceUsd !== b.priceUsd) return a.priceUsd - b.priceUsd;
      return a.id.localeCompare(b.id);
    });
}

export function byId(id: string): ProductRecord | undefined {
  return PRODUCT_CATALOG.find((p) => p.id === id);
}

/** Score a single catalog row for a completed profile (e.g. review-page preview). */
export function scoreOneProduct(
  product: ProductRecord,
  profile: UserProfile
): ScoredProduct | null {
  if (!profile.level || !profile.discipline || profile.category !== product.category) {
    return null;
  }
  if (isRacket(product)) return scoreRacket(product, profile);
  if (isString(product)) return scoreString(product, profile);
  if (isShoe(product)) return scoreShoe(product, profile);
  if (isBag(product)) return scoreBag(product, profile);
  if (isShuttle(product)) return scoreShuttle(product, profile);
  if (isGrip(product)) return scoreGrip(product, profile);
  return null;
}
