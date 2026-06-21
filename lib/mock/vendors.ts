import type { Vendor, VendorLocation, VendorListing } from "../data";

export const vendors: Vendor[] = [
  { id: "ven-star-mobile", slug: "star-mobile-dhaka", businessName: "Star Mobile", logoUrl: "https://ui-avatars.com/api/?name=SM&background=6366f1&color=fff", description: "Premium mobile retailer in Dhaka since 2010.", status: "active", tier: "premium", rating: 4.7, listingCount: 342, categories: ["electronics"] },
  { id: "ven-tech-world", slug: "tech-world-bashundhara", businessName: "Tech World", logoUrl: "https://ui-avatars.com/api/?name=TW&background=8b5cf6&color=fff", description: "Electronics superstore with nationwide delivery.", status: "active", tier: "premium", rating: 4.5, listingCount: 890, categories: ["electronics", "home-appliances"] },
  { id: "ven-royal-motors", slug: "royal-motors-motijheel", businessName: "Royal Motors", logoUrl: "https://ui-avatars.com/api/?name=RM&background=d946ef&color=fff", description: "Authorized Royal Enfield and Yamaha dealer.", status: "active", tier: "premium", rating: 4.8, listingCount: 45, categories: ["vehicles"] },
  { id: "ven-cycle-hub", slug: "cycle-hub-dhanmondi", businessName: "Cycle Hub", logoUrl: "https://ui-avatars.com/api/?name=CH&background=22c55e&color=fff", description: "Bangladesh's largest bicycle specialty store.", status: "active", tier: "free", rating: 4.4, listingCount: 120, categories: ["sports"] },
  { id: "ven-walton-plaza", slug: "walton-plaza", businessName: "Walton Plaza", logoUrl: "https://ui-avatars.com/api/?name=WP&background=0ea5e9&color=fff", description: "Official Walton showroom and service center.", status: "active", tier: "premium", rating: 4.3, listingCount: 560, categories: ["electronics", "home-appliances"] },
  { id: "ven-cool-air", slug: "cool-air-chittagong", businessName: "Cool Air Solutions", logoUrl: "https://ui-avatars.com/api/?name=CA&background=f59e0b&color=fff", description: "AC and refrigeration specialists in Chittagong.", status: "active", tier: "free", rating: 4.2, listingCount: 78, categories: ["home-appliances"] },
  { id: "ven-gadget-zone", slug: "gadget-zone-sylhet", businessName: "Gadget Zone Sylhet", logoUrl: "https://ui-avatars.com/api/?name=GZ&background=ef4444&color=fff", description: "Mobile and laptop store serving Sylhet division.", status: "active", tier: "free", rating: 4.1, listingCount: 156, categories: ["electronics"] },
  { id: "ven-auto-house", slug: "auto-house-gulshan", businessName: "Auto House", logoUrl: "https://ui-avatars.com/api/?name=AH&background=64748b&color=fff", description: "Multi-brand car dealership in Gulshan.", status: "pending", tier: "free", rating: 4.0, listingCount: 12, categories: ["vehicles"] },
];

export const vendorLocations: VendorLocation[] = [
  { id: "loc-sm-1", vendorId: "ven-star-mobile", name: "Bashundhara City", address: "Level 8, Bashundhara City, Panthapath", city: "Dhaka", district: "Dhaka", latitude: 23.7508, longitude: 90.3937, phone: "+880 1712-345678", isPrimary: true },
  { id: "loc-tw-1", vendorId: "ven-tech-world", name: "Main Store", address: "Shop 12-15, Bashundhara City", city: "Dhaka", district: "Dhaka", latitude: 23.7510, longitude: 90.3940, phone: "+880 1812-456789", isPrimary: true },
  { id: "loc-rm-1", vendorId: "ven-royal-motors", name: "Motijheel Showroom", address: "45 Motijheel C/A", city: "Dhaka", district: "Dhaka", latitude: 23.7336, longitude: 90.4172, phone: "+880 1912-567890", isPrimary: true },
  { id: "loc-ch-1", vendorId: "ven-cycle-hub", name: "Dhanmondi Branch", address: "House 15, Road 27, Dhanmondi", city: "Dhaka", district: "Dhaka", latitude: 23.7461, longitude: 90.3742, phone: "+880 1612-678901", isPrimary: true },
  { id: "loc-wp-1", vendorId: "ven-walton-plaza", name: "Head Office Showroom", address: "Bashundhara R/A", city: "Dhaka", district: "Dhaka", latitude: 23.8103, longitude: 90.4125, phone: "+880 9611-111111", isPrimary: true },
  { id: "loc-ca-1", vendorId: "ven-cool-air", name: "Agrabad Branch", address: "12 Agrabad C/A", city: "Chittagong", district: "Chittagong", latitude: 22.3367, longitude: 91.8125, phone: "+880 1712-789012", isPrimary: true },
  { id: "loc-gz-1", vendorId: "ven-gadget-zone", name: "Zindabazar", address: "Zindabazar Main Road", city: "Sylhet", district: "Sylhet", latitude: 24.8949, longitude: 91.8687, phone: "+880 1812-890123", isPrimary: true },
  { id: "loc-ah-1", vendorId: "ven-auto-house", name: "Gulshan Showroom", address: "Gulshan Avenue", city: "Dhaka", district: "Dhaka", latitude: 23.7925, longitude: 90.4078, phone: "+880 1912-901234", isPrimary: true },
];

