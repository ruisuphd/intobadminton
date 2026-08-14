/**
 * Founder-tested catalogue rows are labelled in `products.json` editor notes.
 * Imported forum translations also use first person, so "I play" in a review
 * body is not a firsthand signal — only this explicit editor-note pattern is.
 */
export const FOUNDER_FIRSTHAND_NOTE =
  /Founder (?:firsthand|current)(?: racket| shoe| doubles racket)?/i;

export function editorNoteIsFounderFirsthand(
  note: string | null | undefined
): boolean {
  return FOUNDER_FIRSTHAND_NOTE.test(note ?? "");
}
