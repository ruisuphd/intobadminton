export type ErrorScope =
  | "global"
  | "root-segment"
  | "results-segment"
  | string;

export type ReportErrorInput = {
  error: Error & { digest?: string };
  scope: ErrorScope;
  pathname?: string;
};

type GtagFn = (...args: unknown[]) => void;
type WindowWithGtag = Window & { gtag?: GtagFn };

export function describeError(error: Error & { digest?: string }) {
  return {
    message: error.message || "unknown",
    digest: error.digest || "none",
    name: error.name || "Error",
  };
}

export function reportError({ error, scope, pathname }: ReportErrorInput) {
  const description = describeError(error);

  if (typeof console !== "undefined") {
    console.error(`[${scope}] ${description.name}: ${description.message}`, {
      digest: description.digest,
      pathname,
    });
  }

  if (typeof window === "undefined") return;
  const gtag = (window as WindowWithGtag).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", "exception", {
    description: `${scope}:${description.name}:${description.message}`.slice(
      0,
      150
    ),
    fatal: scope === "global",
    error_digest: description.digest,
    page_path: pathname,
  });
}
