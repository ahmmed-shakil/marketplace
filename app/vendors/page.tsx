import Link from "next/link";
import { PageTransition, MotionCard } from "@/components/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { vendors } from "@/lib/mock/vendors";

export default function VendorsPage() {
  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Vendors" }]} />

      <div className="mt-4 overflow-hidden rounded-lg fb-primary p-8 text-white">
        <h1 className="text-3xl font-bold">Vendor Directory</h1>
        <p className="mt-2 max-w-2xl text-blue-100">Find retailers listing products near you — free forever for all vendors.</p>
        <span className="mt-4 inline-block rounded-md bg-white/20 px-3 py-1 text-sm font-semibold">{vendors.length} verified vendors</span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((v) => (
          <Link key={v.id} href={`/vendors/${v.slug}`}>
            <MotionCard className="fb-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-bg text-xl font-bold text-white">{v.businessName.charAt(0)}</div>
                {v.tier === "premium" && <Badge variant="gradient">Premium</Badge>}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#050505]">{v.businessName}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-[#65676b]">{v.description}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-[#65676b]">
                <span>{v.listingCount} listings</span>
                <span>★ {v.rating}</span>
                <Badge variant={v.status === "active" ? "success" : "warning"}>{v.status}</Badge>
              </div>
            </MotionCard>
          </Link>
        ))}
      </div>
    </PageTransition>
  );
}
