import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  validateCatalogStringBaselineFile,
} from "@/lib/catalog-string-baseline";
import {
  validateCommercialStringBaselineFile,
} from "@/lib/commercial-string-baseline";
import { validatePdpBaselineFile } from "@/lib/pdp-baseline";
import {
  editorialHrefToSlug,
  evaluateStringEditorialParity,
  formatStringEditorialParityIssues,
} from "@/lib/string-editorial-parity";

const CATALOG_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-string-queries.json"
);
const COMMERCIAL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-string-queries.json"
);
const PDP_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/pdp-queries.json"
);

describe("string-editorial-parity", () => {
  it("converts editorial hrefs to review slugs", () => {
    expect(editorialHrefToSlug("/review/badminton-string-selector/")).toBe(
      "badminton-string-selector"
    );
    expect(editorialHrefToSlug("/review/li-ning-l69-string-review/")).toBe(
      "li-ning-l69-string-review"
    );
    expect(editorialHrefToSlug("/product/yy-bg65/")).toBeNull();
  });

  it("passes all committed string baselines with three-way PDP parity", () => {
    const catalogRaw = JSON.parse(readFileSync(CATALOG_BASELINE_PATH, "utf8"));
    const commercialRaw = JSON.parse(
      readFileSync(COMMERCIAL_BASELINE_PATH, "utf8")
    );
    const pdpRaw = JSON.parse(readFileSync(PDP_BASELINE_PATH, "utf8"));

    const catalog = validateCatalogStringBaselineFile(catalogRaw);
    const commercial = validateCommercialStringBaselineFile(commercialRaw);
    const pdp = validatePdpBaselineFile(pdpRaw);
    expect(catalog.ok).toBe(true);
    expect(commercial.ok).toBe(true);
    expect(pdp.ok).toBe(true);
    if (!catalog.ok || !commercial.ok || !pdp.ok) return;

    const result = evaluateStringEditorialParity(
      catalog.file,
      commercial.file,
      pdp.file
    );
    if (!result.ok) {
      console.error(formatStringEditorialParityIssues(result));
    }
    expect(result.ok).toBe(true);
    expect(result.checked).toBeGreaterThanOrEqual(6);
  });

  it("flags missing PDP rows", () => {
    const result = evaluateStringEditorialParity(
      {
        version: 1,
        queries: [
          {
            id: "test",
            productId: "yy-bg65",
            expectHref: "/review/badminton-string-selector/",
            expectKind: "guide",
          },
        ],
      },
      {
        version: 1,
        queries: [
          {
            id: "test",
            productId: "yy-bg65",
            expectHref: "/review/badminton-string-selector/",
            expectKind: "guide",
          },
        ],
      },
      { version: 1, queries: [] }
    );
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.message).toContain("missing PDP");
  });
});
