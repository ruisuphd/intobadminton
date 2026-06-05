"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import productsCatalog from "@/data/products.json";
import { trackEvent } from "@/components/Analytics";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import { SaveProductButton } from "@/components/SaveProductButton";
import { useProfile } from "@/context/ProfileContext";
import {
  buttondownConfigured,
  notifyTagForProduct,
  subscribeViaButtondown,
} from "@/lib/buttondown";
import { syncNotifyMeIntentsToButtondown } from "@/lib/notify-me-sync";
import {
  clearNotifyMeIntent,
  getNotifyMeIntent,
  setNotifyMeIntent,
} from "@/lib/notify-me";
import { humanize } from "@/lib/text";
import { reviewPath } from "@/lib/review-pages";
import type { ProductRecord } from "@/lib/types/product";

const CATALOG = productsCatalog as ProductRecord[];
const CATALOG_BY_ID = new Map(CATALOG.map((p) => [p.id, p]));

/**
 * Renders the saved-shortlist, ordered newest-first as stored. Items whose
 * source product no longer exists in the catalog (renamed slugs, deleted
 * rows) are dropped silently rather than displaying a broken card.
 */
export function SavedListClient() {
  const { saved, clearSaved } = useProfile();

  useEffect(() => {
    if (!buttondownConfigured()) return;
    void syncNotifyMeIntentsToButtondown().then((result) => {
      if (result.synced > 0) {
        trackEvent("notify_me_synced", {
          synced: result.synced,
          failed: result.failed,
        });
      }
    });
  }, []);

  const items = useMemo(
    () =>
      saved
        .map((entry) => ({
          entry,
          product: CATALOG_BY_ID.get(entry.id),
        }))
        .filter(
          (item): item is { entry: typeof saved[number]; product: ProductRecord } =>
            item.product != null
        ),
    [saved]
  );

  if (items.length === 0) {
    return (
      <main className="flex-1 py-16">
        <div className="layout-band max-w-3xl">
          <h1 className="text-display text-[var(--text)]">Your saved shelf</h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
            You have not saved any equipment yet. Use the{" "}
            <span className="font-medium text-[var(--text)]">Save</span> button
            on a result card or review page to add it to a 30-day shortlist —
            stored only on this device, never sent anywhere.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quiz/" className="btn-primary">
              Run the finder
            </Link>
            <Link href="/best/" className="btn-secondary">
              Browse best-of guides
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-4xl">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-display text-[var(--text)]">
              Your saved shelf
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              {items.length}{" "}
              {items.length === 1 ? "item" : "items"} saved. Stored locally
              for 30 days. Re-save any item to refresh its expiry.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (confirm("Remove all saved items?")) clearSaved();
            }}
            className="text-sm text-[var(--color-muted)] underline hover:text-[var(--text)]"
          >
            Clear all
          </button>
        </header>

        <ol className="mt-10 space-y-5">
          {items.map(({ entry, product }) => {
            const showImage = canShowProductImage(product.image);
            return (
              <li key={product.id} className="card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {showImage && (
                      <ProductImageView
                        image={product.image}
                        size={80}
                        className="shrink-0"
                      />
                    )}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
                        {humanize(product.category)} · {product.brand}
                      </p>
                      <Link
                        href={reviewPath(product.id)}
                        className="mt-1 block text-lg font-semibold text-[var(--text)] hover:text-[var(--color-accent)]"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-[var(--color-subtle)]">
                        Saved{" "}
                        <time dateTime={entry.savedAt}>
                          {new Date(entry.savedAt).toLocaleDateString()}
                        </time>
                        {product.lastVerifiedAt && (
                          <>
                            {" · "}
                            Specs verified {product.lastVerifiedAt}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-semibold text-[var(--color-accent)]">
                      ~${product.priceUsd}
                    </p>
                    <SaveProductButton
                      id={product.id}
                      label={`${product.brand} ${product.name}`}
                      size="sm"
                    />
                  </div>
                </div>

                <NotifyMeRow productId={product.id} />
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}

function NotifyMeRow({ productId }: { productId: string }) {
  const live = buttondownConfigured();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [intentVersion, setIntentVersion] = useState(0);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- client-only notify-me read */
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const localIntent = useMemo(() => {
    void intentVersion;
    return hydrated ? getNotifyMeIntent(productId) : null;
  }, [hydrated, productId, intentVersion]);

  if (live && hydrated && localIntent) {
    return (
      <div className="mt-5 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-4">
        <p className="text-sm font-medium text-[var(--text)]">
          Finish setting up notifications
        </p>
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          We saved <span className="font-medium">{localIntent.email}</span> on
          this device before live delivery. Confirm once to move it to Buttondown
          (double opt-in email).
        </p>
        <button
          type="button"
          disabled={status === "loading"}
          onClick={async () => {
            setStatus("loading");
            setMessage(null);
            const result = await subscribeViaButtondown({
              email: localIntent.email,
              tag: notifyTagForProduct(productId),
            });
            trackEvent("notify_me_migrate", {
              product_id: productId,
              ok: result.ok,
            });
            if (result.ok) {
              clearNotifyMeIntent(productId);
              setIntentVersion((v) => v + 1);
              setStatus("done");
              setMessage(
                "Check your inbox to confirm — Buttondown sends a double opt-in link."
              );
              return;
            }
            setStatus("error");
            setMessage(result.message);
          }}
          className="mt-3 rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-medium text-white disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Confirm via email"}
        </button>
        {message ? (
          <p
            className={`mt-3 text-xs ${status === "error" ? "text-red-700" : "text-[var(--color-muted)]"}`}
          >
            {message}
          </p>
        ) : null}
      </div>
    );
  }

  if (!live && hydrated && localIntent) {
    return (
      <div className="mt-5 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-4">
        <p className="text-sm font-medium text-[var(--text)]">
          We will email you when this is re-tested or drops in price
        </p>
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          Interest saved for{" "}
          <span className="font-medium">{localIntent.email}</span> on this
          device until Buttondown is configured. No general newsletter.
        </p>
        <button
          type="button"
          onClick={() => {
            clearNotifyMeIntent(productId);
            setIntentVersion((v) => v + 1);
            trackEvent("notify_me_clear", { product_id: productId });
          }}
          className="mt-3 text-xs text-[var(--color-accent)] underline"
        >
          Remove notification
        </button>
      </div>
    );
  }

  return (
    <details className="mt-5 rounded-xl bg-[color:var(--surface-muted)] p-4">
      <summary className="cursor-pointer text-sm font-medium text-[var(--text)]">
        Notify me when this is re-tested or drops in price
      </summary>
      <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
        {live
          ? "One email when this product is re-verified or when we publish a tracked price drop. No general newsletter — unsubscribe any time."
          : "Per-product notifications launch with the next deploy. Your email is stored on this device until Buttondown is live."}
      </p>
      <form
        className="mt-3 flex flex-wrap gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          setStatus("loading");
          setMessage(null);

          if (live) {
            const result = await subscribeViaButtondown({
              email,
              tag: notifyTagForProduct(productId),
            });

            trackEvent("notify_me_submit", {
              product_id: productId,
              configured: true,
              ok: result.ok,
            });

            if (result.ok) {
              setStatus("done");
              setMessage(
                "Check your inbox to confirm — Buttondown sends a double opt-in link."
              );
              setEmail("");
              return;
            }

            setStatus("error");
            setMessage(result.message);
            return;
          }

          setNotifyMeIntent(productId, email);
          setStatus("done");
          setMessage("Saved on this device — we will wire delivery when Buttondown is live.");
          setEmail("");
          trackEvent("notify_me_opt_in", { product_id: productId });
        }}
      >
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "done"}
          placeholder="you@example.com"
          aria-label={`Notify email for ${productId}`}
          className="flex-1 rounded-full border border-[color:var(--line-strong)] bg-white px-4 text-sm h-10 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "done"}
          className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
        >
          {status === "loading"
            ? "Sending…"
            : status === "done"
              ? "Saved"
              : live
                ? "Notify me"
                : "Save interest"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-xs ${
            status === "error"
              ? "text-[var(--color-warning)]"
              : "text-[var(--color-muted)]"
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </details>
  );
}
