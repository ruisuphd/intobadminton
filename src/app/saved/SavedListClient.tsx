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

                {/*
                 * Per-product "notify me" opt-in (UI scaffold). Live email
                 * delivery requires Buttondown wiring; this checkbox surfaces
                 * the intent so we can capture interest the moment the user
                 * saves a product. Until the backend lands, the click only
                 * records the intent in localStorage via Analytics events.
                 */}
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
  const [intent, setIntent] = useState<ReturnType<typeof getNotifyMeIntent>>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIntent(getNotifyMeIntent(productId));
    setHydrated(true);
  }, [productId]);

  if (!hydrated) {
    return (
      <div className="mt-5 rounded-xl bg-[color:var(--surface-muted)] p-4 text-xs text-[var(--color-subtle)]">
        Loading notification preference…
      </div>
    );
  }

  if (intent) {
    return (
      <div className="mt-5 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-4">
        <p className="text-sm font-medium text-[var(--text)]">
          We will email you when this is re-tested or drops in price
        </p>
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          Interest saved for <span className="font-medium">{intent.email}</span>{" "}
          on this device. Delivery starts when the per-product backend is live —
          no general newsletter.
        </p>
        <button
          type="button"
          onClick={() => {
            clearNotifyMeIntent(productId);
            setIntent(null);
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
        Per-product only — we email when the spec is re-verified or a tracked
        retailer crosses your price. Stored locally until Buttondown wiring
        ships; no other emails.
      </p>
      <form
        className="mt-3 flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const email = new FormData(form).get("email");
          if (typeof email !== "string" || !email.trim()) return;
          const row = setNotifyMeIntent(productId, email);
          setIntent(row);
          trackEvent("notify_me_opt_in", {
            product_id: productId,
          });
        }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-label={`Notify email for ${productId}`}
          className="flex-1 rounded-full border border-[color:var(--line-strong)] bg-white px-4 text-sm h-10"
        />
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]"
        >
          Save interest
        </button>
      </form>
    </details>
  );
}
