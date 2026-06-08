import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  validatePdpBaselineFile,
  type PdpBaselineQuery,
} from "../src/lib/pdp-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/pdp-queries.json"
);

function e2ePdpPaths(): {
  id: string;
  path: string;
  expectReviewSlug?: string;
  expectReviewKind?: "review" | "guide";
}[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validatePdpBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: PdpBaselineQuery) => q.e2e)
    .map((q: PdpBaselineQuery) => ({
      id: q.id,
      path: `/product/${q.productId}/`,
      expectReviewSlug: q.expectReviewSlug,
      expectReviewKind: q.expectReviewKind,
    }));
}

for (const { id, path, expectReviewSlug, expectReviewKind } of e2ePdpPaths()) {
  test(`PDP baseline e2e: ${id}`, async ({ page }) => {
    await page.goto(path);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({
      timeout: 15_000,
    });

    await expect(
      page.getByRole("heading", { name: "Specifications" })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /equipment finder/i })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Browse .* in catalog/i }).first()
    ).toBeVisible();

    if (expectReviewSlug) {
      const reviewLinkLabel =
        expectReviewKind === "guide"
          ? /Read (string|grip|bag) guide/i
          : /Read the full review/i;
      await expect(page.getByRole("link", { name: reviewLinkLabel })).toBeVisible();
      await expect(
        page.getByRole("link", { name: reviewLinkLabel })
      ).toHaveAttribute("href", `/review/${expectReviewSlug}/`);
    }
  });
}
