import Link from "next/link";
import Image from "next/image";
import { GitCompare, MapPin } from "lucide-react";
import type { CategoryProductItem } from "@/lib/data";
import { MotionCard } from "@/components/motion";
import { RatingStars, PriceTag } from "@/components/ui/Display";
import { Badge } from "@/components/ui/Badge";

export function ProductListItem({ product }: { product: CategoryProductItem }) {
  const image = product.images.find((i) => i.isPrimary) ?? product.images[0];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <MotionCard className="fb-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-[#f0f2f5] sm:h-32 sm:w-40">
          <Image
            src={image.url}
            alt={image.altText}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="160px"
          />
          {product.tags?.includes("5g") && (
            <span className="absolute right-2 top-2 rounded-md bg-[#050505]/70 px-2 py-0.5 text-xs font-bold text-white">5G</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide fb-text">{product.brand.name}</p>
          <h3 className="mt-1 text-lg font-semibold text-[#050505] group-hover:underline">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-[#65676b]">{product.description}</p>

          {product.keySpecs.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.keySpecs.map((spec) => (
                <span key={spec.slug} className="rounded-md bg-[#f0f2f5] px-2 py-1 text-xs font-medium text-[#050505]">
                  {spec.name}: <span className="font-semibold">{spec.value}</span>
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {product.tags?.map((tag) => (
              <Badge key={tag} variant="default" className="capitalize">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end sm:text-right">
          <PriceTag min={product.minPrice} max={product.maxPrice} />
          <div className="flex items-center gap-2">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-[#65676b]">({product.reviewCount})</span>
          </div>
          {product.vendorCount > 0 && (
            <p className="flex items-center gap-1 text-xs font-medium text-[#31a24c]">
              <MapPin className="h-3 w-3" />
              {product.vendorCount} vendor{product.vendorCount > 1 ? "s" : ""}
            </p>
          )}
          <span className="mt-1 flex items-center gap-1 text-xs font-semibold fb-text opacity-0 transition-opacity group-hover:opacity-100">
            <GitCompare className="h-3 w-3" /> Compare
          </span>
        </div>
      </MotionCard>
    </Link>
  );
}
