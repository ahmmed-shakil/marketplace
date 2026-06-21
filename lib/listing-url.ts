import type { VendorProduct, VendorProductCardItem } from "./data";

export function listingUrl(vendorSlug: string, listingSlug: string): string {
  return `/listings/${vendorSlug}/${listingSlug}`;
}

export function listingUrlFromCard(item: VendorProductCardItem): string {
  return listingUrl(item.vendor.slug, item.slug);
}

export function listingUrlWithVariantFilters(
  vendorSlug: string,
  listingSlug: string,
  specFilters?: Record<string, string>,
): string {
  const base = listingUrl(vendorSlug, listingSlug);
  if (!specFilters || Object.keys(specFilters).length === 0) return base;
  const sp = new URLSearchParams();
  Object.entries(specFilters).forEach(([k, v]) => {
    if (v) sp.set(k, v);
  });
  const qs = sp.toString();
  return qs ? `${base}?${qs}` : base;
}

export function listingUrlFromProduct(vp: VendorProduct & { vendor?: { slug: string } }): string {
  if (vp.vendor) return listingUrl(vp.vendor.slug, vp.slug);
  return listingUrl("", vp.slug);
}
