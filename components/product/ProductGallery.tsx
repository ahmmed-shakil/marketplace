"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage, ProductVariant } from "@/lib/data";
import { imageIndexForVariant } from "@/lib/product-image-utils";

interface ProductGalleryProps {
  images: ProductImage[];
  variants?: ProductVariant[];
  selectedVariantId?: string;
}

export function ProductGallery({ images, variants = [], selectedVariantId }: ProductGalleryProps) {
  const sorted = useMemo(
    () => [...images].sort((a, b) => a.sortOrder - b.sortOrder),
    [images],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const current = sorted[activeIndex] ?? sorted[0];
  const hasMultiple = sorted.length > 1;

  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  useEffect(() => {
    if (!selectedVariant) return;
    const idx = imageIndexForVariant(sorted, selectedVariant);
    setActiveIndex(idx);
  }, [selectedVariantId, selectedVariant, sorted]);

  const go = useCallback(
    (delta: number) => {
      setActiveIndex((i) => (i + delta + sorted.length) % sorted.length);
    },
    [sorted.length],
  );

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <div className="flex gap-3">
        {hasMultiple && (
          <div className="hidden shrink-0 flex-col gap-2 sm:flex">
            {sorted.map((img, i) => (
              <button
                key={img.id}
                type="button"
                aria-label={`View ${img.altText}`}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative h-14 w-14 overflow-hidden rounded-lg border-2 bg-[#f0f2f5] transition-all",
                  activeIndex === i
                    ? "border-primary ring-1 ring-primary/30"
                    : "border-[#dadde1] opacity-75 hover:opacity-100",
                )}
              >
                <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        )}

        <div className="fb-card min-w-0 flex-1 overflow-hidden">
          <div className="group relative aspect-[4/3] overflow-hidden bg-[#f0f2f5]">
            {current && (
              <Image
                key={current.id}
                src={current.url}
                alt={current.altText}
                fill
                className="object-contain p-2 transition-opacity duration-200"
                priority
                sizes="(max-width:768px) 100vw, 420px"
              />
            )}

            {hasMultiple && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => go(-1)}
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#050505] shadow-md opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => go(1)}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#050505] shadow-md opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="absolute bottom-2 right-2 rounded-md bg-[#050505]/60 px-2 py-0.5 text-xs font-medium text-white">
                  {activeIndex + 1} / {sorted.length}
                </span>
              </>
            )}

            <span className="absolute right-2 top-2 rounded-md bg-white/90 p-1.5 text-[#65676b] opacity-0 shadow transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" />
            </span>
          </div>

          {hasMultiple && (
            <div className="flex gap-2 overflow-x-auto border-t border-[#dadde1] p-2 scrollbar-hide sm:hidden">
              {sorted.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "relative h-14 w-14 shrink-0 overflow-hidden rounded-md border-2",
                    activeIndex === i ? "border-primary" : "border-transparent opacity-70",
                  )}
                >
                  <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedVariant && getVariantColorLabel(selectedVariant) && (
        <p className="mt-2 text-center text-sm text-[#65676b] sm:text-left">
          Showing:{" "}
          <span className="font-semibold text-[#050505]">{getVariantColorLabel(selectedVariant)}</span>
        </p>
      )}
    </div>
  );
}

function getVariantColorLabel(variant: ProductVariant): string | undefined {
  const color = variant.attributes.color ?? variant.attributes.colour;
  if (color != null) return String(color);
  return variant.name;
}
