import Link from "next/link";
import type { SearchResult } from "@/lib/data";
import { searchFilterUrl } from "@/lib/search-url";
import { formatPrice } from "@/lib/utils";

interface SearchFiltersProps {
  result: SearchResult;
  params: Record<string, string | undefined>;
}

export function SearchFiltersPanel({ result, params }: SearchFiltersProps) {
  const { facets, filters } = result;

  const activeCount = [
    filters.brandSlug,
    filters.minPrice,
    filters.maxPrice,
    filters.categorySlug,
    ...(filters.specFilters ? Object.values(filters.specFilters) : []),
  ].filter((v) => v != null).length;

  const clearUrl = filters.query ? `/search?q=${encodeURIComponent(filters.query)}` : "/search";

  return (
    <aside className="space-y-4">
      {activeCount > 0 && (
        <div className="fb-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#050505]">{activeCount} filter{activeCount > 1 ? "s" : ""} active</span>
            <Link href={clearUrl} className="text-xs font-semibold text-primary hover:underline">Clear all</Link>
          </div>
        </div>
      )}

      <div className="fb-card p-4">
        <h3 className="text-sm font-bold text-[#050505]">Category</h3>
        <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto">
          {result.categories.map((c) => (
            <li key={c.id}>
              <Link
                href={searchFilterUrl(params, { category: filters.categorySlug === c.slug ? null : c.slug })}
                className={`block rounded-md px-2 py-1.5 text-sm ${filters.categorySlug === c.slug ? "bg-accent-light font-semibold text-primary" : "text-[#65676b] hover:bg-[#f0f2f5]"}`}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="fb-card p-4">
        <h3 className="text-sm font-bold text-[#050505]">Brand</h3>
        <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto">
          {facets.brands.slice(0, 12).map(({ brand, count }) => {
            const active = filters.brandSlug === brand.slug;
            return (
              <li key={brand.id}>
                <Link
                  href={searchFilterUrl(params, { brand: active ? null : brand.slug })}
                  className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm ${active ? "bg-accent-light font-semibold text-primary" : "text-[#65676b] hover:bg-[#f0f2f5]"}`}
                >
                  <span className="truncate">{brand.name}</span>
                  <span className="ml-2 shrink-0 text-xs">({count})</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="fb-card p-4">
        <h3 className="text-sm font-bold text-[#050505]">Price Range</h3>
        <p className="mt-1 text-xs text-[#65676b]">
          {formatPrice(facets.priceRange.min)} – {formatPrice(facets.priceRange.max)}
        </p>
      </div>

      {facets.attributes.map(({ attribute, values }) => (
        <div key={attribute.id} className="fb-card p-4">
          <h3 className="text-sm font-bold text-[#050505]">{attribute.name}</h3>
          <ul className="mt-3 space-y-1">
            {values.map(({ value, count }) => {
              const active = filters.specFilters?.[attribute.slug] === value;
              return (
                <li key={value}>
                  <Link
                    href={searchFilterUrl(
                      params,
                      active ? { [`f_${attribute.slug}`]: null } : { [`f_${attribute.slug}`]: value },
                    )}
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm ${active ? "bg-accent-light font-semibold text-primary" : "text-[#65676b] hover:bg-[#f0f2f5]"}`}
                  >
                    <span className="truncate">{value}</span>
                    <span className="ml-2 shrink-0 text-xs">({count})</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
