"use client";

import type { CategoryAttribute } from "@/lib/data";
import type { StockStatus } from "@/lib/data";
import { Input, Select } from "@/components/ui/Input";
import { cn, formatPrice } from "@/lib/utils";

export interface VariantDraft {
  id: string;
  name: string;
  attributes: Record<string, string>;
  price: number;
  stockStatus: StockStatus;
  isDefault: boolean;
}

interface VariantMatrixBuilderProps {
  dimensions: CategoryAttribute[];
  variants: VariantDraft[];
  onChange: (variants: VariantDraft[]) => void;
}

function buildLabel(attrs: Record<string, string>): string {
  return Object.values(attrs).filter(Boolean).join(" · ") || "Standard";
}

export function VariantMatrixBuilder({ dimensions, variants, onChange }: VariantMatrixBuilderProps) {
  const filterable = dimensions.filter((d) => d.allowedValues?.length).slice(0, 2);

  const addVariant = () => {
    const attrs: Record<string, string> = {};
    filterable.forEach((d) => {
      attrs[d.slug] = d.allowedValues![0];
    });
    onChange([
      ...variants,
      {
        id: `draft-${Date.now()}`,
        name: buildLabel(attrs),
        attributes: attrs,
        price: 0,
        stockStatus: "in_stock",
        isDefault: variants.length === 0,
      },
    ]);
  };

  const updateVariant = (id: string, patch: Partial<VariantDraft>) => {
    onChange(
      variants.map((v) => {
        if (v.id !== id) return v;
        const merged = { ...v, ...patch };
        if (patch.attributes) {
          merged.name = buildLabel(merged.attributes);
        }
        return merged;
      }),
    );
  };

  if (filterable.length === 0) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-[#65676b]">Single configuration — set price and stock.</p>
        {variants.length === 0 ? (
          <button
            type="button"
            onClick={addVariant}
            className="rounded-md border border-dashed border-primary px-4 py-3 text-sm font-semibold text-primary"
          >
            Add configuration
          </button>
        ) : (
          variants.map((v) => (
            <VariantRow key={v.id} variant={v} dimensions={[]} onUpdate={(p) => updateVariant(v.id, p)} />
          ))
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#65676b]">
        Add each configuration you stock — e.g. RAM × storage × color combinations with your price.
      </p>
      {variants.map((v) => (
        <VariantRow
          key={v.id}
          variant={v}
          dimensions={filterable}
          onUpdate={(p) => updateVariant(v.id, p)}
          onRemove={() => onChange(variants.filter((x) => x.id !== v.id))}
        />
      ))}
      <button
        type="button"
        onClick={addVariant}
        className="w-full rounded-md border border-dashed border-primary py-3 text-sm font-semibold text-primary hover:bg-accent-light"
      >
        + Add variant configuration
      </button>
    </div>
  );
}

function VariantRow({
  variant,
  dimensions,
  onUpdate,
  onRemove,
}: {
  variant: VariantDraft;
  dimensions: CategoryAttribute[];
  onUpdate: (patch: Partial<VariantDraft>) => void;
  onRemove?: () => void;
}) {
  return (
    <div className="rounded-md border border-[#dadde1] bg-[#f0f2f5]/50 p-4">
      <div className="flex flex-wrap gap-3">
        {dimensions.map((dim) => (
          <div key={dim.id} className="min-w-[120px] flex-1">
            <label className="text-xs font-semibold text-[#65676b]">{dim.name}</label>
            <Select
              className="mt-1 w-full"
              value={variant.attributes[dim.slug] ?? ""}
              onChange={(e) =>
                onUpdate({
                  attributes: { ...variant.attributes, [dim.slug]: e.target.value },
                })
              }
            >
              {dim.allowedValues!.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </Select>
          </div>
        ))}
        <div className="min-w-[120px] flex-1">
          <label className="text-xs font-semibold text-[#65676b]">Price (BDT)</label>
          <Input
            type="number"
            className="mt-1"
            value={variant.price || ""}
            onChange={(e) => onUpdate({ price: Number(e.target.value) || 0 })}
          />
        </div>
        <div className="min-w-[120px] flex-1">
          <label className="text-xs font-semibold text-[#65676b]">Stock</label>
          <Select
            className="mt-1 w-full"
            value={variant.stockStatus}
            onChange={(e) => onUpdate({ stockStatus: e.target.value as StockStatus })}
          >
            <option value="in_stock">In stock</option>
            <option value="low_stock">Low stock</option>
            <option value="out_of_stock">Out of stock</option>
            <option value="pre_order">Pre-order</option>
          </Select>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className={cn("text-sm font-semibold text-[#050505]")}>
          {variant.name} {variant.price > 0 && `· ${formatPrice(variant.price)}`}
        </span>
        {onRemove && (
          <button type="button" onClick={onRemove} className="text-xs font-semibold text-red-600">
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
