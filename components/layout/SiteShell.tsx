"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMinimal = pathname.startsWith("/admin") || pathname === "/login" || pathname === "/register" || pathname === "/vendor-signup";

  if (isMinimal) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}
