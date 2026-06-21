"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-[90vh] grid lg:grid-cols-2">
      {/* Left — Facebook-style brand panel */}
      <div className="hidden lg:flex flex-col justify-center px-16 mesh-bg hero-pattern">
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#1877f2]">M</div>
          <span className="text-4xl font-bold text-white">Market</span>
        </div>
        <p className="mt-6 max-w-md text-2xl font-normal leading-snug text-white">
          Know everything about any product. Find where to buy it across Bangladesh.
        </p>
        <ul className="mt-8 space-y-3 text-blue-100">
          {["Complete specs & reviews", "Compare products side-by-side", "Find nearby vendors with stock"].map((t) => (
            <li key={t} className="flex items-center gap-2 text-[15px]">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center bg-[#f0f2f5] px-4 py-12">
        <PageTransition className="w-full max-w-sm">
          <div className="fb-card-elevated rounded-lg p-6">
            <div className="mb-5 lg:hidden text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full fb-primary text-xl font-bold">M</div>
            </div>
            <h1 className="text-2xl font-bold text-[#050505]">Log in to Market</h1>
            <p className="mt-1 text-[15px] text-[#65676b]">Access saved products and reviews</p>
            <form className="mt-5 space-y-3" onSubmit={(e) => { e.preventDefault(); router.push("/"); }}>
              <Input type="email" placeholder="Email address" required />
              <Input type="password" placeholder="Password" required />
              <Button type="submit" className="w-full" size="lg">Log In</Button>
            </form>
            <div className="my-4 border-t border-[#dadde1]" />
            <Link href="/register" className="block">
              <Button variant="secondary" className="w-full" size="md">Create New Account</Button>
            </Link>
            <p className="mt-4 text-center text-sm">
              <Link href="/vendor-signup" className="font-semibold fb-text hover:underline">List your store for free</Link>
            </p>
          </div>
        </PageTransition>
      </div>
    </div>
  );
}
