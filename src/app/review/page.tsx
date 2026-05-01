import type { Metadata } from "next";
import { ReviewForm } from "./ReviewForm";

export const metadata: Metadata = {
  title: "Submit equipment review — IntoBadminton",
  description:
    "Submit a structured badminton equipment review to improve future recommendations.",
  alternates: { canonical: "/review/" },
  robots: { index: false, follow: true },
};

export function ReviewShell() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <p className="text-sm font-medium text-[var(--color-accent)]">
          First-party review
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--text)]">
          Help build the most useful badminton equipment dataset.
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          Reddit and forum data are permission-gated. Your consented review is
          the safest, highest-quality signal for future recommendations.
        </p>
        <ReviewForm />
      </div>
    </main>
  );
}

export default function ReviewPage() {
  return <ReviewShell />;
}
