import type {
  ProductDetail,
  SearchResult,
  SearchFilters,
  CategoryBrowseFilters,
  CategoryBrowseResult,
  VendorProductCardItem,
  AdminStats,
  AdminActivity,
  CategoryTreeNode,
  CompareProduct,
  EnrichedListing,
  VendorProductDetail,
  ProductVariant,
} from "../data";
import { categories, getCategoryById, getCategoryBySlug, getTopCategories, getSubcategories } from "./categories";
import { brands, getBrandById, getBrandBySlug } from "./brands";
import {
  products,
  getProductBySlug,
  getProductById,
  getVariantsForProduct,
  getSpecsForProduct,
  getProductsByCategory,
  getFeaturedProducts,
  searchProducts,
  getProductsByBrand,
} from "./products";
import {
  vendors,
  vendorLocations,
  getVendorBySlug,
  getVendorById,
  getListingsForProduct,
  getListingsForVendor,
  getNearbyVendors,
} from "./vendors";
import {
  getAllVendorProducts,
  getVendorProductsByCategory,
  getFeaturedVendorProducts,
  searchVendorProducts,
  enrichVendorProductForCard,
  getVendorProductDetail,
  getVendorProductsByVendor,
  getVendorProductCount,
  getFirstListingForLegacyProductSlug,
  addVendorProduct,
} from "./vendor-products";
import {
  buildVariantSummary,
  productMatchesVariantFilters,
  buildAttributeFacetsFromPool,
} from "../variant-utils";
import {
  getReviewsForProduct,
  getFaqsForProduct,
  getAllComparisons,
  getComparisonBySlug,
  getGuideBySlug,
  getAllGuides,
  getPendingReviews,
  buyingGuides,
} from "./reviews";

export { categories, brands, products, vendors, buyingGuides, getAllComparisons, getAllGuides };
export {
  getVendorProductDetail,
  enrichVendorProductForCard,
  getFeaturedVendorProducts,
  getAllVendorProducts,
  getVendorProductsByVendor,
  addVendorProduct,
  getFirstListingForLegacyProductSlug,
};

function vendorVariantsAsProductVariants(
  vp: import("../data").VendorProduct,
): ProductVariant[] {
  return vp.variants.map((v) => ({
    id: v.id,
    productId: vp.id,
    sku: v.sku ?? v.id,
    name: v.name,
    slug: v.name.toLowerCase().replace(/\s+/g, "-"),
    priceMsrp: v.price,
    attributes: v.attributes,
    isDefault: v.isDefault,
  }));
}

function getVendorProductsForCategorySlug(slug: string) {
  const cat = getCategoryBySlug(slug);
  if (!cat) return [];
  if (cat.parentId === null) {
    const childIds = categories.filter((c) => c.parentId === cat.id).map((c) => c.id);
    const ids = new Set([cat.id, ...childIds]);
    return getAllVendorProducts().filter((vp) => ids.has(vp.categoryId));
  }
  return getVendorProductsByCategory(cat.id);
}

function inferDominantCategoryId(pool: import("../data").VendorProduct[]): string | undefined {
  if (pool.length === 0) return undefined;
  const counts = new Map<string, number>();
  pool.forEach((p) => counts.set(p.categoryId, (counts.get(p.categoryId) ?? 0) + 1));
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  if (!top || top[1] < pool.length * 0.3) return undefined;
  return top[0];
}

export function search(filters: SearchFilters): SearchResult {
  let results = filters.query ? searchVendorProducts(filters.query) : [...getAllVendorProducts()];

  if (filters.categorySlug) {
    results = getVendorProductsForCategorySlug(filters.categorySlug);
  }

  const pool = [...results];

  const brandCounts = new Map<string, number>();
  pool.forEach((p) => {
    if (p.brandId) brandCounts.set(p.brandId, (brandCounts.get(p.brandId) ?? 0) + 1);
  });
  const brandFacets = [...brandCounts.entries()]
    .map(([brandId, count]) => ({ brand: getBrandById(brandId)!, count }))
    .filter((b) => b.brand)
    .sort((a, b) => b.count - a.count);

  const dominantCategoryId = filters.categorySlug
    ? getCategoryBySlug(filters.categorySlug)?.id
    : inferDominantCategoryId(pool);

  const poolAsProducts = pool.map((p) => ({ id: p.id, categoryId: p.categoryId }));
  const getVariants = (id: string) => {
    const vp = pool.find((p) => p.id === id);
    return vp ? vendorVariantsAsProductVariants(vp) : [];
  };
  const attributes = buildAttributeFacetsFromPool(poolAsProducts, getVariants, dominantCategoryId);

  const priceRange = {
    min: pool.length ? Math.min(...pool.map((p) => p.minPrice)) : 0,
    max: pool.length ? Math.max(...pool.map((p) => p.maxPrice)) : 0,
  };

  if (filters.brandSlug) {
    const brand = getBrandBySlug(filters.brandSlug);
    if (brand) results = results.filter((p) => p.brandId === brand.id);
  }

  if (filters.minPrice != null) {
    results = results.filter((p) => p.maxPrice >= filters.minPrice!);
  }
  if (filters.maxPrice != null) {
    results = results.filter((p) => p.minPrice <= filters.maxPrice!);
  }

  if (filters.specFilters) {
    results = results.filter((p) =>
      productMatchesVariantFilters(vendorVariantsAsProductVariants(p), filters.specFilters),
    );
  }

  switch (filters.sort) {
    case "price_asc":
      results.sort((a, b) => a.minPrice - b.minPrice);
      break;
    case "price_desc":
      results.sort((a, b) => b.maxPrice - a.maxPrice);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
  }

  return {
    products: results.map(enrichVendorProductForCard),
    total: results.length,
    filters,
    categories: getTopCategories(),
    brands,
    facets: { brands: brandFacets, priceRange, attributes },
    dominantCategoryId,
  };
}

