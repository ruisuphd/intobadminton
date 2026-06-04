import { describe, expect, it } from "vitest";
import {
  segmentArticleGlossary,
  segmentGlossaryAutolinks,
  segmentGlossaryLinks,
} from "./glossary-autolink";

describe("segmentGlossaryLinks", () => {
  it("links declared glossary terms only", () => {
    const segments = segmentGlossaryLinks("Head-light frame with medium shaft flex.", [
      { term: "head-light", id: "head-light" },
    ]);
    expect(segments.some((s) => s.type === "link" && s.termId === "head-light")).toBe(
      true
    );
    expect(segments.some((s) => s.type === "link" && s.termId === "shaft-flex")).toBe(
      false
    );
  });
});

describe("segmentGlossaryAutolinks", () => {
  it("links the first mention of shared glossary terms", () => {
    const segments = segmentGlossaryAutolinks(
      "A 4U head-light frame with medium shaft flex helps recovery."
    );
    expect(segments.some((s) => s.type === "link" && s.termId === "weight-class")).toBe(
      true
    );
    expect(segments.some((s) => s.type === "link" && s.termId === "head-light")).toBe(
      true
    );
  });

  it("respects skipIds", () => {
    const segments = segmentGlossaryAutolinks("4U weight class frame", {
      skipIds: new Set(["weight-class"]),
    });
    expect(segments.some((s) => s.type === "link")).toBe(false);
  });
});

describe("segmentArticleGlossary", () => {
  it("prefers manual links then autolinks the rest", () => {
    const segments = segmentArticleGlossary(
      "Head-light 4U with medium shaft flex.",
      [{ term: "head-light", id: "head-light" }]
    );
    expect(segments.filter((s) => s.type === "link").map((s) => s.termId)).toEqual(
      expect.arrayContaining(["head-light", "weight-class", "shaft-flex"])
    );
  });
});
