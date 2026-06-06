import type { Pick } from "@/components/BestPicksPage";
import type { ProductImage, ProductRecord } from "@/lib/types/product";

/**
 * Resolve the display image for a /best/* pick.
 * Inline verified images win; otherwise fall back to the catalogue SKU image
 * when `productId` is wired.
 */
export function resolveBestPickImage(
  pick: Pick,
  catalog: ProductRecord[]
): ProductImage | undefined {
  if (pick.image?.verified) return pick.image;
  if (!pick.productId) return pick.image;

  const product = catalog.find((p) => p.id === pick.productId);
  if (product?.image?.verified) return product.image;

  return pick.image;
}
