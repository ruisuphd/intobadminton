import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import type { ProductImage } from "@/lib/types/product";

/**
 * Catalogue image for cards and list rows — larger than the legacy 96px
 * thumbnail so results and best-of pages scan more like retailer finders.
 */
export function ProductCardImage({
  image,
  size = 128,
  className = "shrink-0",
}: {
  image: ProductImage | undefined;
  size?: number;
  className?: string;
}) {
  if (!canShowProductImage(image)) return null;
  return (
    <ProductImageView image={image} size={size} className={className} />
  );
}
