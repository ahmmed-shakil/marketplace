import type { CategoryBrowseFilters } from "./data";

export function parseCategorySearchParams(
  slug: string,
  params: Record<string, string | undefined>
): CategoryBrowseFilters {
  const specFilters: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (key.startsWith("f_") && value) specFilters[key.slice(2)] = value;
  });

  return {
    categorySlug: slug,
    subcategorySlug: params.sub,
    brandSlug: params.brand,
    minPrice: params.min ? Number(params.min) : undefined,
    maxPrice: params.max ? Number(params.max) : undefined,
    sort: (params.sort as CategoryBrowseFilters["sort"]) ?? "relevance",
    tag: params.tag,
    ratingMin: params.rating ? Number(params.rating) : undefined,
    specFilters: Object.keys(specFilters).length ? specFilters : undefined,
  };
}

export function categoryFilterUrl(
  slug: string,
  current: Record<string, string | undefined>,
  overrides: Record<string, string | null | undefined>
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
  return `/categories/${slug}${qs ? `?${qs}` : ""}`;
}

export function paramsFromFilters(filters: CategoryBrowseFilters, view?: string): Record<string, string | undefined> {
  const params: Record<string, string | undefined> = {
    sort: filters.sort !== "relevance" ? filters.sort : undefined,
    brand: filters.brandSlug,
    min: filters.minPrice != null ? String(filters.minPrice) : undefined,
    max: filters.maxPrice != null ? String(filters.maxPrice) : undefined,
    sub: filters.subcategorySlug,
    tag: filters.tag,
    rating: filters.ratingMin != null ? String(filters.ratingMin) : undefined,
    view,
  };
  if (filters.specFilters) {
    Object.entries(filters.specFilters).forEach(([k, v]) => {
      params[`f_${k}`] = v;
    });
  }
  return params;
}
