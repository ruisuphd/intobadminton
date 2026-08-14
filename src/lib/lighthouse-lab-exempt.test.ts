import { describe, expect, it } from "vitest";
import {
  isLighthouseLabExemptPath,
  LIGHTHOUSE_LAB_EXEMPT_PATHS,
} from "./lighthouse-lab-exempt";

describe("lighthouse lab exempt paths", () => {
  it("lists noindex product-funnel retention paths", () => {
    expect(LIGHTHOUSE_LAB_EXEMPT_PATHS).toEqual([
      "/results/",
      "/compare/",
      "/saved/",
      "/product/yy-grpht-thrttl/",
    ]);
  });

  it("recognises exempt paths", () => {
    expect(isLighthouseLabExemptPath("/results/")).toBe(true);
    expect(isLighthouseLabExemptPath("/product/yy-grpht-thrttl/")).toBe(true);
    expect(isLighthouseLabExemptPath("/quiz/")).toBe(false);
  });
});
