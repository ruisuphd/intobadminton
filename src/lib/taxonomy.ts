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
});
