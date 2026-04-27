import { describe, expect, it } from "vitest";
import { findProductAlias } from "@/lib/aliases";

describe("findProductAlias", () => {
  it("matches English abbreviations", () => {
    expect(findProductAlias("AX100ZZ review")?.productId).toBe(
      "yy-astrox-100zz"
    );
  });

  it("matches Chinese product nicknames", () => {
    expect(findProductAlias("龙牙2 双打感受")?.productId).toBe(
      "vic-thruster-ryuga-ii"
    );
  });

  it("returns undefined for unknown products", () => {
    expect(findProductAlias("mystery racket 123")).toBeUndefined();
  });
});
