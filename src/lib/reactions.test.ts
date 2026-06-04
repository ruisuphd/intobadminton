import { describe, expect, it } from "vitest";
import {
  EMPTY_COUNTS,
  REACTION_COUNT_MIN_TOTAL,
  formatReactionSummary,
  reactionTotal,
  shouldShowReactionCounts,
} from "./reactions";

describe("reactions", () => {
  it("hides counts below the minimum threshold", () => {
    expect(shouldShowReactionCounts({ up: 2, down: 1, more: 1 })).toBe(false);
    expect(
      shouldShowReactionCounts({
        up: REACTION_COUNT_MIN_TOTAL,
        down: 0,
        more: 0,
      })
    ).toBe(true);
  });

  it("computes reaction totals", () => {
    expect(reactionTotal(EMPTY_COUNTS)).toBe(0);
    expect(reactionTotal({ up: 3, down: 1, more: 2 })).toBe(6);
  });

  it("formats a helpful summary", () => {
    expect(formatReactionSummary({ up: 8, down: 2, more: 0 })).toBe(
      "80% found this helpful (10 responses)"
    );
    expect(formatReactionSummary(EMPTY_COUNTS)).toBe("");
  });
});
