import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

type E2eQuery = {
  id: string;
  productId: string;
  expectHref: string;
  expectKind: "guide" | "review";
  e2e?: boolean;
  note?: string;
};

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/catalog-racket-queries.json"
);

const PRODUCT_LABELS: Record<string, RegExp> = {
  "kawasaki-crimson-blade": /Crimson Blade/i,
  "kumpoo-shura-2": /Shura II/i,
  "ln-axforce-10": /AxForce 10/i,
  "ln-axforce-100-gen-2": /AxForce 100 Gen 2/i,
  "ln-axforce-80-jr": /AxForce 80 JR/i,
  "ln-bladex-800-speed": /Bladex 800 Speed/i,
  "ln-bladex-arrow": /Bladex Arrow/i,
  "ln-halbertec-7000-ii": /Halbertec 7000 II/i,
  "ln-halbertec-8000": /Halbertec 8000/i,
  "ln-halbertec-9000": /Halbertec 9000/i,
  "ln-halbertec-9000-power": /Halbertec 9000 Power/i,
  "mizuno-altius-01-feel": /Altius N-Feel/i,
  "vic-auraspeed-100x-se": /Auraspeed 100X SE/i,
  "vic-auraspeed-90k-ii": /Auraspeed 90K II/i,
  "vic-auraspeed-fantome": /Auraspeed Fantome/i,
  "vic-auraspeed-hs-plus": /Auraspeed HS Plus/i,
  "vic-brave-sword-12": /Brave Sword 12/i,
  "vic-drivex-8s": /DriveX 8S/i,
  "vic-fz-88d-power-purple": /FZ 88D Power Purple/i,
  "vic-jetspeed-12": /Jetspeed 12/i,
  "vic-thruster-9900": /Thruster 9900/i,
  "vic-thruster-hwql": /Thruster HWQL Light/i,
  "vic-thruster-sr": /Thruster SR Light/i,
  "vic-yu-12": /DriveX 12/i,
  "yy-arcsaber-11-pro": /Arcsaber 11 Pro/i,
  "yy-arcsaber-7-play": /Arcsaber 7 Play/i,
  "yy-arcsaber-7-pro": /Arcsaber 7 Pro/i,
  "yy-arcsaber-7-tour": /Arcsaber 7 Tour/i,
  "yy-astrox-100-game": /Astrox 100 Game/i,
  "yy-astrox-100zz": /Astrox 100ZZ(?! VA)/i,
  "yy-astrox-100zz-va": /Astrox 100ZZ VA/i,
  "yy-astrox-77-play": /Astrox 77 Play/i,
  "yy-astrox-77-pro": /Astrox 77 Pro/i,
  "yy-astrox-88d-pro-2024": /Astrox 88D Pro/i,
  "yy-astrox-88s-pro-2024": /Astrox 88S Pro/i,
  "yy-astrox-99-pro": /Astrox 99 Pro(?!\s*\(2nd)/i,
  "yy-astrox-nextage": /Astrox Nextage/i,
  "yy-nanoflare-1000-play": /Nanoflare 1000 Play/i,
  "yy-nanoflare-1000z": /Nanoflare 1000 Z/i,
  "yy-nanoflare-700-play": /Nanoflare 700 Play/i,
  "yy-nanoflare-700-pro-2024": /Nanoflare 700 Pro/i,
  "yy-nanoflare-800-pro-2024": /Nanoflare 800 Pro \(2024\)/i,
  "yy-nanoray-light-70i": /Nanoray Light 70i/i,
  "yy-voltric-8dg": /Voltric 8DG/i,
};

function e2eQueries(): E2eQuery[] {
  const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    queries: E2eQuery[];
  };
  return raw.queries.filter((q) => q.e2e);
}

for (const spec of e2eQueries()) {
  test(`catalog racket editorial exit: ${spec.id}`, async ({ page }) => {
    const label = PRODUCT_LABELS[spec.productId];
    expect(label).toBeDefined();

    await page.goto("/catalog/?cat=racket");

    await page.getByRole("link", { name: label }).first().click();
    await expect(page).toHaveURL(
      new RegExp(`${spec.expectHref.replace(/\/$/, "")}/?$`)
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}
