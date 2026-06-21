import type { Product, ProductVariant, SpecRow, Vendor, VendorLocation, VendorListing } from "../data";
import { categories, getCategoryById, getFilterableVariantAttributes } from "./categories";
import { brands } from "./brands";
import { productImageUrl, vendorLogoUrl } from "./product-images";

const TARGET_PER_SUBCATEGORY = 3;

const PREFIXES = ["Pro", "Classic", "Smart", "Elite", "Essential", "Ultra", "Max", "Prime"];
const TAGS_POOL = ["bestseller", "new", "popular", "value", "premium", "5g", "budget", "mid-range", "flagship"];

/** Base price tiers by top-level department slug (BDT) */
const PRICE_TIER: Record<string, [number, number]> = {
  electronics: [2999, 249999],
  vehicles: [89000, 5500000],
  "home-appliances": [3499, 199999],
  "home-living": [999, 89999],
  fashion: [499, 24999],
  beauty: [299, 12999],
  sports: [999, 149999],
  "baby-kids": [399, 49999],
  books: [99, 8999],
  health: [499, 29999],
  tools: [299, 49999],
  food: [49, 2999],
  pets: [199, 9999],
  music: [1999, 199999],
  industrial: [4999, 499999],
  agriculture: [999, 899999],
  "garden-outdoor": [499, 79999],
  "jewelry-watches": [999, 499999],
};

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function departmentSlug(categoryId: string): string {
  let cat = getCategoryById(categoryId);
  while (cat?.parentId) {
    cat = getCategoryById(cat.parentId);
  }
  return cat?.slug ?? "electronics";
}

function pickBrand(categoryId: string, index: number) {
  const h = hashString(`${categoryId}-${index}`);
  return brands[h % brands.length];
}

function priceFor(categoryId: string, index: number): [number, number] {
  const dept = departmentSlug(categoryId);
  const [lo, hi] = PRICE_TIER[dept] ?? [999, 99999];
  const h = hashString(`${categoryId}-price-${index}`);
  const spread = hi - lo;
  const min = lo + (h % Math.floor(spread * 0.6));
  const max = min + Math.floor(spread * 0.15) + (h % 5000);
  return [min, Math.min(max, hi)];
}

function ratingFor(index: number): number {
  return Math.round((3.8 + (index % 12) * 0.1) * 10) / 10;
}

function img(productId: string, slug: string, categoryId: string, alt: string) {
  const cat = getCategoryById(categoryId);
  return {
    id: `img-${productId}`,
    productId,
    url: productImageUrl(slug, cat?.slug ?? "general"),
    altText: alt,
    sortOrder: 0,
    isPrimary: true,
  };
}

function defaultSpecs(categoryName: string, brandName: string): SpecRow[] {
  return [
    { name: "Brand", slug: "brand", value: brandName, group: "General", isComparable: false },
    { name: "Category", slug: "category", value: categoryName, group: "General", isComparable: false },
    { name: "Warranty", slug: "warranty", value: "1 Year Official", group: "General", isComparable: true },
  ];
}

