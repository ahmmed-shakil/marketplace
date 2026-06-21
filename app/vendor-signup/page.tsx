"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Store, MapPin, CheckCircle } from "lucide-react";
import { PageTransition } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { getTopCategories } from "@/lib/mock/categories";

export default function VendorSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const categories = getTopCategories().slice(0, 8);

  return (
    <div className="relative min-h-[80vh] overflow-hidden px-4 py-12">
      <div className="orb left-10 top-20 h-64 w-64 bg-primary/20" />
      <div className="orb right-10 bottom-20 h-72 w-72 bg-primary/15 animate-float" />
      <PageTransition className="relative mx-auto max-w-lg">
        <div className="glass-card rounded-3xl p-8 shadow-xl">
          <div className="mb-6 flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-2 rounded-full transition-all ${s === step ? "w-8 gradient-bg" : s < step ? "w-2 bg-primary" : "w-2 bg-slate-200"}`} />
            ))}
          </div>

          {step === 1 && (
            <>
              <div className="flex items-center gap-3">
                <Store className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-slate-900">Business Details</h1>
              </div>
              <p className="mt-1 text-sm text-slate-500">List your store for free — forever</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Business Name</label>
                  <Input placeholder="Star Mobile" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input type="email" placeholder="store@example.com" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Phone</label>
                  <Input placeholder="+880 1XXX-XXXXXX" className="mt-1" />
                </div>
              </div>
              <Button className="mt-6 w-full" onClick={() => setStep(2)}>Continue <ChevronRight className="h-4 w-4" /></Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-slate-900">Location & Category</h1>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">City</label>
                  <Select className="mt-1 w-full">
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                    <option>Rajshahi</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Address</label>
                  <Textarea placeholder="Shop address" rows={2} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Primary Category</label>
                  <Select className="mt-1 w-full">
                    {categories.map((c) => <option key={c.id}>{c.name}</option>)}
                  </Select>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)}><ChevronLeft className="h-4 w-4" /> Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)}>Continue</Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
                <h1 className="mt-4 text-xl font-bold text-slate-900">Ready to submit</h1>
                <p className="mt-2 text-sm text-slate-500">We&apos;ll review your application within 24 hours. Listings are always free.</p>
              </div>
              <Button className="mt-8 w-full" size="lg" onClick={() => router.push("/login")}>Submit Application</Button>
              <Button variant="ghost" className="mt-2 w-full" onClick={() => setStep(2)}>Back</Button>
            </>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            <Link href="/login" className="text-primary hover:underline">Already registered?</Link>
          </p>
        </div>
      </PageTransition>
    </div>
  );
}
