/**
 * Input taxonomy and recommendation I/O (plan §2.1, §2.2).
 * Finder inputs shared by racket, string, shoe, grip, and bag recommendations.
 */

export const SKILL_LEVELS = [
  "recreational",
  "club",
  "competitive",
  "pro_oriented",
] as const;
export type SkillLevel = (typeof SKILL_LEVELS)[number];

export const DISCIPLINES = ["singles", "doubles", "mixed"] as const;
export type Discipline = (typeof DISCIPLINES)[number];

export const PLAY_STYLES = [
  "offensive",
  "balanced",
  "defensive",
  "front_court",
  "smash_heavy",
] as const;
export type PlayStyle = (typeof PLAY_STYLES)[number];

export const CATEGORIES = [
  "racket",
  "shoes",
  "string",
  "grip",
  "bag",
  "shuttle",
  "accessory",
] as const;
export type EquipmentCategory = (typeof CATEGORIES)[number];

export const FOOT_WIDTH = ["narrow", "normal", "wide"] as const;
export type FootWidth = (typeof FOOT_WIDTH)[number];

export const INJURY_FLAGS = ["knee", "ankle", "heel", "none"] as const;
export type InjuryFlag = (typeof INJURY_FLAGS)[number];

export type BodyProfile = {
  heightCm?: number;
  weightKg?: number;
  footWidth?: FootWidth;
  budgetMaxUsd?: number;
  stringTensionLbs?: number;
  injuryFlags: InjuryFlag[];
};

/**
 * Optional player-context fields. Captured in the quiz to enrich recommendations
 * (e.g., "you're upgrading from X — here's what changes"). Not required.
 */
export type PlayerContext = {
  /** Free-form: "Yonex Astrox 88S Pro 2024" or "Halbertec 8000". */
  currentRacket?: string;
  /** Free-form: "BG80", "Aerobite", "Li-Ning No.5". */
  currentStrings?: string;
  /** Lbs. Number 18–32 typical. */
  currentTensionLbs?: number;
  /** Free-form: "Yonex Comfort Z3", "Mizuno Wave Claw 2". */
  currentShoes?: string;
};

export type UserProfile = {
  level: SkillLevel | null;
  /** Optional ISO-style country code keyed in skill-levels.ts (e.g. "CN", "IE"). */
  countryCode?: string;
  /** Country-specific level value (e.g. "5" for 中羽 5, "4" for IE Div 4). */
  countryLevel?: string;
  discipline: Discipline | null;
  styles: PlayStyle[];
  category: EquipmentCategory | null;
  body: BodyProfile;
  /** Optional context: what the user currently uses. Not required. */
  context?: PlayerContext;
};

export const defaultBodyProfile = (): BodyProfile => ({
  injuryFlags: ["none"],
});

export const defaultUserProfile = (): UserProfile => ({
  level: null,
  countryCode: "GENERIC",
  countryLevel: undefined,
  discipline: null,
  styles: [],
  category: "racket",
  body: defaultBodyProfile(),
  context: {},
});
