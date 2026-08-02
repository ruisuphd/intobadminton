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
        "Personal badminton reviews and a finder I built for club players. Not medical advice; always try before you buy when possible.",
      cookieSettings: "Cookie settings",
      methodology: "Methodology",
    },
    home: {
      title: "Find the badminton gear that fits your game",
      // Kept short deliberately: at 235 characters this ran to seven lines and
      // 205px on a 375px screen, pushing the search box and the proof stats
      // below the fold on the device that brings ~65% of the site's traffic.
      // The two things worth saying above the fold are what the finder does and
      // what makes it different — the source labelling.
      subtitle:
        "Five questions about how you play, then a shortlist of rackets, strings, shoes and bags that fit — with every spec labelled by where it came from.",
      start: "Start finder",
      guides: "Read guides",
      proof: [
        {
          title: "You can check my work",
          body: "Every pick separates product-page specs, my take, and cited community evidence, with confidence labels showing which parts are verified and which still need a second look.",
        },
        {
          title: "Built for how badminton is actually played",
          body: "Singles vs doubles, front-court vs rear-court, smash-heavy vs control, foot width, joint comfort, string tension, and budget all push the shortlist around.",
        },
        {
          title: "No account, no email gate",
          body: "The finder runs in your browser. Your profile, history, and compare list stay on your device — nothing needs a server account to get a result.",
        },
      ],
    },
    quiz: {
      step: "Step",
      of: "of",
      levelTitle: "What is your current playing level?",
      levelHelp:
        "Self-assessed is fine. I use this to avoid recommending frames that are too stiff or demanding.",
      disciplineTitle: "What do you mostly play?",
      styleTitle: "Pick up to two playing styles",
      styleHelp: "I use this to weight head balance, speed, and power fit.",
      categoryTitle: "What are you shopping for?",
      categoryHelp:
        "Rackets, strings, shoes, bags, shuttles, and grips are live. Each category uses its own fit logic.",
      bodyTitle: "Optional body comfort and budget",
      bodyHelp: "Skip anything you prefer not to share. This is not medical advice.",
      continue: "Continue",
      see: "See recommendations",
      back: "Back",
    },
    results: {
      title: "Your equipment shortlist",
      subtitle:
        "Ranked by fit scoring I built for club players. Verify specs on the manufacturer site before buying, and treat body comfort notes as informational.",
    },
    guides: {
      title: "Equipment guides",
      subtitle:
        "Practical notes on how I score gear and how to inspect the trade-offs before you buy.",
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
