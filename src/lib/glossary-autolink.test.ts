import { describe, expect, it } from "vitest";
import { segmentGlossaryLinks } from "./glossary-autolink";

describe("segmentGlossaryLinks", () => {
  it("returns plain text when no links", () => {
    expect(segmentGlossaryLinks("hello world", undefined)).toEqual([
      { type: "text", value: "hello world" },
    ]);
  });

  it("links the first word-boundary occurrence per id", () => {
    const segments = segmentGlossaryLinks(
      "A head-heavy frame helps smash power. Head-heavy again.",
      [{ term: "Head-heavy", id: "head-heavy" }]
    );
    expect(segments).toEqual([
      { type: "text", value: "A " },
      {
        type: "link",
        value: "head-heavy",
        href: "/guides/glossary/#head-heavy",
        termId: "head-heavy",
      },
      { type: "text", value: " frame helps smash power. Head-heavy again." },
    ]);
  });

  it("links multiple distinct terms in reading order", () => {
    const segments = segmentGlossaryLinks(
      "Drive flat, then smash.",
      [
        { term: "Drive", id: "drive" },
        { term: "Smash", id: "smash" },
      ]
    );
    expect(segments.filter((s) => s.type === "link").map((s) => s.termId)).toEqual(
      ["drive", "smash"]
    );
  });
});
