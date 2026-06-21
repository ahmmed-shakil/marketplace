"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { getSearchSuggestions } from "@/lib/mock";
import { cn } from "@/lib/utils";

export function SearchBar({
  defaultValue = "",
  large = false,
  animatedPlaceholders,
}: {
  defaultValue?: string;
  large?: boolean;
  animatedPlaceholders?: string[];
}) {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const suggestions = getSearchSuggestions();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!animatedPlaceholders?.length || focused || query) return;
    const timer = setInterval(
      () => setPlaceholderIdx((i) => (i + 1) % animatedPlaceholders.length),
      2800
    );
    return () => clearInterval(timer);
  }, [animatedPlaceholders, focused, query]);

  const submit = (q: string) => {
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const showAnimated = animatedPlaceholders?.length && !query && !focused;
  const staticPlaceholder = animatedPlaceholders?.length
    ? "Search products, brands, categories..."
    : "Search products, brands, categories...";

  return (
    <div ref={ref} className={`relative ${large ? "w-full max-w-xl" : "w-full max-w-md"}`}>
      <form
        onSubmit={(e) => { e.preventDefault(); submit(query || animatedPlaceholders?.[placeholderIdx] || ""); }}
        className={cn(
          "fb-search relative flex items-center gap-2 transition-all",
          large ? "px-4 py-3" : "px-3 py-2"
        )}
      >
        <Search className={cn("shrink-0 text-[#65676b]", large ? "h-5 w-5" : "h-4 w-4")} />
        <div className="relative min-w-0 flex-1">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => { setFocused(true); setOpen(true); }}
            onBlur={() => setFocused(false)}
            placeholder={showAnimated ? "" : staticPlaceholder}
            className={cn(
              "w-full bg-transparent outline-none placeholder:text-[#65676b]",
              large ? "text-[15px]" : "text-[13px]"
            )}
          />
          {showAnimated && (
            <span
              key={placeholderIdx}
              className={cn(
                "pointer-events-none absolute inset-0 flex items-center truncate text-[#65676b] animate-fade-in",
                large ? "text-[15px]" : "text-[13px]"
              )}
              aria-hidden
            >
              {animatedPlaceholders[placeholderIdx]}
            </span>
          )}
        </div>
        {query && (
          <button type="button" onClick={() => setQuery("")} className="rounded-full p-1 text-[#65676b] hover:bg-[#e4e6eb]">
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-[#dadde1] bg-white shadow-lg">
          <p className="flex items-center gap-2 border-b border-[#dadde1] px-4 py-2 text-xs font-semibold uppercase text-[#65676b]">
            <TrendingUp className="h-3.5 w-3.5" /> Trending searches
          </p>
          {suggestions
            .filter((s) => !query || s.toLowerCase().includes(query.toLowerCase()))
            .map((s) => (
              <button
                key={s}
                onClick={() => submit(s)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] text-[#050505] hover:bg-[#f2f2f2]"
              >
                <Search className="h-4 w-4 text-[#65676b]" />
                {s}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
