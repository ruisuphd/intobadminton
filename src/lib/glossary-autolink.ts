import { GLOSSARY_TERMS, glossaryHref, type GlossaryTerm } from "@/lib/glossary-terms";

export type TextSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string; termId: string };

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phrasesForTerm(term: GlossaryTerm): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const phrase of [term.term, ...(term.aliases ?? [])]) {
    const key = phrase.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(phrase);
  }
  return out.sort((a, b) => b.length - a.length);
}

/**
 * Split plain-text body copy into text/link segments. Links at most one
 * occurrence per glossary id across the whole string (first mention wins).
 */
export function segmentGlossaryAutolinks(
  text: string,
  options?: { skipIds?: ReadonlySet<string> }
): TextSegment[] {
  if (!text) return [];

  const linked = new Set(options?.skipIds ?? []);
  const segments: TextSegment[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    let best: {
      start: number;
      end: number;
      term: GlossaryTerm;
      matched: string;
    } | null = null;

    for (const term of GLOSSARY_TERMS) {
      if (linked.has(term.id)) continue;
      for (const phrase of phrasesForTerm(term)) {
        const re = new RegExp(`\\b${escapeRegex(phrase)}\\b`, "i");
        const slice = text.slice(cursor);
        const match = re.exec(slice);
        if (!match || match.index == null) continue;
        const start = cursor + match.index;
        const end = start + match[0].length;
        if (!best || start < best.start) {
          best = { start, end, term, matched: match[0] };
        }
      }
    }

    if (!best) {
      segments.push({ type: "text", value: text.slice(cursor) });
      break;
    }

    if (best.start > cursor) {
      segments.push({ type: "text", value: text.slice(cursor, best.start) });
    }

    segments.push({
      type: "link",
      value: best.matched,
      href: glossaryHref(best.term.id),
      termId: best.term.id,
    });
    linked.add(best.term.id);
    cursor = best.end;
  }

  return segments;
}
