import type { CategoryAttribute, EnrichedListing, ProductVariant } from "./data";
import { getCategoryAttributes, getFilterableVariantAttributes } from "./mock/categories";

export interface VariantSummary {
  chips: string[];
  dimensionCounts: Record<string, number>;
}

function attrValue(v: ProductVariant, slug: string): string | undefined {
  const val = v.attributes[slug];
  if (val == null) return undefined;
  return String(val);
}

export function getVariantDimensions(categoryId: string): CategoryAttribute[] {
  return getFilterableVariantAttributes(categoryId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function buildVariantSummary(
  variants: ProductVariant[],
  categoryId: string,
): VariantSummary {
  if (variants.length <= 1) {
    const only = variants[0];
    if (only?.attributes.variant === "Standard") return { chips: [], dimensionCounts: {} };
  }

  const dimensions = getVariantDimensions(categoryId);
  const chips: string[] = [];
  const dimensionCounts: Record<string, number> = {};

  for (const dim of dimensions) {
    const values = new Set<string>();
    variants.forEach((v) => {
      const val = attrValue(v, dim.slug);
      if (val) values.add(val);
    });
    if (values.size === 0) continue;
    dimensionCounts[dim.slug] = values.size;
    const first = [...values][0];
    if (dim.slug === "color" && values.size > 1) {
      chips.push(values.size <= 3 ? [...values].join(", ") : `${first} · +${values.size - 1} colors`);
    } else if (values.size === 1) {
      chips.push(first);
    } else {
      const sorted = [...values].sort();
      chips.push(`${sorted[0]} – ${sorted[sorted.length - 1]}`);
    }
  }

  if (chips.length === 0 && variants.length > 1) {
    chips.push(`${variants.length} options`);
  }

  return { chips: chips.slice(0, 4), dimensionCounts };
}

export function variantMatchesFilters(
  variant: ProductVariant,
  filters: Record<string, string>,
): boolean {
  return Object.entries(filters).every(([slug, value]) => {
    const val = attrValue(variant, slug);
    if (!val) return false;
    return val.toLowerCase() === value.toLowerCase() || val.toLowerCase().includes(value.toLowerCase());
  });
}

export function productMatchesVariantFilters(
  variants: ProductVariant[],
  filters?: Record<string, string>,
): boolean {
  if (!filters || Object.keys(filters).length === 0) return true;
  return variants.some((v) => variantMatchesFilters(v, filters));
}

export function getMatchingVariants(
  variants: ProductVariant[],
  filters?: Record<string, string>,
): ProductVariant[] {
  if (!filters || Object.keys(filters).length === 0) return variants;
  return variants.filter((v) => variantMatchesFilters(v, filters));
}

export function resolveVariant(
  variants: ProductVariant[],
  partial: Record<string, string>,
): ProductVariant | undefined {
  const entries = Object.entries(partial).filter(([, v]) => v);
  if (entries.length === 0) return variants.find((v) => v.isDefault) ?? variants[0];

  const exact = variants.find((v) =>
    entries.every(([slug, value]) => attrValue(v, slug)?.toLowerCase() === value.toLowerCase()),
  );
  if (exact) return exact;

  let best: ProductVariant | undefined;
  let bestScore = -1;
  for (const v of variants) {
    let score = 0;
    for (const [slug, value] of entries) {
      if (attrValue(v, slug)?.toLowerCase() === value.toLowerCase()) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }
  return best;
}

export function getAvailableValues(
  variants: ProductVariant[],
  dimensionSlug: string,
  selected: Record<string, string>,
): string[] {
  const others = Object.entries(selected).filter(([k, v]) => k !== dimensionSlug && v);
  const pool = variants.filter((v) =>
    others.every(([slug, value]) => attrValue(v, slug)?.toLowerCase() === value.toLowerCase()),
  );
  const values = new Set<string>();
  pool.forEach((v) => {
    const val = attrValue(v, dimensionSlug);
    if (val) values.add(val);
  });
  return [...values].sort();
}

export function isValueAvailable(
  variants: ProductVariant[],
  dimensionSlug: string,
  value: string,
  selected: Record<string, string>,
): boolean {
  return getAvailableValues(variants, dimensionSlug, { ...selected, [dimensionSlug]: value }).some(
    (v) => v.toLowerCase() === value.toLowerCase(),
  );
}

export function getListingsForVariant<T extends { variantId: string }>(
  listings: T[],
  variantId: string,
): T[] {
  return listings.filter((l) => l.variantId === variantId);
}

export function variantSearchText(variants: ProductVariant[]): string {
  return variants
    .flatMap((v) => Object.values(v.attributes).map(String))
    .join(" ")
    .toLowerCase();
}

export function buildAttributeFacetsFromPool(
  pool: { id: string; categoryId: string }[],
  getVariants: (productId: string) => ProductVariant[],
  attrCategoryId: string | undefined,
): { attribute: CategoryAttribute; values: { value: string; count: number }[] }[] {
  if (!attrCategoryId) return [];

  return getCategoryAttributes(attrCategoryId)
    .filter((a) => a.isFilterable)
    .map((attr) => {
      const valueCounts = new Map<string, number>();
      pool.forEach((p) => {
        const pVariants = getVariants(p.id);
        const values = new Set<string>();
        pVariants.forEach((v) => {
          const val = attrValue(v, attr.slug);
          if (val) values.add(val);
        });
        values.forEach((value) => valueCounts.set(value, (valueCounts.get(value) ?? 0) + 1));
      });
      const values = [...valueCounts.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count);
      return { attribute: attr, values };
    })
    .filter((a) => a.values.length > 0);
}

export function variantAttrsFromSearchParams(
  params: Record<string, string | undefined>,
  categoryId: string,
): Record<string, string> {
  const dims = getVariantDimensions(categoryId);
  const out: Record<string, string> = {};
  dims.forEach((d) => {
    const v = params[d.slug];
    if (v) out[d.slug] = v;
  });
  return out;
}

export function variantParamsToQuery(attrs: Record<string, string>): Record<string, string> {
  return { ...attrs };
}

export function listingVariantLabel(listing: EnrichedListing): string {
  const attrs = listing.variant.attributes;
  const parts = Object.entries(attrs)
    .filter(([k]) => k !== "variant")
    .map(([, v]) => String(v));
  return parts.length ? parts.join(" · ") : listing.variant.name;
}
