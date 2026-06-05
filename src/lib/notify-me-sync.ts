import { subscribeViaButtondown, notifyTagForProduct } from "@/lib/buttondown";
import {
  clearNotifyMeIntent,
  listNotifyMeIntents,
  type NotifyMeIntent,
} from "@/lib/notify-me";

export type NotifyMeSyncResult = {
  attempted: number;
  synced: number;
  failed: number;
};

async function syncOne(intent: NotifyMeIntent): Promise<boolean> {
  const result = await subscribeViaButtondown({
    email: intent.email,
    tag: notifyTagForProduct(intent.productId),
  });
  if (result.ok) {
    clearNotifyMeIntent(intent.productId);
    return true;
  }
  return false;
}

/**
 * Push device-local notify-me intents to Buttondown when the list is configured.
 * Successful rows are cleared from local storage; failures are left for retry.
 */
export async function syncNotifyMeIntentsToButtondown(): Promise<NotifyMeSyncResult> {
  const pending = listNotifyMeIntents();
  if (pending.length === 0) {
    return { attempted: 0, synced: 0, failed: 0 };
  }

  let synced = 0;
  let failed = 0;

  for (const intent of pending) {
    const ok = await syncOne(intent);
    if (ok) synced += 1;
    else failed += 1;
  }

  return { attempted: pending.length, synced, failed };
}
