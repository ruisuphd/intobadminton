import { describe, expect, it } from "vitest";
import {
  fuzzyTokenMatch,
  levenshtein,
  tokenMatchesBlob,
} from "./search-fuzzy";

describe("search-fuzzy", () => {
  it("computes edit distance", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("badminton", "badmintn")).toBe(1);
  });

  it("matches common typos on long tokens", () => {
    expect(fuzzyTokenMatch("badmintn", "badminton")).toBe(true);
    expect(fuzzyTokenMatch("tenson", "tension")).toBe(true);
    expect(fuzzyTokenMatch("yonx", "yonex")).toBe(true);
  });

  it("does not fuzzy-match very short tokens", () => {
    expect(fuzzyTokenMatch("5u", "5u")).toBe(true);
    expect(fuzzyTokenMatch("5u", "4u")).toBe(false);
  });

  it("finds typos inside a blob", () => {
    const blob = "badminton string tension guide lbs";
    expect(tokenMatchesBlob("badmintn", blob)).toBe(true);
    expect(tokenMatchesBlob("tenson", blob)).toBe(true);
    expect(tokenMatchesBlob("xyzzy", blob)).toBe(false);
  });
});
