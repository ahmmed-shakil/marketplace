"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, FolderTree, Store, MessageSquare, ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/categories", icon: FolderTree, label: "Categories" },
  { href: "/admin/vendors", icon: Store, label: "Vendors" },
  { href: "/admin/reviews", icon: MessageSquare, label: "Reviews" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-[#050505] text-white">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-sm font-bold">M</div>
        <span className="font-bold">Admin</span>
      </div>
      <nav className="space-y-1 p-4">
        {nav.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
              pathname === href ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <Link href="/" className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
      </div>
    </aside>
  );
}
