import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { PRECACHE_ASSERT_PATHS } from "./pwa-precache-paths";
import {
  CRUX_OFFLINE_RECOVERY_PATHS,
  OFFLINE_RECOVERY_PATHS,
} from "./offline-recovery-paths";

const SW_PATH = resolve(process.cwd(), "public/sw.js");

describe("offline recovery paths", () => {
  const swSource = readFileSync(SW_PATH, "utf8");

  it("lists every CrUX-priority URL from crux-template.csv", () => {
    for (const path of CRUX_OFFLINE_RECOVERY_PATHS) {
      expect(OFFLINE_RECOVERY_PATHS, `missing offline recovery for ${path}`).toContain(
        path
      );
    }
  });

  it("only links to precached routes", () => {
    for (const path of OFFLINE_RECOVERY_PATHS) {
      expect(
        PRECACHE_ASSERT_PATHS,
        `${path} is not in PRECACHE_ASSERT_PATHS`
      ).toContain(path);
    }
  });

  it("CrUX commercial deep-links are precached in the service worker", () => {
    for (const path of [
      "/best/beginner-rackets/",
      "/compare-guides/yonex-astrox-vs-nanoflare/",
      "/guides/string-tension/",
    ]) {
      expect(swSource, `missing precache for ${path}`).toContain(`"${path}"`);
    }
  });
});
