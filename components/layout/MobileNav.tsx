"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Search, GitCompare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/categories/electronics", icon: Grid3X3, label: "Browse" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/compare", icon: GitCompare, label: "Compare" },
  { href: "/login", icon: User, label: "Account" },
];

export function MobileNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || ["/login", "/register", "/vendor-signup"].includes(pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#dadde1] bg-white md:hidden">
      <div className="flex items-center justify-around py-1.5">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={cn("flex flex-col items-center gap-0.5 px-2 py-1", active ? "text-primary" : "text-[#65676b]")}>
              <Icon className={cn("h-6 w-6", active && "stroke-[2.5]")} />
              <span className="text-[10px] font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
