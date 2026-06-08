/**
 * Unified six-category editorial three-way parity guard.
 *
 * Aggregates racket, shoe, string, shuttle, grip, and bag parity evaluators
 * so operators can assert the full commercial catalogue in one CI command.
 */

import type { BagEditorialParityResult } from "@/lib/bag-editorial-parity";
import { evaluateBagEditorialParity } from "@/lib/bag-editorial-parity";
import type { CatalogBagBaselineFile } from "@/lib/catalog-bag-baseline";
import type { CatalogGripBaselineFile } from "@/lib/catalog-grip-baseline";
import type { CatalogRacketBaselineFile } from "@/lib/catalog-racket-baseline";
import type { CatalogShoeBaselineFile } from "@/lib/catalog-shoe-baseline";
import type { CatalogShuttleBaselineFile } from "@/lib/catalog-shuttle-baseline";
import type { CatalogStringBaselineFile } from "@/lib/catalog-string-baseline";
import type { CommercialBagBaselineFile } from "@/lib/commercial-bag-baseline";
import type { CommercialGripBaselineFile } from "@/lib/commercial-grip-baseline";
import type { CommercialRacketBaselineFile } from "@/lib/commercial-racket-baseline";
import type { CommercialShoeBaselineFile } from "@/lib/commercial-shoe-baseline";
import type { CommercialShuttleBaselineFile } from "@/lib/commercial-shuttle-baseline";
import type { CommercialStringBaselineFile } from "@/lib/commercial-string-baseline";
import type { GripEditorialParityResult } from "@/lib/grip-editorial-parity";
import { evaluateGripEditorialParity } from "@/lib/grip-editorial-parity";
import type { PdpBaselineFile } from "@/lib/pdp-baseline";
import type { RacketEditorialParityResult } from "@/lib/racket-editorial-parity";
import { evaluateRacketEditorialParity } from "@/lib/racket-editorial-parity";
import type { ShoeEditorialParityResult } from "@/lib/shoe-editorial-parity";
import { evaluateShoeEditorialParity } from "@/lib/shoe-editorial-parity";
import type { ShuttleEditorialParityResult } from "@/lib/shuttle-editorial-parity";
import { evaluateShuttleEditorialParity } from "@/lib/shuttle-editorial-parity";
import type { StringEditorialParityResult } from "@/lib/string-editorial-parity";
import { evaluateStringEditorialParity } from "@/lib/string-editorial-parity";

export type AllCategoryEditorialParityInput = {
  racket: {
    catalog: CatalogRacketBaselineFile;
    commercial: CommercialRacketBaselineFile;
    pdp: PdpBaselineFile;
  };
  shoe: {
    catalog: CatalogShoeBaselineFile;
    commercial: CommercialShoeBaselineFile;
    pdp: PdpBaselineFile;
  };
  string: {
    catalog: CatalogStringBaselineFile;
    commercial: CommercialStringBaselineFile;
    pdp: PdpBaselineFile;
  };
  shuttle: {
    catalog: CatalogShuttleBaselineFile;
    commercial: CommercialShuttleBaselineFile;
    pdp: PdpBaselineFile;
  };
  grip: {
    catalog: CatalogGripBaselineFile;
    commercial: CommercialGripBaselineFile;
    pdp: PdpBaselineFile;
  };
  bag: {
    catalog: CatalogBagBaselineFile;
    commercial: CommercialBagBaselineFile;
    pdp: PdpBaselineFile;
  };
};

export type CategoryParitySummary = {
  category: keyof AllCategoryEditorialParityInput;
  checked: number;
  ok: boolean;
  issueCount: number;
};

export type AllCategoryEditorialParityResult = {
  ok: boolean;
  totalChecked: number;
  categories: CategoryParitySummary[];
  racket: RacketEditorialParityResult;
  shoe: ShoeEditorialParityResult;
  string: StringEditorialParityResult;
  shuttle: ShuttleEditorialParityResult;
  grip: GripEditorialParityResult;
  bag: BagEditorialParityResult;
};

/** Minimum committed commercial picks per category — keep in sync with baseline JSON. */
export const ALL_CATEGORY_EDITORIAL_PARITY_MIN: Record<
  keyof AllCategoryEditorialParityInput,
  number
> = {
  racket: 44,
  shoe: 16,
  string: 6,
  shuttle: 6,
  grip: 6,
  bag: 2,
};

export function evaluateAllCategoryEditorialParity(
  input: AllCategoryEditorialParityInput
): AllCategoryEditorialParityResult {
  const racket = evaluateRacketEditorialParity(
    input.racket.catalog,
    input.racket.commercial,
    input.racket.pdp
  );
  const shoe = evaluateShoeEditorialParity(
    input.shoe.catalog,
    input.shoe.commercial,
    input.shoe.pdp
  );
  const stringResult = evaluateStringEditorialParity(
    input.string.catalog,
    input.string.commercial,
    input.string.pdp
  );
  const shuttle = evaluateShuttleEditorialParity(
    input.shuttle.catalog,
    input.shuttle.commercial,
    input.shuttle.pdp
  );
  const grip = evaluateGripEditorialParity(
    input.grip.catalog,
    input.grip.commercial,
    input.grip.pdp
  );
  const bag = evaluateBagEditorialParity(
    input.bag.catalog,
    input.bag.commercial,
    input.bag.pdp
  );

  const categoryResults: [
    keyof AllCategoryEditorialParityInput,
    { ok: boolean; checked: number; issues: unknown[] },
  ][] = [
    ["racket", racket],
    ["shoe", shoe],
    ["string", stringResult],
    ["shuttle", shuttle],
    ["grip", grip],
    ["bag", bag],
  ];

  const categories: CategoryParitySummary[] = categoryResults.map(
    ([category, result]) => ({
      category,
      checked: result.checked,
      ok: result.ok,
      issueCount: result.issues.length,
    })
  );

  const totalChecked = categories.reduce((sum, row) => sum + row.checked, 0);

  return {
    ok: categories.every((row) => row.ok),
    totalChecked,
    categories,
    racket,
    shoe,
    string: stringResult,
    shuttle,
    grip,
    bag,
  };
}

export function formatAllCategoryEditorialParityResult(
  result: AllCategoryEditorialParityResult
): string {
  if (result.ok) {
    const breakdown = result.categories
      .map((row) => `${row.category}=${row.checked}`)
      .join(", ");
    return `[all-category-editorial-parity] ${result.totalChecked} commercial picks passed three-way parity (${breakdown})`;
  }

  const failed = result.categories.filter((row) => !row.ok);
  const lines = failed.map(
    (row) => `  • ${row.category}: ${row.issueCount} issue(s)`
  );
  return `[all-category-editorial-parity] ${failed.length} categor(ies) failed:\n${lines.join("\n")}`;
}
