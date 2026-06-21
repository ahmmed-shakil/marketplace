/** Schema-ready domain types — maps 1:1 to future PostgreSQL tables */

// ─── Enums ───────────────────────────────────────────────────────────────────

export type AttributeType =
  | "text"
  | "number"
  | "enum"
  | "boolean"
  | "range"
  | "dimension";

export type ProductStatus = "draft" | "published" | "archived";

export type VendorProductStatus = "draft" | "pending" | "published" | "rejected";

export type ReviewType = "expert" | "user";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "pre_order";

export type ProductCondition = "new" | "refurbished" | "used";

export type VendorTier = "free" | "premium";

export type VendorStatus = "pending" | "active" | "suspended";

export type UserRole = "admin" | "vendor" | "consumer" | "moderator";

export type DeliveryRegionType = "city" | "district" | "nationwide" | "international";

export type FAQSource = "auto" | "community" | "expert";

// ─── Taxonomy ────────────────────────────────────────────────────────────────

/** DB: categories */
export interface Category {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  depth: number;
  path: string;
  icon: string;
  description?: string;
  productCount: number;
  isActive: boolean;
}

/** DB: category_attributes */
export interface CategoryAttribute {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  attrType: AttributeType;
  unit?: string;
  allowedValues?: string[];
  isFilterable: boolean;
  isComparable: boolean;
  sortOrder: number;
  group?: string;
}

/** DB: brands */
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  website?: string;
  productCount: number;
}

// ─── Products ────────────────────────────────────────────────────────────────

/** DB: products */
export interface Product {
  id: string;
  brandId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  status: ProductStatus;
  minPrice: number;
  maxPrice: number;
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  tags?: string[];
  createdAt: string;
}

/** DB: product_images */
export interface ProductImage {
  id: string;
  productId: string;
  variantId?: string;
  url: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
}

/** DB: product_media */
export interface ProductMedia {
  id: string;
  productId: string;
  type: "video" | "360" | "document";
  url: string;
  title: string;
}

/** DB: product_variants */
export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  slug: string;
  priceMsrp: number;
  /** DB: attributes JSONB */
  attributes: Record<string, string | number | boolean>;
  isDefault: boolean;
  imageUrl?: string;
}

/** DB: variant_attributes (normalized) */
export interface VariantAttribute {
  id: string;
  variantId: string;
  attributeId: string;
  valueText?: string;
  valueNumber?: number;
  valueEnum?: string;
}

/** Spec row for display — derived from CategoryAttribute + VariantAttribute */
export interface SpecRow {
  name: string;
  slug: string;
  value: string;
  group?: string;
  isComparable: boolean;
}

// ─── Content ─────────────────────────────────────────────────────────────────

/** DB: reviews */
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: ReviewType;
  rating: number;
  title: string;
  body: string;
  isVerified: boolean;
  status: ReviewStatus;
  createdAt: string;
}

/** DB: faqs */
export interface FAQ {
  id: string;
  productId?: string;
  categoryId?: string;
  question: string;
  answer: string;
  source: FAQSource;
  votes: number;
}

/** DB: comparisons */
export interface Comparison {
  id: string;
  slug: string;
  title: string;
  productIds: string[];
  summary: string;
}

/** DB: buying_guides */
export interface BuyingGuide {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  excerpt: string;
  content: string;
  productIds: string[];
  budgetLabel: string;
  coverImage: string;
  readTime: number;
  createdAt: string;
}

// ─── Vendors ─────────────────────────────────────────────────────────────────

/** DB: vendors */
export interface Vendor {
  id: string;
  slug: string;
  businessName: string;
  logoUrl: string;
  description: string;
  status: VendorStatus;
  tier: VendorTier;
  rating: number;
  listingCount: number;
  categories: string[];
}

/** DB: vendor_locations */
export interface VendorLocation {
  id: string;
  vendorId: string;
  name: string;
  address: string;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  phone: string;
  isPrimary: boolean;
}

/** DB: vendor_products — vendor-owned marketplace listings */
export interface CustomSpec {
  key: string;
  value: string;
}

export interface VendorProductVariant {
  id: string;
  vendorProductId: string;
  sku?: string;
  name: string;
  attributes: Record<string, string>;
  price: number;
  stockStatus: StockStatus;
  images: ProductImage[];
  isDefault: boolean;
}