export function generateCatalogProducts(existing: Product[]): Product[] {
  const subcategories = categories.filter((c) => c.parentId !== null);
  const existingByCat = new Map<string, number>();
  existing.forEach((p) => {
    existingByCat.set(p.categoryId, (existingByCat.get(p.categoryId) ?? 0) + 1);
  });

  const generated: Product[] = [];
  const usedSlugs = new Set(existing.map((p) => p.slug));

  for (const cat of subcategories) {
    const have = existingByCat.get(cat.id) ?? 0;
    const need = Math.max(0, TARGET_PER_SUBCATEGORY - have);

    for (let i = 0; i < need; i++) {
      const brand = pickBrand(cat.id, i);
      const prefix = PREFIXES[(hashString(cat.id) + i) % PREFIXES.length];
      const name = `${brand.name} ${prefix} ${cat.name.replace(/'/g, "")}`;
      let slug = slugify(`${brand.slug}-${cat.slug}-${prefix}-${i + 1}`);
      if (usedSlugs.has(slug)) slug = `${slug}-${i}`;
      usedSlugs.add(slug);

      const id = `prod-gen-${cat.slug}-${i + 1}-${hashString(slug) % 10000}`;
      const [minPrice, maxPrice] = priceFor(cat.id, i);
      const rating = ratingFor(hashString(slug));
      const reviewCount = 12 + (hashString(slug) % 480);
      const tagCount = hashString(slug) % 3;
      const tags = tagCount
        ? TAGS_POOL.filter((_, ti) => (hashString(slug + ti) % 4) === 0).slice(0, tagCount)
        : undefined;

      generated.push({
        id,
        brandId: brand.id,
        categoryId: cat.id,
        name,
        slug,
        description: `${name} — quality ${cat.name.toLowerCase()} available from verified Bangladesh vendors. Compare specs, prices, and warranty options.`,
        status: "published",
        minPrice,
        maxPrice,
        rating,
        reviewCount,
        tags,
        createdAt: `2025-${String((i % 12) + 1).padStart(2, "0")}-15`,
        images: [img(id, slug, cat.id, name)],
      });
    }
  }

  return generated;
}

export function generateCatalogVariants(
  productList: Product[],
  existing: ProductVariant[] = [],
): ProductVariant[] {
  const hasVariant = new Set(existing.map((v) => v.productId));
  const generated: ProductVariant[] = [];

  for (const p of productList) {
    if (hasVariant.has(p.id)) continue;

    const attrs = getFilterableVariantAttributes(p.categoryId);

    const primary = attrs[0];
    const secondary = attrs[1];
    const primaryVals = primary.allowedValues!.slice(0, 3);
    const secondaryVals = secondary?.allowedValues?.slice(0, 2) ?? [null];

    let idx = 0;
    for (const pv of primaryVals) {
      for (const sv of secondaryVals) {
        if (idx >= 4) break;
        const attributes: Record<string, string> = { [primary.slug]: pv };
        if (sv && secondary) attributes[secondary.slug] = sv;
        const label = Object.values(attributes).join(" · ");
        const priceBump = idx * Math.floor(Math.max(p.maxPrice - p.minPrice, 1) / 4);
        generated.push({
          id: `var-${p.id}-${idx}`,
          productId: p.id,
          sku: `SKU-${p.id.slice(-6).toUpperCase()}-${idx}`,
          name: label,
          slug: slugify(label),
          priceMsrp: p.minPrice + priceBump,
          isDefault: idx === 0,
          attributes,
        });
        idx++;
      }
      if (idx >= 4) break;
    }
  }

  return generated;
}

export function generateCatalogSpecs(productList: Product[]): Record<string, SpecRow[]> {
  const specs: Record<string, SpecRow[]> = {};
  for (const p of productList) {
    if (!p.id.startsWith("prod-gen-")) continue;
    const cat = getCategoryById(p.categoryId);
    const brand = brands.find((b) => b.id === p.brandId);
    specs[p.id] = defaultSpecs(cat?.name ?? "Product", brand?.name ?? "Brand");
  }
  return specs;
}

