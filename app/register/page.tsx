"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-[90vh] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center px-16 mesh-bg hero-pattern">
        <h2 className="text-3xl font-bold text-white">Join Market for free</h2>
        <p className="mt-4 max-w-sm text-lg text-blue-100">
          Save products, write reviews, get price alerts, and make smarter buying decisions.
        </p>
      </div>
      <div className="flex items-center justify-center bg-[#f0f2f5] px-4 py-12">
        <PageTransition className="w-full max-w-sm">
          <div className="fb-card-elevated rounded-lg p-6">
            <h1 className="text-2xl font-bold text-[#050505]">Create account</h1>
            <p className="mt-1 text-[15px] text-[#65676b]">It&apos;s quick and free</p>
            <form className="mt-5 space-y-3" onSubmit={(e) => { e.preventDefault(); router.push("/"); }}>
              <Input placeholder="Full name" required />
              <Input type="email" placeholder="Email address" required />
              <Input type="password" placeholder="New password" required />
              <Button type="submit" className="w-full" size="lg">Sign Up</Button>
            </form>
            <p className="mt-4 text-center text-[15px] text-[#65676b]">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold fb-text hover:underline">Log in</Link>
            </p>
          </div>
        </PageTransition>
      </div>
    </div>
  );
}
