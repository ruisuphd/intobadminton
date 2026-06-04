/**
 * Glossary linking for article bodies.
 *
 * - `segmentGlossaryLinks` — links terms declared in `section.glossaryLinks`
 *   (matches the CI gate in `scripts/check-glossary-links.mjs`).
 * - `segmentGlossaryAutolinks` — first-mention links from the shared term list.
 * - `segmentArticleGlossary` — manual links first, then automatic fill-in.
 */

import { GLOSSARY_TERMS, glossaryHref, type GlossaryTerm } from "@/lib/glossary-terms";

export type GlossaryLink = { term: string; id: string };

export type GlossaryTextSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string; termId: string };

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
 * Split `body` into alternating plain-text and glossary-link segments using
 * only the editor-declared `glossaryLinks` list.
 */
export function segmentGlossaryLinks(
  body: string,
  glossaryLinks: GlossaryLink[] | undefined
): GlossaryTextSegment[] {
  if (!glossaryLinks?.length || !body) {
    return [{ type: "text", value: body }];
  }

  const linkedIds = new Set<string>();
  const segments: GlossaryTextSegment[] = [];
  let remaining = body;

  while (remaining.length > 0) {
    let best: {
      index: number;
      length: number;
      text: string;
      link: GlossaryLink;
    } | null = null;

    for (const link of glossaryLinks) {
      if (linkedIds.has(link.id)) continue;
      const re = new RegExp(`\\b${escapeRegex(link.term)}\\b`, "i");
      const match = re.exec(remaining);
      if (!match) continue;
      if (
        !best ||
        match.index < best.index ||
        (match.index === best.index && match[0].length > best.length)
      ) {
        best = {
          index: match.index,
          length: match[0].length,
          text: match[0],
          link,
        };
      }
    }

    if (!best) {
      segments.push({ type: "text", value: remaining });
      break;
    }

    if (best.index > 0) {
      segments.push({ type: "text", value: remaining.slice(0, best.index) });
    }

    segments.push({
      type: "link",
      value: best.text,
      href: glossaryHref(best.link.id),
      termId: best.link.id,
    });
    linkedIds.add(best.link.id);
    remaining = remaining.slice(best.index + best.length);
  }

  return segments;
}

/**
 * Automatic first-mention links from `GLOSSARY_TERMS`.
 */
export function segmentGlossaryAutolinks(
  text: string,
  options?: { skipIds?: ReadonlySet<string> }
): GlossaryTextSegment[] {
  if (!text) return [];

  const linked = new Set(options?.skipIds ?? []);
  const segments: GlossaryTextSegment[] = [];
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

/** Manual glossary links, then automatic fill-in on remaining prose. */
export function segmentArticleGlossary(
  body: string,
  glossaryLinks: GlossaryLink[] | undefined
): GlossaryTextSegment[] {
  const manual = segmentGlossaryLinks(body, glossaryLinks);
  const manualIds = new Set(
    manual.filter((s) => s.type === "link").map((s) => s.termId)
  );

  const merged: GlossaryTextSegment[] = [];
  for (const segment of manual) {
    if (segment.type === "link") {
      merged.push(segment);
      continue;
    }
    merged.push(...segmentGlossaryAutolinks(segment.value, { skipIds: manualIds }));
  }
  return merged.length ? merged : [{ type: "text", value: body }];
}
