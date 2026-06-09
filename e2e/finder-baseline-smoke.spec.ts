import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

type E2eProfile = {
  id: string;
  e2e?: boolean;
  profile: {
    level?: string;
    discipline?: string;
    styles?: string[];
    category?: string;
    body?: {
      budgetMaxUsd?: number;
      footWidth?: string;
      injuryFlags?: string[];
    };
  };
};

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/finder-profile-queries.json"
);

function e2eProfiles(): E2eProfile[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eProfile[];
  };
  return raw.queries.filter((q) => q.e2e);
}

const LEVEL_BUTTON: Record<string, string> = {
  recreational: "Recreational",
  club: "Club",
  competitive: "Competitive",
  pro_oriented: "Pro-oriented",
};

const DISCIPLINE_BUTTON: Record<string, string> = {
  singles: "Singles",
  doubles: "Doubles",
  mixed: "Mixed",
};

const STYLE_BUTTON: Record<string, string> = {
  offensive: "Offensive",
  balanced: "Balanced",
  defensive: "Defensive",
  front_court: "Front court",
  smash_heavy: "Smash-heavy",
};

const CATEGORY_BUTTON: Record<string, string> = {
  racket: "Racket",
  shoes: "Shoes",
  string: "String",
  grip: "Grip",
  bag: "Bag",
  shuttle: "Shuttle",
};

async function runQuizProfile(
  page: import("@playwright/test").Page,
  spec: E2eProfile
) {
  const funnel = page.locator("#quiz-funnel");
  const { profile } = spec;

  if (profile.level) {
    await funnel
      .getByRole("button", { name: LEVEL_BUTTON[profile.level] ?? profile.level })
      .click();
  }
  if (profile.discipline) {
    await funnel
      .getByRole("button", {
        name: DISCIPLINE_BUTTON[profile.discipline] ?? profile.discipline,
      })
      .click();
  }
  for (const style of profile.styles ?? []) {
    await funnel
      .getByRole("button", { name: STYLE_BUTTON[style] ?? style })
      .click();
  }
  if ((profile.styles?.length ?? 0) > 0) {
    await funnel.getByRole("button", { name: /^Continue$/i }).click();
  }
  if (profile.category) {
    await funnel
      .getByRole("button", {
        name: CATEGORY_BUTTON[profile.category] ?? profile.category,
      })
      .click();
  }
  if (profile.body?.budgetMaxUsd !== undefined) {
    await funnel
      .getByLabel(/budget max/i)
      .fill(String(profile.body.budgetMaxUsd));
  }
  if (profile.body?.footWidth) {
    await funnel
      .getByRole("button", { name: profile.body.footWidth, exact: true })
      .click();
  }
  for (const flag of profile.body?.injuryFlags ?? []) {
    if (flag !== "none") {
      await funnel.getByRole("button", { name: flag, exact: true }).click();
    }
  }
  await funnel.getByRole("button", { name: /see recommendations/i }).click();
  await page.waitForURL(/\/results\//, { timeout: 15_000 });
}

for (const spec of e2eProfiles()) {
  test(`finder baseline e2e: ${spec.id}`, async ({ page }) => {
    await page.goto("/quiz/");
    await runQuizProfile(page, spec);

    await expect(
      page.getByRole("heading", { name: /your equipment shortlist/i })
    ).toBeVisible();

    const resultCards = page.locator("article").filter({
      has: page.getByRole("heading", { level: 2 }),
    });
    await expect(resultCards.first()).toBeVisible();
    await expect(resultCards).not.toHaveCount(0);
  });
}
