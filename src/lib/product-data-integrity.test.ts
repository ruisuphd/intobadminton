import products from "@/data/products.json";
import { describe, expect, it } from "vitest";
import { sourceAuthorityForProduct } from "@/lib/source-authority";
import type { ProductRecord, RacketProduct } from "@/lib/types/product";

const CATALOGUE = products as ProductRecord[];

function racket(id: string): RacketProduct {
  const product = CATALOGUE.find((candidate) => candidate.id === id);
  expect(product?.category).toBe("racket");
  return product as RacketProduct;
}

describe("product data integrity", () => {
  it("does not mark third-party or generic source URLs as verified product specs", () => {
    for (const product of CATALOGUE) {
      if (
        product.verificationStatus === "official_verified" ||
        (product.category === "racket" && product.shaftFlexSource === "official")
      ) {
        expect(
          sourceAuthorityForProduct(product).canVerifySpecs,
          `${product.id} must point to an official product page`
        ).toBe(true);
      }
    }
  });

  it("keeps high-traffic Yonex racket specs aligned to official product pages", () => {
    expect(racket("yy-nanoflare-1000z")).toMatchObject({
      name: "Nanoflare 1000 Z",
      shaftFlex: "extra_stiff",
      verificationStatus: "official_verified",
      commonStringTensionLbs: { min: 20, max: 29 },
      officialSourceUrl: "https://www.yonex.com/nf-1000z",
    });

    expect(racket("yy-astrox-99-pro")).toMatchObject({
      shaftFlex: "stiff",
      verificationStatus: "official_verified",
      officialSourceUrl: "https://www.yonex.com/astrox-99-pro-3ax99-p",
    });
  });
});
