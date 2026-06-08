import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  validateCatalogGripBaselineFile,
} from "@/lib/catalog-grip-baseline";
import {
  validateCommercialGripBaselineFile,
} from "@/lib/commercial-grip-baseline";
import { validatePdpBaselineFile } from "@/lib/pdp-baseline";
import {
  editorialHrefToSlug,
  evaluateGripEditorialParity,
  formatGripEditorialParityIssues,
} from "@/lib/grip-editorial-parity";

const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-grip-queries.json"
);
const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-grip-queries.json"
);
const PDP_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/pdp-queries.json"
);

describe("grip-editorial-parity", () => {
  it("converts editorial hrefs to review slugs", () => {
    expect(editorialHrefToSlug("/review/yonex-grip-sizes-explained/")).toBe(
      "yonex-grip-sizes-explained"
    );
    expect(editorialHrefToSlug("/review/li-ning-gp100-pro-overgrip-review/")).toBe(
      "li-ning-gp100-pro-overgrip-review"
    );
    expect(editorialHrefToSlug("/product/yy-ac102c/")).toBeNull();
  });

  it("passes all committed grip baselines with three-way PDP parity", () => {
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const pdpRaw = JSON.parse(readFileSync(PDP_BASELINE_PATH, "utf8"));

    const catalog = validateCatalogGripBaselineFile(catalogRaw);
    const commercial = validateCommercialGripBaselineFile(commercialRaw);
    const pdp = validatePdpBaselineFile(pdpRaw);
    expect(catalog.ok).toBe(true);
    expect(commercial.ok).toBe(true);
    expect(pdp.ok).toBe(true);
    if (!catalog.ok || !commercial.ok || !pdp.ok) return;

    const result = evaluateGripEditorialParity(
      catalog.file,
      commercial.file,
      pdp.file
    );
    if (!result.ok) {
      console.error(formatGripEditorialParityIssues(result));
    }
    expect(result.ok).toBe(true);
    expect(result.checked).toBeGreaterThanOrEqual(6);
  });

  it("flags missing PDP rows", () => {
    const row = {
      id: "test",
      productId: "yy-ac102c",
      expectHref: "/review/yonex-grip-sizes-explained/",
      expectKind: "guide" as const,
    };
    const result = evaluateGripEditorialParity(
      { version: 1, queries: [row] },
      { version: 1, queries: [row] },
      { version: 1, queries: [] }
    );
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.message).toContain("missing PDP");
  });
});
