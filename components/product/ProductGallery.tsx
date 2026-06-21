"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/lib/data";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const sorted = [...images].sort((a, b) => a.sortOrder - b.sortOrder);
  const [active, setActive] = useState(sorted[0]?.id ?? "");
  const current = sorted.find((i) => i.id === active) ?? sorted[0];

  return (
    <div className="fb-card overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-[#f0f2f5]">
        {current && (
          <Image key={current.id} src={current.url} alt={current.altText} fill className="object-cover" priority sizes="(max-width:768px) 100vw, 60vw" />
        )}
      </div>
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-[#dadde1] p-3 scrollbar-hide">
          {sorted.map((img) => (
            <button
              key={img.id}
              onClick={() => setActive(img.id)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all",
                active === img.id ? "border-[#1877f2]" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
