import { describe, expect, it } from "vitest";
import { segmentGlossaryAutolinks } from "./glossary-autolink";

describe("segmentGlossaryAutolinks", () => {
  it("links the first mention of a glossary term", () => {
    const segments = segmentGlossaryAutolinks(
      "A 4U head-light frame with medium shaft flex helps recovery."
    );
    expect(segments.some((s) => s.type === "link" && s.termId === "weight-class")).toBe(
      true
    );
    expect(segments.some((s) => s.type === "link" && s.termId === "head-light")).toBe(
      true
    );
    expect(segments.some((s) => s.type === "link" && s.termId === "shaft-flex")).toBe(
      true
    );
  });

  it("links each glossary id at most once", () => {
    const segments = segmentGlossaryAutolinks(
      "Head-light speed and another head-light mention later."
    );
    const headLightLinks = segments.filter(
      (s) => s.type === "link" && s.termId === "head-light"
    );
    expect(headLightLinks).toHaveLength(1);
  });

  it("respects skipIds from manual glossaryLinks", () => {
    const segments = segmentGlossaryAutolinks("4U weight class frame", {
      skipIds: new Set(["weight-class"]),
    });
    expect(segments.some((s) => s.type === "link")).toBe(false);
  });
});
