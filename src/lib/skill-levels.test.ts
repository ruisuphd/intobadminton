import { describe, expect, it } from "vitest";
import {
  COUNTRY_CODES,
  COUNTRY_SYSTEMS,
  getCountrySystem,
  getInternalLevel,
} from "./skill-levels";
import { SKILL_LEVELS } from "./taxonomy";

describe("skill-levels", () => {
  it("includes every country code in COUNTRY_SYSTEMS", () => {
    for (const code of COUNTRY_CODES) {
      expect(COUNTRY_SYSTEMS[code]).toBeDefined();
      expect(COUNTRY_SYSTEMS[code].code).toBe(code);
    }
  });

  it("every option maps to a valid internal SkillLevel", () => {
    const valid = new Set<string>(SKILL_LEVELS);
    for (const code of COUNTRY_CODES) {
      const system = COUNTRY_SYSTEMS[code];
      expect(system.options.length).toBeGreaterThan(0);
      for (const opt of system.options) {
        expect(valid.has(opt.internal)).toBe(true);
      }
    }
  });

  it("CN level 1 is recreational and level 10 is pro-oriented", () => {
    expect(getInternalLevel("CN", "1")).toBe("recreational");
    expect(getInternalLevel("CN", "10")).toBe("pro_oriented");
  });

  it("IE Division 10 is recreational and Division 1 is pro-oriented", () => {
    expect(getInternalLevel("IE", "10")).toBe("recreational");
    expect(getInternalLevel("IE", "1")).toBe("pro_oriented");
  });

  it("IE Division 4 maps to competitive (founder benchmark)", () => {
    expect(getInternalLevel("IE", "4")).toBe("competitive");
  });

  it("returns null for unknown values", () => {
    expect(getInternalLevel("CN", "99")).toBeNull();
    expect(getInternalLevel("IE", undefined)).toBeNull();
  });

  it("getCountrySystem returns the right object", () => {
    expect(getCountrySystem("GENERIC").options.length).toBe(4);
    expect(getCountrySystem("CN").options.length).toBe(10);
    expect(getCountrySystem("IE").options.length).toBe(10);
  });
});
