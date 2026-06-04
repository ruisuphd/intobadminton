/**
 * Glossary terms used for first-mention autolinking in article bodies.
 * Canonical definitions live on `/guides/glossary/`; this list mirrors
 * the high-signal entries checked by `scripts/check-glossary-links.mjs`.
 */
export type GlossaryTerm = {
  id: string;
  /** Primary phrase to match (word-boundary, case-insensitive). */
  term: string;
  /** Alternate spellings / abbreviations tried after the primary term. */
  aliases?: string[];
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { id: "weight-class", term: "weight class", aliases: ["3U", "4U", "5U", "6U"] },
  { id: "balance-point", term: "balance point" },
  { id: "head-heavy", term: "head-heavy", aliases: ["head heavy"] },
  { id: "head-light", term: "head-light", aliases: ["head light"] },
  { id: "even-balance", term: "even balance" },
  { id: "shaft-flex", term: "shaft flex" },
  { id: "swing-weight", term: "swing weight" },
  { id: "grip-size", term: "grip size", aliases: ["G5", "G6"] },
  { id: "sweet-spot", term: "sweet spot" },
  { id: "string-gauge", term: "gauge" },
  { id: "tension", term: "tension", aliases: ["lb", "lbs"] },
  { id: "repulsion", term: "repulsion" },
  { id: "hybrid-string", term: "hybrid string" },
  { id: "gum-rubber", term: "gum rubber" },
  { id: "power-cushion", term: "Power Cushion" },
];

export function glossaryHref(id: string): string {
  return `/guides/glossary/#${id}`;
}
