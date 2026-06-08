import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  ALL_CATEGORY_EDITORIAL_PARITY_MIN,
  evaluateAllCategoryEditorialParity,
  formatAllCategoryEditorialParityResult,
} from "@/lib/all-category-editorial-parity";
import { validateCatalogBagBaselineFile } from "@/lib/catalog-bag-baseline";
import { validateCatalogGripBaselineFile } from "@/lib/catalog-grip-baseline";
import { validateCatalogRacketBaselineFile } from "@/lib/catalog-racket-baseline";
import { validateCatalogShoeBaselineFile } from "@/lib/catalog-shoe-baseline";
import { validateCatalogShuttleBaselineFile } from "@/lib/catalog-shuttle-baseline";
import { validateCatalogStringBaselineFile } from "@/lib/catalog-string-baseline";
import { validateCommercialBagBaselineFile } from "@/lib/commercial-bag-baseline";
import { validateCommercialGripBaselineFile } from "@/lib/commercial-grip-baseline";
import { validateCommercialRacketBaselineFile } from "@/lib/commercial-racket-baseline";
import { validateCommercialShoeBaselineFile } from "@/lib/commercial-shoe-baseline";
import { validateCommercialShuttleBaselineFile } from "@/lib/commercial-shuttle-baseline";
import { validateCommercialStringBaselineFile } from "@/lib/commercial-string-baseline";
import { validatePdpBaselineFile } from "@/lib/pdp-baseline";

const BASELINES = {
  racket: {
    catalog: resolve(process.cwd(), "docs/baselines/catalog-racket-queries.json"),
    commercial: resolve(
      process.cwd(),
      "docs/baselines/commercial-racket-queries.json"
    ),
  },
  shoe: {
    catalog: resolve(process.cwd(), "docs/baselines/catalog-shoe-queries.json"),
    commercial: resolve(
      process.cwd(),
      "docs/baselines/commercial-shoe-queries.json"
    ),
  },
  string: {
    catalog: resolve(process.cwd(), "docs/baselines/catalog-string-queries.json"),
    commercial: resolve(
      process.cwd(),
      "docs/baselines/commercial-string-queries.json"
    ),
  },
  shuttle: {
    catalog: resolve(
      process.cwd(),
      "docs/baselines/catalog-shuttle-queries.json"
    ),
    commercial: resolve(
      process.cwd(),
      "docs/baselines/commercial-shuttle-queries.json"
    ),
  },
  grip: {
    catalog: resolve(process.cwd(), "docs/baselines/catalog-grip-queries.json"),
    commercial: resolve(
      process.cwd(),
      "docs/baselines/commercial-grip-queries.json"
    ),
  },
  bag: {
    catalog: resolve(process.cwd(), "docs/baselines/catalog-bag-queries.json"),
    commercial: resolve(
      process.cwd(),
      "docs/baselines/commercial-bag-queries.json"
    ),
  },
  pdp: resolve(process.cwd(), "docs/baselines/pdp-queries.json"),
} as const;

function loadCategoryBaselines() {
  const pdpRaw = JSON.parse(readFileSync(BASELINES.pdp, "utf8"));
  const pdp = validatePdpBaselineFile(pdpRaw);
  expect(pdp.ok).toBe(true);
  if (!pdp.ok) throw new Error("invalid PDP baseline");

  const input = {} as Parameters<typeof evaluateAllCategoryEditorialParity>[0];

  for (const category of Object.keys(BASELINES).filter((key) => key !== "pdp")) {
    const paths = BASELINES[category as keyof typeof BASELINES];
    if (typeof paths === "string") continue;

    const catalogRaw = JSON.parse(readFileSync(paths.catalog, "utf8"));
    const commercialRaw = JSON.parse(readFileSync(paths.commercial, "utf8"));

    const validators = {
      racket: {
        catalog: validateCatalogRacketBaselineFile,
        commercial: validateCommercialRacketBaselineFile,
      },
      shoe: {
        catalog: validateCatalogShoeBaselineFile,
        commercial: validateCommercialShoeBaselineFile,
      },
      string: {
        catalog: validateCatalogStringBaselineFile,
        commercial: validateCommercialStringBaselineFile,
      },
      shuttle: {
        catalog: validateCatalogShuttleBaselineFile,
        commercial: validateCommercialShuttleBaselineFile,
      },
      grip: {
        catalog: validateCatalogGripBaselineFile,
        commercial: validateCommercialGripBaselineFile,
      },
      bag: {
        catalog: validateCatalogBagBaselineFile,
        commercial: validateCommercialBagBaselineFile,
      },
    } as const;

    const categoryKey = category as keyof typeof validators;
    const catalog = validators[categoryKey].catalog(catalogRaw);
    const commercial = validators[categoryKey].commercial(commercialRaw);
    expect(catalog.ok).toBe(true);
    expect(commercial.ok).toBe(true);
    if (!catalog.ok || !commercial.ok) {
      throw new Error(`invalid ${category} baseline`);
    }

    input[categoryKey] = {
      catalog: catalog.file,
      commercial: commercial.file,
      pdp: pdp.file,
    };
  }

  return input;
}

describe("all-category-editorial-parity", () => {
  it("passes all committed six-category baselines with three-way PDP parity", () => {
    const input = loadCategoryBaselines();
    const result = evaluateAllCategoryEditorialParity(input);
    if (!result.ok) {
      console.error(formatAllCategoryEditorialParityResult(result));
    }
    expect(result.ok).toBe(true);

    for (const row of result.categories) {
      expect(row.checked).toBeGreaterThanOrEqual(
        ALL_CATEGORY_EDITORIAL_PARITY_MIN[row.category]
      );
    }

    expect(result.totalChecked).toBeGreaterThanOrEqual(80);
  });

  it("reports aggregate totals", () => {
    const input = loadCategoryBaselines();
    const result = evaluateAllCategoryEditorialParity(input);
    expect(result.categories).toHaveLength(6);
    expect(formatAllCategoryEditorialParityResult(result)).toContain(
      "all-category-editorial-parity"
    );
  });
});
