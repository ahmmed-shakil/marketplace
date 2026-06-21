import type { Product, ProductImage, ProductVariant } from "./data";
import { getCategoryById } from "./mock/categories";
import { productImageUrl, productVariantImageUrl } from "./mock/product-images";

const COLOR_SLUGS = ["color", "colour"];

export function getVariantColorKey(variant: ProductVariant): string | undefined {
  for (const slug of COLOR_SLUGS) {
    const val = variant.attributes[slug];
    if (val != null) return String(val);
  }
  return undefined;
}

function categorySlugFor(product: Product): string {
  return getCategoryById(product.categoryId)?.slug ?? "general";
}

/** Build a full gallery: shared angles + one image per unique color/variant. */
export function resolveProductImages(product: Product, variants: ProductVariant[]): ProductImage[] {
  const sorted = [...product.images].sort((a, b) => a.sortOrder - b.sortOrder);
  const hasRichGallery = sorted.length > 1 || sorted.some((i) => i.variantId);
  if (hasRichGallery) return sorted;

  const catSlug = categorySlugFor(product);
  const baseUrl = sorted[0]?.url ?? productImageUrl(product.slug, catSlug);
  const images: ProductImage[] = [];
  let order = 0;

  images.push({
    id: `img-${product.id}-main`,
    productId: product.id,
    url: baseUrl,
    altText: sorted[0]?.altText ?? product.name,
    sortOrder: order++,
    isPrimary: true,
  });

  images.push({
    id: `img-${product.id}-alt`,
    productId: product.id,
    url: productImageUrl(`${product.slug}-view2`, catSlug),
    altText: `${product.name} — alternate view`,
    sortOrder: order++,
    isPrimary: false,
  });

  const seenColors = new Set<string>();
  for (const variant of variants) {
    const color = getVariantColorKey(variant);
    const key = color ?? variant.slug;
    if (seenColors.has(key)) continue;
    seenColors.add(key);

    images.push({
      id: `img-${product.id}-${variant.id}`,
      productId: product.id,
      variantId: variant.id,
      url: productVariantImageUrl(product.slug, catSlug, key),
      altText: `${product.name} — ${color ?? variant.name}`,
      sortOrder: order++,
      isPrimary: false,
    });
  }

  if (variants.length > 1 && seenColors.size === 0) {
    variants.slice(0, 4).forEach((variant, i) => {
      images.push({
        id: `img-${product.id}-opt-${i}`,
        productId: product.id,
        variantId: variant.id,
        url: productVariantImageUrl(product.slug, catSlug, variant.slug),
        altText: `${product.name} — ${variant.name}`,
        sortOrder: order++,
        isPrimary: false,
      });
    });
  }

  return images;
}

export function getSliderImages(images: ProductImage[], max = 5): ProductImage[] {
  const seen = new Map<string, ProductImage>();
  for (const img of images) {
    if (!seen.has(img.url)) seen.set(img.url, img);
  }
  return [...seen.values()].slice(0, max);
}

export function imageIndexForVariant(images: ProductImage[], variant: ProductVariant | undefined): number {
  if (!variant || images.length === 0) return 0;

  const byId = images.findIndex((i) => i.variantId === variant.id);
  if (byId >= 0) return byId;

  const color = getVariantColorKey(variant);
  if (color) {
    const byAlt = images.findIndex((i) => i.altText.includes(color));
    if (byAlt >= 0) return byAlt;
    const byVariantColor = images.findIndex((i) => {
      if (!i.variantId) return false;
      return i.altText.toLowerCase().includes(color.toLowerCase());
    });
    if (byVariantColor >= 0) return byVariantColor;
  }

  return 0;
}
