import Link from "next/link";
import type { CategoryBrowseResult } from "@/lib/data";
import { categoryFilterUrl, paramsFromFilters } from "@/lib/category-url";
import { formatPrice } from "@/lib/utils";

interface CategoryFiltersProps {
  browse: CategoryBrowseResult;
  params: Record<string, string | undefined>;
}

export function CategoryFilters({ browse, params }: CategoryFiltersProps) {
  const { facets, filters, subcategories, category } = browse;
  const baseParams = paramsFromFilters(filters, params.view);

  const clearAllUrl = `/categories/${category.slug}${filters.subcategorySlug ? `?sub=${filters.subcategorySlug}` : ""}`;

  const activeCount = [
    filters.brandSlug,
    filters.minPrice,
    filters.maxPrice,
    filters.tag,
    filters.ratingMin,
    ...(filters.specFilters ? Object.values(filters.specFilters) : []),
  ].filter((v) => v != null).length;

  return (
    <aside className="space-y-4">
      {activeCount > 0 && (
        <div className="fb-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#050505]">{activeCount} filter{activeCount > 1 ? "s" : ""} active</span>
            <Link href={clearAllUrl} className="text-xs font-semibold text-primary hover:underline">Clear all</Link>
          </div>
        </div>
      )}

      {/* Subcategories (parent only) */}
      {subcategories.length > 0 && !filters.subcategorySlug && (
        <div className="fb-card p-4">
          <h3 className="text-sm font-bold text-[#050505]">Subcategories</h3>
          <ul className="mt-3 space-y-1">
            {subcategories.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={categoryFilterUrl(category.slug, baseParams, { sub: sub.slug })}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-[#65676b] hover:bg-accent-light hover:text-primary"
                >
                  {sub.name}
                  <span className="text-xs">{sub.productCount.toLocaleString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Price range */}
      <div className="fb-card p-4">
        <h3 className="text-sm font-bold text-[#050505]">Price Range</h3>
        <p className="mt-1 text-xs text-[#65676b]">
          {formatPrice(facets.priceRange.min)} – {formatPrice(facets.priceRange.max)}
        </p>
        <div className="mt-3 space-y-1">
          {[
            { label: "Under ৳20,000", min: undefined, max: "20000", key: "u20k" },
            { label: "৳20,000 – ৳50,000", min: "20000", max: "50000", key: "20-50k" },
            { label: "৳50,000 – ৳1,00,000", min: "50000", max: "100000", key: "50-100k" },
            { label: "৳1,00,000+", min: "100000", max: undefined, key: "100k+" },
          ].map((band) => {
            const active =
              String(filters.minPrice ?? "") === (band.min ?? "") &&
              String(filters.maxPrice ?? "") === (band.max ?? "");
            return (
              <Link
                key={band.key}
                href={categoryFilterUrl(
                  category.slug,
                  baseParams,
                  active ? { min: null, max: null } : { min: band.min ?? null, max: band.max ?? null }
                )}
                className={`block rounded-md px-2 py-1.5 text-sm ${active ? "bg-accent-light font-semibold text-primary" : "text-[#65676b] hover:bg-[#f0f2f5]"}`}
              >
                {band.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      {facets.brands.length > 0 && (
        <div className="fb-card p-4">
          <h3 className="text-sm font-bold text-[#050505]">Brand</h3>
          <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto">
            {facets.brands.map(({ brand, count }) => {
              const active = filters.brandSlug === brand.slug;
              return (
                <li key={brand.id}>
                  <Link
                    href={categoryFilterUrl(category.slug, baseParams, { brand: active ? null : brand.slug })}
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm ${active ? "bg-accent-light font-semibold text-primary" : "text-[#65676b] hover:bg-[#f0f2f5]"}`}
                  >
                    {brand.name}
                    <span className="text-xs">({count})</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Tags */}
      {facets.tags.length > 0 && (
        <div className="fb-card p-4">
          <h3 className="text-sm font-bold text-[#050505]">Product Type</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {facets.tags.map(({ tag, count }) => {
              const active = filters.tag === tag;
              return (
                <Link
                  key={tag}
                  href={categoryFilterUrl(category.slug, baseParams, { tag: active ? null : tag })}
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${active ? "gradient-bg text-white" : "bg-[#f0f2f5] text-[#050505] hover:bg-accent-light hover:text-primary"}`}
                >
                  {tag} ({count})
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Rating */}
      <div className="fb-card p-4">
        <h3 className="text-sm font-bold text-[#050505]">Customer Rating</h3>
        <ul className="mt-3 space-y-1">
          {[4, 3].map((min) => {
            const active = filters.ratingMin === min;
            return (
              <li key={min}>
                <Link
                  href={categoryFilterUrl(category.slug, baseParams, { rating: active ? null : String(min) })}
                  className={`block rounded-md px-2 py-1.5 text-sm ${active ? "bg-accent-light font-semibold text-primary" : "text-[#65676b] hover:bg-[#f0f2f5]"}`}
                >
                  {min}★ & above
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Category-specific spec filters */}
      {facets.attributes.map(({ attribute, values }) => (
        <div key={attribute.id} className="fb-card p-4">
          <h3 className="text-sm font-bold text-[#050505]">{attribute.name}</h3>
          <ul className="mt-3 space-y-1">
            {values.map(({ value, count }) => {
              const active = filters.specFilters?.[attribute.slug] === value;
              return (
                <li key={value}>
                  <Link
                    href={categoryFilterUrl(
                      category.slug,
                      baseParams,
                      active
                        ? { [`f_${attribute.slug}`]: null }
                        : { [`f_${attribute.slug}`]: value }
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
