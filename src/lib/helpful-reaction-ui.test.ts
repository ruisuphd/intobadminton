import { describe, expect, it } from "vitest";
import {
  helpfulReactionCountLine,
  helpfulReactionShellClass,
  helpfulReactionSubline,
} from "@/lib/helpful-reaction-ui";

describe("helpfulReactionSubline", () => {
  it("shows count line when aggregates exist", () => {
    expect(
      helpfulReactionSubline(true, { up: 12, down: 1, more: 3 })
    ).toBe("12 found this helpful · 3 asked for more detail");
  });

  it("shows editorial prompt when API is disabled and no counts", () => {
    expect(helpfulReactionSubline(false, null)).toBe(
      "Your vote helps us prioritize the next editorial sweep."
    );
  });

  it("returns null when API enabled but counts not loaded yet", () => {
    expect(helpfulReactionSubline(true, null)).toBeNull();
  });
});

describe("helpfulReactionCountLine", () => {
  it("returns null for empty aggregates", () => {
    expect(helpfulReactionCountLine({ up: 0, down: 0, more: 0 })).toBeNull();
  });
});

describe("helpfulReactionShellClass", () => {
  it("shrinks shell when API off and no vote", () => {
    expect(helpfulReactionShellClass(false, false)).toContain("min-h-0");
    expect(helpfulReactionShellClass(false, false)).not.toContain("min-h-[8.5rem]");
  });

  it("reserves height when API enabled", () => {
    expect(helpfulReactionShellClass(true, false)).toContain("min-h-[8.5rem]");
  });
});
