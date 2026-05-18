"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/components/Analytics";

type Props = {
  url: string;
  title: string;
};

/**
 * Social share row. Uses the native Web Share API on devices that support it
 * (typically mobile + some desktop browsers), and falls back to per-platform
 * intent URLs (X, Reddit, WhatsApp, copy-link).
 *
 * Zero third-party SDKs — every share is a `window.open` or `navigator.share`.
 * That keeps the page lighter than a Twitter/Reddit widget and avoids the
 * tracking-pixel side effects those widgets introduce.
 */
export function SocialShare({ url, title }: Props) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time platform capability probe */
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const log = (channel: string) =>
    trackEvent("share", { channel, content_url: url });

  const onNativeShare = async () => {
    log("native");
    try {
      await navigator.share({ url, title });
    } catch {
      // User dismissed the share sheet — non-error.
    }
  };

  const onCopy = async () => {
    log("copy_link");
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Older browsers / iframe contexts where clipboard write is blocked.
    }
  };

  return (
    <section
      aria-label="Share this article"
      className="mt-8 flex flex-wrap items-center gap-2 text-sm"
    >
      <span className="mr-1 text-xs uppercase tracking-wide text-[var(--color-subtle)]">
        Share
      </span>
      {canNativeShare && (
        <button
          type="button"
          onClick={onNativeShare}
          className="inline-flex h-9 items-center rounded-full border border-[color:var(--line-strong)] px-3 text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          Share…
        </button>
      )}
      <ShareLink
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        onClick={() => log("x")}
        label="X / Twitter"
      />
      <ShareLink
        href={`https://www.reddit.com/submit?url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`}
        onClick={() => log("reddit")}
        label="Reddit"
      />
      <ShareLink
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${title} ${url}`
        )}`}
        onClick={() => log("whatsapp")}
        label="WhatsApp"
      />
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex h-9 items-center rounded-full border border-[color:var(--line-strong)] px-3 text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </section>
  );
}

function ShareLink({
  href,
  onClick,
  label,
}: {
  href: string;
  onClick: () => void;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={onClick}
      className="inline-flex h-9 items-center rounded-full border border-[color:var(--line-strong)] px-3 text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      {label}
    </a>
  );
}
