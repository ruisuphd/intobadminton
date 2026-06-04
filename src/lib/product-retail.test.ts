import { describe, expect, it } from "vitest";
import { affiliateStoreForBrand, retailLinkForProduct } from "@/lib/product-retail";

describe("affiliateStoreForBrand", () => {
  it("maps flagship brands to direct stores", () => {
    expect(affiliateStoreForBrand("Yonex")).toBe("yonex-direct");
    expect(affiliateStoreForBrand("Victor")).toBe("victor-direct");
    expect(affiliateStoreForBrand("Li-Ning")).toBe("li-ning-direct");
  });

  it("falls back to amazon for other brands", () => {
    expect(affiliateStoreForBrand("Mizuno")).toBe("amazon");
  });
});

describe("retailLinkForProduct", () => {
  it("uses official source when present", () => {
    const link = retailLinkForProduct({
      id: "yy-astrox-77-pro",
      brand: "Yonex",
      name: "Astrox 77 Pro",
      officialSourceUrl: "https://www.yonex.com/badminton/racquets/astrox-77-pro",
    });
    expect(link.store).toBe("yonex-direct");
    expect(link.url).toContain("yonex.com");
    expect(link.label).toBe("Check at Yonex");
  });

  it("falls back to amazon search without official url", () => {
    const link = retailLinkForProduct({
      id: "mz-altius",
      brand: "Mizuno",
      name: "Altius N-Feel",
    });
    expect(link.store).toBe("amazon");
    expect(link.url).toContain("amazon.com/s");
  });
});
