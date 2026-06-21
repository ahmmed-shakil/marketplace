"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product, ProductVariant, VendorProduct, VendorProductCardItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getVariantsForProduct } from "@/lib/mock/products";
import { getSliderImages, resolveProductImages } from "@/lib/product-image-utils";

type CardProduct = Product | VendorProduct | VendorProductCardItem;

function isVendorProduct(p: CardProduct): p is VendorProduct {
  return "variants" in p && "vendorId" in p && Array.isArray((p as VendorProduct).variants);
}

function toProductVariants(p: CardProduct): ProductVariant[] {
  if (isVendorProduct(p)) {
    return p.variants.map((v) => ({
      id: v.id,
      productId: p.id,
      sku: v.sku ?? v.id,
      name: v.name,
      slug: v.name.toLowerCase().replace(/\s+/g, "-"),
      priceMsrp: v.price,
      attributes: v.attributes,
      isDefault: v.isDefault,
    }));
  }
  return getVariantsForProduct(p.id);
}

interface ProductCardImageSliderProps {
  product: CardProduct;
  featured?: boolean;
  className?: string;
  sizes?: string;
}

export function ProductCardImageSlider({
  product,
  featured = false,
  className,
  sizes = "(max-width:768px) 100vw, 25vw",
}: ProductCardImageSliderProps) {
  const images = useMemo(() => {
    const variants = toProductVariants(product);
    const base = isVendorProduct(product)
      ? { ...product, images: product.images }
      : product;
    return getSliderImages(resolveProductImages(base as Product, variants));
  }, [product]);

  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = images.length;
  const current = images[index] ?? images[0];
  const hasMultiple = count > 1;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!hovering || !hasMultiple) return;
    timerRef.current = setInterval(() => go(1), 2800);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hovering, hasMultiple, go]);

  const stopNav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (!current) {
    return <div className={cn("relative aspect-[4/3] bg-[#f0f2f5]", className)} />;
  }

  return (
    <div
      className={cn("relative overflow-hidden bg-[#f0f2f5]", className ?? "aspect-[4/3]")}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Image
        key={current.id}
        src={current.url}
        alt={current.altText}
        fill
        className="object-cover transition-opacity duration-300"
        sizes={sizes}
      />

      {featured && (
        <span className="absolute left-2 top-2 z-10 rounded-md fb-primary px-2 py-0.5 text-xs font-bold">
          Featured
        </span>
      )}
      {product.tags?.includes("5g") && (
        <span className="absolute right-2 top-2 z-10 rounded-md bg-[#050505]/70 px-2 py-0.5 text-xs font-bold text-white">
          5G
        </span>
      )}

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              stopNav(e);
              go(-1);
            }}
            className={cn(
              "absolute left-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#050505] shadow transition-opacity hover:bg-white",
              hovering ? "opacity-100" : "opacity-0",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              stopNav(e);
              go(1);
            }}
            className={cn(
              "absolute right-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#050505] shadow transition-opacity hover:bg-white",
              hovering ? "opacity-100" : "opacity-0",
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                aria-label={`Show image ${i + 1}`}
                onClick={(e) => {
                  stopNav(e);
                  setIndex(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
