import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { validateCatalogRacketBaselineFile } from "@/lib/catalog-racket-baseline";
import { validateCommercialRacketBaselineFile } from "@/lib/commercial-racket-baseline";
import { validatePdpBaselineFile } from "@/lib/pdp-baseline";
import {
  editorialHrefToSlug,
  evaluateRacketEditorialParity,
  formatRacketEditorialParityIssues,
} from "@/lib/racket-editorial-parity";

const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-racket-queries.json"
);
const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-racket-queries.json"
);
const PDP_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/pdp-queries.json"
);

describe("racket-editorial-parity", () => {
  it("converts editorial hrefs to review slugs", () => {
    expect(editorialHrefToSlug("/review/yonex-arcsaber-7-pro-review/")).toBe(
      "yonex-arcsaber-7-pro-review"
    );
    expect(editorialHrefToSlug("/review/yonex-nanoflare-1000z-review/")).toBe(
      "yonex-nanoflare-1000z-review"
    );
    expect(editorialHrefToSlug("/product/yy-bg65/")).toBeNull();
  });

  it("passes all committed racket baselines with three-way PDP parity", () => {
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const pdpRaw = JSON.parse(readFileSync(PDP_BASELINE_PATH, "utf8"));

    const catalog = validateCatalogRacketBaselineFile(catalogRaw);
    const commercial = validateCommercialRacketBaselineFile(commercialRaw);
    const pdp = validatePdpBaselineFile(pdpRaw);
    expect(catalog.ok).toBe(true);
    expect(commercial.ok).toBe(true);
    expect(pdp.ok).toBe(true);
    if (!catalog.ok || !commercial.ok || !pdp.ok) return;

    const result = evaluateRacketEditorialParity(
      catalog.file,
      commercial.file,
      pdp.file
    );
    if (!result.ok) {
      console.error(formatRacketEditorialParityIssues(result));
    }
    expect(result.ok).toBe(true);
    expect(result.checked).toBeGreaterThanOrEqual(16);
  });

  it("flags missing PDP rows", () => {
    const row = {
      id: "test",
      productId: "yy-arcsaber-7-pro",
      expectHref: "/review/yonex-arcsaber-7-pro-review/",
      expectKind: "review" as const,
    };
    const result = evaluateRacketEditorialParity(
      { version: 1, queries: [row] },
      { version: 1, queries: [row] },
      { version: 1, queries: [] }
    );
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.message).toContain("missing PDP");
  });
});
