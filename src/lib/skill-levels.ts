import type { SkillLevel } from "@/lib/taxonomy";

export const COUNTRY_CODES = [
  "GENERIC",
  "CN",
  "IE",
  "GB",
  "SG",
  "US",
  "MY",
] as const;
export type CountryCode = (typeof COUNTRY_CODES)[number];

export type LevelOption = {
  value: string;
  labelEn: string;
  labelZh: string;
  internal: SkillLevel;
};

export type CountrySystem = {
  code: CountryCode;
  nameEn: string;
  nameZh: string;
  systemEn: string;
  systemZh: string;
  noteEn: string;
  noteZh: string;
  options: LevelOption[];
};

/**
 * Mappings are approximate community-language mappings to our 4-tier internal scale.
 * Sources: BWF country member federation public materials (BadmintonEngland tiers,
 * USA Badminton classes, BAM youth pathways, SBA grading, badmintoncn.com 中羽 levels).
 * Reviewed by Rui Su, Div 4 Ireland — see methodology page for limits.
 */
export const COUNTRY_SYSTEMS: Record<CountryCode, CountrySystem> = {
  GENERIC: {
    code: "GENERIC",
    nameEn: "Self-assessment",
    nameZh: "自我评估",
    systemEn: "4-tier global scale",
    systemZh: "通用四档评级",
    noteEn:
      "Pick the tier that best matches how you play in matches today, not what you aspire to.",
    noteZh: "请选择最贴近你当前比赛水平的档位，而不是目标水平。",
    options: [
      {
        value: "recreational",
        labelEn: "Recreational",
        labelZh: "休闲 / 新手",
        internal: "recreational",
      },
      { value: "club", labelEn: "Club", labelZh: "俱乐部", internal: "club" },
      {
        value: "competitive",
        labelEn: "Competitive",
        labelZh: "比赛型",
        internal: "competitive",
      },
      {
        value: "pro_oriented",
        labelEn: "Pro-oriented",
        labelZh: "专业取向",
        internal: "pro_oriented",
      },
    ],
  },
  CN: {
    code: "CN",
    nameEn: "China · Zhong Yu (中羽) 1–10",
    nameZh: "中国 · 中羽 1–10 级",
    systemEn: "Community ladder used on badmintoncn.com / 中羽 forums (1 = lowest, 10 = highest)",
    systemZh: "中羽论坛通用业余分级（1 最低，10 最高）",
    noteEn:
      "Treat 5–6 as solid club-league level, 7+ as serious provincial-club opposition.",
    noteZh: "5–6 级约为成熟俱乐部水平，7 级以上多为省级业余强队。",
    options: [
      { value: "1", labelEn: "Level 1", labelZh: "1 级", internal: "recreational" },
      { value: "2", labelEn: "Level 2", labelZh: "2 级", internal: "recreational" },
      { value: "3", labelEn: "Level 3", labelZh: "3 级", internal: "club" },
      { value: "4", labelEn: "Level 4", labelZh: "4 级", internal: "club" },
      { value: "5", labelEn: "Level 5", labelZh: "5 级", internal: "competitive" },
      { value: "6", labelEn: "Level 6", labelZh: "6 级", internal: "competitive" },
      { value: "7", labelEn: "Level 7", labelZh: "7 级", internal: "competitive" },
      { value: "8", labelEn: "Level 8", labelZh: "8 级", internal: "pro_oriented" },
      { value: "9", labelEn: "Level 9", labelZh: "9 级", internal: "pro_oriented" },
      { value: "10", labelEn: "Level 10", labelZh: "10 级", internal: "pro_oriented" },
    ],
  },
  IE: {
    code: "IE",
    nameEn: "Ireland · BUI Divisions",
    nameZh: "爱尔兰 · BUI 联赛 Division",
    systemEn:
      "Badminton Union of Ireland uses Division 1 (top) down to Division 10 (entry).",
    systemZh: "爱尔兰羽毛球联盟分级，1 级最高，10 级最低。",
    noteEn:
      "Div 4 = competitive league; Div 1–2 are inter-county / national-track players.",
    noteZh: "Div 4 已属竞技联赛；Div 1–2 多为跨郡/国家路线球员。",
    options: [
      { value: "10", labelEn: "Division 10", labelZh: "Div 10", internal: "recreational" },
      { value: "9", labelEn: "Division 9", labelZh: "Div 9", internal: "recreational" },
      { value: "8", labelEn: "Division 8", labelZh: "Div 8", internal: "club" },
      { value: "7", labelEn: "Division 7", labelZh: "Div 7", internal: "club" },
      { value: "6", labelEn: "Division 6", labelZh: "Div 6", internal: "club" },
      { value: "5", labelEn: "Division 5", labelZh: "Div 5", internal: "competitive" },
      { value: "4", labelEn: "Division 4", labelZh: "Div 4", internal: "competitive" },
      { value: "3", labelEn: "Division 3", labelZh: "Div 3", internal: "competitive" },
      { value: "2", labelEn: "Division 2", labelZh: "Div 2", internal: "pro_oriented" },
      { value: "1", labelEn: "Division 1", labelZh: "Div 1", internal: "pro_oriented" },
    ],
  },
  GB: {
    code: "GB",
    nameEn: "England · BadmintonEngland tiers",
    nameZh: "英格兰 · BE 分级",
    systemEn:
      "BadmintonEngland recognises club, county, regional, national, and international tiers.",
    systemZh: "英格兰羽协通常分为俱乐部、郡、地区、国家、国际五档。",
    noteEn:
      "County-level players typically train multiple times a week with structured coaching.",
    noteZh: "郡级以上选手通常具备每周多次的系统训练与专门教练。",
    options: [
      {
        value: "social",
        labelEn: "Social / Beginner",
        labelZh: "社交 / 入门",
        internal: "recreational",
      },
      {
        value: "club",
        labelEn: "Club league",
        labelZh: "俱乐部联赛",
        internal: "club",
      },
      {
        value: "county",
        labelEn: "County",
        labelZh: "郡级",
        internal: "competitive",
      },
      {
        value: "regional",
        labelEn: "Regional / National",
        labelZh: "地区 / 国家级",
        internal: "pro_oriented",
      },
      {
        value: "international",
        labelEn: "International",
        labelZh: "国际级",
        internal: "pro_oriented",
      },
    ],
  },
  SG: {
    code: "SG",
    nameEn: "Singapore · SBA grading",
    nameZh: "新加坡 · SBA 分级",
    systemEn:
      "Singapore Badminton Association ranks senior players from Class D up to Class A and National squad.",
    systemZh: "新加坡羽毛球协会高级组分为 D、C、B、A 级与国家队。",
    noteEn:
      "Class B and above usually means a regular tournament circuit player.",
    noteZh: "Class B 及以上通常为常态参加锦标赛的选手。",
    options: [
      {
        value: "social",
        labelEn: "Recreational",
        labelZh: "休闲",
        internal: "recreational",
      },
      {
        value: "D",
        labelEn: "Class D",
        labelZh: "D 级",
        internal: "club",
      },
      {
        value: "C",
        labelEn: "Class C",
        labelZh: "C 级",
        internal: "club",
      },
      {
        value: "B",
        labelEn: "Class B",
        labelZh: "B 级",
        internal: "competitive",
      },
      {
        value: "A",
        labelEn: "Class A",
        labelZh: "A 级",
        internal: "competitive",
      },
      {
        value: "national",
        labelEn: "National squad",
        labelZh: "国家队",
        internal: "pro_oriented",
      },
    ],
  },
  US: {
    code: "US",
    nameEn: "USA · USAB classes",
    nameZh: "美国 · USAB 分级",
    systemEn:
      "USA Badminton sanctioned tournaments commonly group adults as E, D, C, B, A, and Open.",
    systemZh: "美国羽毛球协会赛事通常分为 E、D、C、B、A 与 Open 公开组。",
    noteEn:
      "Open / A entries usually include ex-collegiate, sectional, and national-team-track players.",
    noteZh: "A 级与 Open 组多为大学队、地区队及国家队梯队选手。",
    options: [
      { value: "social", labelEn: "Beginner", labelZh: "入门", internal: "recreational" },
      { value: "E", labelEn: "Class E", labelZh: "E 级", internal: "recreational" },
      { value: "D", labelEn: "Class D", labelZh: "D 级", internal: "club" },
      { value: "C", labelEn: "Class C", labelZh: "C 级", internal: "club" },
      { value: "B", labelEn: "Class B", labelZh: "B 级", internal: "competitive" },
      { value: "A", labelEn: "Class A", labelZh: "A 级", internal: "competitive" },
      { value: "open", labelEn: "Open", labelZh: "公开组", internal: "pro_oriented" },
    ],
  },
  MY: {
    code: "MY",
    nameEn: "Malaysia · BAM pathway",
    nameZh: "马来西亚 · BAM 体系",
    systemEn:
      "Players typically progress from club to district, state, BAM development, and national elite squads.",
    systemZh:
      "马来西亚通常分为俱乐部、地区、州、BAM 后备及国家队五档。",
    noteEn:
      "State-level or above almost always implies daily training under a certified coach.",
    noteZh: "州级以上多为每日由认证教练带训的选手。",
    options: [
      { value: "club", labelEn: "Club", labelZh: "俱乐部", internal: "club" },
      {
        value: "district",
        labelEn: "District",
        labelZh: "地区级",
        internal: "club",
      },
      {
        value: "state",
        labelEn: "State",
        labelZh: "州级",
        internal: "competitive",
      },
      {
        value: "bam",
        labelEn: "BAM development",
        labelZh: "BAM 后备",
        internal: "pro_oriented",
      },
      {
        value: "national",
        labelEn: "National elite",
        labelZh: "国家队",
        internal: "pro_oriented",
      },
    ],
  },
};

export const COUNTRY_LIST: CountrySystem[] = COUNTRY_CODES.map(
  (code) => COUNTRY_SYSTEMS[code]
);

export function getCountrySystem(code: CountryCode): CountrySystem {
  return COUNTRY_SYSTEMS[code];
}

export function getInternalLevel(
  code: CountryCode,
  value: string | null | undefined
): SkillLevel | null {
  if (!value) return null;
  const system = COUNTRY_SYSTEMS[code];
  const option = system.options.find((o) => o.value === value);
  return option ? option.internal : null;
}
