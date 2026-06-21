"use client";

import type { CategoryAttribute } from "@/lib/data";
import { Select } from "@/components/ui/Input";

interface CategorySpecFormProps {
  attributes: CategoryAttribute[];
  values: Record<string, string>;
  onChange: (slug: string, value: string) => void;
}

export function CategorySpecForm({ attributes, values, onChange }: CategorySpecFormProps) {
  if (attributes.length === 0) {
    return <p className="text-sm text-[#65676b]">No template specs for this category — use custom fields below.</p>;
  }

  return (
    <div className="space-y-4">
      {attributes.map((attr) => (
        <div key={attr.id}>
          <label className="text-sm font-semibold text-[#050505]">
            {attr.name}
            {attr.unit ? ` (${attr.unit})` : ""}
          </label>
          {attr.allowedValues?.length ? (
            <Select
              className="mt-1 w-full"
              value={values[attr.slug] ?? ""}
              onChange={(e) => onChange(attr.slug, e.target.value)}
            >
              <option value="">Select {attr.name}</option>
              {attr.allowedValues.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </Select>
          ) : (
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-[#dadde1] px-3 py-2 text-sm"
              value={values[attr.slug] ?? ""}
              onChange={(e) => onChange(attr.slug, e.target.value)}
              placeholder={attr.name}
            />
          )}
        </div>
      ))}
    </div>
  );
}
