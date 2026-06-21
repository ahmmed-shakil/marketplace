import { notFound } from "next/navigation";
import Image from "next/image";
import { PageTransition } from "@/components/motion";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getBrandBySlug } from "@/lib/mock/brands";
import { getProductsByBrand } from "@/lib/mock/products";

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();
  const products = getProductsByBrand(brand.id);

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Brands", href: "/brands" }, { label: brand.name }]} />
      <div className="mt-6 flex items-center gap-5">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image src={brand.logoUrl} alt={brand.name} fill className="object-contain p-2" sizes="64px" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{brand.name}</h1>
          <p className="text-slate-500">{brand.description}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </PageTransition>
  );
}
