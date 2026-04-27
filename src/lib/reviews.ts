import type { FirstPartyReview } from "@/lib/types/evidence";

export const REVIEW_STORAGE_KEY = "intobadminton.firstPartyReviews.v1";

export function parseReviews(raw: string | null): FirstPartyReview[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as FirstPartyReview[]) : [];
  } catch {
    return [];
  }
}

export function loadLocalReviews(): FirstPartyReview[] {
  if (typeof window === "undefined") return [];
  return parseReviews(window.localStorage.getItem(REVIEW_STORAGE_KEY));
}

export function saveLocalReviews(reviews: FirstPartyReview[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
}

export function addLocalReview(review: FirstPartyReview) {
  saveLocalReviews([review, ...loadLocalReviews()]);
}

export function deleteLocalReviews() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(REVIEW_STORAGE_KEY);
}

export function exportReviewsJson(reviews: FirstPartyReview[]) {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      source: "IntoBadminton local review drafts",
      reviews,
    },
    null,
    2
  );
}
