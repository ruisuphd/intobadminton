"use client";

import { useCallback, useMemo } from "react";
import { byId } from "@/lib/scoring";

/**
 * Placeholder for “alert when sentiment shifts” (plan retention).
 * Wire to your indexed review corpus + job that updates product sentiment fields.
 */
export function useProductAlerts(_productIds: string[]) {
  const status = useMemo(
    () =>
      _productIds.map((id) => ({
        id,
        product: byId(id)?.name ?? id,
        lastChecked: null as string | null,
        note: "Connect sentiment pipeline to enable alerts.",
      })),
    [_productIds]
  );

  const refresh = useCallback(() => {
    /* no-op until backend + corpus exist */
  }, []);

  return { status, refresh };
}
