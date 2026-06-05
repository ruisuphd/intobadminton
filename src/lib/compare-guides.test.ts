import { describe, expect, it } from "vitest";
import { COMPARE_GUIDES, compareGuideByPath } from "./compare-guides";

describe("compare-guides", () => {
  it("lists twelve head-to-head guides", () => {
    expect(COMPARE_GUIDES).toHaveLength(12);
  });

  it("resolves paths with or without trailing slash", () => {
    const guide = compareGuideByPath("/compare-guides/yonex-astrox-vs-nanoflare");
    expect(guide?.title).toMatch(/Astrox vs Nanoflare/i);
  });
});
