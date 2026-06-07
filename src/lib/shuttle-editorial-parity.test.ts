import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  validateCatalogShuttleBaselineFile,
} from "@/lib/catalog-shuttle-baseline";
import {
  validateCommercialShuttleBaselineFile,
} from "@/lib/commercial-shuttle-baseline";
import { validatePdpBaselineFile } from "@/lib/pdp-baseline";
import {
  editorialHrefToSlug,
  evaluateShuttleEditorialParity,
  formatShuttleEditorialParityIssues,
} from "@/lib/shuttle-editorial-parity";

const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-shuttle-queries.json"
);
const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-shuttle-queries.json"
);
const PDP_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/pdp-queries.json"
);

describe("shuttle-editorial-parity", () => {
  it("converts editorial hrefs to review slugs", () => {
    expect(editorialHrefToSlug("/review/yonex-aerosensa-50-shuttle-review/")).toBe(
      "yonex-aerosensa-50-shuttle-review"
    );
    expect(editorialHrefToSlug("/review/victor-carbonsonic-max-shuttle-review/")).toBe(
      "victor-carbonsonic-max-shuttle-review"
    );
    expect(editorialHrefToSlug("/product/yy-bg65/")).toBeNull();
  });

  it("passes all committed string baselines with three-way PDP parity", () => {
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const pdpRaw = JSON.parse(readFileSync(PDP_BASELINE_PATH, "utf8"));

    const catalog = validateCatalogShuttleBaselineFile(catalogRaw);
    const commercial = validateCommercialShuttleBaselineFile(commercialRaw);
    const pdp = validatePdpBaselineFile(pdpRaw);
    expect(catalog.ok).toBe(true);
    expect(commercial.ok).toBe(true);
    expect(pdp.ok).toBe(true);
    if (!catalog.ok || !commercial.ok || !pdp.ok) return;

    const result = evaluateShuttleEditorialParity(
      catalog.file,
      commercial.file,
      pdp.file
    );
    if (!result.ok) {
      console.error(formatShuttleEditorialParityIssues(result));
    }
    expect(result.ok).toBe(true);
    expect(result.checked).toBeGreaterThanOrEqual(6);
  });

  it("flags missing PDP rows", () => {
    const row = {
      id: "test",
      productId: "yy-as-50",
      expectHref: "/review/yonex-aerosensa-50-shuttle-review/",
      expectKind: "review" as const,
    };
    const result = evaluateShuttleEditorialParity(
      { version: 1, queries: [row] },
      { version: 1, queries: [row] },
      { version: 1, queries: [] }
    );
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.message).toContain("missing PDP");
  });
});
