import type { SearchFilters } from "./data";

export function parseSearchParams(params: Record<string, string | undefined>): SearchFilters {
  const specFilters: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (key.startsWith("f_") && value) specFilters[key.slice(2)] = value;
  });

  return {
    query: params.q,
    categorySlug: params.category,
    brandSlug: params.brand,
    minPrice: params.min ? Number(params.min) : undefined,
    maxPrice: params.max ? Number(params.max) : undefined,
    sort: (params.sort as SearchFilters["sort"]) ?? "relevance",
    specFilters: Object.keys(specFilters).length ? specFilters : undefined,
  };
}

export function searchFilterUrl(
  current: Record<string, string | undefined>,
  overrides: Record<string, string | null | undefined>,
): string {
  const next: Record<string, string | undefined> = { ...current };
  Object.entries(overrides).forEach(([k, v]) => {
    if (v == null || v === "") delete next[k];
    else next[k] = v;
  });
  const sp = new URLSearchParams();
  Object.entries(next).forEach(([k, v]) => {
    if (v) sp.set(k, v);
  });
  const qs = sp.toString();
  return `/search${qs ? `?${qs}` : ""}`;
}

export function productUrlWithVariantFilters(
  slug: string,
  specFilters?: Record<string, string>,
): string {
  if (!specFilters || !Object.keys(specFilters).length) return `/products/${slug}`;
  const sp = new URLSearchParams(specFilters);
  return `/products/${slug}?${sp.toString()}`;
}
