import type { ProductRecord } from "@/lib/types/product";
import { youtubeEvidenceForProduct } from "@/lib/youtube-evidence";

/**
 * Code-splits YoutubeEvidencePanel so PDPs without cited YouTube evidence
 * do not pull thumbnail/image module weight into the Lighthouse shell route.
 */
export async function YoutubeEvidenceSection({
  product,
}: {
  product: ProductRecord;
}) {
  if (!youtubeEvidenceForProduct(product)) return null;

  const { YoutubeEvidencePanel } = await import(
    "@/components/YoutubeEvidencePanel"
  );
  return <YoutubeEvidencePanel product={product} />;
}
