import Link from "next/link";
import Image from "next/image";
import { PageTransition } from "@/components/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getCompareProducts, getAllComparisons } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ ids?: string; slug?: string }> }) {
  const params = await searchParams;
  let productIds: string[] = [];

  if (params.ids) {
    productIds = params.ids.split(",").filter(Boolean).slice(0, 4);
  } else if (params.slug) {
    const comp = getAllComparisons().find((c) => c.slug === params.slug);
    if (comp) productIds = comp.productIds;
  } else {
    const first = getAllComparisons()[0];
    if (first) productIds = first.productIds;
  }

  const products = getCompareProducts(productIds);
  const allSpecs = [...new Set(products.flatMap((p) => p.specs.filter((s) => s.isComparable).map((s) => s.slug)))];

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />

      <div className="mt-4 overflow-hidden rounded-lg fb-primary p-8 text-white">
        <h1 className="text-3xl font-bold">Product Comparison</h1>
        <p className="mt-2 max-w-2xl text-blue-100">Side-by-side specs, prices, and highlights — find the best fit for your budget.</p>
      </div>

      {products.length === 0 ? (
        <div className="mt-8 fb-card p-8 text-center">
          <p className="text-[#65676b]">Select products to compare using the links below.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto fb-card">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#dadde1]">
                <th className="p-4 text-left font-semibold text-[#65676b]">Spec</th>
                {products.map((p) => (
                  <th key={p.id} className="p-4 text-center">
                    <Link href={`/products/${p.slug}`}>
                      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-lg bg-[#f0f2f5]">
                        <Image src={p.images[0]?.url ?? ""} alt={p.name} fill className="object-cover" sizes="96px" />
                      </div>
                      <p className="mt-2 font-semibold text-[#050505]">{p.name}</p>
                      <p className="fb-text font-bold">{formatPrice(p.minPrice)}</p>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allSpecs.map((specSlug) => {
                const values = products.map((p) => p.specs.find((s) => s.slug === specSlug)?.value ?? "—");
                const unique = new Set(values);
                const hasDiff = unique.size > 1;
                return (
                  <tr key={specSlug} className={cn("border-t border-[#dadde1]", hasDiff && "bg-[#e7f3ff]/50")}>
                    <td className="p-4 font-medium text-[#65676b] capitalize">{specSlug.replace(/-/g, " ")}</td>
                    {values.map((v, i) => (
                      <td key={i} className={cn("p-4 text-center text-[#050505]", hasDiff && "font-semibold fb-text")}>{v}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 fb-card p-5">
        <h3 className="font-semibold text-[#050505]">Popular Comparisons</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {getAllComparisons().map((c) => (
            <Link key={c.id} href={`/compare?ids=${c.productIds.join(",")}`} className="rounded-full border border-[#dadde1] bg-[#f0f2f5] px-4 py-2 text-sm font-medium text-[#050505] hover:bg-[#e7f3ff] hover:text-[#1877f2]">
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
