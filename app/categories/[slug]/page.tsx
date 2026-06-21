import { notFound } from "next/navigation";
import Link from "next/link";
import { PageTransition } from "@/components/motion";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductListItem } from "@/components/product/ProductListItem";
import { CategoryFilters } from "@/components/category/CategoryFilters";
import { CategoryToolbar } from "@/components/category/CategoryToolbar";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/Display";
import { browseCategory } from "@/lib/mock";
import { parseCategorySearchParams, categoryFilterUrl } from "@/lib/category-url";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { slug } = await params;
  const rawParams = await searchParams;
  const filters = parseCategorySearchParams(slug, rawParams);
  const browse = browseCategory(filters);
  if (!browse) notFound();

  const { category, subcategories, products, total } = browse;
  const view = rawParams.view === "list" ? "list" : "grid";

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...(category.parentId
      ? [{ label: "Categories", href: `/categories/${browse.category.path.split(".")[0]}` }]
      : []),
    { label: category.name },
  ];

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero */}
      <div className="mt-4 overflow-hidden rounded-lg fb-primary p-8 text-white">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="mt-2 max-w-2xl text-blue-100">{category.description}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <span className="rounded-md bg-white/20 px-3 py-1">{total.toLocaleString()} results</span>
          {subcategories.length > 0 && (
            <span className="rounded-md bg-white/20 px-3 py-1">{subcategories.length} subcategories</span>
          )}
        </div>
      </div>

      {/* Subcategory chips */}
      {subcategories.length > 0 && (
        <div className="mt-4 fb-card p-4">
          <p className="mb-3 text-sm font-semibold text-[#65676b]">Browse by type</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/categories/${category.slug}`}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${!filters.subcategorySlug ? "gradient-bg text-white" : "bg-[#f0f2f5] text-[#050505] hover:bg-[#e7f3ff] hover:text-[#1877f2]"}`}
            >
              All {category.name}
            </Link>
            {subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={categoryFilterUrl(category.slug, rawParams, { sub: sub.slug })}
                className={`rounded-md px-4 py-2 text-sm font-semibold ${filters.subcategorySlug === sub.slug ? "gradient-bg text-white" : "bg-[#f0f2f5] text-[#050505] hover:bg-[#e7f3ff] hover:text-[#1877f2]"}`}
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <CategoryFilters browse={browse} params={rawParams} />
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <CategoryToolbar browse={browse} params={rawParams} view={view} />

          {/* Mobile filters toggle area — show condensed filters */}
          <details className="lg:hidden fb-card">
            <summary className="cursor-pointer p-4 text-sm font-semibold text-[#050505]">Filters & Sort</summary>
            <div className="border-t border-[#dadde1] p-4">
              <CategoryFilters browse={browse} params={rawParams} />
            </div>
          </details>

          {products.length === 0 ? (
            <EmptyState
              title="No products match your filters"
              description="Try adjusting price range, brand, or specification filters"
            />
          ) : view === "list" ? (
            <div className="space-y-3">
              {products.map((p) => (
                <ProductListItem key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} keySpecs={p.keySpecs} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