/** Vendor templates — one anchor store per department plus specialty retailers */
const VENDOR_TEMPLATES: Omit<Vendor, "listingCount">[] = [
  { id: "ven-star-mobile", slug: "star-mobile-dhaka", businessName: "Star Mobile", logoUrl: "", description: "Premium mobile retailer in Dhaka since 2010.", status: "active", tier: "premium", rating: 4.7, categories: ["electronics"] },
  { id: "ven-tech-world", slug: "tech-world-bashundhara", businessName: "Tech World", logoUrl: "", description: "Electronics superstore with nationwide delivery.", status: "active", tier: "premium", rating: 4.5, categories: ["electronics"] },
  { id: "ven-gadget-zone", slug: "gadget-zone-sylhet", businessName: "Gadget Zone Sylhet", logoUrl: "", description: "Mobile and laptop store serving Sylhet division.", status: "active", tier: "free", rating: 4.1, categories: ["electronics"] },
  { id: "ven-royal-motors", slug: "royal-motors-motijheel", businessName: "Royal Motors", logoUrl: "", description: "Authorized Royal Enfield and Yamaha dealer.", status: "active", tier: "premium", rating: 4.8, categories: ["vehicles"] },
  { id: "ven-auto-house", slug: "auto-house-gulshan", businessName: "Auto House", logoUrl: "", description: "Multi-brand car dealership in Gulshan.", status: "active", tier: "premium", rating: 4.2, categories: ["vehicles"] },
  { id: "ven-ride-city", slug: "ride-city-chittagong", businessName: "Ride City", logoUrl: "", description: "Scooters, EVs, and two-wheeler parts in Chittagong.", status: "active", tier: "free", rating: 4.0, categories: ["vehicles"] },
  { id: "ven-walton-plaza", slug: "walton-plaza", businessName: "Walton Plaza", logoUrl: "", description: "Official Walton showroom and service center.", status: "active", tier: "premium", rating: 4.3, categories: ["electronics", "home-appliances"] },
  { id: "ven-cool-air", slug: "cool-air-chittagong", businessName: "Cool Air Solutions", logoUrl: "", description: "AC and refrigeration specialists in Chittagong.", status: "active", tier: "free", rating: 4.2, categories: ["home-appliances"] },
  { id: "ven-home-comfort", slug: "home-comfort-dhanmondi", businessName: "Home Comfort BD", logoUrl: "", description: "Kitchen appliances, purifiers, and small electronics for the home.", status: "active", tier: "free", rating: 4.4, categories: ["home-appliances"] },
  { id: "ven-furniture-mart", slug: "furniture-mart-uttara", businessName: "Furniture Mart", logoUrl: "", description: "Living room, bedroom, and office furniture across Dhaka.", status: "active", tier: "premium", rating: 4.3, categories: ["home-living"] },
  { id: "ven-decor-house", slug: "decor-house-banani", businessName: "Decor House", logoUrl: "", description: "Lighting, decor, and bathroom fittings.", status: "active", tier: "free", rating: 4.1, categories: ["home-living"] },
  { id: "ven-style-bazaar", slug: "style-bazaar-gulshan", businessName: "Style Bazaar", logoUrl: "", description: "Fashion, footwear, bags, and eyewear under one roof.", status: "active", tier: "premium", rating: 4.5, categories: ["fashion"] },
  { id: "ven-beauty-hub", slug: "beauty-hub-dhanmondi", businessName: "Beauty Hub", logoUrl: "", description: "Skincare, makeup, and grooming essentials.", status: "active", tier: "free", rating: 4.4, categories: ["beauty"] },
  { id: "ven-cycle-hub", slug: "cycle-hub-dhanmondi", businessName: "Cycle Hub", logoUrl: "", description: "Bangladesh's largest bicycle specialty store.", status: "active", tier: "free", rating: 4.4, categories: ["sports"] },
  { id: "ven-sports-arena", slug: "sports-arena-mirpur", businessName: "Sports Arena", logoUrl: "", description: "Fitness gear, team sports, and outdoor equipment.", status: "active", tier: "free", rating: 4.2, categories: ["sports"] },
  { id: "ven-little-ones", slug: "little-ones-bashundhara", businessName: "Little Ones", logoUrl: "", description: "Baby gear, toys, and school supplies.", status: "active", tier: "premium", rating: 4.6, categories: ["baby-kids"] },
  { id: "ven-bookworm", slug: "bookworm-new-market", businessName: "Bookworm", logoUrl: "", description: "Books, stationery, and art supplies in New Market.", status: "active", tier: "free", rating: 4.5, categories: ["books"] },
  { id: "ven-wellness-plus", slug: "wellness-plus-dhanmondi", businessName: "Wellness Plus", logoUrl: "", description: "Medical devices, scales, and fitness supplements — no medicines.", status: "active", tier: "free", rating: 4.3, categories: ["health"] },
  { id: "ven-build-pro", slug: "build-pro-motijheel", businessName: "Build Pro", logoUrl: "", description: "Power tools, hardware, and building materials.", status: "active", tier: "premium", rating: 4.4, categories: ["tools"] },
  { id: "ven-fresh-basket", slug: "fresh-basket-mohammadpur", businessName: "Fresh Basket", logoUrl: "", description: "Packaged food, rice, snacks, and beverages.", status: "active", tier: "free", rating: 4.1, categories: ["food"] },
  { id: "ven-pet-paradise", slug: "pet-paradise-banani", businessName: "Pet Paradise", logoUrl: "", description: "Pet food, accessories, and aquarium supplies.", status: "active", tier: "free", rating: 4.5, categories: ["pets"] },
  { id: "ven-music-world", slug: "music-world-dhanmondi", businessName: "Music World", logoUrl: "", description: "Guitars, keyboards, drums, and recording gear.", status: "active", tier: "free", rating: 4.6, categories: ["music"] },
  { id: "ven-industrial-supply", slug: "industrial-supply-tejgaon", businessName: "Industrial Supply Co.", logoUrl: "", description: "Office equipment, generators, and safety gear.", status: "active", tier: "premium", rating: 4.0, categories: ["industrial"] },
  { id: "ven-agro-mart", slug: "agro-mart-rangpur", businessName: "Agro Mart", logoUrl: "", description: "Farm machinery, pumps, seeds, and fertilizers.", status: "active", tier: "free", rating: 4.2, categories: ["agriculture"] },
  { id: "ven-green-garden", slug: "green-garden-chittagong", businessName: "Green Garden", logoUrl: "", description: "Plants, lawn care, outdoor furniture, and BBQ.", status: "active", tier: "free", rating: 4.3, categories: ["garden-outdoor"] },
  { id: "ven-jewel-gallery", slug: "jewel-gallery-gulshan", businessName: "Jewel Gallery", logoUrl: "", description: "Gold, silver, and designer watches.", status: "active", tier: "premium", rating: 4.7, categories: ["jewelry-watches"] },
  { id: "ven-mega-store", slug: "mega-store-khulna", businessName: "Mega Store Khulna", logoUrl: "", description: "Multi-category retailer serving Khulna division.", status: "active", tier: "free", rating: 4.0, categories: ["electronics", "home-appliances", "fashion"] },
  { id: "ven-north-star", slug: "north-star-rajshahi", businessName: "North Star Retail", logoUrl: "", description: "Electronics and appliances for Rajshahi division.", status: "pending", tier: "free", rating: 3.9, categories: ["electronics", "home-appliances"] },
];

