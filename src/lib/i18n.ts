import type { SiteLocale } from "@/lib/locale";

// The site is English-only — `siteLocales = ["en"]` in `src/lib/locale.ts`.
// Translation tables only carry the `en` branch. If we ever ship `zh`, restore
// the `zh` branch here and add `"zh"` to `siteLocales`; do not leave dead
// translations in the bundle.
export const messages = {
  en: {
    nav: {
      finder: "Finder",
      guides: "Guides",
      blog: "Blog",
      research: "Research",
      compare: "Compare",
      review: "Review",
    },
    footer: {
      summary:
        "Curated equipment suggestions for badminton players. Not medical advice; always try before you buy when possible.",
      cookieSettings: "Cookie settings",
      methodology: "Methodology",
    },
    home: {
      title: "Find the badminton gear that fits your game",
      subtitle:
        "Five quick questions about how you play. We rank rackets, strings, shoes, and the rest of the kit by level, role, swing, comfort, and budget, then label whether each spec source is an official product page or still needs verification.",
      start: "Start finder",
      guides: "Read guides",
      proof: [
        {
          title: "You can check our work",
          body: "Every pick separates product-page specs, editor interpretation, and cited community evidence, with confidence labels showing which parts are verified and which still need a second look.",
        },
        {
          title: "Built for how badminton is actually played",
          body: "Singles vs doubles, front-court vs rear-court, smash-heavy vs control, foot width, joint comfort, string tension, and budget all push the shortlist around.",
        },
        {
          title: "No account, no email gate",
          body: "The finder runs in your browser. Your profile, history, and compare list stay on your device — we don't need them on a server to give you a result.",
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
      categoryHelp:
        "Rackets, strings, shoes, bags, shuttles, and grips are live. Each category now uses its own fit logic.",
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
} as const;

export function t(locale: SiteLocale) {
  return messages[locale];
}
