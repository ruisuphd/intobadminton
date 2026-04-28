import evidence from "@/data/review-evidence.json";
import type { ReviewEvidence } from "@/lib/types/review-evidence";

const rows = evidence as ReviewEvidence[];

export function getEvidenceForProduct(productId: string): ReviewEvidence[] {
  return rows
    .filter((row) => row.productId === productId)
    .sort((a, b) => b.confidence - a.confidence);
}

export function getEvidenceSummary(productId: string) {
  const productRows = getEvidenceForProduct(productId);
  const positive = productRows.filter((row) => row.sentiment > 0).length;
  const caution = productRows.filter((row) => row.sentiment < 0).length;
  const confidence: "none" | "low" | "medium" =
    productRows.length === 0
      ? "none"
      : productRows.some((row) => row.confidence >= 0.5)
        ? "medium"
        : "low";
  return {
    count: productRows.length,
    positive,
    caution,
    confidence,
  };
}

export function assertSafeEvidenceForDisplay(row: ReviewEvidence): boolean {
  return (
    row.displayPolicy === "metadata_summary_link_only" &&
    row.summary.length > 0 &&
    row.sourceUrl.startsWith("https://") &&
    !("originalExcerpt" in row)
  );
}

export function getAllEvidence(): ReviewEvidence[] {
  return rows;
}
