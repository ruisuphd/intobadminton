import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { LIGHTHOUSE_BASELINE_NOINDEX_EXEMPT_PATHS } from "@/lib/lighthouse-paths";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/lighthouse-scores.json"
);
const CRUX_TEMPLATE_PATH = resolve(
  process.cwd(),
  "docs/baselines/crux-template.csv"
);
const BASELINE_CONFIG_PATH = resolve(process.cwd(), "lighthouserc-baseline.json");

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

function localLhciUrl(path: string): string {
  if (path === "/") return "http://localhost:4173/index.html";
  const trimmed = path.replace(/^\/|\/$/g, "");
  return `http://localhost:4173/${trimmed}/index.html`;
}

describe("lighthouse baseline", () => {
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as {
    capturedAt?: string;
    source?: string;
    urls?: Record<
      string,
      {
        performance: number | null;
        accessibility: number | null;
        "best-practices": number | null;
        seo: number | null;
      }
    >;
  };

  const baselineConfig = JSON.parse(
    readFileSync(BASELINE_CONFIG_PATH, "utf8")
  ) as { ci: { collect: { url: string[] } } };

  it("has captured scores for every CrUX-priority URL", () => {
    expect(baseline.urls).toBeDefined();
    expect(Object.keys(baseline.urls ?? {}).length).toBeGreaterThan(0);

    const exempt = new Set<string>(LIGHTHOUSE_BASELINE_NOINDEX_EXEMPT_PATHS);
    for (const path of cruxTemplatePaths().filter((p) => !exempt.has(p))) {
      const url = localLhciUrl(path);
      expect(baseline.urls, `missing baseline for ${url}`).toHaveProperty(url);
      const scores = baseline.urls![url];
      expect(scores.performance, `${url} performance`).toBeGreaterThanOrEqual(0.9);
      expect(scores.seo, `${url} seo`).toBeGreaterThanOrEqual(0.95);
    }
  });

  it("lighthouserc-baseline.json lists the same CrUX paths as crux-template.csv", () => {
    const configPaths = baselineConfig.ci.collect.url.map((url) => {
      const path = new URL(url).pathname;
      if (path.endsWith("/index.html")) {
        const base = path.replace(/\/index\.html$/, "");
        return base === "" ? "/" : `${base}/`;
      }
      return path;
    });

    const exempt = new Set<string>(LIGHTHOUSE_BASELINE_NOINDEX_EXEMPT_PATHS);
    const cruxPaths = cruxTemplatePaths()
      .filter((path) => !exempt.has(path))
      .concat("/")
      .sort();
    const fromConfig = [...configPaths].sort();
    expect(fromConfig).toEqual(cruxPaths);
  });

  it("records capture metadata", () => {
    expect(baseline.capturedAt).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(baseline.source).toBe("lighthouserc-baseline.json");
  });
});
