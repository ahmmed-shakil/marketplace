import type {
  CustomSpec,
  ProductImage,
  ProductVariant,
  SpecRow,
  VendorProduct,
  VendorProductCardItem,
  VendorProductDetail,
  VendorProductVariant,
} from "../data";
import { getCategoryAttributes, getCategoryById } from "./categories";
import { getBrandById } from "./brands";
import {
  products,
  getProductById,
  getVariantsForProduct,
  getSpecsForProduct,
} from "./products";
import {
  vendors,
  vendorLocations,
  vendorListings,
  getVendorById,
  getVendorBySlug,
} from "./vendors";
import { buildVariantSummary } from "../variant-utils";
import { resolveProductImages } from "../product-image-utils";
import { productImageUrl } from "./product-images";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function computeProductGroupId(
  brandId: string | undefined,
  brandName: string | undefined,
  name: string,
  categoryId: string,
): string {
  const brandPart = brandId ?? slugify(brandName ?? "generic");
  return slugify(`${brandPart}-${name}-${categoryId}`);
}

function toProductVariants(vp: VendorProduct): ProductVariant[] {
  return vp.variants.map((v) => ({
    id: v.id,
    productId: vp.id,
    sku: v.sku ?? v.id,
    name: v.name,
    slug: slugify(v.name),
    priceMsrp: v.price,
    attributes: v.attributes,
    isDefault: v.isDefault,
  }));
}

function specsFromVendorProduct(vp: VendorProduct): SpecRow[] {
  const catAttrs = getCategoryAttributes(vp.categoryId);
  const rows: SpecRow[] = [];

  for (const attr of catAttrs) {
    const val = vp.templateSpecs[attr.slug];
    if (val) {
      rows.push({
        name: attr.name,
        slug: attr.slug,
        value: val,
        group: attr.group,
        isComparable: attr.isComparable,
      });
    }
  }

  for (const { key, value } of vp.customSpecs) {
    rows.push({
      name: key,
      slug: slugify(key),
      value,
      group: "Additional",
      isComparable: false,
    });
  }

  return rows;
}

function buildVendorProductFromLegacy(
  vendorId: string,
  productId: string,
  listings: typeof vendorListings,
): VendorProduct | null {
  const product = getProductById(productId);
  const vendor = getVendorById(vendorId);
  if (!product || !vendor) return null;

  const brand = getBrandById(product.brandId);
  const cat = getCategoryById(product.categoryId);
  const pVariants = getVariantsForProduct(product.id);
  const legacySpecs = getSpecsForProduct(product.id);
  const primaryLocation =
    vendorLocations.find((l) => l.vendorId === vendorId && l.isPrimary) ??
    vendorLocations.find((l) => l.vendorId === vendorId);

  if (!primaryLocation) return null;

  const vpId = `vp-${vendorId}-${productId}`;
  const gallery = resolveProductImages(product, pVariants);

  const vVariants: VendorProductVariant[] = listings.map((listing, idx) => {
    const variant = pVariants.find((v) => v.id === listing.variantId) ?? pVariants[0];
    const attrs: Record<string, string> = {};
    if (variant) {
      Object.entries(variant.attributes).forEach(([k, v]) => {
        attrs[k] = String(v);
      });
    }

    const variantImages: ProductImage[] = gallery.map((img, i) => ({
      ...img,
      id: `${img.id}-vp-${listing.id}`,
      productId: vpId,
      variantId: `vpv-${listing.id}`,
      sortOrder: i,
    }));

    return {
      id: `vpv-${listing.id}`,
      vendorProductId: vpId,
      sku: variant?.sku,
      name: variant?.name ?? product.name,
      attributes: attrs,
      price: listing.price,
      stockStatus: listing.stockStatus,
      images: variantImages.length ? variantImages : gallery,
      isDefault: idx === 0 || variant?.isDefault === true,
    };
  });

  if (vVariants.length === 0) return null;

  const prices = vVariants.map((v) => v.price);
  const templateSpecs: Record<string, string> = {};
  const customSpecs: CustomSpec[] = [];

  for (const spec of legacySpecs) {
    const isTemplate = getCategoryAttributes(product.categoryId).some((a) => a.slug === spec.slug);
    if (isTemplate) templateSpecs[spec.slug] = spec.value;
    else customSpecs.push({ key: spec.name, value: spec.value });
  }

  const worstStock = vVariants.some((v) => v.stockStatus === "out_of_stock")
    ? "out_of_stock"
    : vVariants.some((v) => v.stockStatus === "low_stock")
      ? "low_stock"
      : "in_stock";

  const vpImages: ProductImage[] = gallery.map((img, i) => ({
    ...img,
    id: `${img.id}-${vpId}`,
    productId: vpId,
    sortOrder: i,
    isPrimary: i === 0,
  }));

  return {
    id: vpId,
    vendorId,
    categoryId: product.categoryId,
    brandId: product.brandId,
    brandName: brand?.name,
    name: product.name,
    slug: product.slug,
    description: product.description,
    status: "published",
    templateSpecs,
    customSpecs,
    variants: vVariants,
    images: vpImages.length ? vpImages : [{
      id: `img-${vpId}`,
      productId: vpId,
      url: productImageUrl(product.slug, cat?.slug ?? "general"),
      altText: product.name,
      sortOrder: 0,
      isPrimary: true,
    }],
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    stockStatus: worstStock,
    condition: listings[0].condition,
    warranty: listings[0].warranty,
    locationId: primaryLocation.id,
    deliveryType: listings[0].deliveryType,
    rating: product.rating,
    reviewCount: product.reviewCount,
    tags: product.tags,
    createdAt: product.createdAt,
    updatedAt: listings[0].updatedAt,
    productGroupId: computeProductGroupId(product.brandId, brand?.name, product.name, product.categoryId),
  };
}

