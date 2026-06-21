import Link from "next/link";
import { GitCompare, MapPin, Store } from "lucide-react";
import type { VendorProductCardItem } from "@/lib/data";
import { MotionCard } from "@/components/motion";
import { RatingStars, PriceTag } from "@/components/ui/Display";
import { Badge } from "@/components/ui/Badge";
import { ProductCardImageSlider } from "@/components/product/ProductCardImageSlider";
import { listingUrlFromCard } from "@/lib/listing-url";

export function ProductListItem({
  product,
  href,
}: {
  product: VendorProductCardItem;
  href?: string;
}) {
  const brandLabel = product.brand?.name ?? product.brandName;

  return (
    <Link href={href ?? listingUrlFromCard(product)} className="group block">
      <MotionCard className="fb-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <ProductCardImageSlider
          product={product}
          className="h-40 w-full shrink-0 rounded-lg sm:h-32 sm:w-40 sm:aspect-auto"
          sizes="160px"
        />

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-xs font-semibold text-[#31a24c]">
            <Store className="h-3 w-3" />
            {product.vendor.businessName}
          </p>
          {brandLabel && (
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">{brandLabel}</p>
          )}
          <h3 className="mt-1 text-lg font-semibold text-[#050505] group-hover:underline">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-[#65676b]">{product.description}</p>

          {product.variantSummary.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variantSummary.map((chip) => (
                <span key={chip} className="rounded-md bg-[#f0f2f5] px-2 py-1 text-xs font-medium text-[#050505]">
                  {chip}
                </span>
              ))}
            </div>
          ) : product.keySpecs && product.keySpecs.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.keySpecs.map((spec) => (
                <span key={spec.slug} className="rounded-md bg-[#f0f2f5] px-2 py-1 text-xs font-medium text-[#050505]">
                  {spec.name}: <span className="font-semibold">{spec.value}</span>
                </span>
              ))}
            </div>
          ) : null}

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
          <p className="flex items-center gap-1 text-xs font-medium text-[#65676b]">
            <MapPin className="h-3 w-3" />
            {product.deliveryType === "nationwide" ? "Nationwide" : "Local store"}
          </p>
          <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
            <GitCompare className="h-3 w-3" /> Compare
          </span>
        </div>
      </MotionCard>
    </Link>
  );
}
