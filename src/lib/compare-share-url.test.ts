import { describe, expect, it } from "vitest";
import { parseCompareShareIds } from "./compare-share-url";

describe("parseCompareShareIds", () => {
  it("returns ids from compare share query", () => {
    expect(
      parseCompareShareIds(
        "/compare/",
        "?p=yy-nanoflare-1000z,yy-astrox-100zz"
      )
    ).toEqual(["yy-nanoflare-1000z", "yy-astrox-100zz"]);
  });

  it("caps at three products", () => {
    expect(
      parseCompareShareIds(
        "/compare/",
        "?p=a,b,c,d,e"
      )
    ).toEqual(["a", "b", "c"]);
  });

  it("returns null off compare routes", () => {
    expect(parseCompareShareIds("/catalog/", "?p=yy-astrox-100zz")).toBeNull();
  });

  it("returns null when p is absent", () => {
    expect(parseCompareShareIds("/compare/", "")).toBeNull();
  });
});
