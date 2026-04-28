import type { SiteLocale } from "@/lib/locale";

export const messages = {
  en: {
    nav: {
      finder: "Finder",
      guides: "Guides",
      blog: "Blog",
      research: "Research",
      compare: "Compare",
      review: "Review",
      language: "中文",
    },
    footer: {
      summary:
        "Curated equipment suggestions for badminton players. Not medical advice; always try before you buy when possible.",
      cookieSettings: "Cookie settings",
      methodology: "Methodology",
    },
    home: {
      title: "Personalized badminton equipment finder",
      subtitle:
        "Tell us your level, playing style, discipline, body comfort needs, and budget. IntoBadminton ranks rackets, strings, shoes, and bags with transparent specs, review signals, and resale context.",
      start: "Start finder",
      guides: "Read guides",
      proof: [
        {
          title: "Recommendation logic you can inspect",
          body: "Each result separates official specs, editor interpretation, review evidence, and confidence so you can see what is strong and what still needs verification.",
        },
        {
          title: "Built around badminton profiles",
          body: "Singles, doubles, front-court speed, smash-heavy play, foot width, comfort flags, string tension, and budget all affect the shortlist.",
        },
        {
          title: "Static-first and privacy-first",
          body: "The v1 finder runs without accounts. Profiles, history, and compare lists stay on device unless a future backend is added.",
        },
      ],
    },
    quiz: {
      step: "Step",
      of: "of",
      levelTitle: "What is your current playing level?",
      levelHelp:
        "Self-assessed is fine. We use this to avoid recommending frames that are too stiff or demanding.",
      disciplineTitle: "What do you mostly play?",
      styleTitle: "Pick up to two playing styles",
      styleHelp: "We use this to weight head balance, speed, and power fit.",
      categoryTitle: "What are you shopping for?",
      categoryHelp: "Rackets, strings, shoes, and bags are live. Grip recommendations need more verified data first.",
      bodyTitle: "Optional body comfort and budget",
      bodyHelp: "Skip anything you prefer not to share. This is not medical advice.",
      continue: "Continue",
      see: "See recommendations",
      back: "Back",
    },
    results: {
      title: "Your equipment shortlist",
      subtitle:
        "Ranked by transparent fit scoring. Verify specs on the manufacturer site before buying, and treat body comfort notes as informational.",
    },
    guides: {
      title: "Equipment guides",
      subtitle:
        "Practical, original notes that explain the recommendation model and help badminton players inspect gear tradeoffs.",
    },
    compare: {
      title: "Compare gear",
      subtitle: "Inspect specs, confidence, and tradeoffs side by side.",
    },
  },
  zh: {
    nav: {
      finder: "推荐问卷",
      guides: "装备指南",
      blog: "博客",
      research: "调研",
      compare: "对比",
      review: "评价",
      language: "English",
    },
    footer: {
      summary:
        "为羽毛球爱好者整理的装备推荐。内容不构成医疗建议；购买前请尽量试打。",
      cookieSettings: "Cookie 设置",
      methodology: "推荐方法",
    },
    home: {
      title: "个性化羽毛球装备推荐",
      subtitle:
        "输入你的水平、打法、单双打习惯、身体舒适度和预算。IntoBadminton 会结合官方规格、评价信号和二手折旧信息，给出更透明的球拍、球线、球鞋和球包推荐。",
      start: "开始推荐",
      guides: "阅读指南",
      proof: [
        {
          title: "推荐理由清楚可查",
          body: "每个结果都会区分官方规格、编辑信号、评价证据和置信度，避免把论坛讨论当成官方事实。",
        },
        {
          title: "围绕真实打法建模",
          body: "单打、双打、网前速度、重杀打法、脚宽、关节舒适度、线磅和预算都会影响推荐排序。",
        },
        {
          title: "静态优先，隐私优先",
          body: "v1 不需要账户。你的资料、历史和对比列表默认只保存在本机。",
        },
      ],
    },
    quiz: {
      step: "第",
      of: "步，共",
      levelTitle: "你的当前水平是？",
      levelHelp: "自评即可。我们会用它避免推荐太硬、太难驾驭的球拍。",
      disciplineTitle: "你主要打什么项目？",
      styleTitle: "最多选择两种打法",
      styleHelp: "系统会据此调整拍头重量、速度和进攻权重。",
      categoryTitle: "你想找哪类装备？",
      categoryHelp: "球拍、球线、球鞋和球包已上线；手胶需要更多核验数据后再开放。",
      bodyTitle: "可选：身体舒适度和预算",
      bodyHelp: "不想填写可以跳过。本内容不构成医疗建议。",
      continue: "继续",
      see: "查看推荐",
      back: "返回",
    },
    results: {
      title: "你的装备候选清单",
      subtitle:
        "结果来自透明的匹配评分。购买前请查看品牌官网规格，身体舒适度提示仅供参考。",
    },
    guides: {
      title: "装备指南",
      subtitle:
        "用原创内容解释推荐逻辑，帮助羽毛球玩家看懂装备取舍。",
    },
    compare: {
      title: "装备对比",
      subtitle: "并排查看规格、置信度和打法取舍。",
    },
  },
} as const;

export function t(locale: SiteLocale) {
  return messages[locale];
}
