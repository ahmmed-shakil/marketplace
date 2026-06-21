"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export function Tabs({ tabs, defaultTab }: { tabs: { id: string; label: string; content: React.ReactNode }[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const current = tabs.find((t) => t.id === active);
  return (
    <div>
      <div className="flex gap-0 border-b border-[#dadde1]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "relative px-4 py-3 text-[15px] font-semibold transition-colors",
              active === tab.id ? "text-primary" : "text-[#65676b] hover:bg-[#f2f2f2] rounded-t-md"
            )}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-primary" />
            )}
          </button>
        ))}
      </div>
      <div className="pt-4">{current?.content}</div>
    </div>
  );
}
