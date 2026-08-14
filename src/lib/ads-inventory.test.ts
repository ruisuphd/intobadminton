import { describe, expect, it } from "vitest";
import {
  adsBlockedOnPath,
  normalizeInventoryPath,
  shouldLoadAdSenseLoader,
} from "./ads-inventory";

describe("ads inventory paths", () => {
  it("blocks spec PDPs, finder utility screens, and catalog", () => {
    expect(adsBlockedOnPath("/product/yy-nanoflare-1000z/")).toBe(true);
    expect(adsBlockedOnPath("/product/yy-nanoflare-1000z")).toBe(true);
    expect(adsBlockedOnPath("/quiz/")).toBe(true);
    expect(adsBlockedOnPath("/results/")).toBe(true);
    expect(adsBlockedOnPath("/saved/")).toBe(true);
    expect(adsBlockedOnPath("/compare/")).toBe(true);
    expect(adsBlockedOnPath("/catalog/")).toBe(true);
    expect(adsBlockedOnPath("/search/")).toBe(true);
    expect(adsBlockedOnPath("/setup/")).toBe(true);
    expect(adsBlockedOnPath("/review/submit/")).toBe(true);
    expect(adsBlockedOnPath("/offline/")).toBe(true);
  });

  it("allows publication URLs", () => {
    expect(adsBlockedOnPath("/")).toBe(false);
    expect(adsBlockedOnPath("/guides/string-tension/")).toBe(false);
    expect(adsBlockedOnPath("/best/beginner-rackets/")).toBe(false);
    expect(adsBlockedOnPath("/compare-guides/yonex-astrox-vs-nanoflare/")).toBe(
      false
    );
    expect(adsBlockedOnPath("/review/how-to-choose-a-badminton-racket/")).toBe(
      false
    );
    expect(adsBlockedOnPath("/about/")).toBe(false);
  });

  it("normalises trailing slashes", () => {
    expect(normalizeInventoryPath("/quiz")).toBe("/quiz/");
    expect(normalizeInventoryPath("/")).toBe("/");
  });
});

describe("shouldLoadAdSenseLoader", () => {
  it("stays off in disabled mode even when a client id exists", () => {
    expect(shouldLoadAdSenseLoader("disabled")).toBe(false);
    expect(shouldLoadAdSenseLoader(undefined)).toBe(false);
  });
});
