"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu, X, User, Store, GitCompare, BookOpen, Grid3X3,
} from "lucide-react";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/Button";
import { getTopCategories } from "@/lib/mock/categories";
import { getCategoryIcon } from "@/lib/category-icons";

function CategoryIcon({ name }: { name: string }) {
  const Icon = getCategoryIcon(name);
  return <Icon className="h-5 w-5" />;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const categories = getTopCategories();

  const navLinks = [
    { href: "/compare", label: "Compare", icon: GitCompare },
    { href: "/guides", label: "Guides", icon: BookOpen },
    { href: "/vendors", label: "Vendors", icon: Store },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full fb-primary text-lg font-bold">M</div>
          <span className="hidden text-xl font-bold text-[#1877f2] sm:block">Market</span>
        </Link>

        <div
          className="relative hidden lg:block"
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <button className="flex items-center gap-2 rounded-md px-3 py-2 text-[15px] font-semibold text-[#050505] hover:bg-[#f2f2f2]">
            <Grid3X3 className="h-5 w-5 text-[#1877f2]" />
            Categories
          </button>
          {megaOpen && (
            <div className="absolute left-0 top-full pt-1">
              <div className="max-h-[70vh] w-[560px] overflow-y-auto rounded-lg border border-[#dadde1] bg-white p-2 shadow-lg">
                <div className="grid grid-cols-2 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-[#f2f2f2]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2]">
                      <CategoryIcon name={cat.icon} />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-[#050505]">{cat.name}</p>
                      <p className="text-xs text-[#65676b]">{cat.productCount.toLocaleString()} products</p>
                    </div>
                  </Link>
                ))}
                </div>
                <Link href="/categories" className="mt-2 block rounded-md px-3 py-2 text-center text-sm font-semibold fb-text hover:bg-[#f0f2f5]">
                  View all categories →
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-[15px] font-semibold text-[#050505] hover:bg-[#f2f2f2] lg:flex"
            >
              <Icon className="h-5 w-5 text-[#1877f2]" />
              {label}
            </Link>
          ))}
          <Link href="/login" className="hidden sm:block">
            <Button variant="secondary" size="sm"><User className="h-4 w-4" /> Log In</Button>
          </Link>
          <Link href="/vendor-signup" className="hidden sm:block">
            <Button variant="primary" size="sm"><Store className="h-4 w-4" /> Sell Free</Button>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-md p-2 hover:bg-[#f2f2f2] lg:hidden">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#dadde1] bg-white px-4 py-4 lg:hidden">
          <SearchBar />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-2 rounded-md bg-[#f0f2f5] px-3 py-2.5 text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                <CategoryIcon name={cat.icon} />
                {cat.name.split(" ")[0]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