const LOCATION_TEMPLATES: Omit<VendorLocation, "id" | "vendorId">[] = [
  { name: "Main Showroom", address: "Level 8, Bashundhara City, Panthapath", city: "Dhaka", district: "Dhaka", latitude: 23.7508, longitude: 90.3937, phone: "+880 1712-345678", isPrimary: true },
  { name: "Dhanmondi Branch", address: "House 15, Road 27, Dhanmondi", city: "Dhaka", district: "Dhaka", latitude: 23.7461, longitude: 90.3742, phone: "+880 1612-678901", isPrimary: true },
  { name: "Gulshan Outlet", address: "Gulshan Avenue", city: "Dhaka", district: "Dhaka", latitude: 23.7925, longitude: 90.4078, phone: "+880 1912-901234", isPrimary: true },
  { name: "Agrabad Branch", address: "12 Agrabad C/A", city: "Chittagong", district: "Chittagong", latitude: 22.3367, longitude: 91.8125, phone: "+880 1712-789012", isPrimary: true },
  { name: "Zindabazar", address: "Zindabazar Main Road", city: "Sylhet", district: "Sylhet", latitude: 24.8949, longitude: 91.8687, phone: "+880 1812-890123", isPrimary: true },
  { name: "Motijheel Showroom", address: "45 Motijheel C/A", city: "Dhaka", district: "Dhaka", latitude: 23.7336, longitude: 90.4172, phone: "+880 1912-567890", isPrimary: true },
];

