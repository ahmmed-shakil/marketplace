import Link from "next/link";
import Image from "next/image";
import { PageTransition, MotionCard } from "@/components/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { brands } from "@/lib/mock/brands";

export default function BrandsPage() {
  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Brands" }]} />

      <div className="mt-4 overflow-hidden rounded-lg fb-primary p-8 text-white">
        <h1 className="text-3xl font-bold">All Brands</h1>
        <p className="mt-2 text-blue-100">Browse products by manufacturer — from global names to local favorites.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => (
          <Link key={brand.id} href={`/brands/${brand.slug}`}>
            <MotionCard className="fb-card flex items-center gap-4 p-5">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[#f0f2f5]">
                <Image src={brand.logoUrl} alt={brand.name} fill className="object-contain p-1" sizes="48px" />
              </div>
              <div>
                <h3 className="font-semibold text-[#050505]">{brand.name}</h3>
                <p className="text-xs text-[#65676b]">{brand.productCount} products</p>
              </div>
            </MotionCard>
          </Link>
        ))}
      </div>
    </PageTransition>
  );
}
