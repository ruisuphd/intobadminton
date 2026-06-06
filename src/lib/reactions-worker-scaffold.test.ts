import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

describe("reactions worker scaffold", () => {
  it("ships worker entry, wrangler config, and deploy README", () => {
    const workerDir = resolve(ROOT, "workers/reactions");
    expect(existsSync(resolve(workerDir, "index.js"))).toBe(true);
    expect(existsSync(resolve(workerDir, "wrangler.toml"))).toBe(true);
    expect(existsSync(resolve(workerDir, "README.md"))).toBe(true);
  });

  it("documents REACTIONS_API_URL for Pages builds", () => {
    const readme = readFileSync(
      resolve(ROOT, "workers/reactions/README.md"),
      "utf8"
    );
    expect(readme).toContain("REACTIONS_API_URL");
    expect(readme).toContain("NEXT_PUBLIC_REACTIONS_API_URL");
    expect(readme).toContain("/health");
    expect(readme).toContain("reactions:smoke");

    const pagesWorkflow = readFileSync(
      resolve(ROOT, ".github/workflows/pages.yml"),
      "utf8"
    );
    expect(pagesWorkflow).toContain("REACTIONS_API_URL");
  });

  it("exposes workflow_dispatch deploy workflow", () => {
    const deployWorkflow = readFileSync(
      resolve(ROOT, ".github/workflows/deploy-reactions-worker.yml"),
      "utf8"
    );
    expect(deployWorkflow).toContain("workflow_dispatch");
    expect(deployWorkflow).toContain("wrangler");
    expect(deployWorkflow).toContain("reactions:smoke");
    expect(deployWorkflow).toContain("REACTIONS_API_URL");
  });

  it("ships scheduled reactions health workflow", () => {
    const healthWorkflow = readFileSync(
      resolve(ROOT, ".github/workflows/reactions-health.yml"),
      "utf8"
    );
    expect(healthWorkflow).toContain("schedule:");
    expect(healthWorkflow).toContain("workflow_dispatch");
    expect(healthWorkflow).toContain("reactions:smoke");
    expect(healthWorkflow).toContain("REACTIONS_API_URL");
  });

  it("Pages build smoke-tests reactions when secret is set", () => {
    const pagesWorkflow = readFileSync(
      resolve(ROOT, ".github/workflows/pages.yml"),
      "utf8"
    );
    expect(pagesWorkflow).toContain("reactions:smoke");
    expect(pagesWorkflow).toContain("REACTIONS_API_URL");
  });

  it("exposes wire-reactions-pages workflow for owner rebuild", () => {
    const wireWorkflow = readFileSync(
      resolve(ROOT, ".github/workflows/wire-reactions-pages.yml"),
      "utf8"
    );
    expect(wireWorkflow).toContain("workflow_dispatch");
    expect(wireWorkflow).toContain("reactions:smoke");
    expect(wireWorkflow).toContain("pages.yml");
  });
});
