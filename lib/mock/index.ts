import type {
  ProductDetail,
  SearchResult,
  SearchFilters,
  CategoryBrowseFilters,
  CategoryBrowseResult,
  CategoryProductItem,
  AdminStats,
  AdminActivity,
  CategoryTreeNode,
  CompareProduct,
  EnrichedListing,
} from "../data";
import { categories, getCategoryById, getCategoryBySlug, getTopCategories, getSubcategories, getCategoryAttributes } from "./categories";
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

export function search(filters: SearchFilters): SearchResult {
  let results = filters.query ? searchProducts(filters.query) : [...products];

  if (filters.categorySlug) {
    const cat = getCategoryBySlug(filters.categorySlug);
    if (cat) results = getProductsByCategory(cat.id);
  }

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
    products: results,
    total: results.length,
    filters,
    categories: getTopCategories(),
    brands,
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
  const cat = getCategoryBySlug(slug);
  if (!cat) return [];
  if (cat.parentId === null) {
    const childIds = categories.filter((c) => c.parentId === cat.id).map((c) => c.id);
    const ids = [cat.id, ...childIds];
    return products.filter((p) => ids.includes(p.categoryId));
  }
  return getProductsByCategory(cat.id);
}

function specMatches(productId: string, slug: string, filterValue: string): boolean {
  const specs = getSpecsForProduct(productId);
  const spec = specs.find((s) => s.slug === slug);
  if (!spec) return false;
  const val = spec.value.toLowerCase();
  const filter = filterValue.toLowerCase();
  return val === filter || val.includes(filter);
}

function enrichProduct(p: import("../data").Product): CategoryProductItem {
  return {
    ...p,
    brand: getBrandById(p.brandId)!,
    keySpecs: getSpecsForProduct(p.id).filter((s) => s.isComparable).slice(0, 3),
    vendorCount: getListingsForProduct(p.id).length,
  };
}

export function browseCategory(filters: CategoryBrowseFilters): CategoryBrowseResult | undefined {
  const category = getCategoryBySlug(filters.categorySlug);
  if (!category) return undefined;

  const subcategories = getSubcategories(category.id);
  let pool = getProductsForCategorySlug(filters.categorySlug);

  if (filters.subcategorySlug) {
    const sub = getCategoryBySlug(filters.subcategorySlug);
    if (sub) pool = getProductsByCategory(sub.id);
  }

  const priceRange = {
    min: pool.length ? Math.min(...pool.map((p) => p.minPrice)) : 0,
    max: pool.length ? Math.max(...pool.map((p) => p.maxPrice)) : 0,
  };

  // Brand facets from unfiltered pool (before brand filter)
  const brandCounts = new Map<string, number>();
  pool.forEach((p) => brandCounts.set(p.brandId, (brandCounts.get(p.brandId) ?? 0) + 1));
  const brandFacets = [...brandCounts.entries()]
    .map(([brandId, count]) => ({ brand: getBrandById(brandId)!, count }))
    .filter((b) => b.brand)
    .sort((a, b) => b.count - a.count);

  // Tag facets
  const tagCounts = new Map<string, number>();
  pool.forEach((p) => p.tags?.forEach((t) => tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)));
  const tagFacets = [...tagCounts.entries()].map(([tag, count]) => ({ tag, count }));

  // Attribute facets — use leaf category
  const attrCategoryId = filters.subcategorySlug
    ? getCategoryBySlug(filters.subcategorySlug)?.id
    : subcategories.length === 0
      ? category.id
      : undefined;

  const attributes = attrCategoryId
    ? getCategoryAttributes(attrCategoryId)
        .filter((a) => a.isFilterable)
        .map((attr) => {
          const valueCounts = new Map<string, number>();
          pool.forEach((p) => {
            const spec = getSpecsForProduct(p.id).find((s) => s.slug === attr.slug);
            if (spec) valueCounts.set(spec.value, (valueCounts.get(spec.value) ?? 0) + 1);
          });
          const values = [...valueCounts.entries()]
            .map(([value, count]) => ({ value, count }))
            .sort((a, b) => b.count - a.count);
          return { attribute: attr, values };
        })
        .filter((a) => a.values.length > 0)
    : [];

  // Apply filters
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
    Object.entries(filters.specFilters).forEach(([slug, value]) => {
      results = results.filter((p) => specMatches(p.id, slug, value));
    });
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
    products: results.map(enrichProduct),
    total: results.length,
    filters,
    facets: { brands: brandFacets, priceRange, attributes, tags: tagFacets },
    category,
    subcategories,
  };
}

export function getVendorDetail(slug: string) {
  const vendor = getVendorBySlug(slug);
  if (!vendor) return undefined;
  const locations = vendorLocations.filter((l) => l.vendorId === vendor.id);
  const listings = getListingsForVendor(vendor.id).map((l) => {
    const product = getProductById(l.productId)!;
    return { ...l, product };
  });
  return { vendor, locations, listings };
}

export function getAdminStats(): AdminStats {
  return {
    totalProducts: products.length,
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
    { id: "a2", action: "Added product", entity: "product", entityName: "Redmi Note 13 Pro", timestamp: "2026-06-22T09:15:00", user: "Admin" },
    { id: "a3", action: "Vendor approved", entity: "vendor", entityName: "Cool Air Solutions", timestamp: "2026-06-21T16:45:00", user: "Admin" },
    { id: "a4", action: "Updated category", entity: "category", entityName: "Smartphones", timestamp: "2026-06-21T14:20:00", user: "Moderator" },
    { id: "a5", action: "Rejected review", entity: "review", entityName: "Spam review", timestamp: "2026-06-21T11:00:00", user: "Moderator" },
  ];
}

export function getSearchSuggestions(): string[] {
  return ["iPhone 16", "Royal Enfield", "Samsung TV", "Rockrider", "LG AC", "MacBook", "Yamaha R15"];
}

export { getFeaturedProducts, getNearbyVendors, getBrandBySlug, getCategoryBySlug, getComparisonBySlug, getGuideBySlug, getPendingReviews, getProductById, getProductBySlug };
