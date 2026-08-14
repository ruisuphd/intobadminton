/**
 * First-screen homepage shelf: original guides, best-ofs, and founder reviews.
 * Not a count of SKU notes.
 */
export type HomePublicationLink = {
  href: string;
  title: string;
  kicker: string;
  dek: string;
};

export const HOME_PUBLICATION_LINKS: readonly HomePublicationLink[] = [
  {
    href: "/guides/string-tension/",
    kicker: "Guide",
    title: "Badminton string tension: a practical guide",
    dek: "When to go up, when to go down, and what changes between week one and week six on the same stringbed.",
  },
  {
    href: "/review/how-to-choose-a-badminton-racket/",
    kicker: "Guide",
    title: "How to choose a badminton racket",
    dek: "Level, discipline, and shoulder first — not the flagship that won last week's final.",
  },
  {
    href: "/compare-guides/yonex-astrox-vs-nanoflare/",
    kicker: "Compare",
    title: "Yonex Astrox vs Nanoflare",
    dek: "Power line versus speed line, mapped to singles, doubles, and front-court roles.",
  },
  {
    href: "/review/yonex-nanoflare-1000z-review/",
    kicker: "Founder review",
    title: "Nanoflare 1000 Z — current doubles frame",
    dek: "Why I play it in Division 4 Ireland, and who should skip the Z-axis speed.",
  },
  {
    href: "/best/beginner-rackets/",
    kicker: "Best of",
    title: "Best beginner rackets",
    dek: "Forgiving shafts you can finish a session with, not discounted extra-stiff Pros.",
  },
  {
    href: "/guides/badminton-shoes-vs-running-shoes/",
    kicker: "Guide",
    title: "Badminton shoes vs running shoes",
    dek: "Lateral stability and indoor gum rubber — why a trainer is the wrong court shoe.",
  },
];
