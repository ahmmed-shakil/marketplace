"use client";

import { useCallback, useMemo, useState } from "react";
import type { ProductVariant } from "@/lib/data";
import {
  getVariantDimensions,
  resolveVariant,
  getAvailableValues,
  isValueAvailable,
} from "@/lib/variant-utils";
import { cn, formatPrice } from "@/lib/utils";

interface AttributeVariantPickerProps {
  variants: ProductVariant[];
  categoryId: string;
  selectedId: string;
  initialAttrs?: Record<string, string>;
  onSelect: (variantId: string, attrs: Record<string, string>) => void;
}

export function AttributeVariantPicker({
  variants,
  categoryId,
  selectedId,
  initialAttrs = {},
  onSelect,
}: AttributeVariantPickerProps) {
  const dimensions = getVariantDimensions(categoryId);
  const hasStructuredDims = dimensions.length > 0 && variants.some((v) => {
    const keys = Object.keys(v.attributes).filter((k) => k !== "variant");
    return keys.length > 0;
  });

  const defaultVariant = variants.find((v) => v.id === selectedId) ?? variants.find((v) => v.isDefault) ?? variants[0];

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    if (Object.keys(initialAttrs).length) return initialAttrs;
    const out: Record<string, string> = {};
    dimensions.forEach((d) => {
      const val = defaultVariant?.attributes[d.slug];
      if (val != null) out[d.slug] = String(val);
    });
    return out;
  });

  const resolved = useMemo(() => resolveVariant(variants, selected) ?? defaultVariant, [variants, selected, defaultVariant]);

  if (!hasStructuredDims || variants.length <= 1) {
    if (variants.length <= 1) return null;
    return (
      <div>
        <p className="mb-2 text-sm font-semibold text-[#050505]">Select Variant</p>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id, v.attributes as Record<string, string>)}
              className={cn(
                "rounded-md border px-3 py-2 text-[13px] font-semibold transition-all",
                selectedId === v.id
                  ? "border-primary bg-accent-light text-primary"
                  : "border-[#dadde1] bg-white text-[#050505] hover:bg-[#f0f2f5]",
              )}
            >
              {v.name} — {formatPrice(v.priceMsrp)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const pick = (slug: string, value: string) => {
    const next = { ...selected, [slug]: value };
    setSelected(next);
    const match = resolveVariant(variants, next);
    if (match) onSelect(match.id, next);
  };

  return (
    <div className="space-y-4">
      {dimensions.map((dim) => {
        const values = dim.allowedValues?.length
          ? dim.allowedValues.filter((v) => getAvailableValues(variants, dim.slug, selected).includes(v) || selected[dim.slug] === v)
          : getAvailableValues(variants, dim.slug, selected);

        if (values.length === 0) return null;

        return (
          <div key={dim.id}>
            <p className="mb-2 text-sm font-semibold text-[#050505]">{dim.name}</p>
            <div className="flex flex-wrap gap-2">
              {values.map((value) => {
                const available = isValueAvailable(variants, dim.slug, value, selected);
                const active = selected[dim.slug] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={!available}
                    onClick={() => pick(dim.slug, value)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-[13px] font-semibold transition-all",
                      active
                        ? "border-primary bg-accent-light text-primary"
                        : available
                          ? "border-[#dadde1] bg-white text-[#050505] hover:bg-[#f0f2f5]"
                          : "cursor-not-allowed border-[#dadde1] bg-[#f0f2f5] text-[#bcc0c4] line-through",
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      {resolved && (
        <p className="text-sm text-[#65676b]">
          Selected: <span className="font-semibold text-[#050505]">{resolved.name}</span>
          {" · "}
          <span className="font-bold text-primary">{formatPrice(resolved.priceMsrp)}</span>
        </p>
      )}
    </div>
  );
}
