import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  validateCatalogBagBaselineFile,
} from "@/lib/catalog-bag-baseline";
import {
  validateCommercialBagBaselineFile,
} from "@/lib/commercial-bag-baseline";
import { validatePdpBaselineFile } from "@/lib/pdp-baseline";
import {
  editorialHrefToSlug,
  evaluateBagEditorialParity,
  formatBagEditorialParityIssues,
} from "@/lib/bag-editorial-parity";

const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-bag-queries.json"
);
const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-bag-queries.json"
);
const PDP_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/pdp-queries.json"
);

describe("bag-editorial-parity", () => {
  it("converts editorial hrefs to review slugs", () => {
    expect(editorialHrefToSlug("/review/badminton-bag-loadout/")).toBe(
      "badminton-bag-loadout"
    );
    expect(editorialHrefToSlug("/product/yy-pro-racket-bag-92429/")).toBeNull();
  });

  it("passes all committed bag baselines with three-way PDP parity", () => {
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const pdpRaw = JSON.parse(readFileSync(PDP_BASELINE_PATH, "utf8"));

    const catalog = validateCatalogBagBaselineFile(catalogRaw);
    const commercial = validateCommercialBagBaselineFile(commercialRaw);
    const pdp = validatePdpBaselineFile(pdpRaw);
    expect(catalog.ok).toBe(true);
    expect(commercial.ok).toBe(true);
    expect(pdp.ok).toBe(true);
    if (!catalog.ok || !commercial.ok || !pdp.ok) return;

    const result = evaluateBagEditorialParity(
      catalog.file,
      commercial.file,
      pdp.file
    );
    if (!result.ok) {
      console.error(formatBagEditorialParityIssues(result));
    }
    expect(result.ok).toBe(true);
    expect(result.checked).toBeGreaterThanOrEqual(2);
  });

  it("flags missing PDP rows", () => {
    const row = {
      id: "test",
      productId: "yy-pro-racket-bag-92429",
      expectHref: "/review/badminton-bag-loadout/",
      expectKind: "guide" as const,
    };
    const result = evaluateBagEditorialParity(
      { version: 1, queries: [row] },
      { version: 1, queries: [row] },
      { version: 1, queries: [] }
    );
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.message).toContain("missing PDP");
  });
});
