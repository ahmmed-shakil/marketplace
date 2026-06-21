"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function VariantPicker({ variants, selected, onSelect }: { variants: ProductVariant[]; selected: string; onSelect: (id: string) => void }) {
  if (variants.length <= 1) return null;
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-[#050505]">Select Variant</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect(v.id)}
            className={cn(
              "rounded-md border px-3 py-2 text-[13px] font-semibold transition-all",
              selected === v.id
                ? "border-[#1877f2] bg-[#e7f3ff] text-[#1877f2]"
                : "border-[#dadde1] bg-white text-[#050505] hover:bg-[#f0f2f5]"
            )}
          >
            {v.name} — {formatPrice(v.priceMsrp)}
          </button>
        ))}
      </div>
    </div>
  );
}
