import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import products from "@/data/products.json";
import { describe, expect, it } from "vitest";
import { sourceAuthorityForProduct } from "@/lib/source-authority";
import type { ProductRecord, RacketProduct, StringProduct } from "@/lib/types/product";

const CATALOGUE = products as ProductRecord[];

function racket(id: string): RacketProduct {
  const product = CATALOGUE.find((candidate) => candidate.id === id);
  expect(product?.category).toBe("racket");
  return product as RacketProduct;
}

function stringProduct(id: string): StringProduct {
  const product = CATALOGUE.find((candidate) => candidate.id === id);
  expect(product?.category).toBe("string");
  return product as StringProduct;
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

  it("keeps Play-tier beginner SKUs aligned to official US product pages", () => {
    expect(racket("yy-nanoflare-700-play")).toMatchObject({
      name: "Nanoflare 700 Play",
      shaftFlex: "flexible",
      minRecommendedLevel: "recreational",
      verificationStatus: "official_verified",
      officialSourceUrl: "https://us.yonex.com/products/nanoflare-700-play",
    });

    expect(racket("yy-astrox-77-play")).toMatchObject({
      name: "Astrox 77 Play",
      shaftFlex: "flexible",
      headWeight: "head_heavy",
      verificationStatus: "official_verified",
      officialSourceUrl: "https://us.yonex.com/products/astrox-77-play",
    });
  });

  it("keeps high-traffic Yonex string SKUs aligned to official sources", () => {
    expect(stringProduct("yy-aerobite")).toMatchObject({
      name: "Aerobite",
      gaugeMm: 0.61,
      verificationStatus: "official_verified",
      officialSourceUrl: "https://us.yonex.com/products/aerobite-set",
    });

    expect(stringProduct("yy-bg80-power")).toMatchObject({
      name: "BG80 Power",
      gaugeMm: 0.68,
      repulsion: "very_high",
      verificationStatus: "editor_verified",
      officialSourceUrl: "https://www.yonex.com/bg80",
    });

    expect(stringProduct("ln-l69-string")).toMatchObject({
      name: "L69 String",
      gaugeMm: 0.69,
      image: { verified: true },
    });
  });

  it("keeps catalogue-backed best-of racket images verified", () => {
    expect(racket("vic-drivex-8s").image).toMatchObject({ verified: true });
    expect(racket("vic-jetspeed-12").image).toMatchObject({ verified: true });
    expect(racket("yy-arcsaber-7-tour").image).toMatchObject({ verified: true });
    expect(racket("vic-drivex-12").image).toMatchObject({ verified: true });
    expect(racket("ln-halbertec-9000").image).toMatchObject({ verified: true });
  });

  it("wires flagship brand hub top picks to live PDP shells", () => {
    const exits: Record<string, string> = {
      yonex: "/product/yy-nanoflare-700-play/",
      victor: "/product/vic-drivex-8s/",
      "li-ning": "/product/ln-l69-string/",
      anta: "/product/anta-ah600w/",
      bonny: "/product/bonny-snake-breath/",
      kawasaki: "/product/kawasaki-chocolate-88d/",
      kumpoo: "/product/kumpoo-shura-2/",
    };

    for (const [slug, href] of Object.entries(exits)) {
      expect(CATALOGUE.some((p) => p.id === href.replace(/^\/product\/|\/$/g, ""))).toBe(
        true
      );
      const source = readFileSync(
        resolve(process.cwd(), `src/app/brands/${slug}/page.tsx`),
        "utf8"
      );
      expect(source).toContain(`href: "${href}"`);
    }
  });
});