export const vendorListings: VendorListing[] = [
  { id: "list-1", vendorId: "ven-star-mobile", variantId: "var-iphone-256", productId: "prod-iphone-16-pro-max", locationId: "loc-sm-1", price: 177900, stockStatus: "in_stock", condition: "new", warranty: "1 Year Apple Warranty", updatedAt: "2026-06-20", distanceKm: 2.3, deliveryType: "city" },
  { id: "list-2", vendorId: "ven-tech-world", variantId: "var-iphone-256", productId: "prod-iphone-16-pro-max", locationId: "loc-tw-1", price: 176500, stockStatus: "in_stock", condition: "new", warranty: "1 Year", updatedAt: "2026-06-21", distanceKm: 2.5, deliveryType: "nationwide" },
  { id: "list-3", vendorId: "ven-gadget-zone", variantId: "var-iphone-512", productId: "prod-iphone-16-pro-max", locationId: "loc-gz-1", price: 198000, stockStatus: "low_stock", condition: "new", warranty: "1 Year", updatedAt: "2026-06-18", distanceKm: 245, deliveryType: "nationwide" },
  { id: "list-4", vendorId: "ven-royal-motors", variantId: "var-hunter-red", productId: "prod-hunter-350", locationId: "loc-rm-1", price: 234000, stockStatus: "in_stock", condition: "new", warranty: "2 Year RE Warranty", updatedAt: "2026-06-19", distanceKm: 5.1, deliveryType: "city" },
  { id: "list-5", vendorId: "ven-royal-motors", variantId: "var-r15-racing", productId: "prod-yamaha-r15", locationId: "loc-rm-1", price: 548000, stockStatus: "in_stock", condition: "new", warranty: "2 Year Yamaha Warranty", updatedAt: "2026-06-20", distanceKm: 5.1, deliveryType: "city" },
  { id: "list-6", vendorId: "ven-cycle-hub", variantId: "var-rockrider-default", productId: "prod-rockrider-st530", locationId: "loc-ch-1", price: 31900, stockStatus: "in_stock", condition: "new", warranty: "2 Year Frame", updatedAt: "2026-06-22", distanceKm: 3.8, deliveryType: "city" },
  { id: "list-7", vendorId: "ven-cool-air", variantId: "var-lg-ac-default", productId: "prod-lg-ac-15", locationId: "loc-ca-1", price: 67500, stockStatus: "in_stock", condition: "new", warranty: "10 Year Compressor", updatedAt: "2026-06-17", distanceKm: 250, deliveryType: "nationwide" },
  { id: "list-8", vendorId: "ven-walton-plaza", variantId: "var-lg-ac-default", productId: "prod-lg-ac-15", locationId: "loc-wp-1", price: 66900, stockStatus: "in_stock", condition: "new", warranty: "10 Year", updatedAt: "2026-06-21", distanceKm: 8.2, deliveryType: "nationwide" },
  { id: "list-9", vendorId: "ven-tech-world", variantId: "var-s24-256", productId: "prod-samsung-s24-ultra", locationId: "loc-tw-1", price: 152900, stockStatus: "in_stock", condition: "new", warranty: "1 Year Samsung", updatedAt: "2026-06-20", distanceKm: 2.5, deliveryType: "nationwide" },
  { id: "list-10", vendorId: "ven-star-mobile", variantId: "var-s24-256", productId: "prod-samsung-s24-ultra", locationId: "loc-sm-1", price: 153500, stockStatus: "in_stock", condition: "new", warranty: "1 Year", updatedAt: "2026-06-19", distanceKm: 2.3, deliveryType: "city" },
  { id: "list-11", vendorId: "ven-tech-world", variantId: "var-macbook-256", productId: "prod-macbook-air-m3", locationId: "loc-tw-1", price: 132900, stockStatus: "in_stock", condition: "new", warranty: "1 Year Apple", updatedAt: "2026-06-21", distanceKm: 2.5, deliveryType: "international" },
  { id: "list-12", vendorId: "ven-walton-plaza", productId: "prod-walton-fridge", variantId: "var-lg-ac-default", locationId: "loc-wp-1", price: 53900, stockStatus: "in_stock", condition: "new", warranty: "5 Year Compressor", updatedAt: "2026-06-20", distanceKm: 8.2, deliveryType: "nationwide" },
];

export function getVendorBySlug(slug: string): Vendor | undefined {
  return vendors.find((v) => v.slug === slug);
}

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}

export function getLocationsForVendor(vendorId: string): VendorLocation[] {
  return vendorLocations.filter((l) => l.vendorId === vendorId);
}

export function getListingsForProduct(productId: string): VendorListing[] {
  return vendorListings.filter((l) => l.productId === productId);
}

export function getListingsForVendor(vendorId: string): VendorListing[] {
  return vendorListings.filter((l) => l.vendorId === vendorId);
}

export function getNearbyVendors(limit = 4): Vendor[] {
  return vendors.filter((v) => v.status === "active").slice(0, limit);
}
