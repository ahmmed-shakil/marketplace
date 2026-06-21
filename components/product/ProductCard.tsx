import Link from "next/link";
import { GitCompare, MapPin, Store } from "lucide-react";
import type { VendorProductCardItem } from "@/lib/data";
import { MotionCard } from "@/components/motion";
import { cn } from "@/lib/utils";
import { RatingStars, PriceTag } from "@/components/ui/Display";
import { ProductCardImageSlider } from "@/components/product/ProductCardImageSlider";
import { listingUrlFromCard } from "@/lib/listing-url";

export function ProductCard({
  product,
  featured = false,
  variantSummary,
  href,
}: {
  product: VendorProductCardItem;
  featured?: boolean;
  variantSummary?: string[];
  href?: string;
}) {
  const options = variantSummary ?? product.variantSummary ?? [];
  const brandLabel = product.brand?.name ?? product.brandName;

  return (
    <Link href={href ?? listingUrlFromCard(product)} className="group block h-full">
      <MotionCard className={cn("fb-card flex h-full flex-col overflow-hidden", featured && "ring-2 ring-primary/20")}>
        <ProductCardImageSlider product={product} featured={featured} />
        <div className="flex flex-1 flex-col p-3">
          <p className="flex items-center gap-1 text-xs font-semibold text-[#31a24c]">
            <Store className="h-3 w-3" />
            {product.vendor.businessName}
          </p>
          {brandLabel && (
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">{brandLabel}</p>
          )}
          <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-[#050505] group-hover:underline">
            {product.name}
          </h3>
          {options.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {options.map((chip) => (
                <span key={chip} className="rounded-md bg-[#f0f2f5] px-2 py-0.5 text-xs font-medium text-[#050505]">
                  {chip}
                </span>
              ))}
            </div>
          ) : product.keySpecs && product.keySpecs.length > 0 ? (
            <div className="mt-2 space-y-0.5">
              {product.keySpecs.slice(0, 2).map((spec) => (
                <p key={spec.slug} className="text-xs text-[#65676b]">
                  {spec.name}: <span className="font-semibold text-[#050505]">{spec.value}</span>
                </p>
              ))}
            </div>
          ) : null}
          <div className="mt-2">
            <PriceTag min={product.minPrice} max={product.maxPrice} size="sm" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-[#65676b]">({product.reviewCount})</span>
          </div>
          <p className="mt-auto flex items-center gap-1 pt-2 text-xs font-medium text-[#65676b]">
            <MapPin className="h-3 w-3" />
            {product.deliveryType === "nationwide" ? "Nationwide delivery" : "Local pickup available"}
          </p>
          <div className="mt-2 flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
            <span className="flex items-center gap-1 rounded-md bg-[#f0f2f5] px-2 py-1 text-xs font-semibold text-primary">
              <GitCompare className="h-3 w-3" /> Compare
            </span>
          </div>
        </div>
      </MotionCard>
    </Link>
  );
}
