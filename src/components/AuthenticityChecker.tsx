"use client";

import { useState } from "react";

/**
 * Interactive 5-step authenticity check.
 *
 * Each step asks a single yes/no/unsure question. Results are scored:
 *   - +2 for "yes" (positive signal of authenticity)
 *   - 0 for "unsure"
 *   - -3 for "no" (red flag)
 *
 * The verdict bands are conservative — a single red flag is enough to push
 * a frame from "likely genuine" to "needs inspection". This is intentional:
 * counterfeit risk for high-end rackets is genuinely high and our model
 * should err toward caution.
 */

type Answer = "yes" | "no" | "unsure";

const STEPS: { id: string; question: string; hint: string }[] = [
  {
    id: "seller",
    question: "Did you buy from an authorized retailer?",
    hint: "Manufacturer-authorized stockists, the brand's own store, or a long-standing pro shop. NOT a marketplace listing or social-media seller with no shop name.",
  },
  {
    id: "barcode",
    question: "Does the racket carry an intact barcode / region label?",
    hint: "Yonex and Victor frames ship with a region-specific barcode label on the cone of the racket. Missing, peeling, or duplicated barcodes are a red flag.",
  },
  {
    id: "specs",
    question:
      "Do the weight, balance, and grip-size markings on the throat match the official product page?",
    hint: "Cross-check against the official spec page (you can find it from the IntoBadminton review page for that racket). Small variance is normal; wrong U number is not.",
  },
  {
    id: "paint",
    question: "Is the paintwork crisp under bright light, with no smudges or misalignments?",
    hint: "Real frames have sharp brand decals and consistent paint. Counterfeits often have soft edges on the logo, mis-spelled model names, or off-tone colors.",
  },
  {
    id: "shaft",
    question:
      "Does the shaft feel uniform along its length, with no visible seam or wobble?",
    hint: "A counterfeit shaft can show a faint seam line, twist slightly under load, or have a hollow tap-sound. A genuine frame feels solid end-to-end.",
  },
];

function score(answers: Record<string, Answer>): number {
  let s = 0;
  for (const step of STEPS) {
    const a = answers[step.id];
    if (a === "yes") s += 2;
    else if (a === "no") s -= 3;
  }
  return s;
}

function verdictFor(score: number): {
  label: string;
  tone: string;
  body: string;
} {
  if (score >= 8) {
    return {
      label: "Likely genuine",
      tone: "chip-success",
      body: "Every checked signal is consistent with a genuine frame. Keep the receipt and serial label safe in case of warranty needs.",
    };
  }
  if (score >= 4) {
    return {
      label: "Probably OK — verify the unsure points",
      tone: "chip",
      body: "Most signals look right but one or more are unconfirmed. Cross-check the unsure questions with the official product page or a trusted pro shop.",
    };
  }
  if (score >= 0) {
    return {
      label: "Inspect before play",
      tone: "chip-warning",
      body: "Mixed signals. Have the racket inspected by a stringer or pro shop before you string and play it. If you bought online, raise a return window with the seller.",
    };
  }
  return {
    label: "High counterfeit risk",
    tone: "chip-warning",
    body: "At least one strong red flag is present. Do not string the racket. Contact the seller for a full refund; if denied, open a chargeback with your card issuer.",
  };
}

export function AuthenticityChecker() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = score(answers);
  const verdict = verdictFor(total);
  const answeredCount = STEPS.filter((s) => answers[s.id] != null).length;
  const canSubmit = answeredCount === STEPS.length;

  if (submitted && canSubmit) {
    return (
      <section className="card p-6 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
          Result
        </p>
        <p className="flex items-center gap-3">
          <span className={`chip ${verdict.tone}`}>{verdict.label}</span>
          <span className="text-sm tabular-nums text-[var(--color-muted)]">
            score {total}
          </span>
        </p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          {verdict.body}
        </p>

        <details className="rounded-xl bg-[color:var(--surface-muted)] p-4 text-sm">
          <summary className="cursor-pointer font-medium text-[var(--text)]">
            Show my answers
          </summary>
          <ul className="mt-3 space-y-2 text-[var(--color-muted)]">
            {STEPS.map((s) => (
              <li key={s.id}>
                <span className="font-medium text-[var(--text)]">
                  {s.question}
                </span>{" "}
                — {answers[s.id]}
              </li>
            ))}
          </ul>
        </details>

        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}
          className="btn-secondary"
        >
          Restart check
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <p
        className="text-sm text-[var(--color-subtle)]"
        aria-live="polite"
      >
        Step {Math.min(answeredCount + 1, STEPS.length)} of {STEPS.length}
      </p>
      <ol className="space-y-4">
        {STEPS.map((s) => {
          const current = answers[s.id];
          return (
            <li key={s.id} className="card p-5">
              <p className="text-sm font-semibold text-[var(--text)]">
                {s.question}
              </p>
              <p className="mt-2 text-xs text-[var(--color-muted)]">{s.hint}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["yes", "unsure", "no"] as Answer[]).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [s.id]: a }))}
                    aria-pressed={current === a}
                    className={`inline-flex h-9 items-center justify-center rounded-full border px-4 text-sm ${
                      current === a
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                        : "border-[color:var(--line-strong)] text-[var(--text)] hover:border-[var(--color-accent)]"
                    }`}
                  >
                    {a === "yes" ? "Yes" : a === "no" ? "No" : "Not sure"}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        onClick={() => setSubmitted(true)}
        disabled={!canSubmit}
        className="btn-primary disabled:opacity-50"
      >
        {canSubmit ? "Get verdict" : `Answer ${STEPS.length - answeredCount} more`}
      </button>
    </section>
  );
}
