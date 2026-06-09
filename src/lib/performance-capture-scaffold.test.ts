import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

describe("performance capture scaffold", () => {
  it("ships capture hint scripts and npm commands", () => {
    expect(existsSync(resolve(ROOT, "scripts/crux-capture-hints.mjs"))).toBe(
      true
    );
    expect(existsSync(resolve(ROOT, "scripts/crux-capture-psi.mjs"))).toBe(
      true
    );
    expect(existsSync(resolve(ROOT, "scripts/gsc-capture-hints.mjs"))).toBe(
      true
    );
    expect(
      existsSync(resolve(ROOT, "scripts/performance-capture-hints.mjs"))
    ).toBe(true);

    const pkg = JSON.parse(
      readFileSync(resolve(ROOT, "package.json"), "utf8")
    ) as { scripts: Record<string, string> };
    expect(pkg.scripts["capture:performance-hints"]).toContain(
      "performance-capture-hints.mjs"
    );
    expect(pkg.scripts["capture:crux-hints"]).toContain("crux-capture-hints.mjs");
    expect(pkg.scripts["capture:crux-psi"]).toContain("crux-capture-psi.mjs");
    expect(pkg.scripts["capture:gsc-hints"]).toContain("gsc-capture-hints.mjs");
  });

  it("documents capture commands in baselines README", () => {
    const readme = readFileSync(
      resolve(ROOT, "docs/baselines/README.md"),
      "utf8"
    );
    expect(readme).toContain("capture:performance-hints");
    expect(readme).toContain("capture:crux-hints");
    expect(readme).toContain("capture:crux-psi");
    expect(readme).toContain("capture:gsc-hints");
  });
});
