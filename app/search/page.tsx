import { PageTransition } from "@/components/motion";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchFiltersPanel } from "@/components/search/SearchFilters";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/Display";
import { search } from "@/lib/mock";
import { parseSearchParams, searchFilterUrl } from "@/lib/search-url";
import { listingUrlWithVariantFilters } from "@/lib/listing-url";
import Link from "next/link";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseSearchParams(params);
  const result = search(filters);

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

      <div className="mt-4 overflow-hidden rounded-lg fb-primary p-8 text-white">
        <h1 className="text-3xl font-bold">
          {params.q ? `Results for "${params.q}"` : "Search Products"}
        </h1>
        <p className="mt-2 text-blue-100">{result.total} products found across Bangladesh</p>
      </div>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <SearchFiltersPanel result={result} params={params} />
          </div>
        </div>

        <div className="flex-1">
          <details className="mb-4 lg:hidden fb-card">
            <summary className="cursor-pointer p-4 text-sm font-semibold text-[#050505]">Filters</summary>
            <div className="border-t border-[#dadde1] p-4">
              <SearchFiltersPanel result={result} params={params} />
            </div>
          </details>

          <div className="mb-4 flex flex-wrap gap-2">
            {sortOptions.map((opt) => (
              <Link
                key={opt.value}
                href={searchFilterUrl(params, { sort: opt.value === "relevance" ? null : opt.value })}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${params.sort === opt.value || (!params.sort && opt.value === "relevance") ? "gradient-bg text-white shadow-sm" : "bg-white text-[#65676b] border border-[#dadde1] hover:bg-accent-light hover:text-primary"}`}
              >
                {opt.label}
              </Link>
            ))}
          </div>

          {result.products.length === 0 ? (
            <EmptyState title="No products found" description="Try different keywords or filters" />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {result.products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  variantSummary={p.variantSummary}
                  href={listingUrlWithVariantFilters(p.vendor.slug, p.slug, filters.specFilters)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
