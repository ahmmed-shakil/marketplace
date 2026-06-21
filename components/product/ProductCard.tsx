import Link from "next/link";
import Image from "next/image";
import { GitCompare, MapPin } from "lucide-react";
import type { Product, SpecRow } from "@/lib/data";
import { MotionCard } from "@/components/motion";
import { cn } from "@/lib/utils";
import { RatingStars, PriceTag } from "@/components/ui/Display";
import { getBrandById } from "@/lib/mock/brands";
import { getListingsForProduct } from "@/lib/mock/vendors";

export function ProductCard({
  product,
  featured = false,
  keySpecs,
}: {
  product: Product;
  featured?: boolean;
  keySpecs?: SpecRow[];
}) {
  const brand = getBrandById(product.brandId);
  const image = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const listingCount = getListingsForProduct(product.id).length;

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <MotionCard className={cn("fb-card flex h-full flex-col overflow-hidden", featured && "ring-2 ring-[#1877f2]/20")}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f2f5]">
          <Image
            src={image.url}
            alt={image.altText}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 25vw"
          />
          {featured && (
            <span className="absolute left-2 top-2 rounded-md fb-primary px-2 py-0.5 text-xs font-bold">Featured</span>
          )}
          {product.tags?.includes("5g") && (
            <span className="absolute right-2 top-2 rounded-md bg-[#050505]/70 px-2 py-0.5 text-xs font-bold text-white">5G</span>
          )}
          <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-[#1877f2] shadow">
              <GitCompare className="h-3 w-3" /> Compare
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-3">
          {brand && (
            <p className="text-xs font-semibold uppercase tracking-wide fb-text">{brand.name}</p>
          )}
          <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-[#050505] group-hover:underline">
            {product.name}
          </h3>
          {keySpecs && keySpecs.length > 0 && (
            <div className="mt-2 space-y-0.5">
              {keySpecs.slice(0, 2).map((spec) => (
                <p key={spec.slug} className="text-xs text-[#65676b]">
                  {spec.name}: <span className="font-semibold text-[#050505]">{spec.value}</span>
                </p>
              ))}
            </div>
          )}
          <div className="mt-2">
            <PriceTag min={product.minPrice} max={product.maxPrice} size="sm" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-[#65676b]">({product.reviewCount})</span>
          </div>
          {listingCount > 0 && (
            <p className="mt-auto flex items-center gap-1 pt-2 text-xs font-medium text-[#31a24c]">
              <MapPin className="h-3 w-3" />
              {listingCount} vendor{listingCount > 1 ? "s" : ""} nearby
            </p>
          )}
        </div>
      </MotionCard>
    </Link>
  );
}