function buildAllVendorProducts(): VendorProduct[] {
  const groups = new Map<string, typeof vendorListings>();
  for (const listing of vendorListings) {
    const key = `${listing.vendorId}:${listing.productId}`;
    const list = groups.get(key) ?? [];
    list.push(listing);
    groups.set(key, list);
  }

  const built: VendorProduct[] = [];
  for (const [key, listings] of groups) {
    const [vendorId, productId] = key.split(":");
    const vp = buildVendorProductFromLegacy(vendorId, productId, listings);
    if (vp) built.push(vp);
  }
  return built;
}

/** In-memory store — seeded from legacy catalog + vendor wizard additions */
let vendorProductStore: VendorProduct[] = buildAllVendorProducts();

export function getAllVendorProducts(): VendorProduct[] {
  return vendorProductStore.filter((vp) => vp.status === "published");
}

export function getVendorProductById(id: string): VendorProduct | undefined {
  return vendorProductStore.find((vp) => vp.id === id);
}

export function getVendorProductBySlug(
  vendorSlug: string,
  listingSlug: string,
): VendorProduct | undefined {
  const vendor = getVendorBySlug(vendorSlug);
  if (!vendor) return undefined;
  return vendorProductStore.find(
    (vp) => vp.vendorId === vendor.id && vp.slug === listingSlug && vp.status === "published",
  );
}

export function getVendorProductsByVendor(vendorId: string): VendorProduct[] {
  return vendorProductStore.filter((vp) => vp.vendorId === vendorId && vp.status === "published");
}

export function getVendorProductsByCategory(categoryId: string): VendorProduct[] {
  return getAllVendorProducts().filter((vp) => vp.categoryId === categoryId);
}

export function getFeaturedVendorProducts(limit = 8): VendorProduct[] {
  return [...getAllVendorProducts()]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function searchVendorProducts(query: string): VendorProduct[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllVendorProducts();

  return getAllVendorProducts().filter((vp) => {
    const vendor = getVendorById(vp.vendorId);
    const brand = vp.brandId ? getBrandById(vp.brandId) : null;
    const haystack = [
      vp.name,
      vp.description,
      vendor?.businessName,
      brand?.name,
      vp.brandName,
      ...Object.values(vp.templateSpecs),
      ...vp.customSpecs.map((s) => `${s.key} ${s.value}`),
      ...vp.variants.flatMap((v) => [v.name, ...Object.values(v.attributes)]),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q) || q.split(/\s+/).every((word) => haystack.includes(word));
  });
}

export function getSimilarListings(vp: VendorProduct, limit = 4): VendorProduct[] {
  if (!vp.productGroupId) {
    return getAllVendorProducts()
      .filter((other) => other.id !== vp.id && other.categoryId === vp.categoryId)
      .slice(0, limit);
  }
  return getAllVendorProducts()
    .filter((other) => other.id !== vp.id && other.productGroupId === vp.productGroupId)
    .slice(0, limit);
}

export function enrichVendorProductForCard(vp: VendorProduct): VendorProductCardItem {
  const vendor = getVendorById(vp.vendorId)!;
  const brand = vp.brandId ? getBrandById(vp.brandId) ?? null : null;
  const { chips } = buildVariantSummary(toProductVariants(vp), vp.categoryId);
  const keySpecs = specsFromVendorProduct(vp).filter((s) => s.isComparable).slice(0, 3);

  return {
    ...vp,
    vendor,
    brand,
    variantSummary: chips,
    keySpecs,
  };
}

export function getVendorProductDetail(
  vendorSlug: string,
  listingSlug: string,
): VendorProductDetail | undefined {
  const vp = getVendorProductBySlug(vendorSlug, listingSlug);
  if (!vp) return undefined;

  const vendor = getVendorById(vp.vendorId)!;
  const category = getCategoryById(vp.categoryId)!;
  const brand = vp.brandId ? getBrandById(vp.brandId) ?? null : null;
  const location = vendorLocations.find((l) => l.id === vp.locationId)!;
  const similarListingIds = getSimilarListings(vp).map((s) => s.id);

  return {
    ...vp,
    vendor,
    category,
    brand,
    location,
    similarListingIds,
  };
}

export function vendorProductSpecs(vp: VendorProduct): SpecRow[] {
  return specsFromVendorProduct(vp);
}

export function addVendorProduct(draft: Omit<VendorProduct, "id" | "createdAt" | "updatedAt">): VendorProduct {
  const id = `vp-new-${Date.now()}`;
  const now = new Date().toISOString().slice(0, 10);
  const vp: VendorProduct = {
    ...draft,
    id,
    createdAt: now,
    updatedAt: now,
    status: draft.status ?? "published",
  };
  vendorProductStore = [...vendorProductStore, vp];
  return vp;
}

/** Redirect helper: first published listing matching legacy product slug */
export function getFirstListingForLegacyProductSlug(productSlug: string): VendorProduct | undefined {
  const legacy = products.find((p) => p.slug === productSlug);
  if (!legacy) return undefined;
  return getAllVendorProducts().find((vp) => vp.slug === productSlug || vp.productGroupId === computeProductGroupId(
    legacy.brandId,
    getBrandById(legacy.brandId)?.name,
    legacy.name,
    legacy.categoryId,
  ));
}

export function getVendorProductCount(): number {
  return getAllVendorProducts().length;
}
