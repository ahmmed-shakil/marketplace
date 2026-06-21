import type { Vendor, VendorLocation, VendorListing } from "../data";
import { products, variants } from "./products";
import { buildVendorCatalog } from "./seed-catalog";

const catalog = buildVendorCatalog(products, variants);

export const vendors: Vendor[] = catalog.vendors;
export const vendorLocations: VendorLocation[] = catalog.vendorLocations;
export const vendorListings: VendorListing[] = catalog.vendorListings;

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

export function getActiveVendorCount(): number {
  return vendors.filter((v) => v.status === "active").length;
}
