"use client";

import Link from "next/link";
import type { Category } from "@/lib/data";
import { SearchBar } from "@/components/layout/SearchBar";
import { getCategoryIcon } from "@/lib/category-icons";

const animatedPlaceholders = [
  "iPhone 16 Pro Max",
  "Samsung Galaxy S24 Ultra",
  "Royal Enfield Hunter 350",
  "MacBook Air M3",
  "LG Dual Inverter AC 1.5 Ton",
  "Yamaha R15 V4",
  "Walton NEXG N25",
  "Toyota Corolla Cross",
  "Nike Air Max 90",
  "Bosch Cordless Drill",
];

export function HeroSearchPanel({ categories }: { categories: Category[] }) {
  const display = categories.slice(0, 12);

  return (
    <div className="hero-card-glow rounded-xl bg-white p-6">
      <p className="text-sm font-semibold text-[#050505]">What are you looking for?</p>
      <p className="mt-1 text-xs text-[#65676b]">Search across all product types in Bangladesh</p>

      <div className="mt-4">
        <SearchBar large animatedPlaceholders={animatedPlaceholders} />
      </div>

      <div className="mt-5 border-t border-[#dadde1] pt-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#65676b]">Browse by category</p>
          <Link href="/categories" className="text-xs font-semibold text-primary hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
          {display.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const shortName = cat.name.split("&")[0].split(" ")[0];
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col items-center rounded-lg p-2 text-center transition-colors hover:bg-accent-light"
                title={cat.name}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="mt-1.5 line-clamp-2 text-[10px] font-semibold leading-tight text-[#050505]">
                  {shortName}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
