export function buttondownUsername(): string | undefined {
  return process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME?.trim() || undefined;
}

export function buttondownConfigured(): boolean {
  return Boolean(buttondownUsername());
}

export type ButtondownSubscribeInput = {
  email: string;
  /** Tag applied in Buttondown for segmentation, e.g. `product:yy-arcsaber-11-pro`. */
  tag: string;
};

export type ButtondownSubscribeResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Subscribe an address to a Buttondown list via the public embed endpoint.
 * PII stays in Buttondown — we never persist email locally.
 */
export async function subscribeViaButtondown(
  input: ButtondownSubscribeInput
): Promise<ButtondownSubscribeResult> {
  const username = buttondownUsername();
  if (!username) {
    return {
      ok: false,
      message:
        "Product notifications are not configured yet. Try again after the next deploy.",
    };
  }

  const response = await fetch(
    `https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(username)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: input.email.trim(),
        tags: [input.tag],
        metadata: { source: "intobadminton-saved-shelf" },
      }),
    }
  );

  if (response.ok) {
    return { ok: true };
  }

  let detail = "Could not subscribe. Check the address and try again.";
  try {
    const payload = (await response.json()) as { detail?: string; email?: string[] };
    if (typeof payload.detail === "string" && payload.detail.length > 0) {
      detail = payload.detail;
    } else if (Array.isArray(payload.email) && payload.email[0]) {
      detail = payload.email[0];
    }
  } catch {
    /* use default message */
  }

  return { ok: false, message: detail };
}

export function notifyTagForProduct(productId: string): string {
  return `product:${productId}`;
}
