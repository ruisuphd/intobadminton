import type { SiteLocale } from "@/lib/locale";

export type ResearchSignal = {
  source: string;
  href: string;
  category: "rackets" | "strings" | "shoes" | "bags" | "resale";
  strength: "high" | "medium" | "low";
  en: string;
  zh: string;
};

export const researchSignals: ResearchSignal[] = [
  {
    source: "BadmintonCN",
    href: "https://www.badmintoncn.com/eqm.php?a=view&eid=19393",
    category: "rackets",
    strength: "medium",
    en: "Large Chinese community pages make user level, height, weight, foot size, ownership age, price, and subjective tags visible, which supports confidence weighting by reviewer profile instead of simple star averages.",
    zh: "中羽装备页会展示水平、身高、体重、脚码、入手时长、价格和主观标签，适合用来做按评价者画像加权的信号，而不是只看星级均分。",
  },
  {
    source: "Reddit r/badminton",
    href: "https://www.reddit.com/r/badminton/comments/14lqwso",
    category: "strings",
    strength: "medium",
    en: "String discussions repeatedly split BG80-style control and EXBOLT-style repulsion, so string recommendations need tension, control, durability, and adjustment-time explanations.",
    zh: "Reddit 球线讨论常把 BG80 型控制和 EXBOLT 型弹性分开讨论，因此球线推荐需要解释磅数、控制、耐用和适应时间。",
  },
  {
    source: "YouTube reviewers",
    href: "https://www.youtube.com/watch?v=c-q1ppdC-AU",
    category: "rackets",
    strength: "medium",
    en: "Creator reviews are strongest for role-based explanations, such as 88D rear-court attack versus 88S front-court control, but they should not override official specs.",
    zh: "YouTube 测评最适合解释场上角色，例如 88D 偏后场进攻、88S 偏前场控制，但不应覆盖官方规格。",
  },
  {
    source: "Victor official specs + BadmintonCN shoe reviews",
    href: "https://www.victorsport.com/product/p9200-s",
    category: "shoes",
    strength: "medium",
    en: "Shoe fit has higher injury and return risk than rackets, so width, lateral stability, cushioning, and try-on warnings should be first-class scoring inputs.",
    zh: "球鞋比球拍更容易带来受伤和退换风险，因此脚宽、横向稳定、缓震和试穿提醒应成为一等评分输入。",
  },
  {
    source: "Carousell/eBay/BadmintonCN price pages",
    href: "https://www.carousell.sg/yonex-astrox-88d-pro/q/",
    category: "resale",
    strength: "low",
    en: "Resale estimates are useful for total cost of ownership, but condition, authenticity, region, and current hype make them a range rather than a promise.",
    zh: "二手价格适合辅助判断真实持有成本，但成色、真伪、地区和热度会导致价格波动，因此只能作为区间参考。",
  },
  {
    source: "BadmintonCN bag reviews",
    href: "https://www.badmintoncn.com/eqm.php?a=eqCommView&cid=903012",
    category: "bags",
    strength: "low",
    en: "Bag reviews focus on compartment workflow: shoe storage, wet clothes, shuttle tubes, phone pockets, and whether capacity claims work in real sessions.",
    zh: "球包评价更关注分区流程：鞋仓、湿衣、球筒、手机袋，以及标称容量在真实打球场景中是否够用。",
  },
];

export function researchSummary(locale: SiteLocale) {
  return researchSignals.map((signal) => ({
    source: signal.source,
    href: signal.href,
    category: signal.category,
    strength: signal.strength,
    summary: signal[locale],
  }));
}
