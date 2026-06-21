"use client";

import { Plus, Trash2 } from "lucide-react";
import type { CustomSpec } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface CustomSpecFieldsProps {
  specs: CustomSpec[];
  onChange: (specs: CustomSpec[]) => void;
}

export function CustomSpecFields({ specs, onChange }: CustomSpecFieldsProps) {
  const update = (index: number, field: "key" | "value", val: string) => {
    const next = specs.map((s, i) => (i === index ? { ...s, [field]: val } : s));
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {specs.map((spec, i) => (
        <div key={i} className="flex gap-2">
          <Input
            placeholder="Spec name (e.g. Warranty type)"
            value={spec.key}
            onChange={(e) => update(i, "key", e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Value"
            value={spec.value}
            onChange={(e) => update(i, "value", e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => onChange(specs.filter((_, j) => j !== i))}
            aria-label="Remove spec"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="soft"
        size="sm"
        onClick={() => onChange([...specs, { key: "", value: "" }])}
      >
        <Plus className="h-4 w-4" /> Add more field
      </Button>
    </div>
  );
}
