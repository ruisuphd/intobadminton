import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { describeError, reportError } from "@/lib/report-error";

describe("describeError", () => {
  it("falls back to safe defaults when fields are missing", () => {
    const error = new Error("");
    error.name = "";
    expect(describeError(error)).toEqual({
      message: "unknown",
      digest: "none",
      name: "Error",
    });
  });

  it("preserves digest when present", () => {
    const error = Object.assign(new Error("boom"), { digest: "abc123" });
    expect(describeError(error)).toEqual({
      message: "boom",
      digest: "abc123",
      name: "Error",
    });
  });
});

describe("reportError", () => {
  const consoleError = vi
    .spyOn(console, "error")
    .mockImplementation(() => undefined);

  beforeEach(() => {
    consoleError.mockClear();
    (globalThis as { window?: unknown }).window = {};
  });

  afterEach(() => {
    delete (globalThis as { window?: unknown }).window;
  });

  it("logs via console and calls gtag when available", () => {
    const gtag = vi.fn();
    (globalThis as { window?: { gtag?: typeof gtag } }).window = { gtag };

    reportError({
      error: new Error("oops"),
      scope: "results-segment",
      pathname: "/results/",
    });

    expect(consoleError).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledWith(
      "event",
      "exception",
      expect.objectContaining({
        description: expect.stringContaining("results-segment:Error:oops"),
        fatal: false,
        page_path: "/results/",
      })
    );
  });

  it("marks fatal when scope is global", () => {
    const gtag = vi.fn();
    (globalThis as { window?: { gtag?: typeof gtag } }).window = { gtag };

    reportError({ error: new Error("boom"), scope: "global" });

    expect(gtag).toHaveBeenCalledWith(
      "event",
      "exception",
      expect.objectContaining({ fatal: true })
    );
  });

  it("is a no-op without window.gtag", () => {
    (globalThis as { window?: unknown }).window = {};
    expect(() =>
      reportError({ error: new Error("silent"), scope: "global" })
    ).not.toThrow();
  });
});
