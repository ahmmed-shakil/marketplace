import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";
import type { CategoryBrowseResult } from "@/lib/data";
import { categoryFilterUrl, paramsFromFilters } from "@/lib/category-url";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "relevance", label: "Popular" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
] as const;

interface CategoryToolbarProps {
  browse: CategoryBrowseResult;
  params: Record<string, string | undefined>;
  view: "grid" | "list";
}

export function CategoryToolbar({ browse, params, view }: CategoryToolbarProps) {
  const { filters, total, category } = browse;
  const baseParams = paramsFromFilters(filters, view);
  const currentSort = filters.sort ?? "relevance";

  return (
    <div className="fb-card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#050505]">
            {total.toLocaleString()} product{total !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-md border border-[#dadde1] p-0.5">
            <Link
              href={categoryFilterUrl(category.slug, baseParams, { view: "grid" })}
              className={cn(
                "flex items-center rounded px-2.5 py-1.5",
                view === "grid" ? "gradient-bg text-white" : "text-[#65676b] hover:bg-[#f0f2f5]"
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={categoryFilterUrl(category.slug, baseParams, { view: "list" })}
              className={cn(
                "flex items-center rounded px-2.5 py-1.5",
                view === "list" ? "gradient-bg text-white" : "text-[#65676b] hover:bg-[#f0f2f5]"
              )}
              aria-label="List view"
            >
              <List className="h-3.5 w-3.5" />
            </Link>
          </div>

          {sortOptions.map((opt) => (
            <Link
              key={opt.value}
              href={categoryFilterUrl(category.slug, baseParams, { sort: opt.value })}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                currentSort === opt.value
                  ? "gradient-bg text-white"
                  : "border border-[#dadde1] bg-white text-[#65676b] hover:bg-accent-light hover:text-primary"
              )}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>

      {(filters.brandSlug || filters.tag || filters.minPrice || filters.maxPrice || filters.ratingMin || filters.specFilters) && (
        <div className="mt-3 flex flex-wrap gap-2 border-t border-[#dadde1] pt-3">
          {filters.brandSlug && (
            <FilterChip
              label={`Brand: ${browse.facets.brands.find((b) => b.brand.slug === filters.brandSlug)?.brand.name ?? filters.brandSlug}`}
              href={categoryFilterUrl(category.slug, baseParams, { brand: null })}
            />
          )}
          {filters.tag && (
            <FilterChip label={`Type: ${filters.tag}`} href={categoryFilterUrl(category.slug, baseParams, { tag: null })} />
          )}
          {(filters.minPrice != null || filters.maxPrice != null) && (
            <FilterChip
              label={`Price filtered`}
              href={categoryFilterUrl(category.slug, baseParams, { min: null, max: null })}
            />
          )}
          {filters.ratingMin != null && (
            <FilterChip label={`${filters.ratingMin}★+`} href={categoryFilterUrl(category.slug, baseParams, { rating: null })} />
          )}
          {filters.specFilters &&
            Object.entries(filters.specFilters).map(([slug, value]) => (
              <FilterChip
                key={slug}
                label={`${slug.replace(/-/g, " ")}: ${value}`}
                href={categoryFilterUrl(category.slug, baseParams, { [`f_${slug}`]: null })}
              />
            ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-primary hover:bg-indigo-100"
    >
      {label}
      <span aria-hidden>×</span>
    </Link>
  );
}