export function browseCategory(filters: CategoryBrowseFilters): CategoryBrowseResult | undefined {
  const category = getCategoryBySlug(filters.categorySlug);
  if (!category) return undefined;

  const subcategories = getSubcategories(category.id);
  let pool = getVendorProductsForCategorySlug(filters.categorySlug);

  if (filters.subcategorySlug) {
    const sub = getCategoryBySlug(filters.subcategorySlug);
    if (sub) pool = getVendorProductsByCategory(sub.id);
  }

  const priceRange = {
    min: pool.length ? Math.min(...pool.map((p) => p.minPrice)) : 0,
    max: pool.length ? Math.max(...pool.map((p) => p.maxPrice)) : 0,
  };

  const brandCounts = new Map<string, number>();
  pool.forEach((p) => {
    if (p.brandId) brandCounts.set(p.brandId, (brandCounts.get(p.brandId) ?? 0) + 1);
  });
  const brandFacets = [...brandCounts.entries()]
    .map(([brandId, count]) => ({ brand: getBrandById(brandId)!, count }))
    .filter((b) => b.brand)
    .sort((a, b) => b.count - a.count);

  const tagCounts = new Map<string, number>();
  pool.forEach((p) => p.tags?.forEach((t) => tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)));
  const tagFacets = [...tagCounts.entries()].map(([tag, count]) => ({ tag, count }));

  const attrCategoryId = filters.subcategorySlug
    ? getCategoryBySlug(filters.subcategorySlug)?.id
    : subcategories.length === 0
      ? category.id
      : undefined;

  const poolAsProducts = pool.map((p) => ({ id: p.id, categoryId: p.categoryId }));
  const getVariants = (id: string) => {
    const vp = pool.find((p) => p.id === id);
    return vp ? vendorVariantsAsProductVariants(vp) : [];
  };
  const attributes = buildAttributeFacetsFromPool(poolAsProducts, getVariants, attrCategoryId);

  let results = [...pool];

  if (filters.brandSlug) {
    const brand = getBrandBySlug(filters.brandSlug);
    if (brand) results = results.filter((p) => p.brandId === brand.id);
  }
  if (filters.minPrice != null) results = results.filter((p) => p.maxPrice >= filters.minPrice!);
  if (filters.maxPrice != null) results = results.filter((p) => p.minPrice <= filters.maxPrice!);
  if (filters.tag) results = results.filter((p) => p.tags?.includes(filters.tag!));
  if (filters.ratingMin != null) results = results.filter((p) => p.rating >= filters.ratingMin!);

  if (filters.specFilters) {
    results = results.filter((p) =>
      productMatchesVariantFilters(vendorVariantsAsProductVariants(p), filters.specFilters),
    );
  }

  switch (filters.sort) {
    case "price_asc":
      results.sort((a, b) => a.minPrice - b.minPrice);
      break;
    case "price_desc":
      results.sort((a, b) => b.maxPrice - a.maxPrice);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    default:
      results.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return {
    products: results.map(enrichVendorProductForCard),
    total: results.length,
    filters,
    facets: { brands: brandFacets, priceRange, attributes, tags: tagFacets },
    category,
    subcategories,
  };
}

/** @deprecated Legacy canonical product detail — use getVendorProductDetail */
export function getProductDetail(slug: string): ProductDetail | undefined {
  const product = getProductBySlug(slug);
  if (!product) return undefined;

  const brand = getBrandById(product.brandId)!;
  const category = getCategoryById(product.categoryId)!;
  const variants = getVariantsForProduct(product.id);
  const specs = getSpecsForProduct(product.id);
  const productReviews = getReviewsForProduct(product.id);
  const productFaqs = getFaqsForProduct(product.id);
  const rawListings = getListingsForProduct(product.id);

  const listings: EnrichedListing[] = rawListings.map((l) => ({
    ...l,
    vendor: getVendorById(l.vendorId)!,
    location: vendorLocations.find((loc) => loc.id === l.locationId)!,
    variant: variants.find((v) => v.id === l.variantId) ?? variants[0],
  }));

  const relatedProductIds = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)
    .map((p) => p.id);

  const comparisonSlugs = getAllComparisons()
    .filter((c) => c.productIds.includes(product.id))
    .map((c) => c.slug);

  const guideSlugs = getAllGuides()
    .filter((g) => g.productIds.includes(product.id))
    .map((g) => g.slug);

  return {
    ...product,
    brand,
    category,
    variants,
    specs,
    reviews: productReviews,
    faqs: productFaqs,
    listings,
    relatedProductIds,
    comparisonSlugs,
    guideSlugs,
  };
}