function vendorMatchesProduct(vendor: Vendor, product: Product): boolean {
  const dept = departmentSlug(product.categoryId);
  return vendor.categories.includes(dept);
}

export function buildVendorCatalog(productList: Product[], variantList: ProductVariant[]) {
  const vendors: Vendor[] = VENDOR_TEMPLATES.map((t) => ({
    ...t,
    logoUrl: vendorLogoUrl(t.businessName),
    listingCount: 0,
  }));

  const vendorLocations: VendorLocation[] = vendors.map((v, i) => {
    const loc = LOCATION_TEMPLATES[i % LOCATION_TEMPLATES.length];
    return {
      id: `loc-${v.id}`,
      vendorId: v.id,
      ...loc,
      isPrimary: true,
    };
  });

  const locByVendor = new Map(vendorLocations.map((l) => [l.vendorId, l]));
  const variantByProduct = new Map<string, ProductVariant[]>();
  variantList.forEach((v) => {
    const list = variantByProduct.get(v.productId) ?? [];
    list.push(v);
    variantByProduct.set(v.productId, list);
  });

  const vendorListings: VendorListing[] = [];
  let listIdx = 1;

  for (const product of productList) {
    const productVariants = variantByProduct.get(product.id) ?? [];
    if (productVariants.length === 0) continue;

    const matchingVendors = vendors.filter((v) => v.status === "active" && vendorMatchesProduct(v, product));
    if (matchingVendors.length === 0) continue;

    for (const variant of productVariants) {
      const vendorCount = 1 + (hashString(product.id + variant.id) % Math.min(2, matchingVendors.length));
      const picked = matchingVendors
        .sort((a, b) => hashString(product.id + variant.id + a.id) - hashString(product.id + variant.id + b.id))
        .slice(0, vendorCount);

      for (const vendor of picked) {
        const location = locByVendor.get(vendor.id)!;
        const discount = (hashString(product.id + vendor.id + variant.id) % 8) * 500;
        const price = Math.max(variant.priceMsrp - discount, Math.floor(variant.priceMsrp * 0.92));
        const stockOptions: VendorListing["stockStatus"][] = ["in_stock", "in_stock", "in_stock", "low_stock"];
        const deliveryOptions: VendorListing["deliveryType"][] = ["city", "nationwide", "district"];

        vendorListings.push({
          id: `list-gen-${listIdx++}`,
          vendorId: vendor.id,
          variantId: variant.id,
          productId: product.id,
          locationId: location.id,
          price,
          stockStatus: stockOptions[hashString(product.id + vendor.id + variant.id) % stockOptions.length],
          condition: "new",
          warranty: "Official warranty",
          updatedAt: "2026-06-20",
          distanceKm: Math.round((hashString(vendor.id + product.id) % 280) + 1.5),
          deliveryType: deliveryOptions[hashString(vendor.id) % deliveryOptions.length],
        });
      }
    }
  }

  // Update listing counts
  const listingCounts = new Map<string, number>();
  vendorListings.forEach((l) => listingCounts.set(l.vendorId, (listingCounts.get(l.vendorId) ?? 0) + 1));
  vendors.forEach((v) => {
    v.listingCount = listingCounts.get(v.id) ?? 0;
  });

  return { vendors, vendorLocations, vendorListings };
}

export function applyCategoryProductCounts(productList: Product[]): void {
  const subCounts = new Map<string, number>();
  productList.forEach((p) => {
    subCounts.set(p.categoryId, (subCounts.get(p.categoryId) ?? 0) + 1);
  });

  categories.forEach((c) => {
    if (c.parentId === null) {
      const childIds = categories.filter((child) => child.parentId === c.id).map((child) => child.id);
      c.productCount = childIds.reduce((sum, id) => sum + (subCounts.get(id) ?? 0), 0);
    } else {
      c.productCount = subCounts.get(c.id) ?? 0;
    }
  });
}
