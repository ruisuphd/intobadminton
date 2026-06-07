import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

type E2eQuery = {
  id: string;
  productId: string;
  expectHref: string;
  expectKind: "guide" | "review";
  expectBestSlug?: string;
  expectAnchor?: string;
  expectLinkLabel?: string;
  e2e?: boolean;
  note?: string;
};

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/commercial-shoe-queries.json"
);

function e2eQueries(): E2eQuery[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eQuery[];
  };
  return raw.queries.filter((q) => q.e2e);
}

for (const spec of e2eQueries()) {
  test(`commercial shoe editorial exit: ${spec.id}`, async ({ page }) => {
    expect(spec.expectBestSlug).toBeDefined();
    expect(spec.expectAnchor).toBeDefined();
    expect(spec.expectLinkLabel).toBeDefined();

    await page.goto(`/best/${spec.expectBestSlug}/`);

    const anchor = page.locator(
      `[id="${spec.expectAnchor!.replace(/"/g, '\\"')}"]`
    );
    await expect(
      anchor.getByRole("link", { name: spec.expectLinkLabel! })
    ).toHaveAttribute("href", spec.expectHref);
  });
}