export interface VendorProduct {
  id: string;
  vendorId: string;
  categoryId: string;
  brandId?: string;
  brandName?: string;
  name: string;
  slug: string;
  description: string;
  status: VendorProductStatus;
  templateSpecs: Record<string, string>;
  customSpecs: CustomSpec[];
  variants: VendorProductVariant[];
  images: ProductImage[];
  minPrice: number;
  maxPrice: number;
  stockStatus: StockStatus;
  condition: ProductCondition;
  warranty?: string;
  locationId: string;
  deliveryType: DeliveryRegionType;
  rating: number;
  reviewCount: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  /** Soft cluster key for similar listings (brand + normalized name + category) */
  productGroupId?: string;
}

/** DB: vendor_listings @deprecated — folded into vendor_products */
export interface VendorListing {
  id: string;
  vendorId: string;
  variantId: string;
  productId: string;
  locationId: string;
  price: number;
  stockStatus: StockStatus;
  condition: ProductCondition;
  warranty: string;
  updatedAt: string;
  distanceKm?: number;
  deliveryType: DeliveryRegionType;
}

/** DB: delivery_regions */
export interface DeliveryRegion {
  id: string;
  locationId: string;
  regionType: DeliveryRegionType;
  regionName: string;
  deliveryFee: number;
  etaDays: number;
}

// ─── Users ───────────────────────────────────────────────────────────────────

/** DB: users */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

// ─── Composite / View types ────────────────────────────────────────────────────

export interface ProductDetail extends Product {
  brand: Brand;
  category: Category;
  variants: ProductVariant[];
  specs: SpecRow[];
  reviews: Review[];
  faqs: FAQ[];
  listings: EnrichedListing[];
  relatedProductIds: string[];
  comparisonSlugs: string[];
  guideSlugs: string[];
}

export interface EnrichedListing extends VendorListing {
  vendor: Vendor;
  location: VendorLocation;
  variant: ProductVariant;
}

export interface SearchFilters {
  query?: string;
  categorySlug?: string;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "relevance" | "price_asc" | "price_desc" | "rating";
  specFilters?: Record<string, string>;
}

export interface CategoryBrowseFilters {
  categorySlug: string;
  subcategorySlug?: string;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "relevance" | "price_asc" | "price_desc" | "rating" | "newest";
  tag?: string;
  ratingMin?: number;
  specFilters?: Record<string, string>;
}

export interface BrandFacet {
  brand: Brand;
  count: number;
}

export interface AttributeFacet {
  attribute: CategoryAttribute;
  values: { value: string; count: number }[];
}

export interface VendorProductCardItem extends VendorProduct {
  vendor: Vendor;
  brand: Brand | null;
  variantSummary: string[];
  keySpecs?: SpecRow[];
}

export interface VendorProductDetail extends VendorProduct {
  vendor: Vendor;
  category: Category;
  brand: Brand | null;
  location: VendorLocation;
  similarListingIds: string[];
}

/** @deprecated Use VendorProductCardItem */
export interface CategoryProductItem extends Product {
  brand: Brand;
  keySpecs: SpecRow[];
  vendorCount: number;
  variantSummary: string[];
}

/** Marketplace search/browse card item */
export interface SearchProductItem extends VendorProductCardItem {}

export interface CategoryBrowseResult {
  products: VendorProductCardItem[];
  total: number;
  filters: CategoryBrowseFilters;
  facets: {
    brands: BrandFacet[];
    priceRange: { min: number; max: number };
    attributes: AttributeFacet[];
    tags: { tag: string; count: number }[];
  };
  category: Category;
  subcategories: Category[];
}

export interface SearchResult {
  products: SearchProductItem[];
  total: number;
  filters: SearchFilters;
  categories: Category[];
  brands: Brand[];
  facets: {
    brands: BrandFacet[];
    priceRange: { min: number; max: number };
    attributes: AttributeFacet[];
  };
  dominantCategoryId?: string;
}

export interface AdminStats {
  totalProducts: number;
  totalVendors: number;
  pendingReviews: number;
  monthlyVisitors: number;
  productsAddedThisWeek: number;
  vendorsPendingApproval: number;
}

export interface AdminActivity {
  id: string;
  action: string;
  entity: string;
  entityName: string;
  timestamp: string;
  user: string;
}

export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
}

export interface CompareProduct extends Product {
  brand: Brand;
  specs: SpecRow[];
  variant: ProductVariant;
}
