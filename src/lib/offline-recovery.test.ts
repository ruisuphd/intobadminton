import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { homeFeaturedReviewHrefs } from "./home-featured";
import {
  homePopularSearchEditorialOfflineRecoveryLinks,
  homePopularSearchHrefs,
  homePopularSearchReviewOfflineRecoveryLinks,
} from "./home-popular-searches";
import { PRECACHE_ASSERT_PATHS } from "./pwa-precache-paths";
import {
  CRUX_OFFLINE_RECOVERY_PATHS,
  OFFLINE_RECOVERY_PATHS,
} from "./offline-recovery-paths";

const SW_PATH = resolve(process.cwd(), "public/sw.js");
const CRUX_TEMPLATE_PATH = resolve(
  process.cwd(),
  "docs/baselines/crux-template.csv"
);

function cruxTemplatePaths(): string[] {
  const lines = readFileSync(CRUX_TEMPLATE_PATH, "utf8").trim().split("\n");
  return lines
    .slice(1)
    .map((line) => {
      const url = line.split(",")[0]?.trim();
      if (!url) return null;
      try {
        const path = new URL(url).pathname;
        return path === "/" ? null : path.endsWith("/") ? path : `${path}/`;
      } catch {
        return null;
      }
    })
    .filter((path): path is string => path != null);
}

describe("offline recovery paths", () => {
  const swSource = readFileSync(SW_PATH, "utf8");

  it("lists every CrUX-priority URL from crux-template.csv", () => {
    for (const path of CRUX_OFFLINE_RECOVERY_PATHS) {
      expect(OFFLINE_RECOVERY_PATHS, `missing offline recovery for ${path}`).toContain(
        path
      );
    }
  });

  it("CRUX_OFFLINE_RECOVERY_PATHS matches crux-template.csv (excluding homepage)", () => {
    expect([...CRUX_OFFLINE_RECOVERY_PATHS].sort()).toEqual(
      cruxTemplatePaths().sort()
    );
  });

  it("only links to precached routes", () => {
    for (const path of OFFLINE_RECOVERY_PATHS) {
      expect(
        PRECACHE_ASSERT_PATHS,
        `${path} is not in PRECACHE_ASSERT_PATHS`
      ).toContain(path);
    }
  });

  it("CrUX template paths are precached in the service worker", () => {
    for (const path of cruxTemplatePaths()) {
      expect(swSource, `missing precache for ${path}`).toContain(`"${path}"`);
    }
  });

  it("lists every homepage featured review in offline recovery", () => {
    for (const path of homeFeaturedReviewHrefs()) {
      expect(OFFLINE_RECOVERY_PATHS, `missing offline recovery for ${path}`).toContain(
        path
      );
    }
  });

  it("lists every homepage popular-search review in offline recovery", () => {
    for (const link of homePopularSearchReviewOfflineRecoveryLinks()) {
      expect(
        OFFLINE_RECOVERY_PATHS,
        `missing offline recovery for ${link.href}`
      ).toContain(link.href);
    }
  });

  it("lists every homepage popular-search editorial pick in offline recovery", () => {
    for (const link of homePopularSearchEditorialOfflineRecoveryLinks()) {
      expect(
        OFFLINE_RECOVERY_PATHS,
        `missing offline recovery for ${link.href}`
      ).toContain(link.href);
    }
  });

  it("lists every homepage popular-search href in offline recovery", () => {
    for (const href of homePopularSearchHrefs()) {
      expect(
        OFFLINE_RECOVERY_PATHS,
        `missing offline recovery for ${href}`
      ).toContain(href);
    }
  });
});
