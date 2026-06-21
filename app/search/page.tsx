import { PageTransition } from "@/components/motion";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/Display";
import { search } from "@/lib/mock";
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
  searchParams: Promise<{ q?: string; category?: string; brand?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const result = search({
    query: params.q,
    categorySlug: params.category,
    brandSlug: params.brand,
    sort: (params.sort as "relevance" | "price_asc" | "price_desc" | "rating") ?? "relevance",
  });

  const buildUrl = (overrides: Record<string, string>) => {
    const sp = new URLSearchParams();
    if (params.q) sp.set("q", params.q);
    if (params.category) sp.set("category", params.category);
    if (params.brand) sp.set("brand", params.brand);
    if (params.sort) sp.set("sort", params.sort);
    Object.entries(overrides).forEach(([k, v]) => sp.set(k, v));
    return `/search?${sp.toString()}`;
  };

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
        <aside className="shrink-0 lg:w-64">
          <div className="fb-card sticky top-24 space-y-4 p-5">
            <h3 className="font-semibold text-[#050505]">Filters</h3>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#65676b]">Category</p>
              <div className="mt-2 space-y-1">
                {result.categories.map((c) => (
                  <Link key={c.id} href={buildUrl({ category: c.slug })} className="block rounded-md px-2 py-1.5 text-sm text-[#65676b] hover:bg-[#e7f3ff] hover:text-[#1877f2]">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#65676b]">Brand</p>
              <div className="mt-2 max-h-40 space-y-1 overflow-y-auto">
                {result.brands.slice(0, 8).map((b) => (
                  <Link key={b.id} href={buildUrl({ brand: b.slug })} className="block rounded-md px-2 py-1.5 text-sm text-[#65676b] hover:bg-[#e7f3ff] hover:text-[#1877f2]">
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-4 flex flex-wrap gap-2">
            {sortOptions.map((opt) => (
              <Link
                key={opt.value}
                href={buildUrl({ sort: opt.value })}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${params.sort === opt.value || (!params.sort && opt.value === "relevance") ? "gradient-bg text-white shadow-sm" : "bg-white text-[#65676b] border border-[#dadde1] hover:bg-[#e7f3ff] hover:text-[#1877f2]"}`}
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
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