export function getCompareProducts(ids: string[]): CompareProduct[] {
  return ids
    .map((id) => {
      const product = getProductById(id);
      if (!product) return null;
      const brand = getBrandById(product.brandId)!;
      const specs = getSpecsForProduct(product.id);
      const variant = getVariantsForProduct(product.id).find((v) => v.isDefault) ?? getVariantsForProduct(product.id)[0];
      return { ...product, brand, specs, variant };
    })
    .filter(Boolean) as CompareProduct[];
}

export function getCategoryTree(): CategoryTreeNode[] {
  return getTopCategories().map((top) => ({
    ...top,
    children: getSubcategories(top.id).map((sub) => ({
      ...sub,
      children: getSubcategories(sub.id).map((leaf) => ({ ...leaf, children: [] })),
    })),
  }));
}

export function getProductsForCategorySlug(slug: string) {
  return getVendorProductsForCategorySlug(slug);
}

/** @deprecated Use enrichVendorProductForCard */
export function enrichProductForCard(p: import("../data").Product): VendorProductCardItem {
  const listing = getFirstListingForLegacyProductSlug(p.slug);
  if (listing) return enrichVendorProductForCard(listing);
  return enrichVendorProductForCard({
    id: p.id,
    vendorId: vendors[0]?.id ?? "",
    categoryId: p.categoryId,
    brandId: p.brandId,
    name: p.name,
    slug: p.slug,
    description: p.description,
    status: "published",
    templateSpecs: {},
    customSpecs: [],
    variants: [{
      id: `v-${p.id}`,
      vendorProductId: p.id,
      name: "Standard",
      attributes: {},
      price: p.minPrice,
      stockStatus: "in_stock",
      images: p.images,
      isDefault: true,
    }],
    images: p.images,
    minPrice: p.minPrice,
    maxPrice: p.maxPrice,
    stockStatus: "in_stock",
    condition: "new",
    locationId: vendorLocations[0]?.id ?? "",
    deliveryType: "city",
    rating: p.rating,
    reviewCount: p.reviewCount,
    tags: p.tags,
    createdAt: p.createdAt,
    updatedAt: p.createdAt,
  });
}

export function getVendorDetail(slug: string) {
  const vendor = getVendorBySlug(slug);
  if (!vendor) return undefined;
  const locations = vendorLocations.filter((l) => l.vendorId === vendor.id);
  const listings = getVendorProductsByVendor(vendor.id).map((vp) => ({
    ...vp,
    product: vp,
  }));
  return { vendor, locations, listings };
}

export function getAdminStats(): AdminStats {
  return {
    totalProducts: getVendorProductCount(),
    totalVendors: vendors.filter((v) => v.status === "active").length,
    pendingReviews: getPendingReviews().length,
    monthlyVisitors: 48200,
    productsAddedThisWeek: 12,
    vendorsPendingApproval: vendors.filter((v) => v.status === "pending").length,
  };
}

export function getAdminActivities(): AdminActivity[] {
  return [
    { id: "a1", action: "Approved review", entity: "review", entityName: "Yamaha R15 review", timestamp: "2026-06-22T10:30:00", user: "Admin" },
    { id: "a2", action: "New vendor listing", entity: "product", entityName: "Redmi Note 13 Pro", timestamp: "2026-06-22T09:15:00", user: "Admin" },
    { id: "a3", action: "Vendor approved", entity: "vendor", entityName: "Cool Air Solutions", timestamp: "2026-06-21T16:45:00", user: "Admin" },
    { id: "a4", action: "Updated category", entity: "category", entityName: "Smartphones", timestamp: "2026-06-21T14:20:00", user: "Moderator" },
    { id: "a5", action: "Rejected review", entity: "review", entityName: "Spam review", timestamp: "2026-06-21T11:00:00", user: "Moderator" },
  ];
}

export function getSearchSuggestions(): string[] {
  return ["iPhone 16", "Galaxy S26", "Royal Enfield", "Samsung TV", "Rockrider", "Miniket rice", "LG AC", "MacBook"];
}

export {
  getFeaturedProducts,
  getNearbyVendors,
  getBrandBySlug,
  getCategoryBySlug,
  getComparisonBySlug,
  getGuideBySlug,
  getPendingReviews,
  getProductById,
  getProductBySlug,
  getProductsByBrand,
};

export type { VendorProductDetail };
