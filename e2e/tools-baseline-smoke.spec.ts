import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  toolPathForSlug,
  validateToolsBaselineFile,
  type ToolsBaselineQuery,
} from "../src/lib/tools-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/tools-queries.json"
);

function e2eToolPaths(): {
  id: string;
  path: string;
  expectCatalogHref: string;
  expectHeadingPattern?: string;
  expectCatalogLinkPattern?: string;
  expectFinderCta?: boolean;
}[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const parsed = validateToolsBaselineFile(raw);
  if (!parsed.ok) return [];

  return parsed.file.queries
    .filter((q: ToolsBaselineQuery) => q.e2e)
    .map((q: ToolsBaselineQuery) => ({
      id: q.id,
      path: toolPathForSlug(q.slug),
      expectCatalogHref: q.expectCatalogHref,
      expectHeadingPattern: q.expectHeadingPattern,
      expectCatalogLinkPattern: q.expectCatalogLinkPattern,
      expectFinderCta: q.expectFinderCta,
    }));
}

for (const {
  id,
  path,
  expectCatalogHref,
  expectHeadingPattern,
  expectCatalogLinkPattern,
  expectFinderCta,
} of e2eToolPaths()) {
  test(`Tools baseline e2e: ${id}`, async ({ page }) => {
    await page.goto(path);

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible({ timeout: 15_000 });

    if (expectHeadingPattern) {
      await expect(heading).toContainText(
        new RegExp(expectHeadingPattern, "i")
      );
    }

    const catalogLink = page
      .getByRole("main")
      .getByRole("link", {
        name: expectCatalogLinkPattern
          ? new RegExp(expectCatalogLinkPattern, "i")
          : /browse.*catalog/i,
      });
    await expect(catalogLink).toHaveAttribute("href", expectCatalogHref);

    if (expectFinderCta) {
      await expect(
        page.getByRole("main").getByRole("link", { name: /start the finder/i })
      ).toHaveAttribute("href", "/quiz/");
    }
  });
}
