import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

describe("performance baselines scaffold", () => {
  it("ships unified performance guard script and npm command", () => {
    expect(
      existsSync(resolve(ROOT, "scripts/performance-baselines.mjs"))
    ).toBe(true);

    const pkg = JSON.parse(
      readFileSync(resolve(ROOT, "package.json"), "utf8")
    ) as { scripts: Record<string, string> };
    expect(pkg.scripts["lint:performance-baselines"]).toContain(
      "performance-baselines.mjs"
    );
  });

  it("includes performance guard in all-baselines operator command", () => {
    const allBaselines = readFileSync(
      resolve(ROOT, "scripts/all-baselines.mjs"),
      "utf8"
    );
    expect(allBaselines).toContain("performance-baselines.mjs");
  });

  it("documents performance baselines in baselines README", () => {
    const readme = readFileSync(
      resolve(ROOT, "docs/baselines/README.md"),
      "utf8"
    );
    expect(readme).toContain("lint:performance-baselines");
  });
});
