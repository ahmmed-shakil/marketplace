import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { PageTransition } from "@/components/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { getVendorDetail } from "@/lib/mock";

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getVendorDetail(slug);
  if (!detail) notFound();
  const { vendor, locations, listings } = detail;

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Vendors", href: "/vendors" }, { label: vendor.businessName }]} />

      <div className="mt-4 overflow-hidden rounded-lg fb-primary p-8 text-white">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl font-bold">{vendor.businessName.charAt(0)}</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold">{vendor.businessName}</h1>
              {vendor.tier === "premium" && <Badge variant="gradient">Premium</Badge>}
            </div>
            <p className="mt-2 max-w-2xl text-blue-100">{vendor.description}</p>
            <p className="mt-2 text-sm font-semibold text-blue-200">★ {vendor.rating} · {vendor.listingCount} listings</p>
          </div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-bold text-[#050505]">Locations</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {locations.map((loc) => (
            <div key={loc.id} className="fb-card p-5">
              <h3 className="font-semibold text-[#050505]">{loc.name}</h3>
              <p className="mt-1 flex items-start gap-2 text-sm text-[#65676b]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1877f2]" />{loc.address}, {loc.city}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#65676b]"><Phone className="h-4 w-4 text-[#1877f2]" />{loc.phone}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-[#050505]">Listings ({listings.length})</h2>
        <div className="mt-4 space-y-3">
          {listings.map((l) => (
            <Link key={l.id} href={`/products/${l.product.slug}`} className="flex items-center justify-between rounded-md border border-[#dadde1] bg-white p-4 hover:bg-[#f0f2f2] transition-colors">
              <span className="font-medium text-[#050505]">{l.product.name}</span>
              <span className="font-bold fb-text">{formatPrice(l.price)}</span>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
