"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/components/Analytics";
import productsCatalog from "@/data/products.json";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import { SaveProductButton } from "@/components/SaveProductButton";
import { useProfile } from "@/context/ProfileContext";
import { humanize } from "@/lib/text";
import {
  clearNotifyMeIntent,
  getNotifyMeEntry,
  saveNotifyMeIntent,
} from "@/lib/notify-me";
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
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const existing = getNotifyMeEntry(productId);
    if (existing) {
      setEmail(existing.email);
      setSaved(true);
    }
    setHydrated(true);
  }, [productId]);

  if (!hydrated) {
    return (
      <div
        className="mt-5 rounded-xl bg-[color:var(--surface-muted)] p-4 text-xs text-[var(--color-muted)]"
        aria-hidden
      >
        Loading notification preferences…
      </div>
    );
  }

  return (
    <details className="mt-5 rounded-xl bg-[color:var(--surface-muted)] p-4" open={saved}>
      <summary className="cursor-pointer text-sm font-medium text-[var(--text)]">
        Notify me when this is re-tested or drops in price
      </summary>
      <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
        {saved
          ? "Your interest is saved on this device. We will email you only when Buttondown goes live — re-test or price-drop signals, never a general newsletter."
          : "Per-product notifications are not emailed yet. Submitting stores your address locally and logs interest for launch — nothing leaves this browser until the backend ships."}
      </p>
      {saved ? (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="text-sm text-[var(--text)]">
            Saved for <span className="font-medium">{email}</span>
          </p>
          <button
            type="button"
            className="text-sm text-[var(--color-muted)] underline hover:text-[var(--text)]"
            onClick={() => {
              clearNotifyMeIntent(productId);
              setSaved(false);
              setEmail("");
              trackEvent("notify_me_clear", { product_id: productId });
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <form
          className="mt-3 flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const value = new FormData(form).get("email");
            if (typeof value !== "string" || !value.trim()) return;
            saveNotifyMeIntent(productId, value);
            setEmail(value.trim().toLowerCase());
            setSaved(true);
            trackEvent("notify_me_intent", { product_id: productId });
          }}
        >
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      )}
    </details>
  );
}
