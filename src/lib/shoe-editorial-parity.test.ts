import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { validateCatalogShoeBaselineFile } from "@/lib/catalog-shoe-baseline";
import { validateCommercialShoeBaselineFile } from "@/lib/commercial-shoe-baseline";
import { validatePdpBaselineFile } from "@/lib/pdp-baseline";
import {
  editorialHrefToSlug,
  evaluateShoeEditorialParity,
  formatShoeEditorialParityIssues,
} from "@/lib/shoe-editorial-parity";

const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-shoe-queries.json"
);
const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-shoe-queries.json"
);
const PDP_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/pdp-queries.json"
);

describe("shoe-editorial-parity", () => {
  it("converts editorial hrefs to review slugs", () => {
    expect(editorialHrefToSlug("/review/yonex-comfort-z3-shoes-review/")).toBe(
      "yonex-comfort-z3-shoes-review"
    );
    expect(editorialHrefToSlug("/review/victor-p9200-iii-shoes-review/")).toBe(
      "victor-p9200-iii-shoes-review"
    );
    expect(editorialHrefToSlug("/product/yy-bg65/")).toBeNull();
  });

  it("passes all committed shoe baselines with three-way PDP parity", () => {
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const pdpRaw = JSON.parse(readFileSync(PDP_BASELINE_PATH, "utf8"));

    const catalog = validateCatalogShoeBaselineFile(catalogRaw);
    const commercial = validateCommercialShoeBaselineFile(commercialRaw);
    const pdp = validatePdpBaselineFile(pdpRaw);
    expect(catalog.ok).toBe(true);
    expect(commercial.ok).toBe(true);
    expect(pdp.ok).toBe(true);
    if (!catalog.ok || !commercial.ok || !pdp.ok) return;

    const result = evaluateShoeEditorialParity(
      catalog.file,
      commercial.file,
      pdp.file
    );
    if (!result.ok) {
      console.error(formatShoeEditorialParityIssues(result));
    }
    expect(result.ok).toBe(true);
    expect(result.checked).toBeGreaterThanOrEqual(16);
  });

  it("flags missing PDP rows", () => {
    const row = {
      id: "test",
      productId: "yy-comfort-z3",
      expectHref: "/review/yonex-comfort-z3-shoes-review/",
      expectKind: "review" as const,
    };
    const result = evaluateShoeEditorialParity(
      { version: 1, queries: [row] },
      { version: 1, queries: [row] },
      { version: 1, queries: [] }
    );
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.message).toContain("missing PDP");
  });
});
